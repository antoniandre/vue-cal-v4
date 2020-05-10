<template lang="pug">
.vuecal__event(
  :class="eventClasses"
  :style="eventStyles"
  tabindex="0" 
  @focus="focusEvent"
  @keypress.enter.stop="onClick"
  @mouseenter="onMouseEnter"
  @mouseleave="onMouseLeave"
  @touchstart.stop="onTouchStart"
  @mousedown="onMouseDown($event) /* Don't stop mousedown propagation & trigger cell mousedown */"
  @click="onClick"
  @dblclick="onDblClick"
  :draggable="draggable"
  @dragstart="draggable && onDragStart($event)"
  @dragend="draggable && onDragEnd()")
  .vuecal__event-delete(
    v-if="vuecal.editEvents.delete && event.deletable"
    @click.stop="deleteEvent"
    @touchstart.stop="touchDeleteEvent") {{ vuecal.texts.deleteEvent }}
  slot(name="event" :event="event" :view="view.id")
  //- Force contenteditable="false" for new events without content.
  .vuecal__event-resize-handle(
    v-if="resizable"
    contenteditable="false"
    @mousedown.stop.prevent="onResizeHandleMouseDown"
    @touchstart.stop.prevent="onResizeHandleMouseDown")
</template>

<script>
export default {
  inject: ["vuecal", "utils", "modules", "view", "domEvents"],
  props: {
    cellFormattedDate: { type: String, default: "" },
    event: { type: Object, default: () => ({}) },
    cellEvents: { type: Array, default: () => [] },
    overlaps: { type: Array, default: () => [] },
    // If multiple simultaneous events, the events are placed from left to right from the
    // one starting first to the last. (See utils/event.js > checkCellOverlappingEvents)
    eventPosition: { type: Number, default: 0 },
    overlapsStreak: { type: Number, default: 0 },
    allDay: { type: Boolean, default: false } // Is the event displayed in the all-day bar.
  },

  methods: {
    // On an event.
    onMouseDown(e, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ("ontouchstart" in window && !touch) return false;
      const {
        clickHoldAnEvent,
        focusAnEvent,
        resizeAnEvent,
        dragAnEvent
      } = this.domEvents;

      // If the delete button is already out and event is on focus then delete event.
      if (
        focusAnEvent._eid === this.event._eid &&
        clickHoldAnEvent._eid === this.event._eid
      ) {
        return true;
      }

      // Focus the clicked event.
      this.focusEvent();

      clickHoldAnEvent._eid = null; // Reinit click hold on each click.

      // Show event delete button.
      if (this.vuecal.editEvents.delete && this.event.deletable) {
        clickHoldAnEvent.timeoutId = setTimeout(() => {
          if (!resizeAnEvent._eid && !dragAnEvent._eid) {
            clickHoldAnEvent._eid = this.event._eid;
            this.event.deleting = true;
          }
        }, clickHoldAnEvent.timeout);
      }
    },

    onMouseEnter(e) {
      e.preventDefault();
      this.vuecal.emitWithEvent("event-mouse-enter", this.event);
    },

    onMouseLeave(e) {
      e.preventDefault();
      this.vuecal.emitWithEvent("event-mouse-leave", this.event);
    },

    onTouchStart(e) {
      // Prevent the text selection prompt on touch device if editable events - unless on title.
      // So the delete button will show up nicely without the text prompt.
      if (
        this.vuecal.editEvents.drag &&
        !e.target.className.includes("vuecal__event-title")
      ) {
        e.returnValue = false;
      }
      this.onMouseDown(e, true);
    },

    onClick(e) {
      if (typeof this.vuecal.onEventClick === "function")
        return this.vuecal.onEventClick(this.event, e);
    },

    onDblClick(e) {
      if (typeof this.vuecal.onEventDblclick === "function")
        return this.vuecal.onEventDblclick(this.event, e);
    },

    onDragStart(e) {
      this.dnd && this.dnd.eventDragStart(e, this.event);
    },

    onDragEnd() {
      this.dnd && this.dnd.eventDragEnd(this.event);
    },

    onResizeHandleMouseDown() {
      this.domEvents.dragAnEvent._eid = null;
      this.domEvents.resizeAnEvent = Object.assign(
        this.domEvents.resizeAnEvent,
        {
          _eid: this.event._eid,
          start: (this.segment || this.event).start,
          split: this.event.split || null,
          segment:
            !!this.segment &&
            this.utils.date.formatDateLite(this.segment.start),
          originalEnd: new Date((this.segment || this.event).end),
          originalEndTimeMinutes: this.event.endTimeMinutes
        }
      );

      this.event.resizing = true;
    },

    deleteEvent(touch = false) {
      // Prevent a double mouse down on touch devices.
      if ("ontouchstart" in window && !touch) return false;

      this.utils.event.deleteAnEvent(this.event);
    },

    touchDeleteEvent(event) {
      this.deleteEvent(true);
    },

    cancelDeleteEvent() {
      this.event.deleting = false;
    },

    focusEvent() {
      const { focusAnEvent } = this.domEvents;
      const onFocus = focusAnEvent._eid;

      if (onFocus === this.event._eid) return;

      this.vuecal.emitWithEvent("event-focus", this.event);

      // Unfocus previous event if any.
      if (onFocus && onFocus !== this.event._eid) {
        const event = this.view.events.find(e => e._eid === focusAnEvent._eid);
        if (event) event.focused = false;
      }

      // Cancel delete on previous event if any.
      this.vuecal.cancelDelete();

      focusAnEvent._eid = this.event._eid;
      this.event.focused = true;
    }
  },

  computed: {
    eventDimensions() {
      const { startTimeMinutes, endTimeMinutes } = this.segment || this.event;

      // Top of event.
      let minutesFromTop = startTimeMinutes - this.vuecal.timeFrom;
      const top = Math.max(
        Math.round(
          (minutesFromTop * this.vuecal.timeCellHeight) / this.vuecal.timeStep
        ),
        0
      );

      // Bottom of event.
      minutesFromTop =
        Math.min(endTimeMinutes, this.vuecal.timeTo) - this.vuecal.timeFrom;
      const bottom = Math.round(
        (minutesFromTop * this.vuecal.timeCellHeight) / this.vuecal.timeStep
      );

      const height = Math.max(bottom - top, 5); // Min height is 5px.

      return { top, height };
    },

    eventStyles() {
      if (
        this.event.allDay ||
        !this.vuecal.time ||
        !this.event.endTimeMinutes ||
        this.view.id === "month" ||
        this.allDay
      )
        return {};
      let width = 100 / Math.min(this.overlaps.length + 1, this.overlapsStreak);
      let left = (100 / (this.overlaps.length + 1)) * this.eventPosition;

      if (this.vuecal.minEventWidth && width < this.vuecal.minEventWidth) {
        width = this.vuecal.minEventWidth;
        left =
          ((100 - this.vuecal.minEventWidth) / this.overlaps.length) *
          this.eventPosition;
      }

      const { top, height } = this.eventDimensions;

      return {
        top: `${top}px`,
        height: `${height}px`,
        width: `${width}%`,
        left: (this.event.left && `${this.event.left}px`) || `${left}%`
      };
    },

    // Don't rely on global variables otherwise whenever it would change all the events would be redrawn.
    eventClasses() {
      const { isFirstDay, isLastDay } = this.segment || {};

      return {
        [this.event.class]: !!this.event.class,
        "vuecal__event--focus": this.event.focused,
        "vuecal__event--resizing": this.event.resizing,
        "vuecal__event--background": this.event.background,
        "vuecal__event--deletable": this.event.deleting,
        "vuecal__event--all-day": this.event.allDay,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging":
          !this.event.draggingStatic && this.event.dragging,
        // Only apply the static class on the event original that remains static while a copy is being dragged.
        // Sometimes when dragging fast the static class would get stuck and events stays invisible,
        // So if dragging is false disable the static class as well.
        "vuecal__event--static":
          this.event.dragging && this.event.draggingStatic,
        // Multiple days events.
        "vuecal__event--multiple-days": !!this.segment,
        "event-start": this.segment && isFirstDay && !isLastDay,
        "event-middle": this.segment && !isFirstDay && !isLastDay,
        "event-end": this.segment && isLastDay && !isFirstDay
      };
    },
    // When multiple-day events, a segment is a portion of event spanning on 1 day.
    segment() {
      return (
        (this.event.segments && this.event.segments[this.cellFormattedDate]) ||
        null
      );
    },
    draggable() {
      const { draggable, background, daysCount } = this.event;
      return (
        this.vuecal.editEvents.drag &&
        draggable &&
        !background &&
        daysCount === 1
      );
    },
    resizable() {
      const { editEvents, time } = this.vuecal;
      return (
        editEvents.resize &&
        this.event.resizable &&
        time &&
        !this.allDay &&
        (!this.segment || (this.segment && this.segment.isLastDay)) &&
        this.view.id !== "month"
      );
    },
    // Drag & drop module.
    dnd() {
      return this.modules.dnd;
    }
  }
};
</script>

<style lang="scss">
.vuecal__event {
  color: #666;
  background-color: rgba(248, 248, 248, 0.8);
  position: relative;
  box-sizing: border-box;
  left: 0;
  width: 100%;
  z-index: 1;
  transition: box-shadow 0.3s, left 0.3s, width 0.3s;
  overflow: hidden; // For sliding delete button.

  // If nothing is shown inside, still make the event visible.
  .vuecal--no-time & {
    min-height: 8px;
  }

  .vuecal:not(.vuecal--dragging-event) &:hover {
    z-index: 2;
  }

  // Reactivate user selection in events.
  .vuecal__cell & * {
    user-select: text;
  }

  .vuecal--view-with-time &:not(&--all-day) {
    position: absolute;
  }

  .vuecal--view-with-time .vuecal__bg &--all-day {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.6;
    width: auto;
    right: 0;
  }

  .vuecal--view-with-time .vuecal__all-day &--all-day {
    position: relative;
    left: 0;
  }

  &--background {
    z-index: 0;
  }
  &--focus,
  &:focus {
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
    z-index: 3;
    outline: none;
  }

  &.vuecal__event--dragging {
    opacity: 0.7;
  }
  &.vuecal__event--static {
    opacity: 0;
    transition: opacity 0.1s;
  }
}

// Firefox sets a half opacity already, so don't dim the element being dragged.
@-moz-document url-prefix() {
  .vuecal__event.vuecal__event--dragging {
    opacity: 1;
  }
}

.vuecal__event-resize-handle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1em;
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transform: translateY(110%);
  transition: 0.3s;
  cursor: ns-resize;

  .vuecal__event:hover &,
  .vuecal__event:focus &,
  .vuecal__event--focus & {
    opacity: 1;
    transform: translateY(0);
  }
  .vuecal__event--dragging & {
    display: none;
  }
}

.vuecal__event-delete {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1.4em;
  line-height: 1.4em;
  background-color: rgba(221, 51, 51, 0.85);
  color: #fff;
  z-index: 0;
  cursor: pointer;
  transform: translateY(-110%);
  transition: 0.3s;
  .vuecal__event & {
    user-select: none;
  }

  .vuecal--full-height-delete & {
    height: auto;
    bottom: 0;

    &:before {
      content: "";
      width: 1.7em;
      height: 1.8em;
      display: block;
      background-image: url('data:image/svg+xml;utf8,<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="m256 33c-124 0-224 100-224 224 0 124 100 224 224 224 124 0 224-100 224-224 0-124-100-224-224-224z m108 300c2 1 3 3 3 5 0 2-1 4-3 6l-21 21c-2 2-4 3-6 3-2 0-4-1-5-3l-76-75-75 76c-2 1-4 2-6 2-2 0-4-1-6-2l-21-22c-2-2-2-4-2-6 0-2 0-4 2-5l76-76-76-75c-3-3-3-9 0-12l21-21c2-2 4-3 6-3 2 0 4 1 5 3l76 74 76-74c1-2 3-3 5-3 3 0 5 1 6 3l22 21c3 3 3 9 0 12l-76 75z" transform="scale(0.046875 0.046875)" fill="%23fff" opacity="0.9"/></svg>');
    }
  }
  .vuecal__event--deletable & {
    transform: translateY(0);
    z-index: 1;
  }
  .vuecal__event--deletable.vuecal__event--dragging & {
    opacity: 0;
    transition: none;
  }
}

.vuecal--month-view .vuecal__event-title {
  font-size: 0.85em;
}

.vuecal--short-events .vuecal__event-title {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 3px;
}

.vuecal__event-title,
.vuecal__event-content {
  hyphens: auto;
}

.vuecal__event-title--edit {
  border-bottom: 1px solid transparent;
  text-align: center;
  transition: 0.3s;
  color: inherit;
  background-image: url('data:image/svg+xml;utf8,<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="m163 440l-91-91 251-250 90 90z m309-352l-48-48c-12-11-32-11-45 2l-45 45 91 91 45-45c13-13 13-33 2-45z m-408 275l-32 117 117-32z" fill="%23000" opacity="0.4"/></svg>');
  background-repeat: no-repeat;
  background-position: 120% 0.15em;
  background-size: 0.4em;
  outline: none;
  width: 100%;

  &:hover,
  &:focus {
    border-color: rgba(0, 0, 0, 0.4);
    background-position: 99% 0.15em;
    background-size: 1.2em;
  }
}
</style>
