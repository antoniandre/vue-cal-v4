<template lang="pug">
transition-group.vuecal__cell(
  :class="cellClasses"
  :name="`slide-fade--${transitionDirection}`"
  tag="div"
  :appear="options.transitions"
  :style="cellStyles")
  .vuecal__flex.vuecal__cell-content(
    v-for="(split, i) in (splitsCount ? splits : 1)"
    :key="options.transitions ? `${view.id}-${data.content}-${i}` : i"
    :class="splitsCount && splitClasses(split)"
    :data-split="splitsCount ? split.id : false"
    column
    tabindex="0"
    :aria-label="data.content"
    @focus="onCellFocus($event)"
    @keypress.enter="onCellkeyPressEnter($event)"
    @touchstart="!isDisabled && onCellTouchStart($event, splitsCount ? split.id : null)"
    @mousedown="!isDisabled && onCellMouseDown($event, splitsCount ? split.id : null)"
    @click="!isDisabled && onCellClick($event)"
    @dblclick="!isDisabled && onCellDblClick($event)"
    @contextmenu="!isDisabled && options.cellContextmenu && onCellContextMenu($event)"
    @dragenter="!isDisabled && editEvents.drag && dnd && dnd.cellDragEnter($event, $data, data.startDate)"
    @dragover="!isDisabled && editEvents.drag && dnd && dnd.cellDragOver($event, $data, data.startDate, splitsCount ? split.id : null)"
    @dragleave="!isDisabled && editEvents.drag && dnd && dnd.cellDragLeave($event, $data, data.startDate)"
    @drop="!isDisabled && editEvents.drag && dnd && dnd.cellDragDrop($event, $data, data.startDate, splitsCount ? split.id : null)")

    .cell-time-labels(v-if="options.showTimeInCells && options.time && isWeekOrDayView && !allDay")
      span.cell-time-label(v-for="(cell, i) in vuecal.timeCells" :key="i").
        {{ cell.label }}

    template(v-if="isWeekOrDayView && !allDay && specialHours.length")
      .vuecal__special-hours(
        v-for="(block, i) in specialHours"
        :class="`vuecal__special-hours--day${block.day} ${block.class}`"
        :style="`height: ${block.height}px;top: ${block.top}px`")
        .special-hours-label(v-if="block.label" v-html="block.label")
    slot(
      name="cell-content"
      :events="events"
      :select-cell="$event => selectCell($event, true)"
      :split="splitsCount ? split : false")
    .vuecal__cell-events(
      v-if="eventsCount && (isWeekOrDayView || (view.id === 'month' && options.eventsOnMonthView))")
      event(
        v-for="(event, j) in (splitsCount ? split.events : events)" :key="j"
        :cell-formatted-date="data.formattedDate"
        :event="event"
        :all-day="allDay"
        :cell-events="splitsCount ? split.events : events"
        :overlaps="((splitsCount ? split.overlaps[event._eid] : cellOverlaps[event._eid]) || []).overlaps"
        :event-position="((splitsCount ? split.overlaps[event._eid] : cellOverlaps[event._eid]) || []).position"
        :overlaps-streak="splitsCount ? split.overlapsStreak : cellOverlapsStreak")
        template(#event="{ event, view }")
          slot(name="event" :view="view" :event="event")
  .vuecal__now-line(
    v-if="timelineVisible"
    :style="`top: ${todaysTimePosition}px`"
    :key="options.transitions ? `${view.id}-now-line` : 'now-line'"
    :title="utils.date.formatTime(vuecal.now)")
</template>

<script>
import Event from './event.vue'

export default {
  inject: ['vuecal', 'utils', 'modules', 'view', 'domEvents'],
  components: { Event },
  props: {
    // Vue-cal main component options (props).
    options: { type: Object, default: () => ({}) },
    editEvents: { type: Object, required: true },
    data: { type: Object, required: true },
    cellSplits: { type: Array, default: () => [] },
    minTimestamp: { type: [Number, null], default: null },
    maxTimestamp: { type: [Number, null], default: null },
    cellWidth: { type: [Number, Boolean], default: false },
    allDay: { type: Boolean, default: false }
  },

  data: () => ({
    cellOverlaps: {},
    cellOverlapsStreak: 1, // Largest amount of simultaneous events in cell.
    // On mouse down, save the time at cursor so it can be reused on cell focus event
    // where there is no cursor coords.
    timeAtCursor: null,
    highlighted: false, // On event drag over.
    highlightedSplit: null
  }),

  methods: {
    getSplitAtCursor ({ target }) {
      const targetIsSplit = target.classList.contains('vuecal__cell-split')
      let split = targetIsSplit ? target : this.vuecal.findAncestor(target, 'vuecal__cell-split')

      if (split) {
        split = split.attributes['data-split'].value
        // Convert to a numeric value if split id is a number.
        if (parseInt(split).toString() === split.toString()) split = parseInt(split)
      }
      return split || null
    },

    splitClasses (split) {
      return {
        'vuecal__cell-split': true,
        'vuecal__cell-split--highlighted': this.highlightedSplit === split.id,
        [split.class]: !!split.class
      }
    },

    checkCellOverlappingEvents () {
      // If splits, checkCellOverlappingEvents() is called from within computed splits.
      if (this.options.time && this.eventsCount && !this.splitsCount) {
        if (this.eventsCount === 1) {
          this.cellOverlaps = []
          this.cellOverlapsStreak = 1
        }
        // If only 1 event remains re-init the overlaps.
        else [this.cellOverlaps, this.cellOverlapsStreak] = this.utils.event.checkCellOverlappingEvents(this.events, this.options)
      }
    },

    isDOMElementAnEvent (el) {
      return this.vuecal.isDOMElementAnEvent(el)
    },

    /**
     * Select a cell and go to narrower view on double click or single click according to vuecalProps option.
     */
    selectCell (DOMEvent, force = false) {
      // If splitting days, also return the clicked split on cell click when emitting event.
      const split = this.splitsCount ? this.getSplitAtCursor(DOMEvent) : null

      this.utils.cell.selectCell(force, this.timeAtCursor, split)
      this.timeAtCursor = null
    },

    onCellkeyPressEnter (DOMEvent) {
      if (!this.isSelected) this.onCellFocus(DOMEvent)

      // If splitting days, also return the clicked split on cell keypress when emitting event.
      const split = this.splitsCount ? this.getSplitAtCursor(DOMEvent) : null

      this.utils.cell.keyPressEnterCell(this.timeAtCursor, split)
      this.timeAtCursor = null
    },

    /**
     * On cell focus, from tab key or from mousedown, highlight the cell and emit
     * the cell-focus event with the date of the cell start when focusing from tab or
     * the date & time at cursor if click/touch.
     */
    onCellFocus (DOMEvent) {
      if (!this.isSelected && !this.isDisabled) {
        this.isSelected = this.data.startDate // Highlight the cell.

        // If splitting days, also return the clicked split on cell focus when emitting event.
        const split = this.splitsCount ? this.getSplitAtCursor(DOMEvent) : null

        // Cell-focus event returns the cell start date (at midnight) if triggered from tab key,
        // or cursor coords time if clicked.
        const date = this.timeAtCursor || this.data.startDate
        this.vuecal.$emit('cell-focus', split ? { date, split } : date)
      }
    },

    onCellMouseDown (DOMEvent, split = null, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false

      if (!this.isSelected) this.onCellFocus(DOMEvent)

      const { clickHoldACell, focusAnEvent } = this.domEvents
      // Reinit the click trigger on each mousedown.
      // In some cases we explicitly set this flag to prevent the click event to trigger,
      // and cancel event creation.
      this.domEvents.cancelClickEventCreation = false
      // Also reinit this var on each mousedown.
      clickHoldACell.eventCreated = false

      this.timeAtCursor = new Date(this.data.startDate)
      let { minutes, cursorCoords: { y } } = this.vuecal.minutesAtCursor(DOMEvent)
      minutes -= this.timeAtCursor.getHours() * 60;
      this.timeAtCursor.setMinutes(minutes)

      const mouseDownOnEvent = this.isDOMElementAnEvent(DOMEvent.target)
      // Unfocus an event if any is focused and clicking on cell outside of an event.
      if (!mouseDownOnEvent && focusAnEvent._eid) {
        (this.view.events.find(e => e._eid === focusAnEvent._eid) || {}).focused = false
      }

      // Only if event creation is allowed and mousedown is on a cell (not on event).
      if (this.editEvents.create && !mouseDownOnEvent) this.setUpEventCreation(DOMEvent, y)
    },

    setUpEventCreation (DOMEvent, startCursorY) {
      // If dragToCreateEvent is true, start the event creation from dragging
      // only on week and day views (doesn't make sense on month view).
      if (this.options.dragToCreateEvent && ['week', 'day'].includes(this.view.id)) {
        const { dragCreateAnEvent } = this.domEvents
        dragCreateAnEvent.startCursorY = startCursorY

        // If splitting days, store the clicked split to create an event in it from the global
        // mousemove handler in index.vue.
        dragCreateAnEvent.split = this.splitsCount ? this.getSplitAtCursor(DOMEvent) : null

        // Save the time at cursor on initial mousedown.
        dragCreateAnEvent.start = this.timeAtCursor

        // If snapToTime, set the start to the closest intervaled number.
        if (this.options.snapToTime) {
          let timeMinutes = this.timeAtCursor.getHours() * 60 + this.timeAtCursor.getMinutes()
          const plusHalfSnapTime = timeMinutes + this.options.snapToTime / 2
          timeMinutes = plusHalfSnapTime - (plusHalfSnapTime % this.options.snapToTime)

          dragCreateAnEvent.start.setHours(0, timeMinutes, 0, 0)
        }
      }

      // If the cellClickHold option is true and not mousedown on an event, click & hold to create an event.
      else if (this.options.cellClickHold && ['month', 'week', 'day'].includes(this.view.id)) {
        this.setUpCellHoldTimer(DOMEvent)
      }
    },

    // When click & holding a cell, and if allowed, set a timeout to create an event (can be cancelled).
    setUpCellHoldTimer (DOMEvent) {
      const { clickHoldACell } = this.domEvents
      clickHoldACell.cellId = `${this.vuecal._.uid}_${this.data.formattedDate}`
      // If splitting days, store the clicked split to create an event in it from the global
      // mousemove handler in index.vue.
      clickHoldACell.split = this.splitsCount ? this.getSplitAtCursor(DOMEvent) : null

      clickHoldACell.timeoutId = setTimeout(() => {
        if (clickHoldACell.cellId && !this.domEvents.cancelClickEventCreation) {
          const { _eid } = this.utils.event.createAnEvent(
            this.timeAtCursor,
            null,
            clickHoldACell.split ? { split: clickHoldACell.split } : {}
          )

          clickHoldACell.eventCreated = _eid
        }
      }, clickHoldACell.timeout)
    },

    onCellTouchStart (DOMEvent, split = null) {
      // If not mousedown on an event.
      this.onCellMouseDown(DOMEvent, split, true)
    },

    onCellClick (DOMEvent) {
      if (!this.isDOMElementAnEvent(DOMEvent.target)) this.selectCell(DOMEvent)
    },

    onCellDblClick (DOMEvent) {
      const date = new Date(this.data.startDate)
      date.setMinutes(this.vuecal.minutesAtCursor(DOMEvent).minutes)

      // If splitting days, also return the clicked split on cell dblclick when emitting event.
      const split = this.splitsCount ? this.getSplitAtCursor(DOMEvent) : null

      this.vuecal.$emit('cell-dblclick', split ? { date, split } : date)

      if (this.options.dblclickToNavigate) this.vuecal.switchToNarrowerView()
    },

    onCellContextMenu (DOMEvent) {
      DOMEvent.stopPropagation()
      DOMEvent.preventDefault()

      const date = new Date(this.data.startDate)
      const { cursorCoords, minutes } = this.vuecal.minutesAtCursor(DOMEvent)
      date.setMinutes(minutes)

      // If splitting days, also return the clicked split on cell contextmenu when emitting event.
      const split = this.splitsCount ? this.getSplitAtCursor(DOMEvent) : null

      this.vuecal.$emit('cell-contextmenu', { date, ...cursorCoords, ...(split || {}), e: DOMEvent })
    }
  },

  computed: {
    // Drag & drop module.
    dnd () {
      return this.modules.dnd
    },
    nowInMinutes () {
      return this.utils.date.dateToMinutes(this.vuecal.now)
    },
    isBeforeMinDate () {
      return this.minTimestamp !== null && this.minTimestamp > this.data.endDate.getTime()
    },
    isAfterMaxDate () {
      return this.maxTimestamp && this.maxTimestamp < this.data.startDate.getTime()
    },
    // Is the current cell disabled or not.
    isDisabled () {
      const { disableDays } = this.options
      const { isYearsOrYearView } = this.vuecal
      if (disableDays.length && disableDays.includes(this.data.formattedDate) && !isYearsOrYearView) return true
      return this.isBeforeMinDate || this.isAfterMaxDate
    },
    // Is the current cell selected or not.
    isSelected: {
      get () {
        let selected = false
        const { selectedDate } = this.view

        if (this.view.id === 'years') {
          selected = selectedDate.getFullYear() === this.data.startDate.getFullYear()
        }
        else if (this.view.id === 'year') {
          selected = (selectedDate.getFullYear() === this.data.startDate.getFullYear() &&
            selectedDate.getMonth() === this.data.startDate.getMonth())
        }
        else selected = selectedDate.getTime() === this.data.startDate.getTime()

        return selected
      },
      set (date) {
        this.view.selectedDate = date
        this.vuecal.$emit('update:selected-date', this.view.selectedDate)
      }
    },
    // Cache result for performance.
    isWeekOrDayView () {
      return ['week', 'day'].includes(this.view.id)
    },
    transitionDirection () {
      return this.vuecal.transitionDirection
    },
    specialHours () {
      // this.data.specialHours is always an array, but may be empty.
      return this.data.specialHours.map(block => {
        let { from, to } = block
        from = Math.max(from, this.options.timeFrom)
        to = Math.min(to, this.options.timeTo)
        return {
          ...block,
          height: (to - from) * this.timeScale,
          top: (from - this.options.timeFrom) * this.timeScale
        }
      })
    },
    events () {
      const { startDate: cellStart, endDate: cellEnd } = this.data
      let events = []

      // Calculate events on month/week/day views or years/year if eventsCountOnYearView.
      if (!(['years', 'year'].includes(this.view.id) && !this.options.eventsCountOnYearView)) {
        // Means that when vuecal.view.events changes all the cells will be looking up new value. :/
        // Also clone array to prevent modifying original.
        events = this.view.events.slice(0)

        if (this.view.id === 'month') {
          events.push(...this.view.outOfScopeEvents)
        }

        // Only keep events in cell time range.
        events = events.filter(e => this.utils.event.eventInRange(e, cellStart, cellEnd))

        if (this.options.showAllDayEvents && this.view.id !== 'month') events = events.filter(e => !!e.allDay === this.allDay)

        // From events in view, filter the ones that are out of `time-from`-`time-to` range in this cell.
        if (this.options.time && this.isWeekOrDayView && !this.allDay) {
          const { timeFrom, timeTo } = this.options

          events = events.filter(e => {
            const segment = (e.daysCount > 1 && e.segments[this.data.formattedDate]) || {}
            const singleDayInRange = e.daysCount === 1 && e.startTimeMinutes < timeTo && e.endTimeMinutes > timeFrom
            const multipleDayInRange = e.daysCount > 1 && (segment.startTimeMinutes < timeTo && segment.endTimeMinutes > timeFrom)
            const recurrMultDayInRange = false // e.daysCount > 1 && e.repeat && recurringEventInRange(e, cellStart, cellEnd)
            return (e.allDay || singleDayInRange || multipleDayInRange || recurrMultDayInRange)
          })
        }

        // Position events with time in the timeline when there is a timeline and not in allDay slot.
        if (this.options.time && this.isWeekOrDayView && !(this.options.showAllDayEvents && this.allDay)) {
          // Sort events in chronological order.
          events.sort((a, b) => a.start < b.start ? -1 : 1)
        }

        // If splits, checkCellOverlappingEvents() is called from within computed splits.
        if (!this.cellSplits.length) this.$nextTick(this.checkCellOverlappingEvents)
      }

      return events
    },
    eventsCount () {
      return this.events.length
    },
    splits () {
      return this.cellSplits.map((item, i) => {
        const events = this.events.filter(e => e.split === item.id)
        const [overlaps, streak] = this.utils.event.checkCellOverlappingEvents(events.filter(e => !e.background && !e.allDay), this.options)
        return {
          ...item,
          overlaps,
          overlapsStreak: streak,
          events
        }
      })
    },
    splitsCount () {
      return this.splits.length
    },
    cellClasses () {
      return {
        [this.data.class]: !!this.data.class,
        'vuecal__cell--current': this.data.current, // E.g. Current year in years view.
        'vuecal__cell--today': this.data.today,
        'vuecal__cell--out-of-scope': this.data.outOfScope,
        'vuecal__cell--before-min': this.isDisabled && this.isBeforeMinDate,
        'vuecal__cell--after-max': this.isDisabled && this.isAfterMaxDate,
        'vuecal__cell--disabled': this.isDisabled,
        'vuecal__cell--selected': this.isSelected,
        'vuecal__cell--highlighted': this.highlighted,
        'vuecal__cell--has-splits': this.splitsCount,
        'vuecal__cell--has-events': this.eventsCount
      }
    },
    cellStyles () {
      return {
        // cellWidth is only applied when hiding weekdays on month and week views.
        ...(this.cellWidth ? { width: `${this.cellWidth}%` } : {})
      }
    },
    timelineVisible () {
      const { time, timeTo } = this.options
      return this.data.today && this.isWeekOrDayView && time && !this.allDay && this.nowInMinutes <= timeTo
    },
    todaysTimePosition () {
      // Skip the Maths if not relevant.
      if (!this.data.today || !this.options.time) return

      const minutesFromTop = this.nowInMinutes - this.options.timeFrom
      return Math.round(minutesFromTop * this.timeScale)
    },
    timeScale () {
      return this.options.timeCellHeight / this.options.timeStep
    }
  }
}
</script>

<style lang="scss">
.vuecal__cell {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: 0.15s ease-in-out background-color;

  // Cell modifiers.
  // -------------------------------------------------
  .vuecal__cells.month-view &,
  .vuecal__cells.week-view & {
    width: 14.2857%;
  }

  .vuecal--hide-weekends .vuecal__cells.month-view &,
  .vuecal--hide-weekends .vuecal__cells.week-view & {
    width: 20%;
  }

  .vuecal__cells.years-view & {width: 20%;}
  .vuecal__cells.year-view & {width: 33.33%;}
  .vuecal__cells.day-view & {flex: 1;}
  .vuecal--overflow-x.vuecal--day-view & {width: auto;}

  .vuecal--click-to-navigate &:not(&--disabled) {cursor: pointer;}
  .vuecal--view-with-time &,
  .vuecal--week-view.vuecal--no-time &:not(.vuecal__cell--has-splits),
  .vuecal--day-view.vuecal--no-time &:not(.vuecal__cell--has-splits) {display: block;}

  &.vuecal__cell--has-splits {
    flex-direction: row;
    display: flex;
  }

  &:before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: -1px;
    bottom: -1px;
    border: 1px solid rgba(196, 196, 196, 0.25);
  }
  .vuecal--overflow-x.vuecal--day-view &:before {bottom: 0;}

  &--today,
  &--current {
    background-color: rgba(240, 240, 255, 0.4);
    z-index: 1;
  }

  &--selected {
    background-color: rgba(235, 255, 245, 0.4);
    z-index: 2;

    .vuecal--day-view & {background: none;}
  }

  &--out-of-scope {color: rgba(0, 0, 0, 0.25);}
  &--disabled {color: rgba(0, 0, 0, 0.25);cursor: not-allowed;}

  // Cells/splits get highlighted when dragging an event over it.
  &--highlighted:not(.vuecal__cell--has-splits), &-split.vuecal__cell-split--highlighted {
    background-color: rgba(0, 0, 0, 0.04);
    // Drag over feedback must be fast. Then it can fade away with longer duration.
    transition-duration: 5ms;
  }
  // -------------------------------------------------

  &-content {
    position: relative;
    width: 100%;
    height: 100%;
    outline: none;

    .vuecal--years-view &,
    .vuecal--year-view &,
    .vuecal--month-view & {justify-content: center;}
  }

  .cell-time-labels {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }
  .cell-time-label {
    flex-grow: 1;
    font-size: 0.8em;
    opacity: 0.3;
    line-height: 1.7;
  }
  // .cell-time-label:hover {opacity: 0.7;}

  &-split {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    position: relative;
    transition: 0.15s ease-in-out background-color;
  }

  &-events {width: 100%;}

  &-events-count {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translateX(-50%);
    min-width: 12px;
    height: 12px;
    line-height: 12px;
    padding: 0 3px;
    background: #999;
    color: #fff;
    border-radius: 12px;
    font-size: 10px;
    box-sizing: border-box;
  }

  .vuecal__special-hours {
    position: absolute;
    left: 0;
    right: 0;
    box-sizing: border-box;
  }
}

.vuecal--overflow-x.vuecal--week-view .vuecal__cell, .vuecal__cell-split {
  overflow: hidden;
}

.vuecal__no-event {
  padding-top: 1em;
  color: #aaa;
  justify-self: flex-start;
  margin-bottom: auto; // Vertical align top within flex column and align center.
}

.vuecal__all-day .vuecal__no-event {display: none;}

.vuecal__now-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 0;
  color: red;
  border-top: 1px solid currentColor;
  opacity: 0.6;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: 0;
    border: 5px solid transparent;
    border-left-color: currentColor;
  }
}
</style>
