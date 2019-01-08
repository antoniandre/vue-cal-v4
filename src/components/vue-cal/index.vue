<template lang="pug">
  .vuecal__flex.vuecal(column :class="cssClasses" :lang="locale")
    .vuecal__header
      ul.vuecal__flex.vuecal__menu(v-if="!hideViewSelector")
        li(:class="{ active: view.id === id }" v-for="(v, id) in views" v-if="v.enabled" @click="switchView(id)") {{ v.label }}
      .vuecal__title(v-if="!hideNavigator")
        .vuecal__arrow.vuecal__arrow--prev(@click="previous")
          slot(name="arrowPrev")
            i.angle
        slot(name="title" :title="viewTitle" :view="view")
          span(:class="{ clickable: !!broaderView }" @click="switchToBroaderView()") {{ viewTitle }}
        .vuecal__arrow.vuecal__arrow--next(@click="next")
          slot(name="arrowNext")
            i.angle
      .vuecal__flex.vuecal__weekdays-headings(v-if="viewHeadings.length && !(hasSplits && view.id === 'week')")
        .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in viewHeadings" :key="i" :style="weekdayCellStyles")
          span(v-for="j in 3" :key="j") {{ heading['label' + j]}}
          span(v-if="heading.label4") &nbsp;
          span(v-if="heading.label4") {{ heading.label4 }}

    .vuecal__flex.vuecal__body(grow)
      div(:class="{ vuecal__flex: !hasTimeColumn }" style="min-width: 100%")
        .vuecal__bg(grow)
          .vuecal__time-column(v-if="time && ['week', 'day'].indexOf(view.id) > -1")
            .vuecal__time-cell(v-for="(cell, i) in timeCells" :key="i" :style="`height: ${timeCellHeight}px`")
              slot(name="time-cell" :hours="cell.hours" :minutes="cell.minutes")
                span.line {{ cell.label }}

          .vuecal__flex.vuecal__cells(grow :column="hasSplits && view.id === 'week'")
            //- Only for splitDays.
            .vuecal__flex.vuecal__weekdays-headings(v-if="hasSplits && view.id === 'week'")
              .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in viewHeadings" :key="i" :style="weekdayCellStyles")
                span(v-for="j in 3" :key="j") {{ heading['label' + j]}}
                span(v-if="heading.label4") &nbsp;
                span(v-if="heading.label4") {{ heading.label4 }}

            .vuecal__flex(v-if="hasSplits" grow)
              vuecal-cell(:class="cell.class" v-for="(cell, i) in viewCells" :key="i" :date="cell.date" :formatted-date="cell.formattedDate" :today="cell.today" :content="cell.content" :splits="splitDays" @click.native="selectCell(cell)" @dblclick.native="dblClickToNavigate && switchToNarrowerView()")
            //- Only for not splitDays.
            vuecal-cell(:class="cell.class" v-else v-for="(cell, i) in viewCells" :key="i" :date="cell.date" :formatted-date="cell.formattedDate" :today="cell.today" :content="cell.content" @click.native="selectCell(cell)" @dblclick.native="dblClickToNavigate && switchToNarrowerView()")
</template>

<script>
import { now, isDateToday, getPreviousMonday, getDaysInMonth, formatDate, formatTime } from './date-utils'
import Cell from './cell'

export default {
  name: 'vue-cal',
  components: { 'vuecal-cell': Cell },
  props: {
    locale: {
      type: String,
      default: 'en'
    },
    hideViewSelector: {
      type: Boolean,
      default: false
    },
    hideNavigator: {
      type: Boolean,
      default: false
    },
    hideWeekends: {
      type: Boolean,
      default: false
    },
    disableViews: {
      type: Array,
      default: () => []
    },
    defaultView: {
      type: String,
      default: 'week'
    },
    selectedDate: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    },
    xsmall: {
      type: Boolean,
      default: false
    },
    clickToNavigate: {
      type: Boolean,
      default: false
    },
    dblClickToNavigate: {
      type: Boolean,
      default: true
    },
    time: {
      type: Boolean,
      default: true
    },
    timeFrom: {
      type: Number,
      default: 0 // In minutes.
    },
    timeTo: {
      type: Number,
      default: 24 * 60 // In minutes.
    },
    timeStep: {
      type: Number,
      default: 60 // In minutes.
    },
    timeCellHeight: {
      type: Number,
      default: 40 // In pixels.
    },
    '12Hour': {
      type: Boolean,
      default: false
    },
    'timeFormat': {
      type: String,
      default: ''
    },
    minCellWidth: {
      type: Number,
      default: 0
    },
    splitDays: {
      type: Array,
      default: () => []
    },
    events: {
      type: Array,
      default: () => []
    },
    editableEvents: {
      type: Boolean,
      default: false
    },
    noEventOverlaps: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    ready: false,
    now,
    view: {
      id: '',
      title: '',
      startDate: null,
      selectedDate: null
    },
    eventIdIncrement: 1,
    domEvents: {
      resizeAnEvent: {
        eventId: null, // Only one at a time.
        start: null,
        originalHeight: 0,
        newHeight: 0
      },
      dragAnEvent: {
        eventId: null // Only one at a time.
      },
      focusAnEvent: {
        eventId: null // Only one at a time.
      },
      clickHoldAnEvent: {
        eventId: null, // Only one at a time.
        timeout: 1200,
        timeoutId: null
      },
      dblTapACell: {
        taps: 0,
        timeout: 500
      }
    },
    mutableEvents: {} // An indexed array of mutable events updated each time given events array changes.
  }),

  methods: {
    previous () {
      switch (this.view.id) {
        case 'years':
          this.switchView(this.view.id, new Date(this.view.startDate.getFullYear() - 25, 0, 1))
          break
        case 'year':
          const firstDayOfYear = new Date(this.view.startDate.getFullYear() - 1, 1, 1)
          this.switchView(this.view.id, firstDayOfYear)
          break
        case 'month':
          const firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() - 1, 1)
          this.switchView(this.view.id, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfPrevWeek = getPreviousMonday(this.view.startDate).subtractDays(7)
          this.switchView(this.view.id, firstDayOfPrevWeek)
          break
        case 'day':
          const day = this.view.startDate.subtractDays(1)
          this.switchView(this.view.id, day)
          break
      }
    },

    next () {
      switch (this.view.id) {
        case 'years':
          this.switchView(this.view.id, new Date(this.view.startDate.getFullYear() + 25, 0, 1))
          break
        case 'year':
          const firstDayOfYear = new Date(this.view.startDate.getFullYear() + 1, 0, 1)
          this.switchView(this.view.id, firstDayOfYear)
          break
        case 'month':
          const firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() + 1, 1)
          this.switchView(this.view.id, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfNextWeek = getPreviousMonday(this.view.startDate).addDays(7)
          this.switchView(this.view.id, firstDayOfNextWeek)
          break
        case 'day':
          const day = this.view.startDate.addDays(1)
          this.switchView(this.view.id, day)
          break
      }
    },

    switchToBroaderView () {
      if (this.broaderView) this.switchView(this.broaderView)
    },

    switchToNarrowerView () {
      let views = Object.keys(this.views)
      views = views.slice(views.indexOf(this.view.id) + 1)
      const view = views.find(v => this.views[v].enabled)

      if (view) this.switchView(view)
    },

    switchView (view, date = null) {
      this.view.id = view

      if (!date) {
        date = this.view.selectedDate || this.view.startDate
        if (view === 'week') date = getPreviousMonday(date)
      }

      switch (view) {
        case 'years':
          // Always fill first cell with a multiple of 25 years, E.g. year 2000, or 2025.
          this.view.startDate = new Date(Math.floor(date.getFullYear() / 25) * 25 || 2000, 0, 1)
          break
        case 'year':
          this.view.startDate = new Date(date.getFullYear(), 0, 1)
          break
        case 'month':
          this.view.startDate = new Date(date.getFullYear(), date.getMonth(), 1)
          break
        case 'week':
        case 'day':
          this.view.startDate = date
          break
      }

      if (this.ready) {
        let params = { view, startDate: this.view.startDate }
        if (view === 'week') params.week = this.view.startDate.getWeek()
        this.$emit('view-change', params)
      }
    },

    findAncestor (el, Class) {
      while ((el = el.parentElement) && !el.classList.contains(Class));
      return el
    },

    isDOMElementAnEvent (el) {
      return el.classList.contains('vuecal__event') || this.findAncestor(el, 'vuecal__event')
    },

    selectCell (cell) {
      if (this.view.selectedDate.toString() !== cell.date.toString()) {
        this.view.selectedDate = cell.date
        this.$emit('day-focus', cell.date)
      }

      // Switch to narrower view.
      if (this.clickToNavigate) this.switchToNarrowerView()

      // Handle double click manually for touch devices.
      else if (this.dblClickToNavigate && 'ontouchstart' in window) {
        this.domEvents.dblTapACell.taps++

        setTimeout(() => (this.domEvents.dblTapACell.taps = 0), this.domEvents.dblTapACell.timeout)

        if (this.domEvents.dblTapACell.taps >= 2) {
          this.domEvents.dblTapACell.taps = 0
          this.switchToNarrowerView()
        }
      }
    },

    // Event resizing is started in cell component (onMouseDown) but place onMouseMove & onMouseUp
    // handlers in the single parent for performance.
    onMouseMove (e) {
      let resizeAnEvent = this.domEvents.resizeAnEvent
      if (resizeAnEvent.eventId === null) return

      e.preventDefault()
      const y = 'ontouchstart' in window ? e.touches[0].clientY : e.clientY
      resizeAnEvent.newHeight = resizeAnEvent.originalHeight + (y - resizeAnEvent.start)
    },

    onMouseUp (e) {
      let focusAnEvent = this.domEvents.focusAnEvent
      let resizeAnEvent = this.domEvents.resizeAnEvent
      let clickHoldAnEvent = this.domEvents.clickHoldAnEvent

      // On event resize end, emit event.
      if (resizeAnEvent.eventId) {
        let event = this.mutableEvents[resizeAnEvent.eventStartDate].find(item => item.id === resizeAnEvent.eventId)
        this.emitWithEvent('event-change', event)
        this.emitWithEvent('event-duration-change', event)
      }

      // If not mouse up on an event, unfocus any event except if just dragged.
      if (!this.isDOMElementAnEvent(e.target) && !resizeAnEvent.eventId) {
        focusAnEvent.eventId = null // Cancel event focus.
        clickHoldAnEvent.eventId = null // Hide delete button.
      }

      // Prevent showing delete button if click and hold was not long enough.
      // Click & hold timeout happens in onMouseDown() in cell component.
      if (clickHoldAnEvent.timeoutId && !clickHoldAnEvent.eventId) {
        clearTimeout(clickHoldAnEvent.timeoutId)
        clickHoldAnEvent.timeoutId = null
      }

      // Any mouse up must cancel event resizing.
      resizeAnEvent.eventId = null
      resizeAnEvent.start = null
      resizeAnEvent.originalHeight = null
      resizeAnEvent.newHeight = null
    },

    // Object of arrays of events indexed by dates.
    updateMutableEvents () {
      // eslint-disable-next-line
      this.mutableEvents = {}

      // Group events into dates.
      this.events.map(event => {
        const [startDate, startTime = ''] = event.start.split(' ')
        const [hoursStart, minutesStart] = startTime.split(':')
        const startTimeMinutes = parseInt(hoursStart) * 60 + parseInt(minutesStart)

        const [endDate, endTime = ''] = event.end.split(' ')
        const [hoursEnd, minutesEnd] = endTime.split(':')
        const endTimeMinutes = parseInt(hoursEnd) * 60 + parseInt(minutesEnd)

        // Keep the event ids scoped to this calendar instance.
        // eslint-disable-next-line
        let id = `${this._uid}_${this.eventIdIncrement++}`

        event = Object.assign({}, event, {
          id,
          startDate,
          endDate,
          startTime,
          startTimeMinutes,
          endTime,
          endTimeMinutes,
          height: 0,
          top: 0,
          overlapped: {},
          overlapping: {},
          simultaneous: {},
          classes: {
            [event.class]: true,
            'vuecal__event--background': event.background
          }
        })

        // Make array reactive for future events creations & deletions.
        if (!(event.startDate in this.mutableEvents)) this.$set(this.mutableEvents, event.startDate, [])
        // eslint-disable-next-line
        this.mutableEvents[event.startDate].push(event)

        return event
      })
    },

    emitWithEvent (eventName, event) {
      // Delete vue-cal specific props instead of returning a set of props so user
      // can place whatever they want inside an event and see it returned.
      let evt = { ...event }
      delete evt.height
      delete evt.top
      delete evt.overlapped
      delete evt.overlapping
      delete evt.simultaneous
      delete evt.classes

      // Return date objects for easy manipulation.
      const [date1, time1] = evt.start.split(' ')
      const [y1, m1, d1] = (date1 && date1.split('-')) || [0, 0, 0]
      let [h1, min1] = (time1 && time1.split(':')) || [0, 0]
      evt.startDate = new Date(y1, parseInt(m1) - 1, d1, h1, min1)

      const [date2, time2] = evt.end.split(' ')
      const [y2, m2, d2] = (date2 && date2.split('-')) || [0, 0, 0]
      let [h2, min2] = (time2 && time2.split(':')) || [0, 0]
      evt.endDate = new Date(y2, parseInt(m2) - 1, d2, h2, min2)

      this.$emit(eventName, evt)
    }
  },

  created () {
    // Init the array of events, then keep listening for changes in watcher.
    this.updateMutableEvents(this.events)

    if (this.selectedDate) {
      let [, y, m, d, h = 0, min = 0] = this.selectedDate.match(/(\d{4})-(\d{2})-(\d{2})(?: (\d{2}):(\d{2}))?/)
      this.view.selectedDate = new Date(y, parseInt(m) - 1, d, h, min)
    } else {
      this.view.selectedDate = this.now
    }

    this.switchView(this.defaultView)
  },

  mounted () {
    if (this.editableEvents && this.time) {
      const hasTouch = 'ontouchstart' in window
      window.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, { passive: false })
      window.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
    }

    this.$emit('ready')
    this.ready = true
  },

  computed: {
    texts () {
      return require(`./i18n/${this.locale}.json`)
    },
    views () {
      return {
        years: { label: this.texts.years, enabled: this.disableViews.indexOf('years') === -1 },
        year: { label: this.texts.year, enabled: this.disableViews.indexOf('year') === -1 },
        month: { label: this.texts.month, enabled: this.disableViews.indexOf('month') === -1 },
        week: { label: this.texts.week, enabled: this.disableViews.indexOf('week') === -1 },
        day: { label: this.texts.day, enabled: this.disableViews.indexOf('day') === -1 }
      }
    },
    broaderView () {
      let views = Object.keys(this.views)
      views = views.slice(0, views.indexOf(this.view.id))
      views.reverse()

      return views.find(v => this.views[v].enabled)
    },
    hasTimeColumn () {
      return this.time && ['week', 'day'].indexOf(this.view.id) > -1
    },
    // For week & day views.
    timeCells () {
      let timeCells = []
      for (let i = this.timeFrom, max = this.timeTo; i < max; i += this.timeStep) {
        timeCells.push({
          hours: Math.floor(i / 60),
          minutes: i % 60,
          label: formatTime(i, this.timeFormat || (this['12Hour'] ? 'h:mm{am}' : 'HH:mm')),
          value: i
        })
      }

      return timeCells
    },
    // Whether the current view has days splits.
    hasSplits () {
      return !!this.splitDays.length && ['week', 'day'].indexOf(this.view.id) > -1
    },
    weekDays () {
      return this.texts.weekDays.map(day => ({ label: day }))
    },
    months () {
      return this.texts.months.map(month => ({ label: month }))
    },
    viewTitle () {
      let title = ''
      const date = this.view.startDate
      const year = date.getFullYear()
      const month = date.getMonth()

      switch (this.view.id) {
        case 'years':
          title = this.texts.years
          break
        case 'year':
          title = year
          break
        case 'month':
          title = `${this.months[month].label} ${year}`
          break
        case 'week':
          const lastDayOfWeek = date.addDays(6)
          let formattedMonthYear = formatDate(date, this.xsmall ? 'mmm yyyy' : 'mmmm yyyy', this.texts)

          // If week is not ending in the same month it started in.
          if (lastDayOfWeek.getMonth() !== date.getMonth()) {
            let [m1, y1] = formattedMonthYear.split(' ')
            let [m2, y2] = formatDate(lastDayOfWeek, this.xsmall ? 'mmm yyyy' : 'mmmm yyyy', this.texts).split(' ')
            formattedMonthYear = y1 === y2 ? `${m1} - ${m2} ${y1}` : `${m1} ${y1} - ${m2} ${y2}`
          }
          title = `${this.texts.week} ${date.getWeek()} (${formattedMonthYear})`
          break
        case 'day':
          title = formatDate(date, this.texts.dateFormat, this.texts)
          break
      }

      return title
    },
    viewHeadings () {
      let headings = []

      switch (this.view.id) {
        case 'month':
        case 'week':
          headings = this.weekDays.slice(0, this.hideWeekends ? 5 : 7).map((cell, i) => {
            return {
              label1: this.locale === 'zh-cn' ? cell.label.substr(0, 2) : cell.label[0],
              label2: this.locale === 'zh-cn' ? cell.label.substr(2) : cell.label.substr(1, 2),
              label3: this.locale === 'zh-cn' ? '' : cell.label.substr(3),
              ...((this.view.id === 'week' && { label4: this.view.startDate.addDays(i).getDate() }) || {})
            }
          })
          break
      }
      return headings
    },
    viewCells () {
      let cells = []
      let fromYear = null
      let todayFound = false

      switch (this.view.id) {
        case 'years':
          fromYear = this.view.startDate.getFullYear()
          cells = Array.apply(null, Array(25)).map((cell, i) => {
            return {
              content: fromYear + i,
              date: new Date(fromYear + i, 0, 1),
              class: {
                current: fromYear + i === this.now.getFullYear(),
                selected: this.view.selectedDate && (fromYear + i) === this.view.selectedDate.getFullYear()
              }
            }
          })
          break
        case 'year':
          fromYear = this.view.startDate.getFullYear()
          cells = Array.apply(null, Array(12)).map((cell, i) => {
            return {
              content: this.xsmall ? this.months[i].label.substr(0, 3) : this.months[i].label,
              date: new Date(fromYear, i, 1),
              class: {
                current: i === this.now.getMonth() && fromYear === this.now.getFullYear(),
                selected: i === this.view.selectedDate.getMonth() && fromYear === this.view.selectedDate.getFullYear()
              }
            }
          })
          break
        case 'month':
          const month = this.view.startDate.getMonth()
          const year = this.view.startDate.getFullYear()
          let days = getDaysInMonth(month, year)
          const firstOfMonthDayOfWeek = days[0].getDay()
          let selectedDateAtMidnight = new Date(this.view.selectedDate.getTime())
          selectedDateAtMidnight.setHours(0, 0, 0, 0)
          todayFound = false
          let nextMonthDays = 0

          // If the first day of the month is not a Monday, prepend missing days to the days array.
          if (days[0].getDay() !== 1) {
            let d = getPreviousMonday(days[0])
            let prevWeek = []
            for (let i = 0; i < 7; i++) {
              prevWeek.push(new Date(d))
              d.setDate(d.getDate() + 1)

              if (d.getDay() === firstOfMonthDayOfWeek) break
            }

            days.unshift(...prevWeek)
          }

          // Create 42 cells (6 rows x 7 days) and populate them with days.
          cells = Array.apply(null, Array(42)).map((cell, i) => {
            const cellDate = days[i] || new Date(year, month + 1, ++nextMonthDays)
            // To increase performance skip checking isToday if today already found.
            const isToday = !todayFound && cellDate && cellDate.getDate() === this.now.getDate() &&
                            cellDate.getMonth() === this.now.getMonth() &&
                            cellDate.getFullYear() === this.now.getFullYear() &&
                            !todayFound++
            const formattedDate = formatDate(cellDate, 'yyyy-mm-dd', this.texts)

            return {
              content: cellDate.getDate(),
              date: cellDate,
              formattedDate,
              today: isToday,
              class: {
                today: isToday,
                'out-of-scope': cellDate.getMonth() !== month,
                selected: this.view.selectedDate && cellDate.getTime() === selectedDateAtMidnight.getTime()
              }
            }
          })

          if (this.hideWeekends) {
            cells = cells.filter(cell => cell.date.getDay() > 0 && cell.date.getDay() < 6)
          }
          break
        case 'week':
          todayFound = false
          let firstDayOfWeek = this.view.startDate

          cells = this.weekDays.slice(0, this.hideWeekends ? 5 : 7).map((cell, i) => {
            const date = firstDayOfWeek.addDays(i)
            const formattedDate = formatDate(date, 'yyyy-mm-dd', this.texts)
            let isToday = !todayFound && isDateToday(date) && !todayFound++

            return {
              date,
              formattedDate,
              today: isToday,
              class: {
                today: isToday,
                selected: this.view.selectedDate && firstDayOfWeek.addDays(i).getTime() === this.view.selectedDate.getTime()
              }
            }
          })
          break
        case 'day':
          const formattedDate = formatDate(this.view.startDate, 'yyyy-mm-dd', this.texts)
          const isToday = isDateToday(this.view.startDate)

          cells = [{
            date: this.view.startDate,
            formattedDate,
            today: isToday,
            class: {
              today: isToday,
              selected: this.view.selectedDate && this.view.startDate.getTime() === this.view.selectedDate.getTime()
            }
          }]
          break
      }
      return cells
    },
    weekdayCellStyles () {
      return { minWidth: `${this.minCellWidth}px` || null }
    },
    cssClasses () {
      return {
        [`vuecal--${this.view.id}-view`]: true,
        [`vuecal--${this.locale}`]: this.locale,
        'vuecal--no-time': !this.time,
        'vuecal--view-with-time': this.hasTimeColumn,
        'vuecal--time-12-hour': this['12Hour'],
        'vuecal--click-to-navigate': this.clickToNavigate,
        'vuecal--hide-weekends': this.hideWeekends,
        'vuecal--split-days': this.splitDays.length,
        'vuecal--overflow-x': this.minCellWidth,
        'vuecal--small': this.small,
        'vuecal--xsmall': this.xsmall,
        'vuecal--no-event-overlaps': this.noEventOverlaps
      }
    }
  },
  watch: {
    events: function (events, oldEvents) {
      this.updateMutableEvents(events)
    }
  }
}
</script>

<style lang="scss">
$time-column-width: 3em;
$time-column-width-12: 4em; // 12-hour clock shows am/pm.
$weekdays-headings-height: 2.8em;

.vuecal {
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 0 1px inset rgba(0, 0, 0, 0.08);

  // Disable user selection everywhere except in events.
  * {user-select: none;}

  // General.
  //==================================//
  .clickable {cursor: pointer;}

  &--xsmall {font-size: 0.9em;}

  &__flex {
    display: flex;
    flex-direction: row;

    &[column] {
      flex-direction: column;
      flex: 1 1 auto;
    }

    &[grow] {
      flex: 1 1 auto;
    }
  }

  // Header.
  //==================================//
  &__menu {
    padding: 0;
    list-style-type: none;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.02);

    li {
      padding: 0.3em 1em;
      height: 2.2em;
      font-size: 1.3em;
      border-bottom: 0 solid currentColor;
      cursor: pointer;
      transition: 0.2s;
    }

    li.active {
      border-bottom-width: 2px;
      background: rgba(255, 255, 255, 0.15);
    }
  }

  &__title {
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    font-size: 1.5em;
    min-height: 2em;

    .vuecal--xsmall & {font-size: 1.3em;}
  }

  &__arrow {
    cursor: pointer;

    &--prev {padding-left: 0.6em;}
    &--next {padding-right: 0.6em;}

    i.angle {
      display: inline-block;
      border: solid currentColor;
      border-width: 0 2px 2px 0;
      padding: 0.25em;
      transform: rotate(-45deg);
    }

    &--prev i.angle {border-width: 2px 0 0 2px;}
  }

  &__weekdays-headings {
    border-bottom: 1px solid #ddd;
    margin-bottom: -1px;

    .vuecal--view-with-time & {
      padding-left: $time-column-width;
    }

    .vuecal--view-with-time.vuecal--time-12-hour & {
      font-size: 0.9em;
      padding-left: $time-column-width-12;
    }

    .vuecal--split-days.vuecal--view-with-time & {
      padding-left: 0;
    }
  }

  &__heading {
    width: 100%;
    height: $weekdays-headings-height;
    font-weight: 400;
    justify-content: center;
    text-align: center;
    align-items: center;

    .vuecal--small & span:nth-child(3) {display: none;}

    .vuecal--xsmall & {flex-direction: column;padding-left: 0;padding-right: 0;}
    .vuecal--xsmall & span:nth-child(2),
    .vuecal--xsmall & span:nth-child(3),
    .vuecal--xsmall & span:nth-child(4) {display: none;}
  }

  // Calendar body.
  //==================================//
  &__body {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    min-height: 60px;
  }

  &__bg {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    margin-bottom: 1px;
  }

  &--no-time &__bg {
    display: block;
  }

  &__time-column {
    width: $time-column-width;
    height: 100%;
    border-right: 1px solid #eee;
    margin-right: -1px;

    .vuecal--time-12-hour & {
      width: $time-column-width-12;
      font-size: 0.9em;
    }

    .vuecal--split-days.vuecal--week-view & {
      margin-top: $weekdays-headings-height;
    }

    .vuecal__time-cell {
      color: #999;
      text-align: right;
      padding-right: 2px;
      font-size: 0.9em;

      .line:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        border-top: 1px solid #eee;
      }
    }
  }

  // Calendar cells.
  //==================================//
  &__cells {
    flex-wrap: wrap;
    min-height: 100%;
    margin: 0 1px 1px 0;

    .vuecal--split-days.vuecal--week-view & {
      flex-wrap: nowrap;
      overflow: auto;
    }
  }
}

// Themes.
//==================================//
.vuecal--green-theme {
  .vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;color: #fff;}
  .vuecal__menu li {border-bottom-color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title {background-color: #e4f5ef;}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  &:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
}

.vuecal--blue-theme {
  .vuecal__menu, .vuecal__cell-events-count {background-color: rgba(66, 163, 185, 0.8);color: #fff;}
  .vuecal__menu li {border-bottom-color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title {background-color: rgba(0, 165, 188, 0.3);}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  &:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 253, 255, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(115, 191, 204, 0.5);}
}

// Rounded cells.
.vuecal--rounded-theme {
  .vuecal__weekdays-headings {border: none;}
  .vuecal__cell, &:not(.vuecal--day-view) .vuecal__cell:before {background: none;border: none;}
  .vuecal__cell.out-of-scope {opacity: 0.4;}
  .vuecal__cell-content {
    width: 32px;
    height: 32px;
    border: 1px solid transparent;
    color: #333;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.vuecal--day-view .vuecal__cell-content {width: auto;background: none;}
  &.vuecal--year-view .vuecal__cell {width: 33.33%;}
  &.vuecal--year-view .vuecal__cell-content {width: 85px;}
  &.vuecal--years-view .vuecal__cell-content {width: 52px;}
  .vuecal__cell {background-color: transparent !important;}

  &.vuecal--green-theme {
    &:not(.vuecal--day-view) .vuecal__cell-content {background-color: #f1faf7;}
    &:not(.vuecal--day-view) .vuecal__cell.today .vuecal__cell-content {background-color: #42b983;color: #fff;}
    .vuecal--day-view .vuecal__cell.today:before {background-color: rgba(66, 185, 131, 0.05);}
    &:not(.vuecal--day-view) .selected .vuecal__cell-content {border-color: #42b983;}
  }

  &.vuecal--blue-theme {
    &:not(.vuecal--day-view) .vuecal__cell-content {background-color: rgba(100, 182, 255, 0.2);}
    &:not(.vuecal--day-view) .vuecal__cell.today .vuecal__cell-content {background-color: #8fb7e4;color: #fff;}
    .vuecal--day-view .vuecal__cell.today:before {background-color: rgba(143, 183, 228, 0.1);}
    &:not(.vuecal--day-view) .selected .vuecal__cell-content {border-color: #61a9e0;}
  }
}

// Media queries.
//==================================//
@media screen and(max-width: 550px) {
  .vuecal__heading {
    padding-left: 1.5em;
    padding-right: 1.5em;
    line-height: 1.2;

    .vuecal--week-view & span:nth-child(3) {display: none;}
    .vuecal--view-with-time.vuecal--week-view.vuecal--overflow-x & span:nth-child(3) {display: inline-block;}

    // Chinese language.
    .vuecal--month-view.vuecal--zh-cn & {padding: 0;}
    .vuecal--week-view.vuecal--zh-cn & span:nth-child(1) {display: none;}
  }
}

@media screen and(max-width: 450px) {
  .vuecal__heading {
    padding-left: 1.4em;
    padding-right: 1.4em;

    span:nth-child(3) {display: none;}
  }

  .vuecal__menu li {padding-left: 0.3em;padding-right: 0.3em;}
}

@media screen and(max-width: 350px) {
  .vuecal__heading {
    flex-wrap: wrap;
    padding-left: 0.2em;
    padding-right: 0.2em;

    .vuecal--week-view:not(.vuecal--overflow-x) & {
      flex-direction: column;
      padding-left: 0;
      padding-right: 0;
    }

    .vuecal--week-view & span:nth-child(2),
    .vuecal--small & span:nth-child(2) {display: none;}

    span:nth-child(3) {display: none;}

    .vuecal--week-view & span:nth-child(4),
    .vuecal--small & span:nth-child(4) {display: none;}

    .vuecal--week-view.vuecal--overflow-x & span:nth-child(2),
    .vuecal--week-view.vuecal--overflow-x & span:nth-child(3),
    .vuecal--week-view.vuecal--overflow-x & span:nth-child(4) {display: inline-block;}

    // Chinese language.
    .vuecal--month-view.vuecal--zh-cn & span:nth-child(1),
    .vuecal--week-view.vuecal--zh-cn & span:nth-child(1) {display: none;}
    .vuecal--month-view.vuecal--zh-cn & span:nth-child(2),
    .vuecal--week-view.vuecal--zh-cn & span:nth-child(2) {display: block;}
  }
  .vuecal__menu li {font-size: 1.1em;}
}

</style>
