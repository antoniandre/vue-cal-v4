<template lang="pug">
div
  h2.title1.mt12.pt12
    a(href="#api") API
    a#api(name="api")
  p Here is the list of all the available views.
  ssh-pre.mt2(language="js").
    ['years', 'year', 'month', 'week', 'day']
  p.
    Here is the list of all the parameters available and their description below this table.#[br]
    Remember that HTML is case-insensitive and you should therefore use the #[span.code kebab-case]
    instead of the #[span.code camelCase] for consistency.
  ssh-pre.mt2(language="js").
    activeView:             [String],          default: 'week'
    allDayBarHeight:        [String, Number],  default: '25px'
    cellClickHold:          [Boolean],         default: true
    cellContextmenu:        [Boolean],         default: false
    clickToNavigate:        [Boolean],         default: false
    dblclickToNavigate:     [Boolean],         default: true
    disableDatePrototypes:  [Boolean],         default: false
    disableDays:            [Array],           default: []
    disableViews:           [Array],           default: []
    dragToCreateEvent:      [Boolean],         default: true
    dragToCreateThreshold:  [Number],          default: 15
    editableEvents:         [Boolean, Object], default: false
    events:                 [Array],           default: []
    eventsCountOnYearView:  [Boolean],         default: false
    eventsOnMonthView:      [Boolean, String], default: false
    headerType:             [String],          default: null
    headerOrder:            [Array],           default: null
    hideBody:               [Boolean],         default: false
    hideTitleBar:           [Boolean],         default: false
    hideViewSelector:       [Boolean],         default: false
    hideWeekdays:           [Array],           default: []
    hideWeekends:           [Boolean],         default: false
    locale:                 [String],          default: 'en'
    maxDate:                [String, Date],    default: ''
    minCellWidth:           [Number],          default: 0 // In pixels.
    minDate:                [String, Date],    default: ''
    minEventWidth:          [Number],          default: 0 // In percent.
    minSplitWidth:          [Number],          default: 0 // In pixels.
    onEventClick:           [Function],        default: null
    onEventCreate:          [Function],        default: null
    onEventDblclick:        [Function],        default: null
    overlapsPerTimeStep:    [Boolean],         default: false
    resizeX:                [Boolean],         default: false
    selectedDate:           [String, Date],    default: ''
    showAllDayEvents:       [Boolean, String], default: false
    showTimeInCells:        [Boolean],         default: false
    showWeekNumbers:        [Boolean, String], default: false
    small:                  [Boolean],         default: false
    snapToTime:             [Number],          default: null
    specialHours:           [Object],          default: {}
    splitDays:              [Array],           default: []
    startWeekOnSunday:      [Boolean],         default: false
    stickySplitLabels:      [Boolean],         default: false
    time:                   [Boolean],         default: true
    timeCellHeight:         [Number],          default: 40 // In pixels.
    timeFormat:             [String],          default: ''
    timeFrom:               [Number],          default: 0 // In minutes.
    timeStep:               [Number],          default: 60 // In minutes.
    timeTo:                 [Number],          default: 24 * 60 // In minutes.
    todayButton:            [Boolean],         default: false
    transitions:            [Boolean],         default: true
    twelveHour:             [Boolean],         default: false
    xsmall:                 [Boolean],         default: false
    watchRealTime:          [Boolean],         default: false

  ul.api-options
    li
      code.mr2 locale
      span.code [String], default: 'en'
      p.
        Allows you to translate the calendar texts in a given language.#[br]
        Use a 2 letter locale code
        (#[a(href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank") ISO 639-1])
        unless a distinction is needed. E.g. #[span.code 'pt-br'] for Portuguese-Brasilian.
      highlight-message(type="info")
        | Currently available languages are {{ localesList.map(l => l.label).join(', ') }}.#[br]
        | If you are interested in providing a language support please do a pull request with a json file
        | into the i18n directory.#[br]
        | this is what a language json looks like.

        ssh-pre.my2(language="json").
          {
            "weekDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "years": "Years",
            "year": "Year",
            "month": "Month",
            "week": "Week",
            "day": "Day",
            "today": "Today",
            "noEvent": "No Event",
            "allDay": "All day",
            "deleteEvent": "Delete",
            "createEvent": "Create an event",
            "dateFormat": "dddd D MMMM YYYY"
          }
        p.
          Regarding the #[span.code dateFormat] translation, this is the format of the full
          date you can see in a single day view title.#[br]
          #[span.code dddd] stands for the full-letter day of week, #[span.code MMMM] stands for
          full-letter month, #[span.code D] stands for the date of the month (0-31),
          #[span.code YYYY] stands for full year, #[span.code {S}] stands for st/nd/rd/th and only in English.

      highlight-message(type="tips").
        Note that 2 media queries will shorten the days of the week to 3 letters then 1 letter when it does not fit.
        #[br]You can read more about it in the # Responsiveness &amp; Media Queries section in the
        #[a(href="#css-notes") CSS Notes].
    li
      code.mr2 hideViewSelector
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the top view selector will disappear.#[br]
        You can still navigate from a view to another by clicking a cell (narrower view) or
        the view title (broader view).
    li
      code.mr2 hideTitleBar
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the title bar with navigating arrows will disappear.#[br]
        You can still navigate from a view to another with the view selector and clicking
        a cell (narrower view).
    li
      code.mr2 hideBody
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the whole calendar body will disappear - cells and timeline.#[br]
        Also means that all the logic usually triggered from the calendar's body won't run at all.
    li
      code.mr2 hideWeekends
      span.code [Boolean], default: false
      p.
        Hide the weekend and shows only Monday to Friday on month view and week view.#[br]
        The weekend are still visible in day view not to break the behavior of the arrows.#[br]
        Note that by hiding the arrows you won't be able to see a weekend day in day view if hideWeekends
        is true.
    li
      code.mr2 hideWeekdays
      span.code [Array], default: []
      p.
        Hide particular days of the week. This option accepts an array of days (day numbers) to hide,
        #[strong starting at #[span.code 1] for Monday, to #[span.code 7] for Sunday].#[br]
        This option will apply on month &amp; week views.#[br]#[br]
        If you want to hide Saturday and Sunday you can put #[span.code 6, 7] in the array or use
        #[span.code hideWeekends] in supplement of #[span.code hideWeekdays].
    li
      code.mr2 disableDays
      span.code [Array], default: []
      p Allows you to provide an array of formatted dates (e.g. #[span.code 2020-09-18]) to disable.
    li
      code.mr2 disableViews
      span.code [Array], default: []
      p.
        Allows you to totally disable one or more of the available views.#[br]
        Accepted view names are 'years', 'year', 'month', 'week', 'day'.#[br]
        Note that the navigation between views via cells click or title click won't
        break and will only navigate to views you have allowed.
    li
      code.mr2 dragToCreateEvent
      span.code [Boolean], default: true
      p.
        When events are editable and if #[span.code time] and #[span.code dragToCreateEvent] are set to
        #[span.code true], clicking and dragging on a cell will create an event.#[br]
        Note: if this option is set to true, it will prevent event creation from cell click &amp; hold.#[br]
        Refer to the #[a(href="#ex--create-events") Create events] example.
    li
      code.mr2 dragToCreateThreshold
      span.code [Number], default: 15
      p.
        When events are editable and #[span.code time] and #[span.code dragToCreateEvent] are set to
        #[span.code true], this option controls the minimum dragging distance before an event is created.#[br]
        This option might be useful when you can navigate with cell click to prevent unwanted event creation in
        case of slipping cursor while clicking.#[br]
        With option gets to a positive integer, and you can set it to #[span.code 0] to disable it.
        Refer to the #[a(href="#ex--create-events") Create events] example.
    li
      code.mr2 activeView
      span.code [String], default: 'week'
      p.
        Allows you to set a default active view, for the first time you load the calendar.#[br]
        Then control the active view from outside of Vue Cal.#[br]
        Accepts one of 'years', 'year', 'month', 'week', 'day'.#[br]
        The active view has a two-way binding: you can use a v-model (or #[code .sync] on Vue 2)
        on it to keep your variable up to date.
    li
      code.mr2 allDayBarHeight
      span.code [String, Number], default: '25px'
      p.
        When the all day bar is visible and Vue Cal is also scrollable horizontally (due to
        #[span.code minCellWidth] or day splits with #[span.code minSplitWidth]),
        the all-day bar must have a fixed height for this particular layout.#[br]
        Only if these conditions are fulfilled, the height provided through this option will be
        used. If none is provided the default height will be used.#[br]
        The height can be any valid CSS height (as a string) or an integer for an amount of pixels.
    li
      code.mr2 todayButton
      span.code [Boolean], default: false
      p Adds a Today button in the title bar to quickly go to Today's date.#[br]
    li
      code.mr2 showAllDayEvents
      span.code [Boolean, String], default: false
      ul
        li.mb2.
          When the #[span.code showAllDayEvents] is set to #[span.code true] the events with an
          #[span.code allDay] attribute set to #[span.code true] will be displayed in a fixed top
          bar on the #[span.code week] &amp; #[span.code day] views.#[br]
          The all day events bar will only show up if the options #[span.code showAllDayEvents] &amp;
          #[span.code time] are set to #[span.code true].#[br]
          #[span.code time] is important since without time information every event is an all-day
          event there is no point in separating them then.
        li.mb2.
          When #[span.code showAllDayEvents] is set to #[span.code false], all the all day events
          (#[span.code allDay] attribute set to #[span.code true]), will show up as a normal
          background event.
        li.mb2.
          On month view, switching #[span.code showAllDayEvents] on and off will not have any impact
          since both should display the all day events.
        li.mb2.
          #[span.code showAllDayEvents] accepts a #[span.code Boolean] or the string
          #[span.code 'short'], to display only the event title.
    li
      code.mr2 showWeekNumbers
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the weeks numbers will show in the first column on the
        #[span.code month] view (only).#[br]
        You can also provide a custom renderer to the weeks numbers cells through the
        #[span.code week-number-cell] slot.
      highlight-message
        a#there-can-be-53-weeks-in-a-year(name="there-can-be-53-weeks-in-a-year")
        strong Did you know there can be 53 weeks in the year?#[br]
        | This happens every time the year starts a Thursday, or starts a Wednesday of a leap year.
        | In this case the week number will be 53 instead of 1.
    li
      code.mr2 selectedDate
      span.code [String, Date], default: ''
      p.
        Accepts a formatted string or plain JS Date object.#[br]
        Set a selected date, for the first time you load the calendar.#[br]
        This day will be highlighted and the first view will naturally show this date.#[br]
        E.g. setting a date in year 2000 with a activeView of week, will show you that week of year 2000.#[br]#[br]
        Updating the #[span.code selectedDate] programmatically after the first calendar load,
        will update the view if needed to show this date.#[br]
        Refer to the #[a(href="#ex--sync-two-calendars") Sync two vue-cal instances] example.#[br]
        The selected date has a two-way binding: you can use a v-model (or #[code .sync] on Vue 2) on it to
        keep your variable up to date.
      highlight-message(type="warning").
        A correct string date format is #[code {{ todayFormatted }}] or
        #[code="{{ todayFormatted.split(' ')[0] }}"] if you don't need the time.
        Only these formats will work as a string. You can also provide a native Javascript Date object.
    li
      code.mr2 minDate
      span.code [String, Date], default: ''
      p.
        Accepts a formatted string or plain JS Date object.#[br]
        Set a minimum date for the cells to be selectable.#[br]
        By default the cell will be grayed out when out of range but CSS classes let you customize this.
    li
      code.mr2 maxDate
      span.code [String, Date], default: ''
      p.
        Accepts a formatted string or plain JS Date object.#[br]
        Set a maximum date for the cells to be selectable.#[br]
        By default the cell will be grayed out when out of range but CSS classes let you
        customize this.
    li
      code.mr2 specialHours
      span.code [Object], default: {}
      p.
        Allows an individual highlighted time range for each day of the week.#[br]
        For instance, it could represent the business hours.#[br]
        The object must contain indexed days, #[strong from 1 for Monday to 7 for Sunday], of the
        days you want to highlight.#[br]
        Each day must contain an object with a #[span.code from] and #[span.code to] properties
        defining the beginning and the end of the time range #[strong in minutes].#[br]
        In addition, you can set a CSS class for each day of the week.#[br]
        It is also possible to provide an array of special hours for the same day.#[br]
        A #[span.code label] can also be provided per special hour block, and styled via CSS.#[br]#[br]

      p.subtitle-1 Example for Wednesday: #[span.code :special-hours="specialHours"]
      p
        span.ml3 With a single range of special hours:
        ssh-pre.mt1.ml3(language="js" label="JavaScript").
          // In the component's data.
          specialHours: {
            3: { from: 8 * 60, to: 20 * 60, class: 'open' }
          }
        br
        span.ml3 With multiple ranges of special hours:
        ssh-pre.mt1.ml3(language="js" label="JavaScript").
          // In the component's data.
          specialHours: {
            3: [
              { from: 8 * 60, to: 12 * 60, class: 'open' },
              { from: 14 * 60, to: 20 * 60, class: 'open' }
            ]
          }

    li
      code.mr2 startWeekOnSunday
      span.code [Boolean], default: false
      p.
        By default weeks start on Monday but with this option you can start the week on Sunday.
    li
      code.mr2 small
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the days of the week headings will be truncated to 3 letters.#[br]
        Does not apply to the title of the day view.#[br]
        2 media queries are truncating the days of the week below 450px,
        read on in the #[a(href="#css-notes") CSS Notes].
    li
      code.mr2 xsmall
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the days of the week headings will be truncated to 1 letter.#[br]
        Does not apply to the title of the day view.#[br]
        In Addition, the whole calendar gets applied a smaller font size of 0.9em,
        and the current view title is also reduced.#[br]
        2 media queries are truncating the days of the week below 450px,
        read on in the #[a(href="#css-notes") CSS Notes].
    li
      code.mr2 transitions
      span.code [Boolean], default: true
      p Enable / disable the CSS transitions between all the views and view states.
    li
      code.mr2 clickToNavigate
      span.code [Boolean], default: false
      p.
        When set to #[span.code true] a single click (or tap for touch devices) will take you to a
        narrower view if available.#[br]
        You can always go back to a broader view by clicking the view title or selecting another view
        from the view selector if enabled.#[br]
        The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate]
        and #[span.code dblclickToNavigate] to false.
    li
      code.mr2 dblclickToNavigate
      span.code [Boolean], default: true
      p.
        When set to #[span.code true] a double click (or double tap for touch devices) will take you to a
        narrower view if available.#[br]
        You can always go back to a broader view by clicking the view title or selecting another view
        from the view selector if enabled.#[br]
        The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate]
        and #[span.code dblclickToNavigate] to false.
    li
      code.mr2 cellClickHold
      span.code [Boolean], default: true
      p.
        Allows you to disable the default event creation on cell click &amp; hold which only
        happens if #[span.code editableEvents.create] is set to #[span.code true].
    li
      code.mr2 cellContextmenu
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], a right click on a cell will emit the #[span.code cell-contextmenu] event,
        providing an object containing: the date and time at cursor, the x and y position of cursor, and the full original DOM event.
    li
      code.mr2 time
      span.code [Boolean], default: true
      p.
        Whether you want to display the timeline and handle events with time or only date.#[br]
        Note that time is made of #[span.code hours:minutes] #[strong.ml2 and no second].
    li
      code.mr2 timeFrom
      span.code [Number], default: 0
      p.
        If #[span.code time] is enabled, set the start of the timeline in minutes.
        By default it starts at midnight.
    li
      code.mr2 showTimeInCells
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the time labels will be visible in
        each cell, in each time slot of the #[code day] and #[code week] views.
        You can then use CSS to style to taste.
        For instance, you could hide all the labels and show only the one that
        is being hovered.#[br]
        Will have no effect if #[span.code time] is set to false.
    li
      code.mr2 timeTo
      span.code [Number], default: 24 * 60
      p.
        If #[span.code time] is enabled, set the end of the timeline in minutes.
        By default it ends at 24:00.
    li
      code.mr2 timeStep
      span.code [Number], default: 60
      p.
        If #[span.code time] is enabled, set the time increment in minutes.
    li
      code.mr2 timeCellHeight
      span.code [Number], default: 40
      p.
        If #[span.code time] is enabled, set the time cell height in pixels.#[br]
        this is very important as it is used to calculate the events position in the day.
    li
      code.mr2 twelveHour
      span.code [Boolean], default: false
      p.
        If #[span.code time] is enabled, the default time format is 24 hour.#[br]
        With #[span.code twelveHour] set to #[span.code true] (use #[span.code twelve-hour] in template),
        the time format will show 12 hours suffixed with am/pm.
    li
      a(id="time-format" name="time-format")
      code.mr2 timeFormat
      span.code [String], default: ''
      p.mb2.
        When defined, overrides the default time format in time cells and events.#[br]
        Formatted time can contain any character but the following characters will be replaced:
      ul.ml3
        li #[strong.code H]: Hours no leading zero, 24-hour format
        li #[strong.code HH]: Hours with leading zero, 24-hour format
        li #[strong.code h]: Hours no leading zero, 12-hour format
        li #[strong.code hh]: Hours with leading zero, 12-hour format
        li #[strong.code m]: Minutes no leading zero
        li #[strong.code mm]: Minutes with leading zero
        li #[strong.code {am}]: am or pm
        li.
          The characters `#[strong.code {]` and `#[strong.code }]` are removed and used only to
          delimit keywords when there is no space.#[br]
          E.g. #[span.code "h:mm{am}"].
    li
      code.mr2 watchRealTime
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the current time line in today's cell, on #[span.code week] and
        #[span.code day] views, will stay in sync with real time.#[br]
        #[span.grey (This requires a #[span.code setTimeout] every minute)]
    li
      code.mr2 minEventWidth
      span.code [Number], default: 0
      p.
        When a number is set, in percent, each event within a cell will have a minimum width.#[br]
        If the provided percentage is bigger than what it would naturally be, the events will partially overlap.
    li
      code.mr2 overlapsPerTimeStep
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], each event of the same cell will have a width of
        #[span.code 100% / [number of simultaneous events]] only if these events are within the same time step.#[br]
        Refer to #[a(href="https://github.com/antoniandre/vue-cal/pull/182" target="_blank") this use case].
    li
      code.mr2 minCellWidth
      span.code [Number], default: 0
      p.
        When a number is set, in pixels, each cell #[strong of the #[span.code week] view (only)]
        will have this minimum width.#[br]
        If it does not fit in the calendar body, the overflow will be scrollable.
        If #[span.code minSplitWidth] is also set, it will override #[span.code minCellWidth].
    li
      code.mr2 minSplitWidth
      span.code [Number], default: 0
      p.
        This is for day splits only, and it applies to the
        #[strong #[span.code week] and #[span.code day] views (only)].#[br]
        When a number is set, in pixels, each split of each cell will have this minimum width.#[br]
        If it does not fit in the calendar body, the overflow will be scrollable.#[br]
        If #[span.code minCellWidth] is also set, #[span.code minSplitWidth] will override it on
        #[span.code week] view.
    li
      code.mr2 splitDays
      span.code [Array], default: []
      p
        | Split each day into multiple vertical splits.#[br]
        | Accepts an array of split objects with attributes.#[br]
        | Each split object can have these attributes, they are all optional:
        ssh-pre(language="js").
          {
            id: {Integer | String}, // All ids must be set if using `hide`.
            class: {String},
            label: {String},
            hide: {Boolean} // You can toggle the column on and of with this.
          }
    li
      code.mr2 stickySplitLabels
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the day splits labels will be displayed in the header
        instead of in-cell.
    li
      code.mr2 editableEvents
      span.code [Boolean, Object], default: false
      p
        | When #[span.code editableEvents] is set to #[span.code true], it allows:
        ul
          li Dragging and dropping events
          li Resizing events by dragging the handle showing at the bottom of each event if #[span.code time] is set to #[span.code true],
          li Deleting events by click and hold an event.
          li Editing events title
      highlight-message
        ul
          li
            | You can set more accurately which edition you want to allow by passing an object.#[br]
            | For instance, this object will allow all the above editions except the drag &amp; drop:
            div.code.black { title: true, drag: false, resize: true, delete: true, create: true }
          li.
            You can still force an event to be undeletable or unresizable from the #[span.code deletable] &amp; #[span.code resizable] event attributes.
    li
      code.mr2 resizeX
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], allows resizing an event across multiple days.#[br]
        Resizing on the X axis is only available on #[span.code week] view.
    li
      code.mr2 snapToTime
      span.code [Number], default: 0
      p.
        Accepts a number of minutes from 0 to 60 to snap a dropped event or an event end time while resizing.#[br]
        For instance, with a #[span.code snapToTime] of 15 min, an event dropped at a start of 10:05,
        will snap to 10:00, and dropped at 10:11 will snap to 10:15.#[br]
        This option affects event resizing, event drag &amp; dropping, and event drag-creation.
    li
      code.mr2 eventsOnMonthView
      span.code [Boolean, String], default: false
      p.
        When set to #[span.code true], the events will also be displayed on month view
        (including events from visible out of scope days).#[br]
        When set to the string '#[span.code short]', only the event's title will be displayed.
    li
      code.mr2 eventsCountOnYearView
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the events count will also be displayed on #[span.code years]
        &amp; #[span.code year] views.
    li
      code.mr2 onEventClick
      span.code [Function], default: null
      p.
        A callback function to execute when an event is clicked.#[br]
        this function receives 2 parameters: #[span.code event], the clicked calendar event,
        and #[span.code e], the associated JavaScript DOM event.
    li
      code.mr2 onEventDblclick
      span.code [Function], default: null
      p.
        A callback function to execute when an event is double clicked.#[br]
        this function receives 2 parameters: #[span.code event], the double clicked calendar event,
        and #[span.code e], the associated JavaScript DOM event.
    li
      code.mr2 onEventCreate
      span.code [Function], default: null
      p.
        A callback function to execute when an event is created.#[br]
        This function receives 2 parameters: #[span.code event], the created event,
        and #[span.code deleteEvent], a function to delete the created event.#[br]
        You can modify and override the received #[span.code event] and return it to vue-cal.#[br]
        If this function returns #[span.code false], the event creation will be cancelled.
    li
      code.mr2 events
      span.code [Array], default: []
      p.
        Allows you to place events in the calendar.#[br]
        Accepts an array of event objects.#[br]
        This is what an event object must look like:
      p
        ssh-pre.mt2(language="js").
          {
            start: '2018-11-19 12:00', // Required.
            end: '2018-11-19 14:00', // Required.
            // Instead of formatted dates, you can also provide Javascript Date objects:
            // start: new Date(2018, 11 - 1, 19, 12, 0),
            // end: new Date(2018, 11 - 1, 19, 14, 0),
            title: {String}, // Optional.
            content: {String}, // Optional.
            class: {String}, // Optional - space-separated css classes.
            background: {Boolean} // Optional. (Event type not CSS property)
            split: {Number|String} // Optional.
            allDay: {Boolean} // Optional.
            deletable: false // optional - force undeletable when events are editable.
            resizable: false // optional - force unresizable when events are editable.
          }
        ul
          li If no #[span.code title] is provided, no title will be displayed.
          li.
            #[span.code content] accepts free HTML, for instance:
            '&lt;i class="icon material-icons"&gt;local_hospital&lt;/i&gt;'.#[br]
            If no #[span.code content] is provided, no content will be displayed.
          li.
            You may need an event CSS #[span.code class] to handle different event types
            for instance. With different classes you can apply different styles to the events.#[br]
            E.g. backgrounds, images, borders, etc.
          li.
            The #[span.code background] attribute sets an event as a background event,
            which allows overlapping and disable the ability to drag &amp; resize.
          li.
            When using #[span.code splitDays], the #[span.code split] attribute accepts a number,
            starting from 1, corresponding to the split you want the event to appear in.#[br]
            Optionally, if you have set the #[span.code id] property in #[span.code splitDays],
            you have to use the same #[span.code id] here (Integer or String).
          li.
            When the #[span.code showAllDayEvents] and #[span.code time] options are set to
            #[span.code true], all the events with an attribute #[span.code allDay] set to
            #[span.code true] will show up in a fixed bar (week &amp; day views).

      highlight-message(type="warning")
        strong Important notes
        ul
          li.
            The events are internally identified by the key #[span.code `_eid`].
            #[strong This is a reserved keyword.]
          li.mt2
            | Correct date formats are #[code {{ todayFormatted }}],
            | or #[code="{{ todayFormatted.split(' ')[0] }}"] if you don't want any time in the whole calendar,
            | or a JavaScript #[code Date] object. Only these formats will work.#[br]
            strong.
              You can't mix events with time and events without, and you can only remove time if the #[span.code time]
              option is set to #[span.code false].
          li.mt2.
            You can set an event end at #[span.code 24:00] or #[span.code 00:00] (for the next midnight),
            #[strong but internally the date will be set at #[span.code 23:59:59]] so the date stays the same instead
            of natural behavior of taking the next day at #[span.code 00:00:00].#[br]
            When returned from emitted events, this event #[span.code end] will contain a date ending at #[span.code 23:59:59].
    li
      code.mr2 disableDatePrototypes
      span.code [Boolean], default: false
      p.
        If you really don't want the Date prototypes to be added, you can disable them with this option.#[br]
        Refer to #[a(href="https://github.com/antoniandre/vue-cal/issues/259" target="_blank" style="text-decoration: underline;color: inherit") This Vue Cal issue on Github].

  h2.title1.mt12.pt12
    a(href="#date-prototypes") #[strong.code Date] Prototypes
    a#date-prototypes(name="date-prototypes")
  p
    | Vue Cal has no dependency and performs date operations through a few notable useful and efficient functions that
    | have been added to the native #[span.code Date] class for your convenience.#[br]
    strong.mr2.
      With this set of functions, you will most likely not need #[em Moment.js] or any other additional Date library!#[br]#[br]
      Once Vue Cal is loaded, you can access the following functions from anywhere in your code
      just like a simple #[span.code Date] function.#[br]
    | E.g. #[span.code (new Date()).addDays(2)]

  ul
    li.mt3
      code.text-bold.mr2 .addDays(days)
      | Adds days to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code days]` is an integer.
    li.mt3
      code.text-bold.mr2 .subtractDays(days)
      | Subtracts days to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code days]` is an integer.
    li.mt3
      code.text-bold.mr2 .addHours(hours)
      | Adds hours to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code hours]` is an integer.
    li.mt3
      code.text-bold.mr2 .subtractHours(hours)
      | Subtracts hours to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code hours]` is an integer.
    li.mt3
      code.text-bold.mr2 .addMinutes(minutes)
      | Adds minutes to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code minutes]` is an integer.
    li.mt3
      code.text-bold.mr2 .subtractMinutes(minutes)
      | Subtracts minutes to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code minutes]` is an integer.
    li.mt3
      code.text-bold.mr2 .getWeek()
      | Returns the week number (1 #[a(href="#there-can-be-53-weeks-in-a-year") to 53]) of a date.
    li.mt3
      code.text-bold.mr2 .isToday()
      | Returns #[span.code true] if the date is Today.
    li.mt3
      code.text-bold.mr2 .isLeapYear()
      | Returns #[span.code true] if the date is in a leap year.

  h3.mt4 And because everyone needs a Date/time formatting function...
  p.
    It is now available directly from the Date object, with your loaded locale!

  ul
    li.mt3
      code.text-bold.mr2 .format(format)
      div.
        Returns a formatted date string.
        Default format is #[span.code 'YYYY-MM-DD'], but you can use any formatting keyword from
        this list, and add any character not present in this mapping:
      ul
        li #[strong.code.black YYYY]: full year. #[span.grey-light1.ml2 // `2019`]
        li #[strong.code.black YY]: 2 last digits of the year. #[span.grey-light1.ml2 // `19`]
        li #[strong.code.black MMMM]: month in full. #[span.grey-light1.ml2 // `January`]
        li #[strong.code.black MMM]: 3 first letters of the month. #[span.grey-light1.ml2 // `Jan`]
        li #[strong.code.black MM]: month number with leading zero. (01-12) #[span.grey-light1.ml2 // `01`]
        li #[strong.code.black M]: month number without leading zero. (1-12) #[span.grey-light1.ml2 // `1`]
        li #[strong.code.black DD]: date of the month with leading zero. (01-31) #[span.grey-light1.ml2 // `01`]
        li #[strong.code.black D]: date of the month without leading zero. (1-31) #[span.grey-light1.ml2 // `1`]
        li.
          #[strong.code.black S]: (usually with surrounding #[span.code `{ }`]) only in English,
          will output #[span.code `st`], #[span.code `nd`], #[span.code `rd`] or #[span.code `th`].
        li #[strong.code.black dddd]: day of the week in full. #[span.grey-light1.ml2 // `Monday`]
        li #[strong.code.black ddd]: 3 first letters of the day of the week. #[span.grey-light1.ml2 // `Mon`]
        li #[strong.code.black dd]: first letter of the day of the week. #[span.grey-light1.ml2 // `M`]
        li #[strong.code.black d]: number of the day of the week. (1-7) #[span.grey-light1.ml2 // `1` for Monday]
        li #[strong.black And also all the keywords from the following #[span.code formatTime()] function.]

    li.mt3
      code.text-bold.mr2 .formatTime(format)
      div.
        Returns a formatted time string.#[br]
        The #[span.code format()] function can also do this, but this might be a shortcut if you just want
        the default time formatting.#[br]
        E.g. `#[span.code formatTime()]`).#[br]
        This function will also be slightly faster than #[span.code format()] as lighter in functionality.#[br]
        Default format is #[span.code 'HH:mm'], but you can use any formatting keyword from
        this list, and add any character not present in this mapping:
      ul
        li #[strong.code.black HH]: Hours with leading zero, 24-hour format. (00-24)#[span.grey-light1.ml2 // `20`]
        li #[strong.code.black H]: Hours without leading zero, 24-hour format. (0-24)#[span.grey-light1.ml2 // `20`]
        li #[strong.code.black hh]: Hours with leading zero, 12-hour format. #[span.grey-light1.ml2 // `08`]
        li #[strong.code.black h]: Hours without leading zero, 12-hour format. #[span.grey-light1.ml2 // `8`]
        li #[strong.code.black mm]: Minutes with leading zero. #[span.grey-light1.ml2 // `08`]
        li #[strong.code.black m]: Minutes without leading zero. #[span.grey-light1.ml2 // `8`]
        li #[strong.code.black am]: (usually with surrounding #[span.code `{ }`]) am or pm (also localized if any)

  highlight-message.my4(type="tips")
    ul
      li.
        To separate 2 keywords or a keyword and another text not from this list without adding spaces or
        any separation, you can use the delimiters #[span.code `{ }`].#[br]
        For instance #[span.code `new Date().format('YYYY{MM}DD')`] (or even #[span.code `{YYYY}{MM}{DD}`]) will produce:
        "#[span.code {{ nowFormatted }}]".
      li.mt4.
        The Date functions are added when Vue Cal loads, you can always check if you have it before you use it:#[br]
        #[span.code Date.prototype.format &amp;&amp; new Date().format()]
      li.mt4.
        If you really don't want the Date prototypes to be added, you can disable them with this option:
        #[span.code disable-date-prototypes].#[br]
        Refer to #[a(href="https://github.com/antoniandre/vue-cal/issues/259" target="_blank" style="text-decoration: underline;color: inherit") This Vue Cal issue on Github].
</template>

<script>
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import HighlightMessage from './components/highlight-message.vue'

export default {
  components: { SshPre, HighlightMessage },

  props: {
    localesList: { type: Array }
  },

  data: () => ({
    now: new Date()
  }),

  computed: {
    nowFormatted () {
      return Date.prototype.format && (new Date()).format('YYYY{MM}DD')
    },
    todayFormatted () {
      return `${this.now.format()} ${this.now.formatTime()}`
    }
  }
}
</script>
