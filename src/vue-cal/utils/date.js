/**
 * Date Utils & prototypes.
 *
 * Waiting for VS Code to support JavaScript private fields.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields
 * Meantime keep `_` for private.
 */

let now, todayDate, todayF, self
let _dateObject = {}
let _timeObject = {}

export default class DateUtils {
  texts = {}

  constructor (texts, noPrototypes = false) {
    self = this // For use in Date prototypes.
    this._texts = texts

    // Add prototypes ASAP - only once.
    if (!noPrototypes && Date && !Date.prototype.addDays) this._initDatePrototypes()

    // @todo: This would be nicer, but how to set Date.noPrototypes ASAP only if user wants?
    // if (Date.noPrototypes) delete Date.noPrototypes
    // else this._initDatePrototypes()
  }

  _initDatePrototypes () {
    /* eslint-disable no-extend-native */
    Date.prototype.addDays = function (days) { return self.addDays(this, days) }
    Date.prototype.subtractDays = function (days) { return self.subtractDays(this, days) }
    Date.prototype.addHours = function (hours) { return self.addHours(this, hours) }
    Date.prototype.subtractHours = function (hours) { return self.subtractHours(this, hours) }
    Date.prototype.addMinutes = function (minutes) { return self.addMinutes(this, minutes) }
    Date.prototype.subtractMinutes = function (minutes) { return self.subtractMinutes(this, minutes) }
    Date.prototype.getWeek = function () { return self.getWeek(this) }
    Date.prototype.isToday = function () { return self.isToday(this) }
    Date.prototype.isLeapYear = function () { return self.isLeapYear(this) }
    Date.prototype.format = function (format = 'YYYY-MM-DD') { return self.formatDate(this, format) }
    Date.prototype.formatTime = function (format = 'HH:mm') { return self.formatTime(this, format) }
    /* eslint-enable no-extend-native */
  }

  removePrototypes () {
    delete Date.prototype.addDays
    delete Date.prototype.subtractDays
    delete Date.prototype.addHours
    delete Date.prototype.subtractHours
    delete Date.prototype.addMinutes
    delete Date.prototype.subtractMinutes
    delete Date.prototype.getWeek
    delete Date.prototype.isToday
    delete Date.prototype.isLeapYear
    delete Date.prototype.format
    delete Date.prototype.formatTime
  }

  updateTexts (texts) {
    this._texts = texts
  }

  // Cache Today's date (to a maximum) for better isToday() performances. Formatted without leading 0.
  // We still need to update Today's date when Today changes without page refresh.
  _todayFormatted () {
    if (todayDate !== (new Date()).getDate()) {
      now = new Date()
      todayDate = now.getDate()
      todayF = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
    }

    return todayF
  }

  // UTILITIES.
  // ====================================================================
  addDays (date, days) {
    const d = new Date(date.valueOf())
    d.setDate(d.getDate() + days)
    return d
  }

  subtractDays (date, days) {
    const d = new Date(date.valueOf())
    d.setDate(d.getDate() - days)
    return d
  }

  addHours (date, hours) {
    const d = new Date(date.valueOf())
    d.setHours(d.getHours() + hours)
    return d
  }

  subtractHours (date, hours) {
    const d = new Date(date.valueOf())
    d.setHours(d.getHours() - hours)
    return d
  }

  addMinutes (date, minutes) {
    const d = new Date(date.valueOf())
    d.setMinutes(d.getMinutes() + minutes)
    return d
  }

  subtractMinutes (date, minutes) {
    const d = new Date(date.valueOf())
    d.setMinutes(d.getMinutes() - minutes)
    return d
  }

  getWeek (date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  }

  isToday (date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` === this._todayFormatted()
  }

  isLeapYear (date) {
    const year = date.getFullYear()
    return !(year % 400) || (year % 100 && !(year % 4))
  }

  // Returns today if it's FirstDayOfWeek (Monday or Sunday) or previous FirstDayOfWeek otherwise.
  getPreviousFirstDayOfWeek (date = null, weekStartsOnSunday) {
    const prevFirstDayOfWeek = (date && new Date(date.valueOf())) || new Date()
    const dayModifier = weekStartsOnSunday ? 7 : 6
    prevFirstDayOfWeek.setDate(prevFirstDayOfWeek.getDate() - (prevFirstDayOfWeek.getDay() + dayModifier) % 7)
    return prevFirstDayOfWeek
  }

  /**
   * Converts a string to a Javascript Date object. If a Date object is passed, return it as is.
   *
   * @param {String | Date} date the string to convert to Date.
   * @return {Date} the equivalent Javascript Date object.
   */
  stringToDate (date) {
    if (date instanceof Date) return date
    // Regexp way is less performant: https://jsperf.com/string-to-date-regexp-vs-new-date
    // const [, y, m, d, h = 0, min = 0] = date.match(/(\d{4})-(\d{2})-(\d{2})(?: (\d{2}):(\d{2}))?/)
    // return new Date(y, parseInt(m) - 1, d, h, min)

    if (date.length === 10) date += ' 00:00'
    return new Date(date.replace(/-/g, '/')) // replace '-' with '/' for Safari.
  }

  /**
   * Simply takes a Date and returns the associated time in minutes (sum of hours + minutes).
   *
   * @param {Date} date the JavaScript Date to extract minutes from.
   * @return {Number} the number of minutes (total of hours plus minutes plus fractional seconds).
   */
  dateToMinutes = date => date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60

  /**
   * Count the number of days this date range spans onto.
   * E.g. countDays(2019-11-02 18:00, 2019-11-03 02:00) = 2
   *
   * @param {String | Date} start the start date
   * @param {String | Date} end the end date
   * @return {Integer} The number of days this date range involves
   */
  countDays (start, end) {
    // replace '-' with '/' for Safari.
    if (typeof start === 'string') start = start.replace(/-/g, '/')
    if (typeof end === 'string') end = end.replace(/-/g, '/')

    // Set start & end at midnight then compare the delta. Don't modify the original dates.
    start = (new Date(start)).setHours(0, 0, 0, 0)
    // Set end at midnight plus 1 sec, so Math.ceil will round it up to a full day.
    end = (new Date(end)).setHours(0, 0, 1, 0)

    // Remove the potential daylight saving delta.
    const timezoneDiffMs = (new Date(end).getTimezoneOffset() - new Date(start).getTimezoneOffset()) * 60 * 1000
    return Math.ceil((end - start - timezoneDiffMs) / (24 * 3600 * 1000))
  }

  /**
   * Take 2 dates and check if within the same time step (useful in overlapping events).
   *
   * @return {Boolean} `true` if their time is included in the same time step,
   *                   this means these 2 dates are very close.
   */
  datesInSameTimeStep (date1, date2, timeStep) {
    return Math.abs(date1.getTime() - date2.getTime()) <= timeStep * 60 * 1000
  }
  // ====================================================================

  // FORMATTERS.
  // ====================================================================
  /**
   * Formats a date/time to the given format and returns the formatted string.
   *
   * @param {Date} date a JavaScript Date object to format.
   * @param {String} format the wanted format.
   * @param {Object} texts Optional: the localized texts object to override the vue-cal one in this._texts.
   *                       This becomes useful when showing multiple instances with different languages,
   *                       like in the documentation page.
   * @return {String} the formatted date.
   */
  formatDate (date, format = 'YYYY-MM-DD', texts = null) {
    if (!texts) texts = this._texts
    if (!format) format = 'YYYY-MM-DD' // Allows passing null for default format.
    if (format === 'YYYY-MM-DD') return this.formatDateLite(date)

    // Reinit the date and time object on each function call.
    _dateObject = {}
    _timeObject = {}

    // Each keyword is a function to load the dateObject or timeObject on demand: no wasted resource.
    const dateObj = {
      YYYY: () => this._hydrateDateObject(date, texts).YYYY,
      YY: () => this._hydrateDateObject(date, texts).YY(),
      M: () => this._hydrateDateObject(date, texts).M,
      MM: () => this._hydrateDateObject(date, texts).MM(),
      MMM: () => this._hydrateDateObject(date, texts).MMM(),
      MMMM: () => this._hydrateDateObject(date, texts).MMMM(),
      MMMMG: () => this._hydrateDateObject(date, texts).MMMMG(),
      D: () => this._hydrateDateObject(date, texts).D,
      DD: () => this._hydrateDateObject(date, texts).DD(),
      S: () => this._hydrateDateObject(date, texts).S(),
      d: () => this._hydrateDateObject(date, texts).d,
      dd: () => this._hydrateDateObject(date, texts).dd(),
      ddd: () => this._hydrateDateObject(date, texts).ddd(),
      dddd: () => this._hydrateDateObject(date, texts).dddd(),
      HH: () => this._hydrateTimeObject(date, texts).HH,
      H: () => this._hydrateTimeObject(date, texts).H,
      hh: () => this._hydrateTimeObject(date, texts).hh,
      h: () => this._hydrateTimeObject(date, texts).h,
      am: () => this._hydrateTimeObject(date, texts).am,
      AM: () => this._hydrateTimeObject(date, texts).AM,
      mm: () => this._hydrateTimeObject(date, texts).mm,
      m: () => this._hydrateTimeObject(date, texts).m
    }

    return format.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (m, contents) => {
      const result = dateObj[contents.replace(/\{|\}/g, '')]
      return result !== undefined ? result() : contents
    })
  }

  // More performant function to convert a Date to `YYYY-MM-DD` formatted string only.
  formatDateLite (date) {
    const m = date.getMonth() + 1
    const d = date.getDate()
    return `${date.getFullYear()}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`
  }

  /**
   * Formats a time (from Date or number of mins) to the given format and returns the formatted string.
   *
   * @param {Date | Number} date a JavaScript Date object or a time in minutes.
   * @param {String} format the wanted format.
   * @param {Object} texts Optional: the localized texts object to override the vue-cal one in this._texts.
   *                       This becomes useful when showing multiple instances with different languages,
   *                       like in the documentation page.
   * @param {Boolean} round if time is 23:59:59, rounds up to 24:00 for formatting only.
   * @return {String} the formatted time.
   */
  formatTime (date, format = 'HH:mm', texts = null, round = false) {
    let shouldRound = false
    if (round) {
      const [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()]
      if ((h + m + s) === (23 + 59 + 59)) shouldRound = true
    }

    if (date instanceof Date && format === 'HH:mm') return shouldRound ? '24:00' : this.formatTimeLite(date)

    _timeObject = {} // Reinit the time object on each function call.
    if (!texts) texts = this._texts
    const timeObj = this._hydrateTimeObject(date, texts)

    const formatted = format.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (m, contents) => {
      const result = timeObj[contents.replace(/\{|\}/g, '')]
      return result !== undefined ? result : contents
    })

    // Round 23:59:59 to 24:00. For 12-hour format there is nothing to replace: as both are 12am.
    // Also don't return `24:00` straight away as the user format may be different.
    return shouldRound ? formatted.replace('23:59', '24:00') : formatted
  }

  /**
   * Formats a time to 'HH:mm' from a Date and returns the formatted string.
   *
   * @param {Date} date a JavaScript Date object to format.
   * @return {String} the formatted time.
   */
  formatTimeLite (date) {
    const h = date.getHours()
    const m = date.getMinutes()
    return `${(h < 10 ? '0' : '') + h}:${(m < 10 ? '0' : '') + m}`
  }

  _nth (d) {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  _hydrateDateObject (date, texts) {
    if (_dateObject.D) return _dateObject

    const YYYY = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    const day = date.getDay() // Day of the week.
    const dayNumber = (day - 1 + 7) % 7 // Day of the week. 0 to 6 with 6 = Sunday.
    // Some of this props are functions, to only calculate on demand.
    _dateObject = {
      // Year.
      YYYY, // 2019.
      YY: () => YYYY.toString().substring(2), // 19.

      // Month.
      M, // 1 to 12.
      MM: () => (M < 10 ? '0' : '') + M, // 01 to 12.
      MMM: () => texts.months[M - 1].substring(0, 3), // Jan to Dec.
      MMMM: () => texts.months[M - 1], // January to December.
      MMMMG: () => (texts.monthsGenitive || texts.months)[M - 1], // January to December in genitive form (Greek...)

      // Day.
      D, // 1 to 31.
      DD: () => (D < 10 ? '0' : '') + D, // 01 to 31.
      S: () => this._nth(D), // st, nd, rd, th.

      // Day of the week.
      d: dayNumber + 1, // 1 to 7 with 7 = Sunday.
      dd: () => texts.weekDays[dayNumber][0], // M to S.
      ddd: () => texts.weekDays[dayNumber].substr(0, 3), // Mon to Sun.
      dddd: () => texts.weekDays[dayNumber] // Monday to Sunday.
    }

    return _dateObject
  }

  _hydrateTimeObject (date, texts) {
    if (_timeObject.am) return _timeObject

    let H, m
    if (date instanceof Date) {
      H = date.getHours()
      m = date.getMinutes()
    }
    else {
      H = Math.floor(date / 60)
      m = Math.floor(date % 60)
    }

    const h = H % 12 ? H % 12 : 12
    const am = (texts || { am: 'am', pm: 'pm' })[H === 24 || H < 12 ? 'am' : 'pm']
    _timeObject = {
      H,
      h,
      HH: (H < 10 ? '0' : '') + H,
      hh: (h < 10 ? '0' : '') + h,
      am,
      AM: am.toUpperCase(),
      m,
      mm: (m < 10 ? '0' : '') + m
    }

    return _timeObject
  }
  // ====================================================================
}
