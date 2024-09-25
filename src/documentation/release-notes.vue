<template lang="pug">
div
  div.mb1
    strong.mr1 Version 4.10.0
    | Merged PRs #585, #536, #528: fixed week start date when starting week on Sunday, fixed maxTimestamp, fixed date format on `en` locale.

  div.mb1
    strong.mr1 Version 4.9.0
    | Added the Portuguese (Portugal) and Finnish locale.

  div.mb1
    strong.mr1 Version 4.8.0
    | Added the Estonian locale.

  div.mb1
    strong.mr1 Version 4.6.0
    | Skip the hidden days on #[span.code day] view (days listed in #[span.code hideWeekends]
    | and #[span.code hideWeekdays]).

  div.grey.mb1
    strong.mr1 Version 4.5.1
    | Fix wrong starting day on week view when the week starts on sunday
    | &amp; #[span.code hideWeekends] is true.

  div.mb1
    strong.mr1 Version 4.5.0
    | Added option to display time labels in cells.

  div.grey.mb1
    strong.mr1 Version 4.4.3
    | Fix headings misalignments on certain views, when OS sets fixed scrollbars.

  div.mb1
    strong.mr1 Version 4.4.0
    | Added a v-model on the #[span.code selected-date].

  div.mb1
    strong.mr1 Version 4.3.4
    | New ESM build by default.

  div.mb1
    strong.mr1 Version 4.0.0
    | Supports and only works on Vue 3.

  div.grey.mb1
    strong.mr1 Version 3.10.1
    | Prevent focusing cells when they are disabled.

  div.mb1
    strong.mr1 Version 3.10.0
    | Allow multiple ranges in daily special hours.

  div.grey.mb1
    strong.mr1 Version 3.9.1
    | Fix: Prevent disabling full month or year when using #[span.code disable-days].

  div.mb1
    strong.mr1 Version 3.9.0
    | Allow full custom locale.

  div.grey.mb1
    strong.mr1 Version 3.8.4
    | Fix showing events ending at 24:00 on Safari.

  div.grey.mb1
    strong.mr1 Version 3.8.3
    | Return the full original DOM event from #[span.code cell-contextmenu].

  div.grey.mb1
    strong.mr1 Version 3.8.2
    | Add #[span.code active-view] validations and raise warning if incorrect.

  div.grey.mb1
    strong.mr1 Version 3.8.1
    | Fix all-day events when no time information is provided.
  div.mb1
    strong.mr1 Version 3.8.0
    | Add Mongolian language.
  div.mb1
    strong.mr1 Version 3.7.0
    | Add a new #[span.code disable-days] option.
  div.grey.mb1
    strong.mr1 Version 3.6.5
    | Call the on-event-click function (if any) on event single tap. Also add a 30px threshold to not call the handler if the event was tapped and dragged.
  div.grey.mb1
    strong.mr1 Version 3.6.4
    ul
      li Fix events ending at 00:00, now ends at 23.59.59 of the previous day or of the same day if time is false.
      li When #[span.code time] is #[span.code true], keep 23:59:59 internally, but format string to 24:00.
      li Fix previous / next navigation on day view when date prototypes are disabled.
      li Add shortWeekDays to the #[span.code uk] locale.
  div.grey.mb1
    strong.mr1 Version 3.6.3
    | Return the correct event on out-of-scope event click on month view.
  div.grey.mb1
    strong.mr1 Version 3.6.2
    | Fix all-day events not showing up and fix error when using #[span.code hide-body].
  div.grey.mb1
    strong.mr1 Version 3.6.1
    | Fix timeless events not showing up.
  div.mb1
    strong.mr1 Version 3.6.0
    | Added Albanian language and short days in Russian language
  div.grey.mb1
    strong.mr1 Version 3.5.6
    | Fix multiple day events display across days when #[span.code time] is false
  div.grey.mb1
    strong.mr1 Version 3.5.4
    | Add mouseup event listener when deletable but not resizable
  div.grey.mb1
    strong Version 3.5.3
    ul
      li Provide the split (if any) to event creation from cell click &amp; hold.
      li.
        Add mousemove &amp; mouseup event handlers if drag-creation is allowed but
        #[span.code editableEvents.resize] is set to false.
  div.grey.mb1
    strong Version 3.5.1
    ul
      li Don't fire cell-click when clicking on an event
      li Focus and highlight cell on mousedown rather than click
  div.
    #[strong Version 3.5.0] Create events with click &amp; drag.
    Refer to the #[a(href="#ex--create-events") Create events] example.
  div.grey.
    #[strong Version 3.4.1] Also return the original event from the emitted
    #[span.code event-duration-change] event
  div.
    #[strong Version 3.4.0] Add a #[span.code split-label] slot for day splits labels.
    Refer to the #[a(href="#ex--custom-day-split-labels") Custom day split labels] example.
  div.grey #[strong Version 3.3.1] Add custom event renderer back in all-day bar events
  div.
    #[strong Version 3.3.0] Added the #[span.code allDayBarHeight] option and fix the all-day
    bar layout when using #[span.code minCellWidth] or day splits &amp; #[span.code minSplitWidth]
  div.grey.
    #[strong Version 3.2.8] Call #[span.code onEventClick()] (if any) on event click if events
    are not editable or on event creation
  div.grey #[strong Version 3.2.7] Don't call #[span.code onEventClick()] (if any) on event click &amp; hold
  div.grey #[strong Version 3.2.6] Display the no-event slot accurately per slot if there are
  div.grey.
    #[strong Version 3.2.5] Fix emitting #[span.code view-change] between #[span.code week]
    &amp; #[span.code day] views
  div.grey #[strong Version 3.2.4] Prevent calling onEventClick after event resize &amp; focus event on resize
  div
    strong.mr2 Version 3.2
    | The new two way binding #[span.code active-view] prop replaces the #[span.code default-view] prop.#[br]
    | Refer to the #[a(href="#ex--external-controls") external controls] example.
  div.mt2.grey #[strong Version 3.1.1] Allow disabling event #[span.code titleEditable] individually
  div
    strong Version 3.1.0
    highlight-message(type="warning").
      The event properties #[span.code startDate] and #[span.code endDate] have been merged into
      #[span.code start] and #[span.code end] which now accept both a String and a Javascript Date.#[br]
      #[strong Vue Cal always returns the Date object and not the string, even if you defined it as a string],
      but Vue Cal offers Date prototype functions to easily format the date how you want.
    ul
      li Fixed multiple day events resizing on x and y axis.
      li Allow disabling Date prototypes
      li Emit an #[span.code event-resizing] repeatedly while resizing an event
  div.mt4
    strong Version 3.0
    h3.mt0.pt0 The arrival of the drag &amp; drop feature marks a new milestone for Vue Cal!
    p.mb0.
      Many subsequent features to come, progressively building the most intuitive full-featured and flexible calendar
      on Vue.js, 100% designed for Vue, and still no dependency!
    highlight-message.mb0(type="warning")
      h3.mt0.pt0.
        Like the native HTML5 drag &amp; drop it's built with, Vue Cal's drag &amp; drop is not
        available on touch screens
      p.mb0 Vue Cal will support touch screen drag &amp; drop later on, using an alternative technology.

    highlight-message.mb6(type="success")
      h3.mt0.pt0 New Features
      ul
        li
          h4.mt2.pt0 Events drag &amp; drop
          p.
            Drag &amp; drop is a module (to keep Vue Cal light weight) and must be loaded
            separately: #[br]#[span.code import 'vue-cal/dist/drag-and-drop.js']

        li
          h4.mt0 Drop an external (HTML5 draggable) event into Vue Cal or between 2 Vue Cal instances
        li
          h4.mt0 #[span.code snapToTime] option on event drop and event resize
          p Refer to the #[span.code snapToTime] option in the #[a(href="#api") API section].
        li
          h4.mt0 The #[span.code editableEvents] option now also accept an object to precisely allow specific edition
          p Refer to the #[span.code editableEvents] option in the #[a(href="#api") API section].
      h3.mt0.mb2 Big changes
      ul
        li.error
          strong In the coming version 3.1:
          p.
            Now that Vue Cal has Date prototypes and it is so easy to format a date,
            the event properties #[span.code startDate] and #[span.code endDate] will be removed
            and the start and end of event will be exlusively defined through #[span.code start]
            and #[span.code end]. It will accept both a String and a Javascript Date.#[br]
            Vue Cal will always return the Date object and not the string, even if you defined it
            as a string.
        li.
          The #[span.code event-change] emitted event now returns an object containing the
          #[span.code event] and the #[span.code originalEvent].
        li.
          the #[span.code event-title-change] and #[span.code event-duration-change] events now return an object
          containing the #[span.code event] and the #[span.code oldTitle] or #[span.code oldDate].
        li.
          Vue Cal's #[span.code createEvent()] function now accepts a duration parameter to easily override
          the default 2 hours.
          (ref. #[a(href="#ex--create-events") Create events] example)
        li.
          The internal event #[span.code classes] property is replaced with
          #[span.code class] like in the external event definition. This means you can now
          update the #[span.code class] property seemlessly like the initial event definition.
          (From your component methods called from Vue Cal fired events or from #[span.code onEventCreate])

        li
          h4.mt3.pt0 Renamed slot
          p The #[span.code event-renderer] slot is renamed into #[span.code event]
        li
          h4.mt3.pt0 Huge code refactoring
          p.
            Introducing Vue dependency injections, Utils classes, and a couple of improvements on
            event resize.

      h3.mt0.mb2 Other noticeable changes
      ul
        li.
          When creating an event with a given #[span.code endDate], the required
          #[span.code endTimeMinutes] is automatically add.
        li
          h4.mt3.pt0 You don't need to call #[span.code alignAllDayBar()] anymore
          p.
            Previously, in some cases you would need to call this function to realign the
            all-day bar with the scrollbar when the scrollbar is fixed (E.g. on Windows).#[br]
            Now the function (renamed to #[span.code alignWithScrollbar]) is triggered automatically
            and in all the cases, once, in mounted.#[br]
            It will now also align the weekdays headings if needed.
        li
          h4.mt3.pt0 Renamed CSS classes
          p.
            If you use them in your own CSS (or if you have a custom color theme)
            you might want to update them:#[br]
          strong Cells
          ul
            li #[span.code .current] becomes #[span.code .vuecal__cell--current]
            li #[span.code .today] becomes #[span.code .vuecal__cell--today]
            li #[span.code .out-of-scope] becomes #[span.code .vuecal__cell--out-of-scope]
            li #[span.code .before-min] becomes #[span.code .vuecal__cell--before-min]
            li #[span.code .after-max] becomes #[span.code .vuecal__cell--after-max]
            li #[span.code .disabled] becomes #[span.code .vuecal__cell--disabled]
            li #[span.code .selected] becomes #[span.code .vuecal__cell--selected]
            li #[span.code .vuecal__cell--has-splits] &amp; #[span.code .vuecal__cell--has-events] remain the same
          strong View selector buttons
          ul
            li Added class: #[span.code .vuecal__view-btn]
            li #[span.code .active] becomes #[span.code .vuecal__view-btn--active]

        li
          h4.mt0 New CSS classes when an event is dragged
          ul
            li Over a cell: #[span.code .vuecal__cell--highlighted]
            li Over a menu arrow (previous &amp; next): #[span.code .vuecal__arrow--highlighted]
            li Over a menu view button: #[span.code .vuecal__view-btn--highlighted]
            li Event dragging class: #[span.code .vuecal__event-dragging]
        li
          h4.mt0 Updated color theme
          p.
            If you have a custom color theme, these new classes should be added:
            #[span.code .vuecal__view-btn--highlighted],
            #[span.code .vuecal__arrow--highlighted],
            #[span.code .vuecal__cell--highlighted].#[br]
            Refer to the #[a(href="#css-notes") CSS Notes].

  //- Older release notes.
  .w-flex.my12.align-center
    .w-divider.primary--bg.px3
    w-button(round outline @click="seeOldReleaseNotes = !seeOldReleaseNotes")
      w-icon.mr2 material-icons {{ seeOldReleaseNotes ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}
      strong Older release notes
    .w-divider.primary--bg.grow

  w-transition-expand(y)
    div(v-if="seeOldReleaseNotes")
      div.grey #[strong Version 2.24.4] Fire `event-focus` only once, always return a date from `cell-click`
      div.grey #[strong Version 2.24.3] Fix the all-day bar label cell horizontal alignment
      div.grey #[strong Version 2.24.1] Disable special hours in the all-day bar
      div #[strong Version 2.24.0] Allow toggling day splits
      div #[strong Version 2.23.0] Added #[span.code special-hours] option
      div.grey #[strong Version 2.22.1] Fix the selected cell CSS class not added on selectedDate change.
      div.
        #[strong Version 2.22.0] Added the #[span.code addHours], #[span.code subtractHours],
        #[span.code addMinutes], #[span.code subtractMinutes] Date prototypes
      div #[strong Version 2.21.0] Align the all-day bar on devices with fixed scrollbar width
      div.grey #[strong Version 2.20.1] Fix wrong week number with #[span.code startWeekOnSunday]
      div #[strong Version 2.20.0] Added Icelandic language
      div #[strong Version 2.19.0] Emit an event on #[span.code cell-keypress-enter]
      div #[strong Version 2.18.0] Added a #[span.code cell-contextmenu] option and emitted event
      div #[strong Version 2.17.0] Added Lithuanian language
      div #[strong Version 2.16.0]
        ul
          li New Date prototype functions, refer to: #[a(href="#date-prototypes") Date prototypes]
          li Scroll the view to a particular time: #[a(href="#ex--scroll-to-time") see the example]
          li Fix bug where timeless and all-day events were displaying time
        highlight-message.mb2(type="warning")
          ul
            li.
              #[strong The big "recurring event" feature is coming soon!]#[br]
              In this release, lots of refactored code is merged back into the master branch
              from the recurring-event branch to support the new feature.
            li
              strong.
                To allow formatting both date and time in the same Date prototype function,
                the formatting keywords have changed, since the month and minutes keywords were
                both #[strong.code.black mm] but in 2 different functions.#[br]
                The new formatting keywords are more commonly used, the default format is now
                #[span.code `YYYY-MM-DD`].#[br]
                Ref. #[a(href="#date-prototypes") Date prototypes]

      div.mt4 #[strong Version 2.15.0]
        ul
          li Allow ending an event at #[span.code 00:00] both from #[span.code event.end] and #[span.code event.endDate]
          li Prevent resizing an event below a 1 minute duration or a minimum height of 5px.
      div.mt2 #[strong Version 2.14.0] Allow custom weekday render (#[span.code month] &amp; #[span.code week] views)
      div #[strong Version 2.13.0] Added Indonesian language
      div #[strong Version 2.12.0] Added the #[span.code overlapsPerTimeStep] option
      div #[strong Version 2.11.0] Added Greek language
      div #[strong Version 2.10.0] Added the #[span.code watchRealTime] option
      div #[strong Version 2.9.0] Added the #[span.code minEventWidth] option
      div #[strong Version 2.8.0] Added the #[span.code showWeekNumbers] option
      div #[strong Version 2.7.0] Added #[span.code minSplitWidth] option for #[span.code splitDays]
      div #[strong Version 2.6.0] Added Bangla language
      div #[strong Version 2.5.0] Control Previous &amp; Next externally
      div #[strong Version 2.4.0] Added Korean language
      div #[strong Version 2.3.0] Added Turkish language
      div #[strong Version 2.2.0] Allow rejecting event creation through #[span.code on-event-create]
      div.
        #[strong Version 2.1.0] Added clicked split id in #[span.code cell-click], #[span.code cell-dblclick]
        &amp; #[span.code cell-focus] emitted events

      div #[strong Version 2.0.0]
        highlight-message(type="warning") Due to the new scoped slots syntax, Vue Cal now requires Vue@2.6.0+
        highlight-message(type="success")
          h3.mt0.pt0 New features
          ul
            li
              | Added an option to hide particular days of the week
              em.grey.ml1 (ref. #[span.code hideWeekdays] in the #[a(href="#api") API] section)
            li
              | Added new emitted event #[span.code cell-dblclick]
              em.grey.ml1 (ref. #[a(href="#ex--emitted-events") Emitted events] example)
            li
              | Added ability to resize horizontally
              em.grey.ml1 (ref. #[span.code resizeX] in the #[a(href="#api") API] section)
            li
              | Added ability to create events on cell single/double click
              em.grey.ml1 (ref. #[a(href="#ex--create-events") Create events] example)
            li
              | Added function to get minutes at cursor (on click of a cell)
              em.grey.ml1 (ref. #[a(href="#ex--emitted-events") Emitted events] example)
            li
              | Now support displaying more than 3 overlapping events!
            li
              | Events start &amp; end can now also be defined with Date objects through #[span.code startDate] &amp; #[span.code endDate]
              em.grey.ml1 (ref. #[span.code events] in the #[a(href="#api") API] section)
            li
              | Added an option to display day splits labels in the header
              em.grey.ml1 (ref. #[span.code stickySplitLabels] in the #[a(href="#api") API] section)
            li
              | Added #[span.code deletable], #[span.code resizable] attributes on events to override globals
              em.grey.ml1 (ref. #[a(href="#ex--edit-and-delete-events") Edit &amp; delete events] example)
            li.
              Vue Cal is now more accessible (WAI-ARIA). You can now navigate through the calendar with the keyboard.#[br]
              Select or focus a cell or an event with the #[kbd tab] key.#[br]
              Pressing #[kbd enter] on a cell will go to a narrower view if any, and pressing
              #[kbd enter] on an event will act like a click.

          h3.mt3 Big changes
          ul
            li New scoped slots syntax #[em.grey.ml1 (internal change - requires Vue 2.6+)]
            li the #[span.code no-event-overlaps] option is now useless and removed
            li.
              Externalize all locales from main library
              #[em.grey.ml1 (ref. #[a(href="#ex--internationalization") Internationalization] example)]#[br]
              Now, only the locale you need will be loaded on demand (as a separate request).#[br]
              This will ensure Vue Cal keeps its file size as light as possible.
            li.
              If you have a custom color theme, you need to edit #[span.code .vuecal__menu li] to
              #[span.code .vuecal__menu button]. #[em.grey.ml1 (ref. #[a(href="#css-notes") CSS Notes])].#[br]
              This is for accessibility purpose.

          h3.mt3 Other noticeable changes
          ul
            li #[span.code event-duration-change] is now only fired after resizing an event
            li Added a resizing class on events being resized
            li A click on a cell (outside of events) removes the focus state of event
            li Cancel event deletion with escape key
            li Focus a multiple day event highlights all the segments
            li Calculate event segments within current view only (great performance gain on long events)
            li Improve rendering performances on event resizing
            li Improve resizing events logic
            li Week view returned date range (through emitted events) takes #[span.code hideWeekends] in consideration
            li.
              Renamed the option #[span.code dblClickToNavigate] to #[span.code dblclickToNavigate]
              for consistency.
            li.
              Renamed the option #[span.code 12-hour] (invalid HTML attribute) to
              #[span.code twelve-hour] and the corresponding css class to
              #[span.code .vuecal--twelve-hour].
            li Fix bug: allow date selection before the Epoch time!
            li Fix bug: days count calculation when multiple-day event crosses a daylight saving change
            li.
              On month view, out of scope events returned by emitted events don't include
              events that are already in the events array of the current month.
              (may happen with multiple-day events)
            li
              | Internal events structure has changed:
              ul
                li Refactored multiple day events &amp; save 'segments' inside events
                li.
                  #[span.code startDate]/#[span.code endDate] previously containing strings are now Date Objects.#[br]
                  If you want formatted strings, use #[span.code start]/#[span.code end] instead
                li.
                  #[span.code startTime] &amp; #[span.code endTime] are removed as redundant,
                  use #[span.code start]/#[span.code end] or #[span.code startDate]/#[span.code endDate] instead
                li.
                  Due to accessibility, multiple elements of the headers are converted to #[span.code button]#[br]
                li Few nesting levels were removed from html markup by using #[span.code &lt;template&gt;] tags

      div #[strong Version 1.63.0] Added Japanese language
      div #[strong Version 1.62.0] Added Arabic &amp; Farsi languages
      div #[strong Version 1.61.0] Added Traditional Chinese language
      div #[strong Version 1.60.0] Added Danish language
      div #[strong Version 1.59.0] Added Czech language
      div #[strong Version 1.58.0] Added Ukrainian language
      div #[strong Version 1.57.0] Added an option to display a Today button
        highlight-message(type="success").
          The CSS class of the title bar has changed from #[span.code .vuecal__title] to #[span.code .vuecal__title-bar].#[br]
          The class #[span.code .vuecal__title] is now only wrapping the title, inside the #[span.code .vuecal__title-bar].#[br]
        highlight-message(type="tips").
          If you have a custom theme, you will need to update it as per the theme example in the #[a(href="#css-notes") CSS Notes].
      div #[strong Version 1.56.0] Allow #[span.code minCellWidth] independently of #[span.code splitDays]
      div #[strong Version 1.55.0] Set view and cells end dates to 23:59:59
        highlight-message(type="success")
          ul
            li This update ensures the coverage of the full range of days when fetching your events from an AJAX call.
            li.
              The #[span.code day-click] &amp; #[span.code day-focus] emitted events are renamed to
              #[span.code cell-click] &amp; #[span.code cell-focus] as they are also triggered on
              #[span.code years] &amp; #[span.code year] views.
            li Adaptive width on events-count (for count numbers on more than 1 digit)
            li On month view, removed redundant css classes from events (classes related to event overlaps)
      div #[strong Version 1.54.0] Added min &amp; max dates for cell selection
        highlight-message(type="success")
          ul
            li.
              The CSS class #[span.code .splitted] (appearing on the #[span.code .vuecal__cell] element
              when the cell is split) is renamed to #[span.code .vuecal__cell--has-splits].
            li.
              The #[span.code selectedDate] option, like min &amp; max dates, now also accept a
              plain JS Date Object.
      div #[strong Version 1.53.0] Added click/dblclick ability on weekdays headings on week view
      div #[strong Version 1.52.0] Separate #[span.code outOfScopeEvents] &amp; #[span.code events] in month view
        highlight-message(type="success").
          In month view only, the emitted events #[span.code ready] &amp; #[span.code view-change]
          now return an object containing a new #[span.code outOfScopeEvents] array separated from the events array
      div #[strong Version 1.51.0] Added Bosnian &amp; Serbian languages
      div #[strong Version 1.50.0] Create a new event on cell click &amp; hold
      div #[strong Version 1.49.0] Added Hebrew language
      div #[strong Version 1.48.0] Added Bulgarian language
      div #[strong Version 1.47.0] Added events count on #[span.code years] &amp; #[span.code year] views
        highlight-message(type="success").
          As it can now be used on #[span.code years] &amp; #[span.code year] views, the former
          #[span.code events-count-month-view] slot is now renamed to #[span.code events-count].
      div #[strong Version 1.46.0] Allow cell customization
        highlight-message(type="success").
          For consistency, the slots #[span.code arrowPrev] &amp; #[span.code arrowNext]
          are now renamed to #[span.code arrow-prev] &amp; #[span.code arrow-next].

      div #[strong Version 1.45.0] Added #[span.code cell-click] emitted event
      div #[strong Version 1.44.0] Added Slovenian &amp; Hungarian languages
      div #[strong Version 1.43.0] Added Catalan language
      div #[strong Version 1.42.0] Added Norwegian language
      div #[strong Version 1.41.0] Added Romanian language
      div #[strong Version 1.39.0] Added Vietnamese language
      div #[strong Version 1.38.0] #[span.code showAllDayEvents] now also accepts string 'short'
      div #[strong Version 1.37.0] Added text 'All day' in all i18n files
      div #[strong Version 1.36.0] Added out of scope events in month view
        highlight-message(type="success").
          On a month view, the events from the out of scope days
          (cells before and after the current month) are now also be displayed when using
          the #[span.code eventsOnMonthView] option, and returned in the array of events in
          the #[span.code ready] &amp; #[span.code view-change] emited events.
      div #[strong Version 1.35.0] Allow displaying all-day events in fixed top bar
      div #[strong Version 1.34.0] Allow starting week on Sunday
      div
        | #[strong Version 1.33.0] Minor internal structure improvements
        highlight-message(type="success").
          In order to make the internal structure less verbose, the #[span.code events-count] slot
          use has been simplified.#[br]
          Refer to the #[a(href="#ex--events-indicators") Month view with events indicators] example.
          A few default CSS rules have also been updated.#[br]
      div
        | #[strong Version 1.32.0] Allow Syncing 2 vue-cal instances
        highlight-message(type="success").
          The #[span.code selected-date] option now also accepts a native Javascript Date object.#[br]
          Refer to the #[span.code selectedDate] option in the #[a(href="#api") API] section.
      div #[strong Version 1.31.0] Added CSS transitions option
      div #[strong Version 1.30.0] Allow custom event rendering
      div #[strong Version 1.29.0] Accept a callback function on event click / dblclick
      div #[strong Version 1.28.0] Added Polish language
      div
        | #[strong Version 1.27.0] Allow overriding 'No event' text
        highlight-message(type="success").
          The #[span.code events-on-month-view] option now also accepts the string '#[span.code short]'.#[br]
          Refer to the #[a(href="#ex--events-on-month-view") Display events on month view] example.
      div #[strong Version 1.26.0] Emitted events #[span.code ready] &amp; #[span.code view-change] return events
      div #[strong Version 1.25.0] Support multiple day events
      div
        | #[strong Version 1.24.0] Allow hiding the calendar body
        highlight-message(type="success").
          Week days headings now have a today CSS class when equals to today's date.
      div #[strong Version 1.22.0] Added Slovak language
      div #[strong Version 1.21.0] Added Georgian language
      div #[strong Version 1.20.0] Allow displaying events on month view
      div #[strong Version 1.19.0] Emit events on mouse-enter &amp; mouse-leave an event
      div #[strong Version 1.18.0] Allow overriding indicators in month view
      div #[strong Version 1.17.0] Allow overriding time cells &amp; title
      div #[strong Version 1.16.0] Highlight Today's current time
      div #[strong Version 1.15.0] Added German language
      div
        | #[strong Version 1.14.0] Added custom time format &amp; emit event on #[span.code cell-focus]
        highlight-message(type="success")
          ul
            li The emitted #[span.code view-change] event now returns an object with a view name and startDate.
            li The emitted events-related events now also return native JS Date objects.
            li Refer to the #[a(href="#ex--emitted-events") emitted events example].
      div #[strong Version 1.13.0] Added Swedish language
      div #[strong Version 1.12.0] Added Croatian language
      div
        | #[strong Version 1.11.0] Added events indicators in month view
        highlight-message(type="tips").
          If you have created a custom theme, you will need to update it adding the new indicator
          #[span.code .vuecal__cell-events-count], as per the theme example in the #[a(href="#css-notes") CSS Notes].
        highlight-message(type="success").
          The default #[span.code time-step] option value is now 60 minutes (previously 30).
      div #[strong Version 1.10.0] Allow no event overlaps
      div #[strong Version 1.9.0] Added Dutch language
      div #[strong Version 1.8.0] Display up to 3 simultaneous events &amp; redraw overlaps on event resize &amp; delete
      div #[strong Version 1.7.0] Vue Cal emits events
      div #[strong Version 1.6.0] Allow event deletion on touch devices
      div #[strong Version 1.5.0] Added Russian language
      div
        | #[strong Version 1.4.0] Allow editing events title
        highlight-message(type="success")
          ul
            li The delete button now appears on click and hold.
            li All the events are now read-only by default you can add the option #[span.code editableEvents] to allow edition.
            li.
              The #[span.code editableEvents] option triggers all the editing features on and off.#[br]
              Refer to the #[span.code editableEvents] option in the #[a(href="#api") API] section.
      div #[strong Version 1.3.0] Added Simplified Chinese language &amp; bug fixes
      div
        | #[strong Version 1.2.0] Allow event deletion
        highlight-message(type="success").
          You now have the ability to select an event independently of a cell.#[br]
          On event focus the event z-index is increased and a delete button appears to delete the event.#[br]
          Hovering an event also increases its z-index so you can see the event more easily in case of overlaps.
      div.mt3 #[strong Version 1.1.0] Allow event resizing + Spanish &amp; Portuguese-Brasil languages.
      div.mt3 #[strong Version 1.0.0] First public release
</template>

<script>
import HighlightMessage from './components/highlight-message.vue'

export default {
  components: { HighlightMessage },
  data: () => ({
    seeOldReleaseNotes: false
  })
}
</script>
