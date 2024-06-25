import { ref, computed, watch } from 'vue'

export const useView = vuecal => {
  const now = new Date()
  const { config, dateUtils, emit, texts } = vuecal
  const { sm, xs, availableViews, defaultView, props } = config
  const viewId = ref(props.view && availableViews[props.view] ? props.view : defaultView)
  const selectedDate = ref(props.selectedDate || null)
  // The view date is the one given in prop. It can be any date within the view that will be
  // computed around it - not necessarily the first day of the view range.
  // E.g. [startDate, ..., viewDate, ..., endDate]
  const viewDate = ref(new Date(props.viewDate || now))
  viewDate.value.setHours(0, 0, 0, 0)
  const startDate = ref(viewDate)
  const events = ref([])

  // Transition when switching view. left when going toward the past, right when going toward future.
  const transitionDirection = ref('right')

  const title = computed(() => {
    const { dateFormat, truncations } = texts.value

    switch (viewId.value) {
      case 'day':
        return dateUtils.formatDate(startDate.value, dateFormat)
      case 'days': {
        let format = dateFormat.replace(/(\s|^)[^a-zA-Z]*?d{2,4}[^a-zA-Z]*?(\s|$)/, '') // Remove week day.
        // Always shorten month if the locale doesn't forbid it.
        if (truncations !== false) format = format.replace('MMMM', 'MMM')
        const startDateFormatted = dateUtils.formatDate(startDate.value, format)
        const endDateFormatted = dateUtils.formatDate(endDate.value, format)

        return `${startDateFormatted} - ${endDateFormatted}`
      }
      case 'week': {
        const weekNumber = dateUtils.getWeek(startDate.value, props.startWeekOnSunday && !config.hideWeekends)
        // Shorten month if xs and the locale doesn't forbid it.
        const format = `${xs && truncations !== false ? 'MMM' : 'MMMM'} YYYY`
        return dateUtils.formatDate(startDate.value, format) + ` <small>${texts.value.week} ${weekNumber}</small>`
      }
      case 'month': {
        // Shorten month if xs and the locale doesn't forbid it.
        const format = `${xs && truncations !== false ? 'MMM' : 'MMMM'} YYYY`
        return dateUtils.formatDate(startDate.value, format)
      }
      case 'year':
        return startDate.value.getFullYear()
      case 'years':
        return `${startDate.value.getFullYear()} - ${endDate.value.getFullYear()}`
    }
  })

  const cols = computed(() => {
    // Includes all the weekdays, but some may need to be hidden.
    const fullUsualCols = config.availableViews[viewId.value].cols
    return fullUsualCols - (config.hideWeekends && ['week', 'month'].includes(viewId.value) ? 2 : 0)
  })
  const rows = computed(() => config.availableViews[viewId.value].rows)

  // Create as many grid cells as defined in the availableViews map (cols * rows).
  const cellsCount = computed(() => cols.value * rows.value)

  const firstCellDate = computed(() => {
    if (viewId.value === 'month') {
      // By default, the month view has 6 rows of 7 days. If the first day of the month is not
      // a Monday (or Sunday if startWeekOnSunday), then pad the preceding cells with days from the
      // previous month. E.g.
      // M  T  W  T  F  S  S
      // 28 29 30 1  2  3  4
      let dayOfWeek = startDate.value.getDay()
      console.log(config.hideWeekends)
      if (!props.startWeekOnSunday || config.hideWeekends) dayOfWeek = (!dayOfWeek ? 7 : dayOfWeek) - 1 // Returns a day of week in range 0-6 starting from Monday.
      return dateUtils.subtractDays(startDate.value, dayOfWeek)
    }
    else return startDate.value
  })

  // Generates an array of dates for each cell in the view: 1 cell = 1 date range [start, end].
  // IMPORTANT NOTES:
  // - Better performance here than in each cell.
  // - This computed should only manage pure dates: no text, no event, nothing likely to be
  //   triggering recomputing due to a change in the reactivity chain.
  //   Every recomputing can become very expensive when handling a large amount of cells per view
  //   with a large amount of calendar events.
  const dates = computed(() => {
    console.log('recomputing view dates')
    const dates = []
    // Every time a weekday is removed from the generated array of cells dates, this modifier is
    // incremented so we always keep the number of cells specified in the availableViews object.
    let modifier = 0

    for (let i = 0; i < (cellsCount.value + modifier); i++) {
      switch (viewId.value) {
        case 'day':
        case 'days':
        case 'week':
        case 'month': {
          const start = dateUtils.addDays(firstCellDate.value, i)
          const isWeekend = [0, 6].includes(start.getDay())

          // If hiding weekend and the current cell is a Saturday or Sunday skip it and add one
          // more date at the end to fill up the cells.
          if (config.hideWeekends && viewId.value !== 'day' && isWeekend) {
            modifier++
            continue
          }

          const end = new Date(start)
          end.setHours(23, 59, 59, 999)
          dates.push({ start, end })
          break
        }
        case 'year':
          dates.push({
            start: new Date(firstCellDate.value.getFullYear(), i, 1, 0, 0, 0, 0),
            end: new Date(firstCellDate.value.getFullYear(), i + 1, 0, 23, 59, 59, 999)
          })
          break
        case 'years':
          dates.push({
            start: new Date(firstCellDate.value.getFullYear() + i, 0, 1, 0, 0, 0, 0),
            end: new Date(firstCellDate.value.getFullYear() + i + 1, 0, 0, 23, 59, 59, 999)
          })
          break
      }
    }

    return dates
  })

  const lastCellDate = computed(() => dates.value[dates.value.length - 1].end)
  const endDate = computed(() => {
    if (viewId.value === 'month') return dates.value.slice(0).reverse().find(({ end }) => end.getMonth() === startDate.value.getMonth() && end.getFullYear() === startDate.value.getFullYear()).end
    else return lastCellDate.value
  })

  const containsToday = computed(() => startDate.value.getTime() <= now.getTime() && now.getTime() <= endDate.value.getTime())

  function updateView () {
    // Potentially wrong date up to this point: needs to be adjusted to each view.
    startDate.value = new Date(viewDate.value || now)
    startDate.value.setHours(0, 0, 0, 0)

    switch (viewId.value) {
      case 'days':
      case 'week':
        startDate.value = dateUtils.getPreviousFirstDayOfWeek(startDate.value, props.startWeekOnSunday && !config.hideWeekends)
        break
      case 'month':
        startDate.value = new Date(startDate.value.getFullYear(), startDate.value.getMonth(), 1, 0, 0, 0, 0)
        break
      case 'year':
        startDate.value = new Date(startDate.value.getFullYear(), 0, 1, 0, 0, 0, 0)
        break
      case 'years':
        // The modulo is only here to always cut off at the same years regardless of the current year.
        // E.g. always [1975-1999], [2000-2024], [2025-2099] for the default 5*5 grid.
        startDate.value = new Date(startDate.value.getFullYear() - (startDate.value.getFullYear() % cellsCount.value), 0, 1, 0, 0, 0, 0)
        break
    }
    console.log('🙆‍♂️', 'updateView', startDate.value)
  }

  function switchView (id, emitUpdate = true) {
    const availableViews = Object.keys(config.availableViews)

    if (viewId.value === id) return
    if (availableViews.includes(id)) {
      transitionDirection.value = availableViews.indexOf(id) < availableViews.indexOf(viewId.value) ? 'left' : 'right'
      viewId.value = id
      emit('update:view', id)
      updateView()
    }
    else !!console.warn(`Vue Cal: the \`${id}\` view is not available.`)
  }

  function previous () {
    navigate(false)
  }

  function next () {
    navigate(true)
  }

  function navigate (forward = true) {
    let newViewDate = viewDate.value
    const { cols, rows } = config.availableViews[viewId.value]

    switch (viewId.value) {
      case 'day':
      case 'days':
        newViewDate = new Date(dateUtils[forward ? 'addDays' : 'subtractDays'](newViewDate, cols * rows))
        break
      case 'week': {
        const prevFirstDayOfWeek = dateUtils.getPreviousFirstDayOfWeek(newViewDate, props.startWeekOnSunday && !config.hideWeekends)
        newViewDate = dateUtils[forward ? 'addDays' : 'subtractDays'](prevFirstDayOfWeek, cols * rows)
        break
      }
      case 'month': {
        const increment = forward ? 1 : -1
        newViewDate = new Date(newViewDate.getFullYear(), newViewDate.getMonth() + increment, 1, 0, 0, 0, 0)
        break
      }
      case 'year': {
        const increment = forward ? 1 : -1
        newViewDate = new Date(newViewDate.getFullYear() + increment, 1, 1, 0, 0, 0, 0)
        break
      }
      case 'years': {
        const increment = forward ? cols * rows : - (cols * rows)
        newViewDate = new Date(newViewDate.getFullYear() + increment, 1, 1, 0, 0, 0, 0)
        break
      }
    }

    updateViewDate(newViewDate)
  }

  function goToToday () {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    updateViewDate(today)
  }

  /**
   * Takes the view to a given date.
   * If the date is already in the view range, nothing will
   * happen, unless the forceUpdate bool is set to true. For instance, when switching the
   * startWeekOnSunday, we want to update the view and force the first day of the view to
   * switch between Sunday and Monday, even if it may already be in view.
   *
   * @param {Date} date the new Date to bring to the view.
   * @param {Boolean} emitUpdate emits the update:viewDate event (not wanted from watcher)
   * @param {Boolean} forceUpdate By default if the date is in view range, nothing happens.
   * @returns void
   */
  function updateViewDate (date, emitUpdate = true, forceUpdate = false) {
    if (!dateUtils.isValid(date)) return console.warn('Vue Cal: can\'t navigate to the given date: invalid date provided to `updateViewDate(date)`.')

    // If the provided date is already in the view range, we don't need/want to update the view and
    // recompute all the cells! But if forced (forceUpdate), just do it.
    if (!dateUtils.isInRange(date, startDate.value, endDate.value) || forceUpdate) {
      date.setHours(0, 0, 0, 0)
      transitionDirection.value = date.getTime() < startDate.value.getTime() ? 'left' : 'right'
      viewDate.value = date
      if (emitUpdate) emit('update:viewDate', date)
      updateView()
    }
  }

  function updateSelectedDate (date, emitUpdate = true) {
    if (!dateUtils.isValid(date)) return console.warn('Vue Cal: can\'t update the selected date: invalid date provided to `updateSelectedDate(date)`.')

    else if (!selectedDate.value || !dateUtils.isSameDate(date, selectedDate.value)) {
      date.setHours(0, 0, 0, 0)
      selectedDate.value = date
      if (emitUpdate) emit('update:selectedDate', date)
    }
  }

  /**
   * When switching the startWeekOnSunday prop, update the view.
   *
   * @param {Boolean} bool start the week on Sunday or not.
   */
  function switchWeekStart (bool) {
    if (!bool && !startDate.value.getDay()) updateViewDate(dateUtils.addDays(startDate.value, 1), true, true)
    else updateView()
  }

  /**
   * When toggling the toggleWeekends prop, update the view.
   *
   * @param {Boolean} hide hide weekends or not.
   */
  function toggleWeekends (hide) {
    console.log('😮', hide, props.startWeekOnSunday, startDate.value)
    if (hide && props.startWeekOnSunday && !startDate.value.getDay()) updateViewDate(dateUtils.addDays(startDate.value, 1), true, true)
    else if (!hide && props.startWeekOnSunday && startDate.value.getDay() === 1) updateViewDate(dateUtils.subtractDays(startDate.value, 1), true, true)
  }

  watch(() => props.view, view => switchView(view, false))
  watch(() => config.availableViews.value, updateView)
  watch(() => props.viewDate, date => updateViewDate(date, false))
  watch(() => props.selectedDate, date => updateSelectedDate(date, false))
  watch(() => props.startWeekOnSunday, bool => switchWeekStart(bool))
  watch(() => props.hideWeekends, bool => toggleWeekends(bool))

  updateView()

  // ! \ IMPORTANT NOTE:
  // If the selectedDate prop would be added to the view, any click on any cell
  // (triggering an emit of the selectedDate), would trigger a re-rendering of all the
  // cells of the view.
  return {
    id: viewId,
    title,
    viewDate,
    startDate,
    endDate,
    firstCellDate,
    lastCellDate,
    containsToday,
    selectedDate,
    dates,
    cols,
    rows,
    // All the events are stored in the mutableEvents array, but subset of visible ones are passed
    // Into the current view for fast lookup and manipulation.
    events,
    switch: switchView,
    previous,
    next,
    navigate,
    goToToday,
    updateViewDate,
    updateSelectedDate,
    transitionDirection,
    get isDay () { return viewId.value === 'day' },
    get isDays () { return viewId.value === 'days' },
    get isWeek () { return viewId.value === 'week' },
    get isMonth () { return viewId.value === 'month' },
    get isYear () { return viewId.value === 'year' },
    get isYears () { return viewId.value === 'years' }
  }
}