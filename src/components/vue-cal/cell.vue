<template lang="pug">
  transition-group.vuecal__cell(
    :class="cssClasses"
    :name="`slide-fade--${transitionDirection}`"
    tag="div"
    :appear="options.transitions"
    :style="cellStyles")
    .vuecal__flex.vuecal__cell-content(
      v-for="(split, i) in (splits.length ? splits : 1)"
      :key="options.transitions ? `${view}-${data.content}-${i}` : i"
      :class="splits.length && `vuecal__cell-split ${split.class}`"
      :data-split="splits.length ? split.id : false"
      column
      tabindex="0"
      :aria-label="data.content"
      @focus="onCellFocus($event)"
      @keypress.enter="onCellkeyPressEnter($event)"
      @touchstart="!isDisabled && onCellTouchStart($event, splits.length ? split.id : null)"
      @mousedown="!isDisabled && onCellMouseDown($event, splits.length ? split.id : null)"
      @click="!isDisabled && selectCell($event)"
      @dblclick="!isDisabled && onCellDblClick($event)"
      @contextmenu="!isDisabled && options.cellContextmenu && onCellContextMenu($event)")
      .vuecal__special-hours(
        v-if="isWeekOrDayView && specialHours.from !== null"
        :class="`vuecal__special-hours--day${specialHours.day} ${specialHours.class}`"
        :style="`height: ${specialHours.height}px;top: ${specialHours.top}px`")
      slot(
        name="cell-content"
        :events="events"
        :select-cell="$event => selectCell($event, true)"
        :split="splits.length ? split : false")
      .vuecal__cell-events(
        v-if="eventsCount && (isWeekOrDayView || (view === 'month' && options.eventsOnMonthView))")
        event(
          v-for="(event, j) in (splits.length ? split.events : events)" :key="j"
          :vuecal="$parent"
          :cell-formatted-date="data.formattedDate"
          :event="event"
          :all-day="allDay"
          :cell-events="splits.length ? split.events : events"
          :overlaps="((splits.length ? split.overlaps[event._eid] : cellOverlaps[event._eid]) || []).overlaps"
          :event-position="((splits.length ? split.overlaps[event._eid] : cellOverlaps[event._eid]) || []).position"
          :overlaps-streak="splits.length ? split.overlapsStreak : cellOverlapsStreak"
          :eventMaxWidth="eventMaxWidth")
          template(v-slot:event-renderer="{ event, view }")
            slot(name="event-renderer" :view="view" :event="event")
    .vuecal__now-line(
      v-if="timelineVisible"
      :style="`top: ${todaysTimePosition}px`"
      :key="options.transitions ? `${view}-now-line` : 'now-line'"
      :title="$parent.formatTime(nowInMinutes)")
</template>

<script>
import { selectCell, keyPressEnterCell } from './cell-utils'
import { updateEventPosition, checkCellOverlappingEvents, eventInRange } from './event-utils'
import Event from './event'

export default {
  components: { Event },
  props: {
    // Vue-cal main component options (props).
    options: { type: Object, default: () => ({}) },
    data: { type: Object, required: true },
    cellSplits: { type: Array, default: () => [] },
    minTimestamp: { type: [Number, null], default: null },
    maxTimestamp: { type: [Number, null], default: null },
    cellWidth: { type: [Number, Boolean], default: false },
    allDay: { type: Boolean, default: false },
    eventMaxWidth: { type: Number, default: 100 }
  },

  data: () => ({
    cellOverlaps: {},
    cellOverlapsStreak: 1, // Largest amount of simultaneous events in cell.
    // On mouse down, save the time at cursor so it can be reused on cell focus event
    // where there is no cursor coords.
    timeAtCursor: null
  }),

  methods: {
    getSplitAtCursor (DOMEvent) {
      const split = (DOMEvent.target.classList.contains('vuecal__cell-split') && DOMEvent.target) ||
          this.$parent.findAncestor(DOMEvent.target, 'vuecal__cell-split')
      return (split && split.attributes['data-split'].value) || null
    },
    checkCellOverlappingEvents () {
      // If splits, checkCellOverlappingEvents() is called from within computed splits.
      if (this.options.time && this.eventsCount && !this.splits.length) {
        if (this.eventsCount === 1) {
          this.cellOverlaps = []
          this.cellOverlapsStreak = 1
        }
        // If only 1 event remains re-init the overlaps.
        else [this.cellOverlaps, this.cellOverlapsStreak] = checkCellOverlappingEvents(this.events, this.options)
      }
    },

    isDOMElementAnEvent (el) {
      return this.$parent.isDOMElementAnEvent(el)
    },

    selectCell (DOMEvent, force = false) {
      if (!this.isSelected) this.onCellFocus(DOMEvent)

      // If splitting days, also return the clicked split on cell click when emitting event.
      const split = this.splits.length ? this.getSplitAtCursor(DOMEvent) : null

      selectCell(force, this.$parent, this.timeAtCursor, split)
      this.timeAtCursor = null
    },

    onCellkeyPressEnter (DOMEvent) {
      if (!this.isSelected) this.onCellFocus(DOMEvent)

      // If splitting days, also return the clicked split on cell keypress when emitting event.
      const split = this.splits.length ? this.getSplitAtCursor(DOMEvent) : null

      keyPressEnterCell(this.$parent, this.timeAtCursor, split)
      this.timeAtCursor = null
    },

    /**
     * On cell focus, from tab key or from click, emit the cell-focus event with
     * the date of the cell start when focusing from tab or the date & time at cursor
     * if click/touch.
     */
    onCellFocus (DOMEvent) {
      if (!this.isSelected) {
        this.isSelected = this.data.startDate

        // If splitting days, also return the clicked split on cell focus when emitting event.
        const split = this.splits.length ? this.getSplitAtCursor(DOMEvent) : null

        // Cell-focus event returns the cell start date (at midnight) if triggered from tab key,
        // or cursor coords time if clicked.
        const date = this.timeAtCursor || this.data.startDate
        this.$parent.$emit('cell-focus', split ? { date, split } : date)
      }
    },

    onCellMouseDown (DOMEvent, split = null, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false

      const { clickHoldACell, focusAnEvent } = this.domEvents
      // Reinit the click trigger on each mousedown.
      // In some cases we explicitly set this flag to prevent the click event to trigger,
      // and cancel event creation.
      this.domEvents.cancelClickEventCreation = false

      this.timeAtCursor = new Date(this.data.startDate)
      this.timeAtCursor.setMinutes(this.$parent.minutesAtCursor(DOMEvent).minutes)

      // Unfocus an event if any is focused and clicking on cell outside of an event.
      if (!this.isDOMElementAnEvent(DOMEvent.target) && focusAnEvent._eid) {
        (this.$parent.view.events.find(e => e._eid === focusAnEvent._eid) || {}).focused = false
      }

      // If the cellClickHold option is true and not mousedown on an event, click & hold to create an event.
      if (this.options.editableEvents && this.options.cellClickHold &&
        ['month', 'week', 'day'].includes(this.view)) {
        clickHoldACell.cellId = `${this.$parent._uid}_${this.data.formattedDate}`
        clickHoldACell.split = split
        clickHoldACell.timeoutId = setTimeout(() => {
          if (clickHoldACell.cellId && !this.domEvents.cancelClickEventCreation) {
            this.$parent.createEvent(this.timeAtCursor, clickHoldACell.split ? { split: clickHoldACell.split } : {})
          }
        }, clickHoldACell.timeout)
      }
    },

    onCellTouchStart (DOMEvent, split = null) {
      // If not mousedown on an event.
      this.onCellMouseDown(DOMEvent, split, true)
    },

    onCellDblClick (DOMEvent) {
      const date = new Date(this.data.startDate)
      date.setMinutes(this.$parent.minutesAtCursor(DOMEvent).minutes)

      // If splitting days, also return the clicked split on cell dblclick when emitting event.
      const split = this.splits.length ? this.getSplitAtCursor(DOMEvent) : null

      this.$parent.$emit('cell-dblclick', split ? { date, split } : date)

      if (this.options.dblclickToNavigate) this.$parent.switchToNarrowerView()
    },

    onCellContextMenu (DOMEvent) {
      DOMEvent.stopPropagation()
      DOMEvent.preventDefault()

      const date = new Date(this.data.startDate)
      const { cursorCoords, minutes } = this.$parent.minutesAtCursor(DOMEvent)
      date.setMinutes(minutes)

      // If splitting days, also return the clicked split on cell contextmenu when emitting event.
      const split = this.splits.length ? this.getSplitAtCursor(DOMEvent) : null

      this.$parent.$emit('cell-contextmenu', { date, ...cursorCoords, ...(split || {}) })
    }
  },

  computed: {
    nowInMinutes () {
      return this.$parent.now.getHours() * 60 + this.$parent.now.getMinutes()
    },
    isBeforeMinDate () {
      return this.minTimestamp !== null && this.minTimestamp > this.data.endDate.getTime()
    },
    isAfterMaxDate () {
      return this.maxTimestamp && this.maxTimestamp < this.data.startDate.getTime()
    },
    // Is the current cell disabled or not.
    isDisabled () {
      return this.isBeforeMinDate || this.isAfterMaxDate
    },
    // Is the current cell selected or not.
    isSelected: {
      get () {
        let selected = false
        const { selectedDate } = this.$parent.view

        if (this.view === 'years') {
          selected = selectedDate.getFullYear() === this.data.startDate.getFullYear()
        }
        else if (this.view === 'year') {
          selected = (selectedDate.getFullYear() === this.data.startDate.getFullYear() &&
            selectedDate.getMonth() === this.data.startDate.getMonth())
        }
        else selected = selectedDate.getTime() === this.data.startDate.getTime()

        return selected
      },
      set (date) {
        this.$parent.view.selectedDate = date
      }
    },
    domEvents: {
      get () {
        return this.$parent.domEvents
      },
      set (object) {
        this.$parent.domEvents = object
      }
    },
    texts () {
      return this.$parent.texts
    },
    view () {
      return this.$parent.view.id
    },
    // Cache result for performance.
    isWeekOrDayView () {
      return ['week', 'day'].includes(this.view)
    },
    transitionDirection () {
      return this.$parent.transitionDirection
    },
    specialHours () {
      let { from, to } = this.data.specialHours
      from = Math.max(from, this.options.timeFrom)
      to = Math.min(to, this.options.timeTo)
      return {
        ...this.data.specialHours,
        height: (to - from) * this.timeScale,
        top: (from - this.options.timeFrom) * this.timeScale
      }
    },
    events () {
      const { startDate: cellStart, endDate: cellEnd } = this.data
      let events = []

      // Calculate events on month/week/day views or years/year if eventsCountOnYearView.
      if (!(['years', 'year'].includes(this.view) && !this.options.eventsCountOnYearView)) {
        // Means that when $parent.view.events changes all the cells will be looking up new value. :/
        // Also clone array to prevent modifying original.
        events = this.$parent.view.events.slice(0)

        if (this.view === 'month') {
          events.push(...this.$parent.view.outOfScopeEvents)
        }

        // Only keep events in cell time range.
        events = events.filter(e => eventInRange(e, cellStart, cellEnd))

        if (this.options.showAllDayEvents && this.view !== 'month') events = events.filter(e => !!e.allDay === this.allDay)

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
          events.forEach(event => {
            // all-day events are positionned via css: top-0 & bottom-0.
            // So they behave as background events if not in allDay slot.
            // @todo: Do we want this or not?
            const eventToUpdate = (event.segments && event.segments[this.data.formattedDate]) || event

            if ((event.startTimeMinutes || event.endTimeMinutes) && !event.allDay) updateEventPosition(eventToUpdate, this.$parent)
          })

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
        const [overlaps, streak] = checkCellOverlappingEvents(events.filter(e => !e.background && !e.allDay), this.options)
        return {
          ...item,
          overlaps,
          overlapsStreak: streak,
          events
        }
      })
    },
    cssClasses () {
      return {
        'vuecal__cell--has-splits': this.splits.length,
        'vuecal__cell--has-events': this.eventsCount,
        current: this.data.current,
        today: this.data.today,
        'out-of-scope': this.data.outOfScope,
        disabled: this.isDisabled,
        'before-min': this.isDisabled && this.isBeforeMinDate,
        'after-max': this.isDisabled && this.isAfterMaxDate,
        selected: this.isSelected
      }
    },
    cellStyles () {
      return {
        // cellWidth is only applied when hiding weekdays on month and week views.
        ...(this.cellWidth ? { width: `${this.cellWidth}%` } : {})
      }
    },
    timelineVisible () {
      if (!this.data.today || !this.options.time || this.allDay || !this.isWeekOrDayView) return

      return (this.$parent.now.getHours() * 60 + this.$parent.now.getMinutes()) <= this.options.timeTo
    },
    todaysTimePosition () {
      // Skip the Maths if not relevant.
      if (!this.data.today || !this.options.time) return

      const startTimeMinutes = this.$parent.now.getHours() * 60 + this.$parent.now.getMinutes()
      const minutesFromTop = startTimeMinutes - this.options.timeFrom
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

  .vuecal--click-to-navigate & {cursor: pointer;}
  .vuecal--view-with-time &,
  .vuecal--week-view.vuecal--no-time &,
  .vuecal--day-view.vuecal--no-time & {display: block;}

  &.vuecal__cell--has-splits {
    flex-direction: row;
    display: flex;
  }

  .vuecal__special-hours {
    position: absolute;
    left: 0;
    right: 0;
  }

  &-content {
    position: relative;
    height: 100%;
    outline: none;
  }

  &-split {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  &:before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: -1px;
    bottom: -1px;
    border: 1px solid #ddd;
  }
  .vuecal--overflow-x.vuecal--day-view &:before {bottom: 0;}

  &.today,
  &.current {
    background-color: rgba(240, 240, 255, 0.4);
    z-index: 1;
  }

  &.selected {
    background-color: rgba(235, 255, 245, 0.4);
    z-index: 2;

    // .vuecal--day-view &:before {background: none;border: 1px solid rgba(235, 255, 245, 0.4);}
    .vuecal--day-view & {background: none;}
  }

  &.out-of-scope {color: #ccc;}
  &.disabled {color: #ccc;cursor: not-allowed;}

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

  &-content {
    width: 100%;

    .vuecal--years-view &,
    .vuecal--year-view &,
    .vuecal--month-view & {justify-content: center;}
  }

  &-events {width: 100%;}
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
