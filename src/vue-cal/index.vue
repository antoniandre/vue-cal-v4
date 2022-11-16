<template lang="pug">
.vuecal__flex.vuecal(column :class="cssClasses" ref="vuecal" :lang="locale")
  vuecal-header(
    :options="$props"
    :edit-events="editEvents"
    :view-props="{ views, weekDaysInHeader }"
    :week-days="weekDays"
    :has-splits="hasSplits"
    :day-splits="daySplits"
    :switch-to-narrower-view="switchToNarrowerView")
    template(#arrow-prev)
      slot(name="arrow-prev")
        | &nbsp;
        i.angle
        | &nbsp;
    template(#arrow-next)
      slot(name="arrow-next")
        | &nbsp;
        i.angle
        | &nbsp;
    template(#today-button)
      slot(name="today-button")
        span.default {{ texts.today }}
    template(#title)
      slot(name="title" :title="viewTitle" :view="view") {{ viewTitle }}
    template(#weekday-heading="{ heading, view }" v-if="$slots['weekday-heading']")
      slot(name="weekday-heading" :heading="heading" :view="view")
    template(#split-label="{ split }" v-if="$slots['split-label']")
      slot(name="split-label" :split="split" :view="view.id")

  .vuecal__flex.vuecal__body(v-if="!hideBody" grow)
    transition(:name="`slide-fade--${transitionDirection}`" :appear="transitions")
      .vuecal__flex(style="min-width: 100%" :key="transitions ? view.id : false" column)
        all-day-bar(
          v-if="showAllDayEvents && hasTimeColumn && (!cellOrSplitMinWidth || (isDayView && !minSplitWidth))"
          v-bind="allDayBar")
          template(#event="{ event, view }")
            slot(name="event" :view="view" :event="event")
              .vuecal__event-title.vuecal__event-title--edit(
                v-if="editEvents.title && event.titleEditable"
                contenteditable
                @blur="onEventTitleBlur($event, event)"
                v-html="event.title")
              .vuecal__event-title(v-else-if="event.title" v-html="event.title")
              .vuecal__event-content(
                v-if="event.content && !hasShortEvents && !isShortMonthView"
                v-html="event.content")
        .vuecal__bg(:class="{ vuecal__flex: !hasTimeColumn }" column)
          .vuecal__flex(row grow)
            .vuecal__time-column(v-if="hasTimeColumn")
              .vuecal__all-day-text(
                v-if="showAllDayEvents && cellOrSplitMinWidth && !(isDayView && !minSplitWidth)"
                :style="{ height: allDayBar.height }")
                span {{ texts.allDay }}
              .vuecal__time-cell(v-for="(cell, i) in timeCells" :key="i" :style="`height: ${timeCellHeight}px`")
                slot(name="time-cell" :hours="cell.hours" :minutes="cell.minutes")
                  span.vuecal__time-cell-line
                  span.vuecal__time-cell-label {{ cell.label }}
            .vuecal__flex.vuecal__week-numbers(v-if="showWeekNumbers && isMonthView" column)
              .vuecal__flex.vuecal__week-number-cell(v-for="i in 6" :key="i" grow)
                slot(name="week-number-cell" :week="getWeekNumber(i - 1)") {{ getWeekNumber(i - 1) }}
            .vuecal__flex.vuecal__cells(
              :class="`${view.id}-view`"
              grow
              :wrap="!cellOrSplitMinWidth || !isWeekView"
              :column="!!cellOrSplitMinWidth")
              //- Only for minCellWidth or minSplitWidth on week view.
              weekdays-headings(
                v-if="cellOrSplitMinWidth && isWeekView"
                :transition-direction="transitionDirection"
                :week-days="weekDays"
                :switch-to-narrower-view="switchToNarrowerView"
                :style="cellOrSplitMinWidth ? `min-width: ${cellOrSplitMinWidth}px` : ''")
                template(#weekday-heading="{ heading, view }" v-if="$slots['weekday-heading']")
                  slot(name="weekday-heading" :heading="heading" :view="view")
                template(#split-label="{ split }" v-if="$slots['split-label']")
                  slot(name="split-label" :split="split" :view="view.id")
              .vuecal__flex.vuecal__split-days-headers(v-else-if="hasSplits && stickySplitLabels && minSplitWidth"
                :style="cellOrSplitMinWidth ? `min-width: ${cellOrSplitMinWidth}px` : ''")
                .day-split-header(v-for="(split, i) in daySplits" :key="i" :class="split.class || false")
                  slot(name="split-label" :split="split" :view="view.id") {{ split.label }}
              all-day-bar(
                v-if="showAllDayEvents && hasTimeColumn && ((isWeekView && cellOrSplitMinWidth) || (isDayView && hasSplits && minSplitWidth))"
                v-bind="allDayBar")
                template(#event="{ event, view }")
                  slot(name="event" :view="view" :event="event")
                    .vuecal__event-title.vuecal__event-title--edit(
                      v-if="editEvents.title && event.titleEditable"
                      contenteditable
                      @blur="onEventTitleBlur($event, event)"
                      v-html="event.title")
                    .vuecal__event-title(v-else-if="event.title" v-html="event.title")
                    .vuecal__event-content(
                      v-if="event.content && !hasShortEvents && !isShortMonthView"
                      v-html="event.content")
              .vuecal__flex(
                :ref="el => cellsEl = el"
                grow
                :wrap="!cellOrSplitMinWidth || !isWeekView"
                :style="cellOrSplitMinWidth ? `min-width: ${cellOrSplitMinWidth}px` : ''")
                vuecal-cell(
                  v-for="(cell, i) in viewCells"
                  :key="i"
                  :options="$props"
                  :edit-events="editEvents"
                  :data="cell"
                  :cell-width="hideWeekdays.length && (isWeekView || isMonthView) && cellWidth"
                  :min-timestamp="minTimestamp"
                  :max-timestamp="maxTimestamp"
                  :cell-splits="hasSplits && daySplits || []")
                  template(#cell-content="{ events, split, selectCell }")
                    slot(name="cell-content" :cell="cell" :view="view" :go-narrower="selectCell" :events="events")
                      .split-label(v-if="split && !stickySplitLabels" v-html="split.label")
                      .vuecal__cell-date(v-if="cell.content" v-html="cell.content")
                      .vuecal__cell-events-count(v-if="((isMonthView && !eventsOnMonthView) || (isYearsOrYearView && eventsCountOnYearView)) && events.length")
                        slot(name="events-count" :view="view" :events="events") {{ events.length }}
                      .vuecal__no-event(v-if="!cellOrSplitHasEvents(events, split) && isWeekOrDayView")
                        slot(name="no-event") {{ texts.noEvent }}
                  template(#event="{ event, view }")
                    slot(name="event" :view="view" :event="event")
                      .vuecal__event-title.vuecal__event-title--edit(
                        v-if="editEvents.title && event.titleEditable"
                        contenteditable
                        @blur="onEventTitleBlur($event, event)"
                        v-html="event.title")
                      .vuecal__event-title(v-else-if="event.title" v-html="event.title")
                      .vuecal__event-time(v-if="time && !event.allDay && !(isMonthView && (event.allDay || showAllDayEvents === 'short')) && !isShortMonthView")
                        | {{ utils.date.formatTime(event.start, TimeFormat) }}
                        span(v-if="event.endTimeMinutes") &nbsp;- {{ utils.date.formatTime(event.end, TimeFormat, null, true) }}
                        small.days-to-end(v-if="event.daysCount > 1 && (event.segments[cell.formattedDate] || {}).isFirstDay")
                          | &nbsp;+{{ event.daysCount - 1 }}{{ (texts.day[0] || '').toLowerCase() }}
                      .vuecal__event-content(
                        v-if="event.content && !(isMonthView && event.allDay && showAllDayEvents === 'short') && !isShortMonthView"
                        v-html="event.content")
                  template(#no-event)
                    slot(name="no-event") {{ texts.noEvent }}
    //- Used in alignWithScrollbar() to realign weekdays headings.
    .vuecal__scrollbar-check(v-if="!ready")
      div
</template>

<script>
import DateUtils from './utils/date'
import CellUtils from './utils/cell'
import EventUtils from './utils/event'
import Header from './header.vue'
import WeekdaysHeadings from './weekdays-headings.vue'
import AllDayBar from './all-day-bar.vue'
import Cell from './cell.vue'

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

const validViews = ['years', 'year', 'month', 'week', 'day']

// Only 1 instance of DateUtils for all the instances of Vue Cal, created when first importing the Vue Cal lib.
// The dateUtils does not need to be dependent of Vue Cal instance, it only needs localized texts when ready.
// This becomes a problem when showing multiple instances of Vue Cal with different locales like in the
// documentation page. So the texts are overridable through a the `updateDateTexts` function.
const dateUtils = new DateUtils(textsDefaults) // Do this ASAP for date prototypes.

export default {
  name: 'vue-cal',
  components: { 'vuecal-cell': Cell, 'vuecal-header': Header, WeekdaysHeadings, AllDayBar },

  // By Vue design, passing props loses the reactivity unless it's a method or reactive OBJECT.
  provide () {
    return {
      vuecal: this,
      utils: this.utils,
      modules: this.modules,
      // Methods.
      previous: this.previous,
      next: this.next,
      switchView: this.switchView,
      updateSelectedDate: this.updateSelectedDate,
      editEvents: this.editEvents,
      // Objects.
      view: this.view,
      domEvents: this.domEvents
    }
  },

  props: {
    activeView: { type: String, default: 'week' },
    // Only used if there are daySplits with minSplitWidth, to add the same height top spacer on time column.
    allDayBarHeight: { type: [String, Number], default: '25px' },
    cellClickHold: { type: Boolean, default: true },
    cellContextmenu: { type: Boolean, default: false },
    clickToNavigate: { type: Boolean, default: false },
    dblclickToNavigate: { type: Boolean, default: true },
    disableDatePrototypes: { type: Boolean, default: false },
    disableDays: { type: Array, default: () => [] },
    disableViews: { type: Array, default: () => [] },
    dragToCreateEvent: { type: Boolean, default: true },
    // Start a drag creation after dragging a certain amount of pixels.
    // This prevents drag creation by mistake when you want to navigate.
    dragToCreateThreshold: { type: Number, default: 15 },
    editableEvents: { type: [Boolean, Object], default: false },
    events: { type: Array, default: () => [] },
    eventsCountOnYearView: { type: Boolean, default: false },
    eventsOnMonthView: { type: [Boolean, String], default: false },
    hideBody: { type: Boolean, default: false },
    hideTitleBar: { type: Boolean, default: false },
    hideViewSelector: { type: Boolean, default: false },
    hideWeekdays: { type: Array, default: () => [] },
    hideWeekends: { type: Boolean, default: false },
    locale: { type: [String, Object], default: 'en' },
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
    showTimeInCells: { type: Boolean, default: false },
    showWeekNumbers: { type: [Boolean, String], default: false },
    snapToTime: { type: Number, default: 0 },
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

  data () {
    return {
      ready: false, // Is vue-cal ready.
      // Make texts reactive before a locale is loaded.
      texts: { ...textsDefaults },
      utils: {
        // Remove prototypes ASAP if the user wants so.
        date: (this.disableDatePrototypes ? dateUtils.removePrototypes() : false) || dateUtils,
        cell: null,
        // Note: Destructuring class method loses the `this` context and Vue Cal becomes inaccessible
        // from the event utils function. Don't do:
        // const { eventInRange, createEventSegments } = this.utils.event
        event: null
      },
      modules: { dnd: null },
      cellsEl: null,

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
          originalEnd: null,
          end: null,
          startCell: null,
          endCell: null
        },
        dragAnEvent: {
          // Only one at a time, only needed for vuecal dragging-event class.
          _eid: null
        },
        dragCreateAnEvent: {
          startCursorY: null,
          start: null, // The cell date where we start the drag.
          split: null,
          event: null
        },
        focusAnEvent: {
          _eid: null, // Only one at a time.
          // Useful to detect a full click (mousedown + mouseup on same event).
          // E.g. Only call onEventClick function (if any) on full click.
          mousedUp: false
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
          timeoutId: null,
          eventCreated: false
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
    }
  },

  methods: {
    /**
     * Only import locale on demand to keep a small library weight.
     *
     * @param {String|Object} locale the language user whishes to have on vue-cal.
     */
    async loadLocale (locale) {
      if (typeof this.locale === 'object') {
        this.texts = Object.assign({}, textsDefaults, locale)
        this.utils.date.updateTexts(this.texts)
        return
      }

      if (this.locale === 'en') {
        const texts = await import('./i18n/en.json')
        this.texts = Object.assign({}, textsDefaults, texts)
      }
      else {
        import(`./i18n/${locale}.json`)
          .then(response => {
            this.texts = Object.assign({}, textsDefaults, response.default)
            this.utils.date.updateTexts(this.texts)
          })
      }
    },

    /**
     * Only import drag and drop module on demand to keep a small library weight.
     */
    loadDragAndDrop () {
      import('./modules/drag-and-drop')
        .then(response => {
          const { DragAndDrop } = response
          this.modules.dnd = new DragAndDrop(this)
        })
        // eslint-disable-next-line no-console
        .catch(() => console.warn('Vue Cal: Missing drag & drop module.'))
    },

    /**
     * Checks that the given view is in the array of valid views or use 'week' otherwise.
     * Then check the view is enabled or use the first enabled view instead.
     * Raises error and warning if needed.
     *
     * @param {String} view The view to validate.
     * @return {String} a valid view.
     */
    validateView (view) {
      if (!validViews.includes(view)) {
        // eslint-disable-next-line no-console
        console.error(`Vue Cal: invalid active-view parameter provided: "${view}".\nA valid view must be one of: ${validViews.join(', ')}.`)
        view = 'week'
      }

      if (!this.enabledViews.includes(view)) {
        // eslint-disable-next-line no-console
        console.warn(`Vue Cal: the provided active-view "${view}" is disabled. Using the "${this.enabledViews[0]}" view instead.`)
        view = this.enabledViews[0]
      }

      return view
    },

    /**
     * On click/dblclick of a cell go to a narrower view if available.
     * E.g. Click on month cell takes you to week view if not hidden, otherwise on day view if not hidden.
     *
     * @param {String | Date} date A starting date for the view, if none, fallbacks to the selected date,
     *                             If also empty fallbacks to the current view start date.
     */
    switchToNarrowerView (date = null) {
      this.transitionDirection = 'right'
      const view = this.enabledViews[this.enabledViews.indexOf(this.view.id) + 1]
      if (view) this.switchView(view, date)
    },

    /**
     * Switches to the specified view on view selector click, or programmatically form external call (via $refs).
     * If a date is given, it will be selected and if the view does not contain it, it will go to that date.
     *
     * @param {String} view the view to go to. Among `years`, `year`, `month`, `week`, `day`.
     * @param {String | Date} date A starting date for the view, if none, fallbacks to the selected date,
     *                             If also empty fallbacks to the current view start date.
     * @param {Boolean} fromViewSelector to know if the caller is the built-in view selector.
     */
    switchView (view, date = null, fromViewSelector = false) {
      view = this.validateView(view)

      const ud = this.utils.date
      // This is user to prevent firing the custom event twice when syncing activeView.
      const viewDateBeforeChange = this.view.startDate && this.view.startDate.getTime()

      if (this.transitions && fromViewSelector) {
        if (this.view.id === view) return
        const views = this.enabledViews
        this.transitionDirection = views.indexOf(this.view.id) > views.indexOf(view) ? 'left' : 'right'
      }

      const oldView = this.view.id
      this.view.events = []
      this.view.id = view
      this.view.firstCellDate = null // For month view, if filling cells before 1st of month.
      this.view.lastCellDate = null // For month view, if filling cells after current month.

      if (!date) date = this.view.selectedDate || this.view.startDate

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
            startDate = ud.getPreviousFirstDayOfWeek(startDate, this.startWeekOnSunday)
          }

          // Used in viewCells computed array & returned in emitted events.
          this.view.firstCellDate = startDate
          this.view.lastCellDate = ud.addDays(startDate, 41)
          this.view.lastCellDate.setHours(23, 59, 59, 0)

          if (this.hideWeekends) {
            // Remove first weekend from firstCellDate if hide-weekends.
            if ([0, 6].includes(this.view.firstCellDate.getDay())) {
              const daysToAdd = this.view.firstCellDate.getDay() === 6 && !this.startWeekOnSunday ? 2 : 1
              this.view.firstCellDate = ud.addDays(this.view.firstCellDate, daysToAdd)
            }
            // Remove first weekend from startDate if hide-weekends.
            if ([0, 6].includes(this.view.startDate.getDay())) {
              const daysToAdd = this.view.startDate.getDay() === 6 ? 2 : 1
              this.view.startDate = ud.addDays(this.view.startDate, daysToAdd)
            }
            // Remove last weekend from lastCellDate if hide-weekends.
            if ([0, 6].includes(this.view.lastCellDate.getDay())) {
              const daysToSubtract = this.view.lastCellDate.getDay() === 0 && !this.startWeekOnSunday ? 2 : 1
              this.view.lastCellDate = ud.subtractDays(this.view.lastCellDate, daysToSubtract)
            }
            // Remove last weekend from endDate if hide-weekends.
            if ([0, 6].includes(this.view.endDate.getDay())) {
              const daysToSubtract = this.view.endDate.getDay() === 0 ? 2 : 1
              this.view.endDate = ud.subtractDays(this.view.endDate, daysToSubtract)
            }
          }
          break
        }
        case 'week': {
          date = ud.getPreviousFirstDayOfWeek(date, this.startWeekOnSunday)
          const weekDaysCount = this.hideWeekends ? 5 : 7
          this.view.startDate = this.hideWeekends && this.startWeekOnSunday ? ud.addDays(date, 1) : date
          this.view.startDate.setHours(0, 0, 0, 0)
          this.view.endDate = ud.addDays(date, weekDaysCount)
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

      // Prevent firing the `view-change` event twice (if using .sync or v-model).
      const viewDate = this.view.startDate && this.view.startDate.getTime()
      if (oldView === view && viewDate === viewDateBeforeChange) return

      // Emit events to outside of Vue Cal and update the activeView (if using .sync or v-model).
      this.$emit('update:activeView', view)

      if (this.ready) {
        const startDate = this.view.startDate
        const params = {
          view,
          startDate,
          endDate: this.view.endDate,
          ...(this.isMonthView ? {
            firstCellDate: this.view.firstCellDate,
            lastCellDate: this.view.lastCellDate,
            outOfScopeEvents: this.view.outOfScopeEvents.map(this.cleanupEvent)
          } : {}),
          events: this.view.events.map(this.cleanupEvent),
          ...(this.isWeekView ? { week: ud.getWeek(this.startWeekOnSunday ? ud.addDays(startDate, 1) : startDate) } : {})
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
      const ud = this.utils.date
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
          firstCellDate = ud[next ? 'addDays' : 'subtractDays'](ud.getPreviousFirstDayOfWeek(startDate, this.startWeekOnSunday), 7)
          break
        case 'day':
          firstCellDate = ud[next ? 'addDays' : 'subtractDays'](startDate, 1)
          const weekDay = firstCellDate.getDay() // 0 to 6 with Sunday at position 0.
          const weekDayIndex = this.startWeekOnSunday ? weekDay : ((weekDay || 7) - 1)
          const isDayHidden = this.weekDays[weekDayIndex].hide

          // If the day to show on the day view is listed as hidden by hideWeekdays or hideWeekends,
          // show the next one that is not hidden if navigating forward, or show the previous available
          // if navigating backward.
          if (isDayHidden) {
            const daysWithIndex = this.weekDays.map((day, i) => ({ ...day, i }))
            let dayToShow = null
            let daysFromDate = 0

            if (next) {
              dayToShow = ([...daysWithIndex.slice(weekDayIndex), ...daysWithIndex]).find(day => {
                daysFromDate++
                return !day.hide
              }).i // Returns 0 to 6 with Monday at position 0.
              daysFromDate--
            }
            else {
              dayToShow = ([...daysWithIndex, ...daysWithIndex.slice(0, weekDayIndex)]).reverse().find(day => {
                daysFromDate++
                return !day.hide
              }).i // Returns 0 to 6 with Monday at position 0.
            }

            firstCellDate = ud[next ? 'addDays' : 'subtractDays'](firstCellDate, daysFromDate)
          }
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
      const ue = this.utils.event

      const { startDate, endDate, firstCellDate, lastCellDate } = this.view
      // Clear the current view if not explicitely giving an array of events to add.
      if (!events.length) this.view.events = []
      // @todo: remove the code that explicitly updates this.mutableEvents (e.g on event resize).
      // as we are already mutating the event from mutableEvents.
      events = events.length ? events : [...this.mutableEvents]

      // In no event or if on years/year view and eventsCountOnYearView is false
      // then don't add events to view.
      if (!events || (this.isYearsOrYearView && !this.eventsCountOnYearView)) return

      // First remove the events that are not in view.
      // Keep the unfiltered array of events for outOfScopeEvents below.
      let filteredEvents = events.filter(e => ue.eventInRange(e, startDate, endDate))

      // For each multiple-day event and only if needed, create its segments (= days) for rendering in the view.
      // If we don't display the event on month view (eventsOnMonthView = false) then don't create segments.
      if (!this.isYearsOrYearView && !(this.isMonthView && !this.eventsOnMonthView)) {
        filteredEvents = filteredEvents.map(e => {
          return e.daysCount > 1 ? ue.createEventSegments(e, firstCellDate || startDate, lastCellDate || endDate) : e
        })
      }

      this.view.events.push(...filteredEvents)

      if (this.isMonthView) {
        // Save out of scope events into the view object separated from the array of in-scope events.
        this.view.outOfScopeEvents = []
        events.forEach(e => {
          if (ue.eventInRange(e, firstCellDate, startDate) || ue.eventInRange(e, endDate, lastCellDate)) {
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
      const { resizeAnEvent, dragAnEvent, dragCreateAnEvent } = this.domEvents
      if (resizeAnEvent._eid === null && dragAnEvent._eid === null && !dragCreateAnEvent.start) return

      e.preventDefault()

      if (resizeAnEvent._eid) this.eventResizing(e)

      else if (this.dragToCreateEvent && dragCreateAnEvent.start) this.eventDragCreation(e)
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
      const {
        focusAnEvent,
        resizeAnEvent,
        clickHoldAnEvent,
        clickHoldACell,
        dragCreateAnEvent
      } = this.domEvents
      const { _eid: isClickHoldingEvent } = clickHoldAnEvent
      const { _eid: wasResizing } = resizeAnEvent
      let hasResized = false
      const { event: dragCreatedEvent, start: dragCreateStarted } = dragCreateAnEvent
      const mouseUpOnEvent = this.isDOMElementAnEvent(e.target)
      const eventClicked = focusAnEvent.mousedUp // If has mousedown & mouseup on the same event.
      focusAnEvent.mousedUp = false // Reinit the variable for next mouseup.

      if (mouseUpOnEvent) this.domEvents.cancelClickEventCreation = true

      // Skip the rest if an event was created successfully.
      if (clickHoldACell.eventCreated) return

      // On event resize end, emit event if duration has changed.
      if (wasResizing) {
        const { originalEnd, originalEndTimeMinutes, endTimeMinutes } = resizeAnEvent
        const event = this.view.events.find(e => e._eid === resizeAnEvent._eid)
        // If end time is different than original, consider as resized.
        hasResized = endTimeMinutes && endTimeMinutes !== originalEndTimeMinutes

        // When resizing the endTime changes but the day may change too when resizing horizontally.
        // So compare timestamps instead of only endTimeMinutes.
        if (event && event.end.getTime() !== originalEnd.getTime()) {
          // Update the modified event in the mutable events array.
          const mutableEvent = this.mutableEvents.find(e => e._eid === resizeAnEvent._eid)
          mutableEvent.endTimeMinutes = event.endTimeMinutes
          mutableEvent.end = event.end

          const cleanEvent = this.cleanupEvent(event)
          const originalEvent = {
            ...this.cleanupEvent(event),
            end: originalEnd,
            endTimeMinutes: event.originalEndTimeMinutes
          }
          this.$emit('event-duration-change', { event: cleanEvent, oldDate: resizeAnEvent.originalEnd, originalEvent })
          this.$emit('event-change', { event: cleanEvent, originalEvent })
        }

        if (event) event.resizing = false
        resizeAnEvent._eid = null
        resizeAnEvent.start = null
        resizeAnEvent.split = null
        resizeAnEvent.segment = null
        resizeAnEvent.originalEndTimeMinutes = null
        resizeAnEvent.originalEnd = null
        resizeAnEvent.endTimeMinutes = null
        resizeAnEvent.startCell = null
        resizeAnEvent.endCell = null
      }

      else if (dragCreateStarted) {
        // The drag create might be started but not completed due to threshold never reached.
        if (dragCreatedEvent) {
          this.emitWithEvent('event-drag-create', dragCreatedEvent)
          dragCreateAnEvent.event.resizing = false // Remove the CSS resizing class.
        }

        // End the drag creation process.
        dragCreateAnEvent.start = null
        dragCreateAnEvent.split = null
        dragCreateAnEvent.event = null
      }

      // If not mouse up on an event, unfocus any event except if just dragged.
      if (!mouseUpOnEvent && !wasResizing) this.unfocusEvent()

      // Prevent showing delete button if click and hold was not long enough.
      // Click & hold timeout is initiated in onMouseDown() in event component.
      if (clickHoldAnEvent.timeoutId && !isClickHoldingEvent) {
        clearTimeout(clickHoldAnEvent.timeoutId)
        clickHoldAnEvent.timeoutId = null
      }

      // Prevent creating an event if click and hold was not long enough.
      if (clickHoldACell.timeoutId) {
        clearTimeout(clickHoldACell.timeoutId)
        clickHoldACell.timeoutId = null
      }

      // On event click (mousedown + mouseup on the same event), call the onEventClick function if exists
      // and if not dragging handle or deleting event.
      const eventClickHandler = typeof this.onEventClick === 'function'
      if (eventClicked && !hasResized && !isClickHoldingEvent && !dragCreatedEvent && eventClickHandler) {
        let event = this.view.events.find(e => e._eid === focusAnEvent._eid)
        // If not found, the event may be in the outOfScope array.
        if (!event && this.isMonthView) event = this.view.outOfScopeEvents.find(e => e._eid === focusAnEvent._eid)

        return event && this.onEventClick(event, e)
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
     * On mousemove while resising an event.
     *
     * @param {Object} e the native DOM event object.
     */
    eventResizing (e) {
      const { resizeAnEvent } = this.domEvents
      const event = this.view.events.find(e => e._eid === resizeAnEvent._eid) || { segments: {} }
      const { minutes, cursorCoords } = this.minutesAtCursor(e)
      const segment = event.segments && event.segments[resizeAnEvent.segment]

      // Destructuring class method loses the `this` context.
      // const { formatDateLite, countDays } = this.utils.date
      const { date: ud, event: ue } = this.utils

      // Prevent reducing event duration to less than 1 min so it does not disappear.
      const newEndTimeMins = Math.max(minutes, this.timeFrom + 1, (segment || event).startTimeMinutes + 1)
      event.endTimeMinutes = resizeAnEvent.endTimeMinutes = newEndTimeMins

      // On resize, snap to time (e.g. 0, 15, 30, 45) if the option is on.
      if (this.snapToTime) {
        const plusHalfSnapTime = (event.endTimeMinutes + this.snapToTime / 2)
        event.endTimeMinutes = plusHalfSnapTime - (plusHalfSnapTime % this.snapToTime)
      }

      if (segment) segment.endTimeMinutes = event.endTimeMinutes

      // Remove 1 second if time is 24:00.
      event.end.setHours(0, event.endTimeMinutes, event.endTimeMinutes === minutesInADay ? -1 : 0, 0)

      // Resize events horizontally if resize-x is enabled (add/remove segments).
      if (this.resizeX && this.isWeekView) {
        event.daysCount = ud.countDays(event.start, event.end)
        const cells = this.cellsEl
        const cellWidth = cells.offsetWidth / cells.childElementCount
        const endCell = Math.floor(cursorCoords.x / cellWidth)

        if (resizeAnEvent.startCell === null) resizeAnEvent.startCell = endCell - (event.daysCount - 1)
        if (resizeAnEvent.endCell !== endCell) {
          resizeAnEvent.endCell = endCell

          const newEnd = ud.addDays(event.start, endCell - resizeAnEvent.startCell)
          // Don't accept 0 and negative values.
          const newDaysCount = Math.max(ud.countDays(event.start, newEnd), 1)

          if (newDaysCount !== event.daysCount) {
            // Check that all segments are up to date.
            let lastSegmentFormattedDate = null
            if (newDaysCount > event.daysCount) lastSegmentFormattedDate = ue.addEventSegment(event)
            else lastSegmentFormattedDate = ue.removeEventSegment(event)
            resizeAnEvent.segment = lastSegmentFormattedDate
            event.endTimeMinutes += 0.001 // Force updating the current event.
          }
        }
      }

      // Emit event while resizing, so it has to be fast.
      this.$emit('event-resizing', { _eid: event._eid, end: event.end, endTimeMinutes: event.endTimeMinutes })
    },

    /**
     * On mousemove while dragging to create an event.
     *
     * @param {Object} e the native DOM event object.
     */
    eventDragCreation (e) {
      const { dragCreateAnEvent } = this.domEvents
      const { start, startCursorY, split } = dragCreateAnEvent
      const timeAtCursor = new Date(start)
      const { minutes, cursorCoords: { y } } = this.minutesAtCursor(e)

      // Don't show anything until the threshold is reached.
      if (!dragCreateAnEvent.event && Math.abs(startCursorY - y) < this.dragToCreateThreshold) return

      // Create an event once, on the first pixel move after threshold is reached.
      if (!dragCreateAnEvent.event) {
        // Start the event with a 1 min duration, this will change as we are dragging.
        dragCreateAnEvent.event = this.utils.event.createAnEvent(start, 1, { split })

        // The event creation can be cancelled if user has a onEventCreate function
        // (called from createAnEvent()). If cancelled, cancel the dragCreation.
        if (!dragCreateAnEvent.event) {
          dragCreateAnEvent.start = null
          dragCreateAnEvent.split = null
          dragCreateAnEvent.event = null
          return
        }

        dragCreateAnEvent.event.resizing = true // Trigger the CSS class.
      }

      // If the event already exists change its start and end.
      else {
        // Remove 1 second if time is 24:00.
        timeAtCursor.setHours(0, minutes, minutes === minutesInADay ? -1 : 0, 0)

        // If snapToTime, set the `timeAtCursor` to the closest intervaled number.
        if (this.snapToTime) {
          let timeMinutes = timeAtCursor.getHours() * 60 + timeAtCursor.getMinutes()
          const plusHalfSnapTime = timeMinutes + this.snapToTime / 2
          timeMinutes = plusHalfSnapTime - (plusHalfSnapTime % this.snapToTime)
          timeAtCursor.setHours(0, timeMinutes, 0, 0)
        }

        // If dragging the bottom of the event.
        const dragFromBottom = start < timeAtCursor
        const { event } = dragCreateAnEvent

        event.start = dragFromBottom ? start : timeAtCursor
        event.end = dragFromBottom ? timeAtCursor : start
        event.startTimeMinutes = event.start.getHours() * 60 + event.start.getMinutes()
        event.endTimeMinutes = event.end.getHours() * 60 + event.end.getMinutes()
      }
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

      const oldTitle = event.title
      event.title = e.target.innerHTML
      const cleanEvent = this.cleanupEvent(event)

      this.$emit('event-title-change', { event: cleanEvent, oldTitle })
      this.$emit('event-change', { event: cleanEvent, originalEvent: { ...cleanEvent, title: oldTitle } })
    },

    /**
     * The `mutableEvents` array of events is the source of truth.
     * It is first populated from the `events` prop and every time the `events` prop changes.
     * When the user updates an event through interractions, the event gets updated here.
     * Notes: mutableEvents couldn't be a computed variable based on this.events, because we add
     *        items to the array. (Cannot mutate props)
     */
    updateMutableEvents () {
      // Destructuring class method loses the `this` context.
      // const { formatDateLite, stringToDate, dateToMinutes, countDays } = this.utils.date
      const ud = this.utils.date
      this.mutableEvents = []

      // For each event of the `events` prop, prepare the event for vue-cal:
      // Populate missing keys: start, startDate, startTimeMinutes, end, endTimeMinutes, daysCount.
      // Lots of these variables may look redundant but are here for performance as a cached result of calculation. :)
      this.events.forEach(event => {
        // `event.start` accepts a Date object, or a formatted string, but always convert to Date.
        const start = typeof event.start === 'string' ? ud.stringToDate(event.start) : event.start
        const startDateF = ud.formatDateLite(start)
        const startTimeMinutes = ud.dateToMinutes(start)

        // `event.end` accepts a Date object or a formatted string, but always convert to Date.
        let end = null
        // Safari does not convert new Date(YYYY-MM-DD 24:00) to a valid date. #340.
        if (typeof event.end === 'string' && event.end.includes('24:00')) {
          end = new Date(event.end.replace(' 24:00', ''))
          end.setHours(23, 59, 59, 0) // Sets to the same day at 23.59.59.
        }
        else end = typeof event.end === 'string' ? ud.stringToDate(event.end) : event.end
        let endDateF = ud.formatDateLite(end)
        let endTimeMinutes = ud.dateToMinutes(end)

        // Correct the common practice to end at 00:00 or 24:00 to count a full day.
        if (!endTimeMinutes || endTimeMinutes === minutesInADay) {
          // This also applies on timeless events, all-day events & multiple-day events.
          if (!this.time || (typeof event.end === 'string' && event.end.length === 10)) {
            end.setHours(23, 59, 59, 0) // Sets to the same day at 23.59.59.
          }
          else end.setSeconds(end.getSeconds() - 1) // Sets to the previous day at 23.59.59.
          endDateF = ud.formatDateLite(end)
          endTimeMinutes = minutesInADay
        }

        const multipleDays = startDateF !== endDateF

        event = Object.assign({ ...this.utils.event.eventDefaults }, event, {
          // Keep the event ids scoped to this calendar instance.
          _eid: `${this._.uid}_${this.eventIdIncrement++}`,
          segments: multipleDays ? {} : null,
          start,
          startTimeMinutes,
          end,
          endTimeMinutes,
          daysCount: multipleDays ? ud.countDays(start, end) : 1,
          class: event.class
        })

        this.mutableEvents.push(event)
      })
    },

    /**
     * Get the number of minutes from the top to the mouse cursor.
     *
     * @param {Object} e the native DOM event object.
     * @return {Object} containing { minutes: {Number}, cursorCoords: { x: {Number}, y: {Number} } }
     */
    minutesAtCursor (e) {
      return this.utils.cell.minutesAtCursor(e)
    },

    /**
     * Creates a new event in vue-cal memory (in the mutableEvents array) starting at the given date & time.
     * Proxy method to allow call from cell click & hold or external call (via $refs).
     * Notes: Event duration is by default 2 hours. You can override the event end through eventOptions.
     *
     * @param {String | Date} dateTime date & time at which the event will start.
     * @param {Number} duration the event duration in minutes.
     * @param {Object} eventOptions an object of options to override the event creation defaults.
     *                              (can be any key allowed in an event object)
     * @return {Object} the created event.
     */
    createEvent (dateTime, duration, eventOptions = {}) {
      return this.utils.event.createAnEvent(dateTime, duration, eventOptions)
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
        'segments', 'deletable', 'deleting', 'titleEditable', 'resizable', 'resizing',
        'draggable', 'dragging', 'draggingStatic', 'focused'
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
      if (date && typeof date === 'string') date = this.utils.date.stringToDate(date)
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

      this.$emit('update:selected-date', this.view.selectedDate)
    },

    /**
     * Double checks the week number is correct. Read below to understand!
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
      const ud = this.utils.date
      const firstCellWeekNumber = this.firstCellDateWeekNumber
      const currentWeekNumber = firstCellWeekNumber + weekFromFirstCell
      const modifier = this.startWeekOnSunday ? 1 : 0

      if (currentWeekNumber > 52) {
        return ud.getWeek(ud.addDays(this.view.firstCellDate, 7 * weekFromFirstCell + modifier))
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
     * Updates the localized texts in use in the Date prototypes. (E.g. new Date().format())
     * Callable from outside of Vue Cal.
     */
    updateDateTexts () {
      this.utils.date.updateTexts(this.texts)
    },

    /**
     * On Windows devices, the .vuecal__bg's vertical scrollbar takes space and pushes the content.
     * This function will also push the weekdays-headings and all-day bar to have them properly aligned.
     * The calculated style will be placed in the document head in a style tag so it's only done once
     * (the scrollbar width never changes).
     * Ref. https://github.com/antoniandre/vue-cal/issues/221
     */
    alignWithScrollbar () {
      // If already done from another instance, exit.
      if (document.getElementById('vuecal-align-with-scrollbar')) return

      const bg = this.$refs.vuecal.getElementsByClassName('vuecal__scrollbar-check')[0]
      const scrollbarWidth = bg.offsetWidth - bg.children[0].offsetWidth

      // Only add a style tag once and if a scrollbar width is detected.
      if (scrollbarWidth) {
        const style = document.createElement('style')
        style.id = 'vuecal-align-with-scrollbar'
        style.type = 'text/css'
        style.innerHTML = `.vuecal--view-with-time .vuecal__weekdays-headings,.vuecal--view-with-time .vuecal__all-day {padding-right: ${scrollbarWidth}px}`
        document.head.appendChild(style)
      }
    },

    /**
     * Tells wether there are events in the given cell or split and returns a Boolean.
     * This function simplifies the template.
     *
     * @param {Array} events The cell events.
     * @param {Object|Boolean} split The current split object if any or false.
     * @return {Boolean} true if there are events, false otherwise.
     */
    cellOrSplitHasEvents (events, split = null) {
      return events.length && ((!split && events.length) || (split && events.some(e => e.split === split.id)))
    }
  },

  created () {
    this.utils.cell = new CellUtils(this)
    this.utils.event = new EventUtils(this, this.utils.date)

    this.loadLocale(this.locale)

    if (this.editEvents.drag) this.loadDragAndDrop()

    // Init the array of events, then keep listening for changes in watcher.
    this.updateMutableEvents(this.events)

    this.view.id = this.currentView
    if (this.selectedDate) this.updateSelectedDate(this.selectedDate)
    else {
      this.view.selectedDate = new Date()
      this.switchView(this.currentView)
    }

    // Timers are expensive, this should only trigger on demand.
    if (this.time && this.watchRealTime) {
      // Snap the time ticker on sharp minutes (when seconds = 0), so that we can set
      // the time ticker interval to 60 seconds and spare some function calls.
      this.timeTickerIds[0] = setTimeout(this.timeTick, (60 - this.now.getSeconds()) * 1000)
    }
  },

  mounted () {
    const ud = this.utils.date
    const hasTouch = 'ontouchstart' in window
    const { resize, drag, create, delete: deletable, title } = this.editEvents
    const hasEventClickHandler = this.onEventClick && typeof this.onEventClick === 'function'

    // If event is editable in any way add a mouseup event handler.
    if (resize || drag || create || deletable || title || hasEventClickHandler) {
      window.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
    }
    if (resize || drag || (create && this.dragToCreateEvent)) {
      window.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, { passive: false })
    }

    if (title) window.addEventListener('keyup', this.onKeyUp)

    // Disable context menu on touch devices on the whole vue-cal instance.
    if (hasTouch) {
      this.$refs.vuecal.oncontextmenu = function (e) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    // https://github.com/antoniandre/vue-cal/issues/221
    if (!this.hideBody) this.alignWithScrollbar()

    // Emit the `ready` event with useful parameters.
    const startDate = this.view.startDate
    const params = {
      view: this.view.id,
      startDate,
      endDate: this.view.endDate,
      ...(this.isMonthView ? { firstCellDate: this.view.firstCellDate, lastCellDate: this.view.lastCellDate } : {}),
      events: this.view.events.map(this.cleanupEvent),
      ...(this.isWeekView ? { week: ud.getWeek(this.startWeekOnSunday ? ud.addDays(startDate, 1) : startDate) } : {})
    }

    this.$emit('ready', params)
    this.ready = true
  },

  beforeUnmount () {
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
    editEvents () {
      if (this.editableEvents && typeof this.editableEvents === 'object') {
        return {
          title: !!this.editableEvents.title,
          drag: !!this.editableEvents.drag,
          resize: !!this.editableEvents.resize,
          create: !!this.editableEvents.create,
          delete: !!this.editableEvents.delete
        }
      }

      return {
        title: !!this.editableEvents,
        drag: !!this.editableEvents,
        resize: !!this.editableEvents,
        create: !!this.editableEvents,
        delete: !!this.editableEvents
      }
    },
    views () {
      return {
        years: { label: this.texts.years, enabled: !this.disableViews.includes('years') },
        year: { label: this.texts.year, enabled: !this.disableViews.includes('year') },
        month: { label: this.texts.month, enabled: !this.disableViews.includes('month') },
        week: { label: this.texts.week, enabled: !this.disableViews.includes('week') },
        day: { label: this.texts.day, enabled: !this.disableViews.includes('day') }
      }
    },
    currentView () {
      return this.validateView(this.activeView)
    },
    enabledViews () {
      return Object.keys(this.views).filter(view => this.views[view].enabled)
    },
    hasTimeColumn () {
      return this.time && this.isWeekOrDayView
    },
    isShortMonthView () {
      return this.isMonthView && this.eventsOnMonthView === 'short'
    },
    firstCellDateWeekNumber () {
      const ud = this.utils.date
      const date = this.view.firstCellDate
      return ud.getWeek(this.startWeekOnSunday ? ud.addDays(date, 1) : date)
    },
    // For week & day views.
    timeCells () {
      const timeCells = []
      for (let i = this.timeFrom, max = this.timeTo; i < max; i += this.timeStep) {
        timeCells.push({
          hours: Math.floor(i / 60),
          minutes: i % 60,
          label: this.utils.date.formatTime(i, this.TimeFormat), // The texts (3rd param) are given on Vue Cal init.
          value: i
        })
      }

      return timeCells
    },
    TimeFormat () {
      return this.timeFormat || (this.twelveHour ? 'h:mm{am}' : 'HH:mm')
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
      return this.daySplits.length && this.isWeekOrDayView
    },
    hasShortEvents () {
      return this.showAllDayEvents === 'short'
    },
    // Returns the min cell width or the min split width if any.
    cellOrSplitMinWidth () {
      let minWidth = null

      if (this.hasSplits && this.minSplitWidth) minWidth = this.visibleDaysCount * this.minSplitWidth * this.daySplits.length
      else if (this.minCellWidth && this.isWeekView) minWidth = this.visibleDaysCount * this.minCellWidth

      return minWidth
    },
    allDayBar () {
      let height = this.allDayBarHeight || null
      if (height && !isNaN(height)) height += 'px'

      return {
        cells: this.viewCells,
        options: this.$props,
        label: this.texts.allDay,
        shortEvents: this.hasShortEvents,
        daySplits: (this.hasSplits && this.daySplits) || [],
        cellOrSplitMinWidth: this.cellOrSplitMinWidth,
        height
      }
    },
    minTimestamp () {
      let date = null
      if (this.minDate && typeof this.minDate === 'string') date = this.utils.date.stringToDate(this.minDate)
      else if (this.minDate && this.minDate instanceof Date) date = this.minDate
      return date ? date.getTime() : null
    },
    maxTimestamp () {
      let date = null
      if (this.maxDate && typeof this.maxDate === 'string') date = this.utils.date.stringToDate(this.maxDate)
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
      return (
        this.isMonthView ||
        // hasSplits check is important here in case the user toggles the splits but keep minSplitWidth.
        (this.isWeekView && !this.minCellWidth && !(this.hasSplits && this.minSplitWidth)))
    },
    months () {
      return this.texts.months.map(month => ({ label: month }))
    },
    // Validate and fill up the special hours object once for all at root level and not in cell.
    specialDayHours () {
      if (!this.specialHours || !Object.keys(this.specialHours).length) return {}

      return Array(7).fill('').map((cell, i) => {
        let day = this.specialHours[i + 1] || []
        if (!Array.isArray(day)) day = [day]
        cell = []

        day.forEach(({ from, to, class: Class, label }, j) => {
          cell[j] = {
            day: i + 1,
            from: ![null, undefined].includes(from) ? from * 1 : null,
            to: ![null, undefined].includes(to) ? to * 1 : null,
            class: Class || '',
            label: label || ''
          }
        })
        return cell
      })
    },
    viewTitle () {
      const ud = this.utils.date
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
          title = `${this.texts.week} ${ud.getWeek(this.startWeekOnSunday ? ud.addDays(date, 1) : date)} (${formattedMonthYear})`
          break
        }
        case 'day': {
          title = this.utils.date.formatDate(date, this.texts.dateFormat, this.texts)
          break
        }
      }

      return title
    },
    viewCells () {
      const ud = this.utils.date
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
              formattedDate: ud.formatDateLite(startDate),
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
              formattedDate: ud.formatDateLite(startDate),
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
            const startDate = ud.addDays(firstCellDate, i)
            const endDate = new Date(startDate)
            endDate.setHours(23, 59, 59, 0) // End at 23:59:59.
            // To increase performance skip checking isToday if today already found.
            const isToday = !todayFound && ud.isToday(startDate) && !todayFound++

            return {
              startDate,
              formattedDate: ud.formatDateLite(startDate),
              endDate,
              content: startDate.getDate(),
              today: isToday,
              outOfScope: startDate.getMonth() !== month,
              class: `vuecal__cell--day${startDate.getDay() || 7}`
            }
          })

          if (this.hideWeekends || this.hideWeekdays.length) {
            cells = cells.filter(cell => {
              const day = cell.startDate.getDay() || 7 // Put Sunday at position 7 instead of 0.

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
            const startDate = ud.addDays(firstDayOfWeek, i)
            const endDate = new Date(startDate)
            endDate.setHours(23, 59, 59, 0) // End at 23:59:59.
            const dayOfWeek = (startDate.getDay() || 7) - 1 // Day of the week from 0 to 6 with 6 = Sunday.

            return {
              startDate,
              formattedDate: ud.formatDateLite(startDate),
              endDate,
              // To increase performance skip checking isToday if today already found.
              today: !todayFound && ud.isToday(startDate) && !todayFound++,
              specialHours: this.specialDayHours[dayOfWeek] || []
            }
          }).filter((cell, i) => !weekDays[i].hide)
          break
        }
        case 'day': {
          const startDate = this.view.startDate
          const endDate = new Date(this.view.startDate)
          endDate.setHours(23, 59, 59, 0) // End at 23:59:59.
          const dayOfWeek = (startDate.getDay() || 7) - 1 // Day of the week from 0 to 6 with 6 = Sunday.

          cells = [{
            startDate,
            formattedDate: ud.formatDateLite(startDate),
            endDate,
            today: ud.isToday(startDate),
            specialHours: this.specialDayHours[dayOfWeek] || []
          }]
          break
        }
      }
      return cells
    },
    // Only when hiding weekdays on month and week views.
    visibleDaysCount () {
      if (this.isDayView) return 1
      return 7 - this.weekDays.reduce((total, day) => total + day.hide, 0)
    },
    cellWidth () {
      return 100 / this.visibleDaysCount
    },
    cssClasses () {
      const { resizeAnEvent, dragAnEvent, dragCreateAnEvent } = this.domEvents
      return {
        [`vuecal--${this.view.id}-view`]: true,
        [`vuecal--${this.locale}`]: this.locale,
        'vuecal--no-time': !this.time,
        'vuecal--view-with-time': this.hasTimeColumn,
        'vuecal--week-numbers': this.showWeekNumbers && this.isMonthView,
        'vuecal--twelve-hour': this.twelveHour,
        'vuecal--click-to-navigate': this.clickToNavigate,
        'vuecal--hide-weekends': this.hideWeekends,
        'vuecal--split-days': this.hasSplits,
        'vuecal--sticky-split-labels': this.hasSplits && this.stickySplitLabels,
        'vuecal--overflow-x': (this.minCellWidth && this.isWeekView) || (this.hasSplits && this.minSplitWidth),
        'vuecal--small': this.small,
        'vuecal--xsmall': this.xsmall,
        'vuecal--resizing-event': resizeAnEvent._eid,
        'vuecal--drag-creating-event': dragCreateAnEvent.event,
        'vuecal--dragging-event': dragAnEvent._eid,
        'vuecal--events-on-month-view': this.eventsOnMonthView,
        'vuecal--short-events': this.isMonthView && this.eventsOnMonthView === 'short',
        'vuecal--has-touch': typeof window !== 'undefined' && 'ontouchstart' in window
      }
    },
    isYearsOrYearView () {
      return ['years', 'year'].includes(this.view.id)
    },
    isYearsView () {
      return this.view.id === 'years'
    },
    isYearView () {
      return this.view.id === 'year'
    },
    isMonthView () {
      return this.view.id === 'month'
    },
    isWeekOrDayView () {
      return ['week', 'day'].includes(this.view.id)
    },
    isWeekView () {
      return this.view.id === 'week'
    },
    isDayView () {
      return this.view.id === 'day'
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
    },
    activeView (newVal) {
      this.switchView(newVal)
    }
  }
}
</script>
