<template lang="pug">
.vuecal__flex.vuecal(column :class="cssClasses" ref="vuecal" :lang="locale")
  vuecal-header(
    :options="$props"
    :view-props="{ views, view, weekDaysInHeader }"
    :week-days="weekDays"
    :day-splits="daySplits"
    :switch-to-narrower-view="switchToNarrowerView")
    template(v-slot:arrow-prev)
      slot(name="arrow-prev")
        i.angle
    template(v-slot:arrow-next)
      slot(name="arrow-next")
        i.angle
    template(v-slot:today-button)
      slot(name="today-button")
        span.default {{ texts.today }}
    template(v-slot:title)
      slot(name="title" :title="viewTitle" :view="view") {{ viewTitle }}
    template(v-slot:weekday-heading="{ heading, view }")
      slot(name="weekday-heading" :heading="heading" :view="view")

  .vuecal__flex.vuecal__body(v-if="!hideBody" grow)
    transition(:name="`slide-fade--${transitionDirection}`" :appear="transitions")
      .vuecal__flex(style="min-width: 100%" :key="transitions ? view.id : false" column)
        .vuecal__flex.vuecal__all-day(v-if="showAllDayEvents && hasTimeColumn")
          span(style="width: 3em")
            span {{ texts.allDay }}
          .vuecal__flex.vuecal__cells(
            :class="`${view.id}-view`"
            grow
            :wrap="(!minCellWidth && !minSplitWidth) || view.id !== 'week'"
            :column="!!minCellWidth || !!minSplitWidth")
            vuecal-cell(
              v-for="(cell, i) in viewCells"
              :key="i"
              :options="$props"
              :data="cell"
              :all-day="true"
              :min-timestamp="minTimestamp"
              :max-timestamp="maxTimestamp"
              :cell-splits="hasSplits && daySplits || []"
              :eventMaxWidth="eventMaxWidth")
              template(v-slot:event-renderer="{ event, view }")
                slot(name="event-renderer" :view="view" :event="event")
                  .vuecal__event-title.vuecal__event-title--edit(
                    v-if="editableEvents && event.title"
                    contenteditable
                    @blur="onEventTitleBlur($event, event)"
                    v-html="event.title")
                  .vuecal__event-title(v-else-if="event.title" v-html="event.title")
                  .vuecal__event-content(
                    v-if="event.content && showAllDayEvents !== 'short' && !isShortMonthView"
                    v-html="event.content")
              slot(slot="no-event" name="no-event")
        .vuecal__bg(:class="{ vuecal__flex: !hasTimeColumn }" column)
          .vuecal__flex(row grow)
            .vuecal__time-column(v-if="hasTimeColumn")
              .vuecal__time-cell(v-for="(cell, i) in timeCells" :key="i" :style="`height: ${timeCellHeight}px`")
                slot(name="time-cell" :hours="cell.hours" :minutes="cell.minutes")
                  span.line
                  span.label {{ cell.label }}
            .vuecal__flex.vuecal__week-numbers(v-if="showWeekNumbers && view.id === 'month'" column)
              .vuecal__flex.vuecal__week-number-cell(v-for="i in 6" :key="i" grow)
                slot(name="week-number-cell" :week="getWeekNumber(i - 1)") {{ getWeekNumber(i - 1) }}
            .vuecal__flex.vuecal__cells(
              :class="`${view.id}-view`"
              grow
              :wrap="(!minCellWidth && !minSplitWidth) || view.id !== 'week'"
              :column="!!minCellWidth || !!minSplitWidth")
              //- Only for minCellWidth or minSplitWidth on week view.
              weekdays-headings(
                v-if="(minCellWidth || (hasSplits && minSplitWidth)) && view.id === 'week'"
                :vuecal="this"
                :transition-direction="transitionDirection"
                :view="view"
                :week-days="weekDays"
                :switch-to-narrower-view="switchToNarrowerView"
                :style="contentMinWidth ? `min-width: ${contentMinWidth}px` : ''")
                template(v-slot:weekday-heading="{ heading, view }")
                  slot(name="weekday-heading" :heading="heading" :view="view")
              .vuecal__flex.vuecal__split-days-headers(v-else-if="hasSplits && stickySplitLabels && minSplitWidth"
                :style="contentMinWidth ? `min-width: ${contentMinWidth}px` : ''")
                .day-split-header(v-for="(split, i) in daySplits" :key="i" :class="split.class || false") {{ split.label }}

              .vuecal__flex(
                ref="cells"
                grow
                :wrap="(!minCellWidth && !minSplitWidth) || view.id !== 'week'"
                :style="contentMinWidth ? `min-width: ${contentMinWidth}px` : ''")
                vuecal-cell(
                  v-for="(cell, i) in viewCells"
                  :key="i"
                  :options="$props"
                  :data="cell"
                  :cell-width="hideWeekdays.length && ['month', 'week'].includes(view.id) && cellWidth"
                  :min-timestamp="minTimestamp"
                  :max-timestamp="maxTimestamp"
                  :cell-splits="hasSplits && daySplits || []"
                  :eventMaxWidth="eventMaxWidth")
                  template(v-slot:cell-content="{ events, split, selectCell }")
                    slot(name="cell-content" :cell="cell" :view="view" :go-narrower="selectCell" :events="events")
                      .split-label(v-if="split && !stickySplitLabels" v-html="split.label")
                      .vuecal__cell-date(v-if="cell.content" v-html="cell.content")
                      .vuecal__cell-events-count(v-if="((view.id === 'month' && !eventsOnMonthView) || (['years', 'year'].includes(view.id) && eventsCountOnYearView)) && events.length")
                        slot(name="events-count" :view="view" :events="events") {{ events.length }}
                      .vuecal__no-event(v-if="!events.length && ['week', 'day'].includes(view.id)")
                        slot(name="no-event") {{ texts.noEvent }}
                  template(v-slot:event-renderer="{ event, view }")
                    slot(name="event-renderer" :view="view" :event="event")
                      .vuecal__event-title.vuecal__event-title--edit(
                        v-if="editableEvents && event.title"
                        contenteditable
                        @blur="onEventTitleBlur($event, event)"
                        v-html="event.title")
                      .vuecal__event-title(v-else-if="event.title" v-html="event.title")
                      .vuecal__event-time(v-if="time && !event.allDay && (event.startTimeMinutes || event.endTimeMinutes) && !(view === 'month' && (event.allDay || showAllDayEvents === 'short')) && !isShortMonthView")
                        | {{ formatTime(event.startTimeMinutes) }}
                        span(v-if="event.endTimeMinutes") &nbsp;- {{ formatTime(event.endTimeMinutes) }}
                        small.days-to-end(v-if="event.daysCount > 1 && (event.segments[cell.formattedDate] || {}).isFirstDay") &nbsp;+{{ event.daysCount - 1 }}{{ (texts.day[0] || '').toLowerCase() }}
                      .vuecal__event-content(
                        v-if="event.content && !(view === 'month' && event.allDay && showAllDayEvents === 'short') && !isShortMonthView"
                        v-html="event.content")
                  slot(v-slot:no-event) {{ texts.noEvent }}
</template>

<script>
import { updateDateTexts, getPreviousFirstDayOfWeek, formatDate, formatDateLite, formatTime, stringToDate, countDays } from './date-utils'
import { eventDefaults, createAnEvent, createEventSegments, addEventSegment, removeEventSegment, eventInRange } from './event-utils'
import Header from './header'
import WeekdaysHeadings from './weekdays-headings'
import Cell from './cell'
import './styles.scss'

const minutesInADay = 24 * 60 // Don't do the maths every time.
const textsDefaults = {
  weekDays: Array(7).fill(''),
  weekDaysShort: [],
  months: Array(12).fill(''),
  years: '',
  year: '',
  month: '',
  week: '',
  day: '',
  today: '',
  noEvent: '',
  allDay: '',
  deleteEvent: '',
  createEvent: '',
  dateFormat: 'dddd MMMM D, YYYY',
  am: 'am',
  pm: 'pm'
}

export default {
  name: 'vue-cal',
  components: { 'vuecal-cell': Cell, 'vuecal-header': Header, WeekdaysHeadings },
  props: {
    cellClickHold: { type: Boolean, default: true },
    cellContextmenu: { type: Boolean, default: false },
    clickToNavigate: { type: Boolean, default: false },
    dblclickToNavigate: { type: Boolean, default: true },
    defaultView: { type: String, default: 'week' },
    disableViews: { type: Array, default: () => [] },
    editableEvents: { type: Boolean, default: false },
    eventMaxWidth: { type: Number, default: 100 },
    events: { type: Array, default: () => [] },
    eventsCountOnYearView: { type: Boolean, default: false },
    eventsOnMonthView: { type: [Boolean, String], default: false },
    hideBody: { type: Boolean, default: false },
    hideTitleBar: { type: Boolean, default: false },
    hideViewSelector: { type: Boolean, default: false },
    hideWeekdays: { type: Array, default: () => [] },
    hideWeekends: { type: Boolean, default: false },
    locale: { type: String, default: 'en' },
    maxDate: { type: [String, Date], default: '' },
    minCellWidth: { type: Number, default: 0 },
    minDate: { type: [String, Date], default: '' },
    minEventWidth: { type: Number, default: 0 },
    minSplitWidth: { type: Number, default: 0 },
    onEventClick: { type: [Function, null], default: null },
    onEventCreate: { type: [Function, null], default: null },
    onEventDblclick: { type: [Function, null], default: null },
    overlapsPerTimeStep: { type: Boolean, default: false },
    resizeX: { type: Boolean, default: false },
    selectedDate: { type: [String, Date], default: '' },
    showAllDayEvents: { type: [Boolean, String], default: false },
    showWeekNumbers: { type: [Boolean, String], default: false },
    small: { type: Boolean, default: false },
    specialHours: { type: Object, default: () => ({}) },
    splitDays: { type: Array, default: () => [] },
    startWeekOnSunday: { type: Boolean, default: false },
    stickySplitLabels: { type: Boolean, default: false },
    time: { type: Boolean, default: true },
    timeCellHeight: { type: Number, default: 40 }, // In pixels.
    timeFormat: { type: String, default: '' },
    timeFrom: { type: Number, default: 0 }, // In minutes.
    timeStep: { type: Number, default: 60 }, // In minutes.
    timeTo: { type: Number, default: minutesInADay }, // In minutes.
    todayButton: { type: Boolean, default: false },
    transitions: { type: Boolean, default: true },
    twelveHour: { type: Boolean, default: false },
    watchRealTime: { type: Boolean, default: false }, // Expensive, so only trigger on demand.
    xsmall: { type: Boolean, default: false }
  },
  data: () => ({
    // Make texts reactive before a locale is loaded.
    texts: { ...textsDefaults },
    ready: false, // Is vue-cal ready.

    // At any time this object will be filled with current view, visible events and selected date.
    view: {
      id: '',
      title: '',
      startDate: null,
      endDate: null,
      firstCellDate: null,
      lastCellDate: null,
      selectedDate: null,
      // All the events are stored in the mutableEvents array, but subset of visible ones are passed
      // Into the current view for fast lookup and manipulation.
      events: []
    },
    eventIdIncrement: 1, // Internal unique id.
    // Preset at now date on load, but updated every minute if watchRealTime,
    // or updated at least on each cells rerender, in order to keep Today's date accurate.
    now: new Date(),
    // Useful when watchRealTime = true, 2 timeouts: 1 to snap to round minutes, then 1 every minute.
    timeTickerIds: [null, null],

    // All the possible events/cells interractions:
    // e.g. focus, click, click & hold, resize, drag & drop (coming).
    domEvents: {
      resizeAnEvent: {
        _eid: null, // Only one at a time.
        start: null,
        split: null,
        segment: null,
        originalEndTimeMinutes: 0,
        endTimeMinutes: 0,
        startCell: null,
        endCell: null
      },
      dragAnEvent: {
        _eid: null // Only one at a time.
      },
      focusAnEvent: {
        _eid: null // Only one at a time.
      },
      clickHoldAnEvent: {
        _eid: null, // Only one at a time.
        timeout: 1200, // Hold for 1.2s to delete an event.
        timeoutId: null
      },
      dblTapACell: {
        taps: 0,
        timeout: 500 // Allowed latency between first and second click.
      },
      clickHoldACell: {
        cellId: null,
        split: null,
        timeout: 1200, // Hold for 1.2s to create an event.
        timeoutId: null
      },
      // A single click can trigger event creation if the user decides so.
      // But prevent this to happen on click & hold, on event click and on resize event.
      cancelClickEventCreation: false
    },
    // The events source of truth.
    // An array of mutable events updated each time given external events array changes.
    mutableEvents: [],
    // Transition when switching view. left when going toward the past, right when going toward future.
    transitionDirection: 'right'
  }),

  methods: {
    /**
     * Only import locale on demand to keep a small library weight.
     *
     * @param {String} locale the language user whishes to have on vue-cal
     */
    loadLocale (locale) {
      if (this.locale === 'en') this.texts = Object.assign({}, textsDefaults, require('./i18n/en.json'))
      else {
        import(/* webpackInclude: /\.json$/, webpackChunkName: "i18n/[request]" */ `./i18n/${locale}`)
          .then(response => {
            this.texts = Object.assign({}, textsDefaults, response.default)
            updateDateTexts(this.texts)
          })
      }
    },

    /**
     * On click/dblclick of a cell go to a narrower view if available.
     * E.g. Click on month cell takes you to week view if not hidden, otherwise on day view if not hidden.
     */
    switchToNarrowerView () {
      this.transitionDirection = 'right'

      let views = Object.keys(this.views)
      views = views.slice(views.indexOf(this.view.id) + 1)
      const view = views.find(v => this.views[v].enabled)

      if (view) this.switchView(view)
    },

    /**
     * Switches to the specified view on view selector click, or programmatically form external call (via $refs).
     * If a date is given, it will be selected and if the view does not contain it, it will go to that date.
     *
     * @param {String} view the view to go to. Among `years`, `year`, `month`, `week`, `day`.
     * @param {String | Date} date A starting date for the view, if none, fallbacks to selected date
     *                            If also empty fallbacks to the current view start date.
     * @param {Boolean} fromViewSelector to know if the caller is the built-in view selector.
     */
    switchView (view, date = null, fromViewSelector = false) {
      if (this.transitions && fromViewSelector) {
        const views = Object.keys(this.views)
        this.transitionDirection = views.indexOf(this.view.id) > views.indexOf(view) ? 'left' : 'right'
      }

      this.view.events = []
      this.view.id = view
      this.view.firstCellDate = null // For month view, if filling cells before 1st of month.
      this.view.lastCellDate = null // For month view, if filling cells after current month.

      if (!date) {
        date = this.view.selectedDate || this.view.startDate
        if (view === 'week') date = getPreviousFirstDayOfWeek(date, this.startWeekOnSunday)
      }

      switch (view) {
        case 'years': {
          // Always fill first cell with a multiple of 25 years, E.g. year 2000, or 2025.
          this.view.startDate = new Date(Math.floor(date.getFullYear() / 25) * 25 || 2000, 0, 1)
          this.view.endDate = new Date(this.view.startDate.getFullYear() + 25, 0, 1)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.
          break
        }
        case 'year': {
          this.view.startDate = new Date(date.getFullYear(), 0, 1)
          this.view.endDate = new Date(date.getFullYear() + 1, 0, 1)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.
          break
        }
        case 'month': {
          this.view.startDate = new Date(date.getFullYear(), date.getMonth(), 1)
          this.view.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.

          // If the first day of the month is not a FirstDayOfWeek (Monday or Sunday), prepend missing days to the days array.
          let startDate = new Date(this.view.startDate)
          if (startDate.getDay() !== (this.startWeekOnSunday ? 0 : 1)) {
            startDate = getPreviousFirstDayOfWeek(startDate, this.startWeekOnSunday)
          }

          // Used in viewCells computed array & returned in emitted events.
          this.view.firstCellDate = startDate
          this.view.lastCellDate = startDate.addDays(41)
          this.view.lastCellDate.setHours(23, 59, 59, 0)

          if (this.hideWeekends) {
            // Remove first weekend from firstCellDate if hide-weekends.
            if ([0, 6].includes(this.view.firstCellDate.getDay())) {
              const daysToAdd = this.view.firstCellDate.getDay() === 6 && !this.startWeekOnSunday ? 2 : 1
              this.view.firstCellDate = this.view.firstCellDate.addDays(daysToAdd)
            }
            // Remove first weekend from startDate if hide-weekends.
            if ([0, 6].includes(this.view.startDate.getDay())) {
              const daysToAdd = this.view.startDate.getDay() === 6 ? 2 : 1
              this.view.startDate = this.view.startDate.addDays(daysToAdd)
            }
            // Remove last weekend from lastCellDate if hide-weekends.
            if ([0, 6].includes(this.view.lastCellDate.getDay())) {
              const daysToSubtract = this.view.lastCellDate.getDay() === 0 && !this.startWeekOnSunday ? 2 : 1
              this.view.lastCellDate = this.view.lastCellDate.subtractDays(daysToSubtract)
            }
            // Remove last weekend from endDate if hide-weekends.
            if ([0, 6].includes(this.view.endDate.getDay())) {
              const daysToSubtract = this.view.endDate.getDay() === 0 ? 2 : 1
              this.view.endDate = this.view.endDate.subtractDays(daysToSubtract)
            }
          }
          break
        }
        case 'week': {
          const weekDaysCount = this.hideWeekends ? 5 : 7
          this.view.startDate = this.hideWeekends && this.startWeekOnSunday ? date.addDays(1) : date
          this.view.startDate.setHours(0, 0, 0, 0)
          this.view.endDate = date.addDays(weekDaysCount)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.
          break
        }
        case 'day': {
          this.view.startDate = date
          this.view.startDate.setHours(0, 0, 0, 0)
          this.view.endDate = new Date(date)
          this.view.endDate.setHours(23, 59, 59, 0) // End at 23:59:59.
          break
        }
      }

      this.addEventsToView()

      if (this.ready) {
        const startDate = this.view.startDate
        const params = {
          view,
          startDate,
          endDate: this.view.endDate,
          ...(this.view.id === 'month' ? {
            firstCellDate: this.view.firstCellDate,
            lastCellDate: this.view.lastCellDate,
            outOfScopeEvents: this.view.outOfScopeEvents.map(this.cleanupEvent)
          } : {}),
          events: this.view.events.map(this.cleanupEvent),
          ...(this.view.id === 'week' ? { week: this.startWeekOnSunday ? startDate.addDays(1).getWeek() : startDate.getWeek() } : {})
        }
        this.$emit('view-change', params)
      }
    },

    /**
     * Shorthand function for external call (via $refs).
     */
    previous () {
      this.previousNext(false)
    },

    /**
     * Shorthand function for external call (via $refs).
     */
    next () {
      this.previousNext()
    },

    /**
     * On click on previous or next arrow, update the calendar visible date range.
     *
     * @param {Boolean} next
     */
    previousNext (next = true) {
      this.transitionDirection = next ? 'right' : 'left'
      const modifier = next ? 1 : -1
      let firstCellDate = null
      const { startDate, id: viewId } = this.view

      switch (viewId) {
        case 'years':
          firstCellDate = new Date(startDate.getFullYear() + 25 * modifier, 0, 1)
          break
        case 'year':
          firstCellDate = new Date(startDate.getFullYear() + 1 * modifier, 1, 1)
          break
        case 'month':
          firstCellDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1 * modifier, 1)
          break
        case 'week':
          firstCellDate = getPreviousFirstDayOfWeek(startDate, this.startWeekOnSunday)[next ? 'addDays' : 'subtractDays'](7)
          break
        case 'day':
          firstCellDate = startDate[next ? 'addDays' : 'subtractDays'](1)
          break
      }
      if (firstCellDate) this.switchView(viewId, firstCellDate)
    },

    /**
     * Add events (subset from mutableEvents) to the current view (in `this.view.events`).
     * This is done for performance, so that all the cells have a quick lookup of only what's needed.
     *
     * @param {Array} events
     */
    addEventsToView (events = []) {
      const { id, startDate, endDate, firstCellDate, lastCellDate } = this.view
      // Clear the current view if not explicitely giving an array of events to add.
      if (!events.length) this.view.events = []
      // @todo: remove the code that explicitely updates this.mutableEvents (e.g on event resize).
      // as we are already mutating the event from mutableEvents.
      events = events.length ? events : [...this.mutableEvents]

      // In no event or if on years/year view and eventsCountOnYearView is false
      // then don't add events to view.
      if (!events || (['years', 'year'].includes(id) && !this.eventsCountOnYearView)) return

      // First remove the events that are not in view.
      // Keep the unfiltered array of events for outOfScopeEvents bellow.
      let filteredEvents = events.filter(e => eventInRange(e, startDate, endDate))

      // For each multiple-day event and only if needed, create its segments (= days) for rendering in the view.
      // If we don't display the event on month view (eventsOnMonthView = false) then don't create segments.
      if (['month', 'week', 'day'].includes(id) && !(id === 'month' && !this.eventsOnMonthView)) {
        filteredEvents = filteredEvents.map(e => {
          return e.daysCount > 1 ? createEventSegments(e, firstCellDate || startDate, lastCellDate || endDate) : e
        })
      }

      this.view.events.push(...filteredEvents)

      if (id === 'month') {
        // Save out of scope events into the view object separated from the array of in-scope events.
        this.view.outOfScopeEvents = []
        events.forEach(e => {
          if (eventInRange(e, firstCellDate, startDate) || eventInRange(e, endDate, lastCellDate)) {
            // Only add events to the view.outOfScopeEvents array if not already in view.events
            // (multiple-day events case).
            if (!this.view.events.some(e2 => e2._eid === e._eid)) this.view.outOfScopeEvents.push(e)
          }
        })
      }
    },

    /**
     * find a DOM ancestor of a given DOM node `el` matching given class name.
     *
     * @param {Object} el a DOM node to find ancestor from.
     * @param {String} Class the CSS class name of the ancestor.
     * @return {Object} The matched DOM node or null if no match.
     */
    findAncestor (el, Class) {
      while ((el = el.parentElement) && !el.classList.contains(Class)) {}
      return el
    },

    /**
     * Tells whether a clicked DOM node is or is within a calendar event.
     *
     * @param {Object} el a DOM node to check if event.
     * @return {Boolean} true if the given DOM node is - or is in - an event.
     */
    isDOMElementAnEvent (el) {
      return el.classList.contains('vuecal__event') || this.findAncestor(el, 'vuecal__event')
    },

    /**
     * Capture mousemove anywhere in the page.
     * If resizing an event was started earlier, this will update event end.
     * If resizing was not started, this method is calculation is avoided with a premature return.
     * Notes: Event resizing is started in cell component (onMouseDown) but place onMouseMove & onMouseUp
     *        handlers in the single-instance parent for performance.
     *
     * @param {Object} e the native DOM event object.
     */
    onMouseMove (e) {
      const { resizeAnEvent } = this.domEvents
      if (resizeAnEvent._eid === null) return

      e.preventDefault()
      const event = this.view.events.find(e => e._eid === resizeAnEvent._eid) || { segments: {} }
      const { minutes, cursorCoords } = this.minutesAtCursor(e)
      const segment = event.segments && event.segments[resizeAnEvent.segment]

      // Don't allow time above 24 hours.
      event.endTimeMinutes = resizeAnEvent.endTimeMinutes = Math.min(minutes, minutesInADay)
      // Prevent reducing event duration to less than 1 min so it does not disappear.
      event.endTimeMinutes = resizeAnEvent.endTimeMinutes = Math.max(event.endTimeMinutes, this.timeFrom + 1, (segment || event).startTimeMinutes + 1)

      if (segment) segment.endTimeMinutes = event.endTimeMinutes

      event.endDate.setHours(
        0,
        event.endTimeMinutes,
        event.endTimeMinutes === minutesInADay ? -1 : 0, // Remove 1 second if time is 24:00.
        0
      )
      event.end = formatDateLite(event.endDate) + ' ' + formatTime(event.endTimeMinutes)

      // Resize events horizontally if resize-x is enabled (add/remove segments).
      if (this.resizeX && this.view.id === 'week') {
        event.daysCount = countDays(event.startDate, event.endDate)
        const cells = this.$refs.cells
        const cellWidth = cells.offsetWidth / cells.childElementCount
        const endCell = Math.floor(cursorCoords.x / cellWidth)

        if (!resizeAnEvent.startCell) {
          resizeAnEvent.startCell = endCell - (event.daysCount - 1)
        }
        if (resizeAnEvent.endCell !== endCell) {
          resizeAnEvent.endCell = endCell

          const endDate = event.startDate.addDays(endCell - resizeAnEvent.startCell)
          const newDaysCount = countDays(event.startDate, endDate)

          if (newDaysCount !== event.daysCount) {
            // Check that all segments are up to date.
            let lastSegmentFormattedDate = null
            if (newDaysCount > event.daysCount) lastSegmentFormattedDate = addEventSegment(event)
            else lastSegmentFormattedDate = removeEventSegment(event)
            resizeAnEvent.segment = lastSegmentFormattedDate
            event.endTimeMinutes += 0.001 // Force updating the current event.
          }
        }
      }
    },

    /**
     * Capture mouseup anywhere in the page, not only on a cell or event.
     * Then end up any resize, drag & drop, click & hold or event or cell.
     * Notes: Mouseup can never cancel a click with preventDefault or stopPropagation,
     *        But it always happens before the click event.
     *
     * @param {Object} e the native DOM event object.
     */
    onMouseUp (e) {
      const { resizeAnEvent, clickHoldAnEvent, clickHoldACell } = this.domEvents

      // On event resize end, emit event if duration has changed.
      if (resizeAnEvent._eid) {
        this.domEvents.cancelClickEventCreation = true
        const event = this.view.events.find(e => e._eid === resizeAnEvent._eid)
        if (event && event.endTimeMinutes !== resizeAnEvent.originalEndTimeMinutes) {
          // Store modified event back in mutable events.
          const mutableEvent = this.mutableEvents.find(e => e._eid === resizeAnEvent._eid)
          mutableEvent.endTimeMinutes = event.endTimeMinutes
          mutableEvent.end = event.end
          mutableEvent.endDate = event.endDate

          this.emitWithEvent('event-change', event)
          this.emitWithEvent('event-duration-change', event)
        }

        if (event) event.resizing = false
        resizeAnEvent._eid = null
        resizeAnEvent.start = null
        resizeAnEvent.split = null
        resizeAnEvent.segment = null
        resizeAnEvent.originalEndTimeMinutes = null
        resizeAnEvent.endTimeMinutes = null
        resizeAnEvent.startCell = null
        resizeAnEvent.endCell = null
      }

      if (this.isDOMElementAnEvent(e.target)) this.domEvents.cancelClickEventCreation = true

      // If not mouse up on an event, unfocus any event except if just dragged.
      else if (!resizeAnEvent._eid) this.unfocusEvent()

      // Prevent showing delete button if click and hold was not long enough.
      // Click & hold timeout is initiated in onMouseDown() in event component.
      if (clickHoldAnEvent.timeoutId && !clickHoldAnEvent._eid) {
        clearTimeout(clickHoldAnEvent.timeoutId)
        clickHoldAnEvent.timeoutId = null
      }

      // Prevent creating an event if click and hold was not long enough.
      if (clickHoldACell.timeoutId) {
        clearTimeout(clickHoldACell.timeoutId)
        clickHoldACell.timeoutId = null
      }
    },

    /**
     * Capture `escape` keypress when delete button is visible, and cancel deletion.
     *
     * @param {Object} e the native DOM event object.
     */
    onKeyUp (e) {
      if (e.keyCode === 27) this.cancelDelete() // Escape key.
    },

    /**
     * Unfocus an event (e.g. when clicking outside of focused event).
     */
    unfocusEvent () {
      const { focusAnEvent, clickHoldAnEvent } = this.domEvents
      const event = this.view.events.find(e => e._eid === (focusAnEvent._eid || clickHoldAnEvent._eid))
      focusAnEvent._eid = null // Cancel event focus.
      clickHoldAnEvent._eid = null // Hide delete button.

      if (event) {
        event.focused = false
        event.deleting = false
      }
    },

    /**
     * Cancel an event deletion (e.g. when clicking outside of visible delete button).
     */
    cancelDelete () {
      const { clickHoldAnEvent } = this.domEvents
      if (clickHoldAnEvent._eid) {
        const event = this.view.events.find(e => e._eid === clickHoldAnEvent._eid)
        if (event) event.deleting = false

        clickHoldAnEvent._eid = null
        clickHoldAnEvent.timeoutId = null
      }
    },

    /**
     * After editing an event title (if `this.editable`), save the new string into the event object
     * and emit event to the outside world.
     *
     * @param {Object} e the native DOM event object.
     * @param {Object} event the vue-cal event object.
     */
    onEventTitleBlur (e, event) {
      // If no change cancel action.
      if (event.title === e.target.innerHTML) return

      event.title = e.target.innerHTML

      this.emitWithEvent('event-change', event)
      this.emitWithEvent('event-title-change', event)
    },

    /**
     * The `mutableEvents` array of events is the source of truth.
     * It is first populated from the `events` prop and every time the `events` prop changes.
     * When the user updates an event through interractions, the event gets updated here.
     * Notes: mutableEvents couldn't be a computed variable based on this.events, because we add
     *        items to the array. (Cannot mutate props)
     */
    updateMutableEvents () {
      this.mutableEvents = []

      // For each event of the `events` prop, prepare the event for vue-cal:
      // Populate missing keys: start, startDate, startTimeMinutes, end, endDate, endTimeMinutes, daysCount.
      // Lots of these variables may look redundant but are here for performance as a cached result of calculation. :)
      this.events.forEach(event => {
        // `event.start` accepts a formatted string - `event.startDate` accepts a Date object.
        let startDate, startDateF, startTime, hoursStart, minutesStart
        if (event.start) {
          // eslint-disable-next-line
          !([startDateF, startTime = ''] = event.start.split(' '))
          // eslint-disable-next-line
          !([hoursStart, minutesStart] = startTime.split(':'))
          startDate = stringToDate(event.start)
        }
        else if (event.startDate && event.startDate instanceof Date) {
          startDateF = formatDateLite(event.startDate)
          hoursStart = event.startDate.getHours()
          minutesStart = event.startDate.getMinutes()
          startDate = event.startDate
        }
        const startTimeMinutes = parseInt(hoursStart) * 60 + parseInt(minutesStart)
        const start = event.start || startDateF + ' ' + formatTime(startTimeMinutes)

        // `event.end` accepts a formatted string - `event.endDate` accepts a Date object.
        let endDate, endDateF, endTime, hoursEnd, minutesEnd
        if (event.end) {
          // eslint-disable-next-line
          !([endDateF, endTime = ''] = event.end.split(' '))
          // eslint-disable-next-line
          !([hoursEnd, minutesEnd] = endTime.split(':'))
          endDate = stringToDate(event.end)
        }
        else if (event.endDate && event.endDate instanceof Date) {
          endDateF = formatDateLite(event.endDate)
          hoursEnd = event.endDate.getHours()
          minutesEnd = event.endDate.getMinutes()
          endDate = event.endDate
        }

        let endTimeMinutes = parseInt(hoursEnd) * 60 + parseInt(minutesEnd)
        const end = event.end || endDateF + ' ' + formatTime(endTimeMinutes)

        // Correct the common practice to end at 00:00 or 24:00 to count a full day.
        if (!endTimeMinutes || endTimeMinutes === minutesInADay) {
          endDate.setSeconds(-1) // End at 23:59:59.
          endDateF = formatDateLite(endDate)
          endTimeMinutes = minutesInADay
        }

        const multipleDays = startDateF !== endDateF

        event = Object.assign({
          ...eventDefaults,
          // Keep the event ids scoped to this calendar instance.
          _eid: `${this._uid}_${this.eventIdIncrement++}`,
          segments: multipleDays ? {} : null,
          start,
          startDate,
          startTimeMinutes,
          end,
          endDate,
          endTimeMinutes,
          daysCount: multipleDays ? countDays(startDate, endDate) : 1,
          classes: (event.class || '').split(' ')
        }, event)

        this.mutableEvents.push(event)
      })
    },

    /**
     * Get the coordinates of the mouse cursor from the cells wrapper referential (`ref="cells"`).
     *
     * @todo Cache bounding box & update it on resize.
     * @param {Object} e the native DOM event object.
     * @return {Object} containing { x: {Number}, y: {Number} }
     */
    getPosition (e) {
      const rect = this.$refs.cells.getBoundingClientRect()
      const { clientX, clientY } = 'ontouchstart' in window && e.touches ? e.touches[0] : e
      return { x: clientX - rect.left, y: clientY - rect.top }
    },

    /**
     * Get the number of minutes from the top to the mouse cursor.
     *
     * @param {Object} e the native DOM event object.
     * @return {Object} containing { minutes: {Number}, cursorCoords: { x: {Number}, y: {Number} } }
     */
    minutesAtCursor (e) {
      let minutes = 0
      let cursorCoords = {}

      if (typeof e === 'number') minutes = e
      else if (typeof e === 'object') {
        cursorCoords = this.getPosition(e)
        minutes = Math.round(cursorCoords.y * this.timeStep / parseInt(this.timeCellHeight) + this.timeFrom)
      }

      return { minutes, cursorCoords }
    },

    /**
     * Creates a new event in vue-cal memory (in the mutableEvents array) starting at the given date & time.
     * Proxy method to allow call from cell click & hold or external call (via $refs).
     * Notes: Event duration is by default 2 hours. You can override the event end through eventOptions.
     *
     * @param {String | Date} dateTime date & time at which the event will start.
     * @param {Object} eventOptions an object of options to override the event creation defaults.
     *                              (can be any key allowed in an event object)
     * @return {Object} the created event.
     */
    createEvent (dateTime, eventOptions = {}) {
      return createAnEvent(dateTime, eventOptions, this)
    },

    /**
     * Remove all the vue-cal private vars from the event (before returning it through $emit()).
     *
     * @param {Object} event the event object to cleanup.
     */
    cleanupEvent (event) {
      event = { ...event }

      // Delete vue-cal specific props instead of returning a set of props so user
      // can place whatever they want inside an event and see it returned.
      const discardProps = [
        'height', 'top', 'classes', 'split', 'segments',
        'deletable', 'deleting', 'resizable', 'resizing', 'focused'
      ]
      discardProps.forEach(prop => { if (prop in event) delete event[prop] })

      if (!event.repeat) delete event.repeat // If empty we don't need it.

      return event
    },

    /**
     * Emits an event (custom DOM event) to the outside world.
     * This event has an event name and a clean calendar event as a parameter.
     *
     * @param {String} eventName the name of the custom emitted event (e.g. `event-focus`).
     * @param {Object} event the event to return to the outside world.
     */
    emitWithEvent (eventName, event) {
      this.$emit(eventName, this.cleanupEvent(event))
    },

    /**
     * Update the selected date:
     * - on created, from given selectedDate prop
     * - on click/dblClick of another cell
     * - from external call (via $refs)
     * - when the given selectedDate prop changes.
     * If date is not in the view, the view will change to show it.
     *
     * @param {String | Date} date The date to select.
     */
    updateSelectedDate (date) {
      if (date && typeof date === 'string') date = stringToDate(date)
      else date = new Date(date) // Clone to keep original untouched.

      if (date && date instanceof Date) {
        const { selectedDate } = this.view
        if (selectedDate) this.transitionDirection = selectedDate.getTime() > date.getTime() ? 'left' : 'right'
        // Select the day at midnight in order to allow fetching events on whole day.
        // Setting milliseconds to 0 is critical as well for timestamp comparison.
        date.setHours(0, 0, 0, 0)

        if (!selectedDate || selectedDate.getTime() !== date.getTime()) this.view.selectedDate = date
        this.switchView(this.view.id)
      }
    },

    /**
     * Formats a date and returns the formatted string.
     * Shorthand function, to avoid passing the localized texts everywhere.
     *
     * @param {String | Date} date the date to format - can contain the time info or not.
     * @param {String} format the wanted format.
     * @return {String} the formatted date.
     */
    formatDate (date, format = 'YYYY-MM-DD') {
      return formatDate(date, format, this.texts)
    },

    /**
     * Formats a time and returns the formatted string.
     * Shorthand function, to avoid passing the common format.
     *
     * @param {Number} time the time to format in minutes.
     * @param {String} format the wanted format.
     * @return {String} the formatted time.
     */
    formatTime (time, format) {
      return formatTime(time, format || this.timeFormat || (this.twelveHour ? 'h:mm{am}' : 'HH:mm'), this.texts)
    },

    /**
     * Double checks the week number is correct. Read bellow to understand!
     * this is a wrapper around the `getWeek()` function for performance:
     * As this is called multiple times from the template and cannot be in computed since there is
     * a parameter, this wrapper function avoids the `getWeek()` function call 5 times out of 6
     * using the computed `firstCellDateWeekNumber`.
     *
     * Reason why:
     * Getting the week number is not that straightforward as there might be a 53rd week in the year.
     * Whenever the year starts on a Thursday or any leap year starting on a Wednesday, this week will be 53.
     *
     * @param {Number} weekFromFirstCell Number from 0 to 6.
     */
    getWeekNumber (weekFromFirstCell) {
      const firstCellWeekNumber = this.firstCellDateWeekNumber
      const currentWeekNumber = firstCellWeekNumber + weekFromFirstCell
      const modifier = this.startWeekOnSunday ? 1 : 0

      if (currentWeekNumber > 52) {
        return this.view.firstCellDate.addDays(7 * weekFromFirstCell + modifier).getWeek()
      }
      else return currentWeekNumber
    },

    /**
     * Only if watchRealTime is true.
     * Pull the current time from user machine every minute to keep vue-cal accurate even when idle.
     * This will redraw the now line every minute and ensure that Today's date is always accurate.
     */
    timeTick () {
      // Updating `now` will re-trigger the computed `todaysTimePosition` in cell.vue.
      this.now = new Date()
      this.timeTickerIds[1] = setTimeout(this.timeTick, 60 * 1000) // Every minute.
    },

    /**
     * Callable from outside of Vue Cal.
     */
    updateDateTexts () {
      updateDateTexts(this.texts)
    },

    /**
     * On Windows devices, the .vuecal__bg's vertical scrollbar takes space and pushes the content.
     * This function will also push the all-day bar to have it properly aligned.
     * The calculated style will be placed in the docment head in a style tag so it's only done once
     * (the scrollbar width never changes).
     * Ref. https://github.com/antoniandre/vue-cal/issues/221
     */
    alignAllDayBar () {
      // If already done from another instance, exit.
      if (document.getElementById('align-all-day-bar')) return

      const bg = this.$refs.vuecal.getElementsByClassName('vuecal__bg')[0]
      const scrollbarWidth = bg.offsetWidth - bg.children[0].offsetWidth

      // Only add a style tag once and if a scrollbar width is detected.
      if (scrollbarWidth) {
        const style = document.createElement('style')
        style.id = 'align-all-day-bar'
        style.type = 'text/css'
        style.innerHTML = `.vuecal__all-day {padding-right: ${scrollbarWidth}px}`
        document.head.appendChild(style)
      }
    }
  },

  created () {
    this.loadLocale(this.locale)

    updateDateTexts(this.texts)

    // Init the array of events, then keep listening for changes in watcher.
    this.updateMutableEvents(this.events)

    this.view.id = this.defaultView
    if (this.selectedDate) this.updateSelectedDate(this.selectedDate)
    else {
      this.view.selectedDate = new Date()
      this.switchView(this.defaultView)
    }

    // Timers are expensive, this should only trigger on demand.
    if (this.time && this.watchRealTime) {
      // Snap the time ticker on sharp minutes (when seconds = 0), so that we can set
      // the time ticker interval to 60 seconds and spare some function calls.
      this.timeTickerIds[0] = setTimeout(this.timeTick, (60 - this.now.getSeconds()) * 1000)
    }
  },

  mounted () {
    const hasTouch = 'ontouchstart' in window

    if (this.editableEvents) {
      window.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, { passive: false })
      window.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
      window.addEventListener('keyup', this.onKeyUp)
    }

    // Disable context menu on touch devices on the whole vue-cal instance.
    if (hasTouch) {
      this.$refs.vuecal.oncontextmenu = function (e) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // https://github.com/antoniandre/vue-cal/issues/221
    if (this.showAllDayEvents) this.alignAllDayBar()

    // Emit the `ready` event with useful parameters.
    const startDate = this.view.startDate
    const params = {
      view: this.view.id,
      startDate,
      endDate: this.view.endDate,
      ...(this.view.id === 'month' ? { firstCellDate: this.view.firstCellDate, lastCellDate: this.view.lastCellDate } : {}),
      events: this.view.events.map(this.cleanupEvent),
      ...(this.view.id === 'week' ? { week: this.startWeekOnSunday ? startDate.addDays(1).getWeek() : startDate.getWeek() } : {})
    }

    this.$emit('ready', params)
    this.ready = true
  },

  beforeDestroy () {
    const hasTouch = 'ontouchstart' in window
    window.removeEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, { passive: false })
    window.removeEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
    window.removeEventListener('keyup', this.onKeyUp)

    // Don't keep the ticking running if unused.
    if (this.timeTickerIds[0]) clearTimeout(this.timeTickerIds[0])
    if (this.timeTickerIds[1]) clearTimeout(this.timeTickerIds[1])
    this.timeTickerIds = [null, null]
  },

  computed: {
    views () {
      return {
        years: { label: this.texts.years, enabled: !this.disableViews.includes('years') },
        year: { label: this.texts.year, enabled: !this.disableViews.includes('year') },
        month: { label: this.texts.month, enabled: !this.disableViews.includes('month') },
        week: { label: this.texts.week, enabled: !this.disableViews.includes('week') },
        day: { label: this.texts.day, enabled: !this.disableViews.includes('day') }
      }
    },
    hasTimeColumn () {
      return this.time && ['week', 'day'].includes(this.view.id)
    },
    isShortMonthView () {
      return this.view.id === 'month' && this.eventsOnMonthView === 'short'
    },
    firstCellDateWeekNumber () {
      const date = this.view.firstCellDate
      return this.startWeekOnSunday ? date.addDays(1).getWeek() : date.getWeek()
    },
    // For week & day views.
    timeCells () {
      const timeCells = []
      for (let i = this.timeFrom, max = this.timeTo; i < max; i += this.timeStep) {
        timeCells.push({
          hours: Math.floor(i / 60),
          minutes: i % 60,
          label: this.formatTime(i),
          value: i
        })
      }

      return timeCells
    },
    // Filter out the day splits that are hidden.
    daySplits () {
      return (
        (this.splitDays.filter(item => !item.hide) || [])
          .map((item, i) => ({ ...item, id: item.id || (i + 1) })) // Make sure there's always an id.
      )
    },
    // Whether the current view has days splits.
    hasSplits () {
      return this.daySplits.length && ['week', 'day'].includes(this.view.id)
    },
    contentMinWidth () {
      let minWidth = null

      if (this.hasSplits && this.minSplitWidth) minWidth = this.visibleDaysCount * this.minSplitWidth * this.daySplits.length
      else if (this.minCellWidth && this.view.id === 'week') minWidth = this.visibleDaysCount * this.minCellWidth

      return minWidth
    },
    minTimestamp () {
      let date = null
      if (this.minDate && typeof this.minDate === 'string') date = stringToDate(this.minDate)
      else if (this.minDate && this.minDate instanceof Date) date = this.minDate
      return date ? date.getTime() : null
    },
    maxTimestamp () {
      let date = null
      if (this.maxDate && typeof this.maxDate === 'string') date = stringToDate(this.maxDate)
      else if (this.maxDate && this.minDate instanceof Date) date = this.maxDate
      return date ? date.getTime() : null
    },
    weekDays () {
      let { weekDays, weekDaysShort = [] } = this.texts
      // Do not modify original for next instances.
      weekDays = weekDays.slice(0).map((day, i) => ({
        label: day,
        ...(weekDaysShort.length ? { short: weekDaysShort[i] } : {}),
        hide: (this.hideWeekends && i >= 5) || (this.hideWeekdays.length && this.hideWeekdays.includes(i + 1))
      }))

      if (this.startWeekOnSunday) weekDays.unshift(weekDays.pop())

      return weekDays
    },
    weekDaysInHeader () {
      return this.view.id === 'month' || (this.view.id === 'week' && !this.minCellWidth && !this.minSplitWidth)
    },
    months () {
      return this.texts.months.map(month => ({ label: month }))
    },
    // Prepare the special hours object once for all at root level and not in cell.
    specialDayHours () {
      return Array(7).fill('').map((cell, i) => {
        const specialHours = this.specialHours[i + 1] || {}
        return {
          day: i + 1,
          from: specialHours.from * 1 || null,
          to: specialHours.to * 1 || null,
          class: specialHours.class || ''
        }
      })
    },
    viewTitle () {
      let title = ''
      const date = this.view.startDate
      const year = date.getFullYear()
      const month = date.getMonth()

      switch (this.view.id) {
        case 'years': {
          title = this.texts.years
          break
        }
        case 'year': {
          title = year
          break
        }
        case 'month': {
          title = `${this.months[month].label} ${year}`
          break
        }
        case 'week': {
          const lastDayOfWeek = this.view.endDate // Might be another day than Sunday, if hiding days.
          const y1 = date.getFullYear()
          let m1 = this.texts.months[date.getMonth()]
          if (this.xsmall) m1 = m1.substring(0, 3)
          let formattedMonthYear = `${m1} ${y1}`

          // If week is not ending in the same month it started in.
          if (lastDayOfWeek.getMonth() !== date.getMonth()) {
            const y2 = lastDayOfWeek.getFullYear()
            let m2 = this.texts.months[lastDayOfWeek.getMonth()]
            if (this.xsmall) m2 = m2.substring(0, 3)
            if (y1 === y2) formattedMonthYear = `${m1} - ${m2} ${y1}`
            else {
              if (this.small) formattedMonthYear = `${m1.substring(0, 3)} ${y1} - ${m2.substring(0, 3)} ${y2}`
              else formattedMonthYear = `${m1} ${y1} - ${m2} ${y2}`
            }
          }
          title = `${this.texts.week} ${this.startWeekOnSunday ? date.addDays(1).getWeek() : date.getWeek()} (${formattedMonthYear})`
          break
        }
        case 'day': {
          title = this.formatDate(date, this.texts.dateFormat)
          break
        }
      }

      return title
    },
    viewCells () {
      let cells = []
      let fromYear = null
      let todayFound = false

      // If watchRealTime = true, a time ticker will keep updating this.now every minute.
      // If watchRealTime = false - and by default - update this.now value each time we rerender the cells
      // so we keep Today's date always accurate at a minimum cost and maximum performance.
      // eslint-disable-next-line
      if (!this.watchRealTime) this.now = new Date()
      const now = this.now

      switch (this.view.id) {
        case 'years': {
          fromYear = this.view.startDate.getFullYear()
          cells = Array.apply(null, Array(25)).map((cell, i) => {
            const startDate = new Date(fromYear + i, 0, 1)
            const endDate = new Date(fromYear + i + 1, 0, 1)
            endDate.setSeconds(-1) // End at 23:59:59.

            return {
              startDate,
              formattedDate: formatDateLite(startDate),
              endDate,
              content: fromYear + i,
              current: fromYear + i === now.getFullYear()
            }
          })
          break
        }
        case 'year': {
          fromYear = this.view.startDate.getFullYear()
          cells = Array.apply(null, Array(12)).map((cell, i) => {
            const startDate = new Date(fromYear, i, 1)
            const endDate = new Date(fromYear, i + 1, 1)
            endDate.setSeconds(-1) // End at 23:59:59.

            return {
              startDate,
              formattedDate: formatDateLite(startDate),
              endDate,
              content: this.xsmall ? this.months[i].label.substr(0, 3) : this.months[i].label,
              current: i === now.getMonth() && fromYear === now.getFullYear()
            }
          })
          break
        }
        case 'month': {
          const month = this.view.startDate.getMonth()
          const firstCellDate = new Date(this.view.firstCellDate)
          todayFound = false

          // Create 42 cells (6 rows x 7 days) and populate them with days.
          cells = Array.apply(null, Array(42)).map((cell, i) => {
            const startDate = firstCellDate.addDays(i)
            const endDate = new Date(startDate)
            endDate.setHours(23, 59, 59, 0) // End at 23:59:59.
            // To increase performance skip checking isToday if today already found.
            const isToday = !todayFound && startDate.isToday() && !todayFound++

            return {
              startDate,
              formattedDate: formatDateLite(startDate),
              endDate,
              content: startDate.getDate(),
              today: isToday,
              outOfScope: startDate.getMonth() !== month
            }
          })

          if (this.hideWeekends || this.hideWeekdays.length) {
            cells = cells.filter(cell => {
              let day = cell.startDate.getDay()
              if (!day) day = 7 // Put Sunday at position 7 instead of 0.

              return !((this.hideWeekends && day >= 6) ||
              (this.hideWeekdays.length && this.hideWeekdays.includes(day)))
            })
          }
          break
        }
        case 'week': {
          todayFound = false
          const firstDayOfWeek = this.view.startDate
          const weekDays = this.weekDays

          cells = weekDays.map((cell, i) => {
            const startDate = firstDayOfWeek.addDays(i)
            const endDate = new Date(startDate)
            endDate.setHours(23, 59, 59, 0) // End at 23:59:59.
            const dayOfWeek = (startDate.getDay() - 1 + 7) % 7 // Day of the week from 0 to 6 with 6 = Sunday.

            return {
              startDate,
              formattedDate: formatDateLite(startDate),
              endDate,
              // To increase performance skip checking isToday if today already found.
              today: !todayFound && startDate.isToday() && !todayFound++,
              specialHours: this.specialDayHours[dayOfWeek]
            }
          }).filter((cell, i) => !weekDays[i].hide)
          break
        }
        case 'day': {
          const startDate = this.view.startDate
          const endDate = new Date(this.view.startDate)
          endDate.setHours(23, 59, 59, 0) // End at 23:59:59.
          const dayOfWeek = (startDate.getDay() - 1 + 7) % 7 // Day of the week from 0 to 6 with 6 = Sunday.

          cells = [{
            startDate,
            formattedDate: formatDateLite(startDate),
            endDate,
            today: startDate.isToday(),
            specialHours: this.specialDayHours[dayOfWeek]
          }]
          break
        }
      }
      return cells
    },
    // Only when hiding weekdays on month and week views.
    visibleDaysCount () {
      if (this.view.id === 'day') return 1
      return 7 - this.weekDays.reduce((total, day) => total + day.hide, 0)
    },
    cellWidth () {
      return 100 / this.visibleDaysCount
    },
    cssClasses () {
      return {
        [`vuecal--${this.view.id}-view`]: true,
        [`vuecal--${this.locale}`]: this.locale,
        'vuecal--no-time': !this.time,
        'vuecal--view-with-time': this.hasTimeColumn,
        'vuecal--week-numbers': this.showWeekNumbers && this.view.id === 'month',
        'vuecal--twelve-hour': this.twelveHour,
        'vuecal--click-to-navigate': this.clickToNavigate,
        'vuecal--hide-weekends': this.hideWeekends,
        'vuecal--split-days': this.hasSplits,
        'vuecal--sticky-split-labels': this.hasSplits && this.stickySplitLabels,
        'vuecal--overflow-x': (this.minCellWidth && this.view.id === 'week') || (this.hasSplits && this.minSplitWidth),
        'vuecal--small': this.small,
        'vuecal--xsmall': this.xsmall,
        'vuecal--dragging-event': this.domEvents.resizeAnEvent.endTimeMinutes,
        'vuecal--events-on-month-view': this.eventsOnMonthView,
        'vuecal--short-events': this.view.id === 'month' && this.eventsOnMonthView === 'short'
      }
    }
  },

  watch: {
    events: {
      // To be able to detect an event attribute change, it has to be first initialized with a value.
      handler (events, oldEvents) {
        this.updateMutableEvents(events)
        this.addEventsToView()
      },
      deep: true
    },
    locale (locale) {
      this.loadLocale(locale)
    },
    selectedDate (date) {
      this.updateSelectedDate(date)
    }
  }
}
</script>
