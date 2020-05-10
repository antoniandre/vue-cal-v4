/**
 * Events drag and drop module.
 *
 * Note: Waiting for VS Code to support JavaScript private fields.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields
 * Meantime keep `_` for private.
 */

const holdOverTimeout = 800; // How long we should hold over an element before it reacts.
let changeViewTimeout = null;
let pressPrevOrNextInterval = null;
let viewBeforeDrag = { id: null, date: null }; // To go back if cancelling.
let viewChanged = false;
let cancelViewChange = true;
let dragOverCell = { el: null, cell: null, timeout: null };
const dragging = {
  _eid: null,
  fromVueCal: null,
  toVueCal: null
};

export const DragAndDrop = class {
  _vuecal;

  constructor(vuecal) {
    this._vuecal = vuecal;
  }

  /**
   * When click and drag an event the cursor can be anywhere in the event,
   * when dropping the event, we need to subtract the cursor position in the event.
   *
   * @param {Object} e The associated DOM event.
   */
  _getEventStart(e) {
    const { timeStep, timeCellHeight, timeFrom, utils } = this._vuecal;
    let { y } = utils.cell.getPosition(e);
    y -= e.dataTransfer.getData("cursor-grab-at") * 1;
    return Math.round((y * timeStep) / parseInt(timeCellHeight) + timeFrom);
  }

  /**
   * On drop, update the event start and end date directly into the event.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} event The event being dragged.
   * @param {Object} transferData The transfer data from the HTML5 dragging event.
   * @param {Date} cellDate The hovered cell starting date.
   */
  _updateEventStartEnd(e, event, transferData, cellDate) {
    // If no duration calculate it from event.endTimeMinutes - event.startTimeMinutes
    // before we modify the start and end.
    const eventDuration =
      transferData.duration * 1 ||
      event.endTimeMinutes - event.startTimeMinutes;

    // Force the start of the event at previous midnight minimum.
    let startTimeMinutes = Math.max(this._getEventStart(e), 0);

    // On drop, snap to time every X minutes if the option is on.
    if (this._vuecal.snapToTime) {
      const plusHalfSnapTime = startTimeMinutes + this._vuecal.snapToTime / 2;
      startTimeMinutes =
        plusHalfSnapTime - (plusHalfSnapTime % this._vuecal.snapToTime);
    }

    event.startTimeMinutes = startTimeMinutes;
    event.start = new Date(new Date(cellDate).setMinutes(startTimeMinutes));
    // Force the end of the event at next midnight maximum.
    event.endTimeMinutes = Math.min(startTimeMinutes + eventDuration, 24 * 60);
    event.end = new Date(new Date(cellDate).setMinutes(event.endTimeMinutes));
  }

  /**
   * On event drag start, only possible if editableEvent is true.
   * /!\ This is using the native HTML5 drag & drop, not supported on touch devices.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} event The event being dragged.
   */
  eventDragStart(e, event) {
    // Cancel the drag if event has draggable set to false and trying to drag a text selection.
    if (e.target.nodeType === 3) return e.preventDefault();

    e.dataTransfer.dropEffect = "move";
    // Transfer the event's data to the receiver (when successfully drag & dropping out of Vue Cal).
    // Notice: in Firefox the drag is prevented if there is no dataTransfer.setData().
    e.dataTransfer.setData("event", JSON.stringify(event));
    // When click and drag an event the cursor can be anywhere in the event,
    // when later dropping the event, we need to subtract the cursor position in the event.
    e.dataTransfer.setData("cursor-grab-at", e.offsetY); // In pixels.
    this._vuecal.dragData.draggedEvent = event; // Only for vuecal dragging-event class.
    this._vuecal.dragData.eventDuration =
      event.endTimeMinutes - event.startTimeMinutes;
    this._vuecal.dragData.initialCursorStartDifference =
      this._vuecal.minutesAtCursor(e).minutes - event.startTimeMinutes; // Only for vuecal dragging-event class.
    const { clickHoldAnEvent } = this._vuecal.domEvents;
    // Cancel any delete on dragStart (if held for too long). Don't drag an event with a visible delete button.
    setTimeout(() => {
      clickHoldAnEvent._eid = null;
      clearTimeout(clickHoldAnEvent.timeoutId);
      event.deleting = false;
    }, 0);

    this._vuecal.domEvents.dragAnEvent._eid = event._eid; // Only for vuecal dragging-event class.

    dragging._eid = event._eid;
    dragging.fromVueCal = this._vuecal._uid;
    event.dragging = true;
    // Controls the CSS class of the static event that remains while a copy is being dragged.
    // Thanks to this class, the event being dragged can have a different style.
    setTimeout(() => (event.draggingStatic = true), 0);

    viewChanged = false;
    viewBeforeDrag = {
      id: this._vuecal.view.id,
      date: this._vuecal.view.startDate
    };

    cancelViewChange = true; // Re-init the cancel view: should cancel unless a cell received the event.
  }

  /**
   * On event drag end, when releasing the event.
   *
   * @param {Object} event The event being dragged.
   */
  eventDragEnd(event) {
    this._vuecal.domEvents.dragAnEvent._eid = null;
    dragging._eid = null;
    event.dragging = false;
    event.draggingStatic = false;

    // If an event is dragged from a Vue Cal instance and dropped in a different one, remove the
    // event from the first one.
    const { fromVueCal, toVueCal } = dragging;
    if (toVueCal && fromVueCal !== toVueCal)
      this._vuecal.utils.event.deleteAnEvent(event);
    dragging.fromVueCal = null;
    dragging.toVueCal = null;

    // When dropping the event, cancel view change if no cell received the event (in cellDragDrop).
    if (viewChanged && cancelViewChange && viewBeforeDrag.id)
      this._vuecal.switchView(viewBeforeDrag.id, viewBeforeDrag.date, true);
  }

  /**
   * On cell/split enter with a dragging event.
   * Highlight the cell, and if on `years`, `year`, `month` view,
   * set a timer to go deeper on drag hold over this cell.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} cell The cell component's $data.
   * @param {Date} cellDate The hovered cell starting date.
   */
  cellDragEnter(e, cell, cellDate) {
    const target = e.currentTarget;

    // Cancel dragEnter event if hovering a child.
    if (e.currentTarget.contains(e.relatedTarget)) return;
    if (
      target === dragOverCell.el ||
      !target.className.includes("vuecal__cell-content")
    )
      return false;

    // Un-highlight the previous cell.
    if (dragOverCell.el) dragOverCell.cell.highlighted = false;

    dragOverCell = {
      el: target,
      cell,
      timeout: clearTimeout(dragOverCell.timeout)
    };
    cell.highlighted = true;

    // On `years`, `year` & `month` views, go to narrower view on drag and hold.
    if (["years", "year", "month"].includes(this._vuecal.view.id)) {
      dragOverCell.timeout = setTimeout(
        () => this._vuecal.switchToNarrowerView(cellDate),
        2000
      );
    }
  }

  /**
   * On cell/split drag over, highlight the cell being hovered,
   * Useful when starting to drag event on the same cell/split it's in.
   * Warning: This is fired repeatedly as long as you stay over this cell/split.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} cell The cell component's $data.
   * @param {Date} cellDate The hovered cell starting date.
   * @param {Number|String} split The optional split being hovered if any.
   */
  cellDragOver(e, cell, cellDate, split) {
    e.preventDefault();

    this._vuecal.dragData.timeAtCursor = this._vuecal.minutesAtCursor(e);
    this._vuecal.dragData.split = split;

    cell.highlighted = true;
    if (split || split === 0) cell.highlightedSplit = split;
  }

  /**
   * When event drag leaves a cell/split.
   * Remove the cell/split highlighted state.
   * Warning: cell dragleave event happens AFTER another cell dragenter!
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} cell The cell component's $data.
   */
  cellDragLeave(e, cell) {
    e.preventDefault();

    if (e.currentTarget.contains(e.relatedTarget)) return;

    cell.highlightedSplit = false;

    // Only cancel the timer if leaving the current cell to no other one.
    // If leaving this cell to enter another, a cancel is done in cellDragEnter,
    // and a new timer is started.
    if (dragOverCell.cell === cell) {
      clearTimeout(dragOverCell.timeout);
      dragOverCell = { el: null, cell: null, timeout: null };
      cell.highlighted = false;
    }
  }

  /**
   * On successful event drop into a cell/split.
   * Change the event start and end time and remove the event dragging state
   * and cell/split highlighted state.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} cell The cell component's $data.
   * @param {Date} cellDate The hovered cell starting date.
   * @param {Number|String} split The optional split being dropped into, if any.
   */
  cellDragDrop(e, cell, cellDate, split) {
    this._vuecal.dragData.draggedEvent = null;
    this._vuecal.dragData.split = null;
    this._vuecal.dragData.initialCursorStartDifference = null;
    // Needed to prevent navigation to the text set in dataTransfer from eventDragStart().
    e.preventDefault();
    clearTimeout(dragOverCell.timeout);
    dragOverCell = { el: null, cell: null, timeout: null };

    const transferData = JSON.parse(e.dataTransfer.getData("event") || "{}");
    let event, addToView;

    // If the event is not coming from this Vue Cal it means that we are accepting a new event.
    // So create the event in this Vue Cal.
    if (dragging.fromVueCal !== this._vuecal._uid) {
      // Removing the _eid is mandatory! It prevents the event to be duplicated when drag and
      // dropping to another calendar then back to the original place.
      const { _eid, start, end, duration, ...cleanTransferData } = transferData;
      // Note: createAnEvent adds the event to the view.
      event = this._vuecal.utils.event.createAnEvent(cellDate, duration, {
        ...cleanTransferData,
        split
      });
    } else {
      // Find the dragged event from its _eid in the view or mutableEvents array.
      // If dragging the event to another day, the event is not in the view array but in the
      // mutableEvents one.
      event = this._vuecal.view.events.find(evt => evt._eid === dragging._eid);

      if (!event) {
        event = this._vuecal.mutableEvents.find(
          evt => evt._eid === dragging._eid
        );
        addToView = !!event;
      }

      // Case where events are fetched from the backend and removed from the array when not in the view.
      // So it won't be found in the mutableEvents array.
      if (!event) {
        const duration =
          transferData.endTimeMinutes - transferData.startTimeMinutes;
        // Pass exactly the same event as it was before the view change (same _eid as well) except dates.
        const { start, end, ...cleanTransferData } = transferData;
        event = this._vuecal.utils.event.createAnEvent(cellDate, duration, {
          ...cleanTransferData,
          split
        });
        // Note: createAnEvent adds the event to the view.
      }
    }

    const { start: oldDate, split: oldSplit } = event;
    this._updateEventStartEnd(e, event, transferData, cellDate);

    // Only add the event to view after the start and end are modified otherwise
    // it would be filtered out from the function if not in range.
    if (addToView) this._vuecal.addEventsToView([event]);

    event.dragging = false;
    if (split || split === 0) event.split = split;

    cell.highlighted = false;
    cell.highlightedSplit = null;
    cancelViewChange = false;
    dragging.toVueCal = this._vuecal._uid;

    // Emit `event-drop` & `event-change` events and return the updated event.
    const params = {
      event: this._vuecal.cleanupEvent(event),
      oldDate,
      newDate: event.start,
      ...((split || split === 0) && { oldSplit, newSplit: split }),
      originalEvent: this._vuecal.cleanupEvent(transferData),
      external: !dragging.fromVueCal // If external event, not coming from any Vue Cal.
    };
    this._vuecal.$emit("event-drop", params);
    this._vuecal.$emit("event-change", {
      event: params.event,
      originalEvent: params.originalEvent
    });

    // Sometimes the event dragend does not trigger (?!), so manually trigger it if it didn't.
    setTimeout(() => {
      if (dragging._eid) this.eventDragEnd(event);
    }, 300);
  }

  /**
   * On drag enter on a view button or on today, prev & next buttons.
   * Sets a highlighted state on the hovered button, and go to requested view.
   *
   * @param {Object} e The associated DOM event.
   * @param {String} id The id of the header element being hovered. One of:
   *                    previous, next, today, years, year, month, week, day.
   * @param {Object} headerData The header component's $data.
   */
  viewSelectorDragEnter(e, id, headerData) {
    if (e.currentTarget.contains(e.relatedTarget)) return;

    headerData.highlightedControl = id;
    clearTimeout(changeViewTimeout);
    changeViewTimeout = setTimeout(() => {
      if (["previous", "next"].includes(id)) {
        this._vuecal[id]();
        // Keep pressing on previous or next button until user goes away.
        clearInterval(pressPrevOrNextInterval);
        pressPrevOrNextInterval = setInterval(
          this._vuecal[id],
          holdOverTimeout
        );
      } else if (id === "today") {
        clearInterval(pressPrevOrNextInterval);
        let viewId;
        if (this._vuecal.view.id.includes("year")) {
          // If hovering today from a year or years view go to narrower view from month view.
          viewId = this._vuecal.enabledViews.filter(
            view => !view.includes("year")
          )[0];
        }
        this._vuecal.switchView(
          viewId || this._vuecal.view.id,
          new Date(new Date().setHours(0, 0, 0, 0)),
          true
        );
      } else this._vuecal.switchView(id, null, true);
      viewChanged = true;
    }, holdOverTimeout);
  }

  /**
   * On drag leave on a view button or on today, prev & next buttons.
   * Removes the highlighted state on the hovered button, and cancel the timer to
   * go to the requested view.
   *
   * @param {Object} e The associated DOM event.
   * @param {String} id The id of the header element being hovered. One of:
   *                    previous, next, today, years, year, month, week, day.
   * @param {Object} headerData The header component's $data.
   */
  viewSelectorDragLeave(e, id, headerData) {
    if (e.currentTarget.contains(e.relatedTarget)) return;

    // Only cancel the timer if leaving the current nav button to no other one.
    // If leaving this nav button to enter another, a cancel is done in viewSelectorDragEnter,
    // and a new timer is started.
    if (headerData.highlightedControl === id) {
      headerData.highlightedControl = null;
      if (changeViewTimeout)
        changeViewTimeout = clearTimeout(changeViewTimeout);
      if (pressPrevOrNextInterval)
        pressPrevOrNextInterval = clearInterval(pressPrevOrNextInterval);
    }
  }
};
