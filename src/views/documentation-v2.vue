<template lang="pug">
.documentation
  .text-center.todo(style="margin: 0 auto 7em;max-width: 900px")
    h2.title.mt-12.mb-2.todo To do...
    p.mb-2 Here is my ongoing to do list.

    div Earlier
    div(style="transform: scale(0.85);opacity: 0.8")
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | default active view
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Enable / disable views
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Hide / show weekends
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Add timeline w/ timerange &amp; increment
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Add timeline
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | time format 12/24 h
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Support for i18n
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Split days
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Support events
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Background events
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Overlap events
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Keep only default style in CSS
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Allow custom arrows
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Default active date
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Double tap on touch devices
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        strong 1st NPM Release!
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Built-in themes
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Resize events
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Delete events
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Emit DOM events
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Event indicator on month view
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Custom time format
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Highlight current time
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Show events on month view
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | sync 2 vue-cal instances
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Add CSS transitions
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Multiple day events
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Custom events rendering
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Custom callback on event click
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Option to start week on Sunday
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | All day events in top bar
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Custom cell rendering
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Events count on year(s) views
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Create new event
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | min &amp; max dates
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Today button
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Externalize locales
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Support more simultaneous events
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Sticky day splits labels
      v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
        v-icon.mr-1(size="20") check
        | Hide particular weekdays

    .mb-2 Current backlog
    v-chip.ma-1.pl-0.pr-1(color="green" outlined small)
      v-icon.mr-1(size="20") check
      | Optional week number
    v-chip.ma-1.pl-0.pr-1(color="amber darken-1" outlined small)
      v-icon.mr-1(size="20") timer
      | Recurring events
    v-chip.ma-1.pl-0.pr-1(color="amber darken-1" outlined small)
      v-icon.mr-1(size="20") timer
      | Drag events
    v-chip.ma-1.pl-0.pr-1(color="deep-orange" outlined small)
      v-icon.mr-1(size="20") access_time
      a(href="https://github.com/antoniandre/vue-cal/issues/168" target="_blank" style="text-decoration: underline;color: inherit") Full Typescript support
    v-chip.ma-1.pl-0.pr-1(color="deep-orange" outlined small)
      v-icon.mr-1(size="20") access_time
      a(href="https://github.com/antoniandre/vue-cal/issues/127" target="_blank" style="text-decoration: underline;color: inherit") Full SSR support
    v-chip.ma-1.pl-0.pr-1(color="deep-orange" outlined small)
      v-icon.mr-1(size="20") access_time
      | Improve multiple day events Month view
    v-chip.ma-1.pl-0.pr-1(color="deep-orange" outlined small)
      v-icon.mr-1(size="20") access_time
      | Resize events snap to time
    v-chip.ma-1.pl-0.pr-1(color="deep-orange" outlined small)
      v-icon.mr-1(size="20") access_time
      | Drag events snap to time
    v-chip.ma-1.pl-0.pr-1(color="deep-orange" outlined small)
      v-icon.mr-1(size="20") access_time
      | Prevent event intersect. on drag/resize
    v-chip.ma-1.pl-0.pr-1(color="deep-orange" outlined small)
      v-icon.mr-1(size="20") access_time
      | Horizontal timeline
    //- TODO:
      General
      - do all the @todo
      - cleanup mutableEvents
      - check event returned from all emitted events / always return view events not mutable ones
      - add recurring events
      - check overlaps only on the cell that has changed on event create/drag/background change
      Multiple-day events:
      - Fix event segments when dragging too fast on x axis.
      - multiple days on month view like google calendar
      - if more than 24 hour duration, consider as all-day

  h2.headline.mt-12.mb-3.title Github project
  v-layout.mb-3(align-center shrink)
    v-icon.pr-4.lightgrey--text(x-large) fab fa-github
    a(href="https://github.com/antoniandre/vue-cal" target="_blank") //github.com/antoniandre/vue-cal #[v-icon(small color="primary") open_in_new]

  v-layout.mb-12(justify-center style="max-width: 700px;margin: auto")
    v-icon.flame(size="100").mr-3 whatshot
    highlight-message(type="tips" no-icon)
      .headline.mt-2.mb-3 #[span.code.mr-1 vue-cal@2.0] is out! &nbsp; 🎉🎉
      .subtitle-1.font-weight-medium.
        Big changes. Check all the new features and changes in the #[a(href="#release-notes") Release Notes]!#[br]
      | The example menu will also help you spot the new stuff.
      .mt-6.layout.flex.align-center.subtitle-1.font-weight-medium
        v-icon.mr-2(size="20") favorite_border
        span.mr-4 Thank you to all the supporters!
        v-spacer
        v-icon.mr-1(size="18" color="primary") attach_money
        a(href="https://www.paypal.me/antoniandre1" target="_blank") #[strong Support the project]

  highlight-message(type="info")
    p.mb-2
      strong Important Notes: Always check the #[a(href="#release-notes") Release Notes] when you upgrade!
    strong Philosophy:&nbsp;
    | Vue Cal tries to separate logic &amp; styles.#[br]
    | For performance, simplified logic, readability, structure &amp; maintenance of your own code,
    | what can be done via CSS should be done via CSS. CSS classes will help you style your events, cells, splits, etc.

  h2.headline.mt-12
    a(href="#installation") Installation
    a#installation(name="installation")
  highlight-message(type="warning") Vue.js 2.6.1 or later is required.
  p You have 2 options: #[em NPM] #[strong.mx-2 or] #[span.code &lt;script&gt;] tag.
  h3 Via NPM
  sshpre.mt-2(language="shell" label="Shell") npm i --S vue-cal
  p Then import the component and use it:
  sshpre.mt-2(language="js" label="Javascript").
    // In your Vue.js component.
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'
    ...

    export default {
      components: { VueCal },
      data: () => ({
        ...
      }),
      ...
    }

  h3 Via #[span.code &lt;script&gt;] tag
  p Include the Vue Cal script in your document #[span.code &lt;head&gt;] as follows:
  sshpre.mt-6(language="html" label="HTML").
    &lt;head&gt;
      ...
      &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
      &lt;script src="https://unpkg.com/vue-cal"&gt;&lt;/script&gt;
      &lt;link href="https://unpkg.com/vue-cal/dist/vuecal.css" rel="stylesheet"&gt;
    &lt;/head&gt;
  p Then define the component to use in your template:
  sshpre.mt-6(language="js" label="Javascript").
    // In your Vue.js component.
    export default {
      components: { 'vue-cal': vuecal },
      ...
    }

  h2.headline.mt-12.pt-12
    a(href="#how-to-use") How to use
    a#how-to-use(name="how-to-use")
  highlight-message(type="warning")
    p.
      Wait! Before you dive in, make sure you place Vue Cal in a container that #[strong has a set height]! (not auto or initial)#[br]
      By default Vue Cal will take the full width &amp; height of its container if it has a set height.
    sshpre.mt-2(language="html-vue").
      &lt;!-- If the container has no height, set a height on vue-cal --&gt;
      &lt;vue-cal style="height: 250px"&gt;&lt;/vue-cal&gt;
    vue-cal(small :time="false" hide-view-selector style="height: 250px")

  h2.headline.mt-12.pt-12
    a(href="#examples") Examples
    a#examples(name="examples")
  highlight-message.mt-3(type="success" no-icon)
    v-layout
      v-icon.ml-1.mr-3(color="green lighten-2") fab fa-codepen
      div
        .title Try it yourself on Codepen. Here is a set of frequent use cases:
        ul
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/pGJWjL" target="_blank") Basic calendar],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/rPzWOJ" target="_blank") Calendar with events],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/jJbygw?editors=1010" target="_blank") Calendar with custom events on month view],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/abbVQLy?editors=1010" target="_blank") Calendar with custom title],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/WWRLgG?editors=1010" target="_blank") Calendar with custom cells],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/dxXvwv?editors=1010" target="_blank") Localized calendar (i18n)],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/MWWbZgK" target="_blank") 2 Vue Cal instances to show 2 weeks],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/jOOmxzo" target="_blank") 12 Vue Cal instances to show a full year view (slower - not recommended)],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/rbpPab?editors=1010" target="_blank") How to fetch events from a back-end].

  h3.title
    a(href="#ex--basic")
      v-icon.mr-2 done
      | Basic
  //- Example.
  h4.title
    a(href="#ex--basic") # Basic with no timeline &amp; hidden weekends
    a#ex--basic(name="ex--basic")
  p
    | Double click cell to go to a narrower view and click the title to go to a broader view.#[br]
    | By default the calendar theme is grey to match with most of web pages.#[br]
    | You can easily change the color theme (#[a(href="#css-notes") learn how]): try this
    v-btn.ma-1(dark small :color="example1theme === 'green' ? 'rgba(66, 163, 185, 0.8)' : 'primary'" @click="example1theme = example1theme === 'green' ? 'blue' : 'green'") {{ example1theme === "green" ? 'blue theme' : 'green theme' }}
  v-card.my-2.ma-auto.main-content(style="height: 450px")
    vue-cal(:class="`vuecal--${example1theme}-theme`" :time="false" hide-weekends)
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal :time="false" hide-weekends&gt;&lt;/vue-cal&gt;
  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h4.title
    a(href="#ex--small-cal") # Small calendar, no time, hidden view selector &amp; custom arrows
    a#ex--small-cal(name="ex--small-cal")
  p.
    Extra-small, no timeline, hidden view selector &amp; custom arrows (using the reserved slots #[span.code arrow-prev] &amp; #[span.code arrow-next]).#[br]
    With a hidden view selector, you can still navigate between the different views: double click cell to go to a narrower view, click title to go to a broader view.
  v-card.my-2.ma-auto.main-content(style="width: 250px;height: 260px")
    vue-cal.vuecal--green-theme(hide-view-selector :time="false" default-view="month" xsmall)
      template(v-slot:arrow-prev)
        v-icon arrow_back
      template(v-slot:arrow-next)
        v-icon arrow_forward
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal hide-view-selector :time="false" default-view="month" xsmall&gt;
      &lt;i v-slot:arrow-prev aria-hidden="true" class="v-icon material-icons"&gt;arrow_back&lt;/i&gt;
      &lt;i v-slot:arrow-next aria-hidden="true" class="v-icon material-icons"&gt;arrow_forward&lt;/i&gt;
    &lt;/vue-cal&gt;

  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h4.title
    a(href="#ex--min-max-dates") # Minimum / maximum dates &amp; single click to navigate
    a#ex--min-max-dates(name="ex--min-max-dates")
  p.
    With the options #[span.code minDate] &amp; #[span.code maxDate], you can set a
    time range of selectable cells. All the cells before and after are still visible but
    will be disabled and not selectable.#[br]
    You can still navigate through them with arrows.#[br]
    In this example, the minimum date is set to 15 days behind and the maximum date to
    15 days ahead.#[br]
  highlight-message(type="tips")
    strong.ml-2 Notes:
    ul
      li the min and max options accept a formatted string or plain Javascript Date object.
      li.
        2 different CSS class are available on out of range cells: #[span.code .before-min]
        &amp; #[span.code .after-max].
  v-card.my-2.ma-auto.main-content(style="width: 250px;height: 260px")
    vue-cal.vuecal--green-theme.ex--min-max-dates(
      xsmall
      hide-view-selector
      click-to-navigate
      :time="false"
      default-view="month"
      :min-date="minDate"
      :max-date="maxDate")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal
      xsmall
      hide-view-selector
      click-to-navigate
      :time="false"
      default-view="month"
      :min-date="minDate"
      :max-date="maxDate"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    computed: {
      minDate () {
        let now = new Date()
        let date = new Date(now)
        date.setDate(now.getDate() - 15)
        return date
      },
      maxDate () {
        let now = new Date()
        let date = new Date(now)
        date.setDate(now.getDate() + 15)
        return date
      }
    }

  sshpre(language="css" label="CSS").
    .vuecal__cell.disabled {text-decoration: line-through;}
    .vuecal__cell.disabled.before-min {color: #b6d6c7;}
    .vuecal__cell.disabled.after-max {color: #008b8b;}

  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h4.title
    a(href="#ex--calendar-themes") # Calendar themes - Rounded cells
    a#ex--calendar-themes(name="ex--calendar-themes")
  p.
    You can easily change the calendar color theme or use the rounded-cells theme
    by applying the corresponding CSS class on the #[span.code &lt;vuecal&gt;] tag.#[br]
    E.g. #[span.code vuecal--rounded-theme], #[span.code vuecal--green-theme], #[span.code vuecal--blue-theme].
    Read more about calendar themes in the #[a(href="#css-notes") CSS Notes] section.

  v-layout.ma-auto(row justify-center wrap)
    v-card.ma-2.main-content(style="width: 270px;height: 300px")
      vue-cal.vuecal--rounded-theme.vuecal--blue-theme(
        xsmall
        hide-view-selector
        :time="false"
        default-view="month"
        :disable-views="['week']")
    v-card.ma-2.main-content(style="width: 270px;height: 300px")
      vue-cal.vuecal--rounded-theme.vuecal--green-theme(
        xsmall
        hide-view-selector
        :time="false"
        default-view="month"
        :disable-views="['week']")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal class="vuecal--rounded-theme vuecal--green-theme"
             xsmall
             hide-view-selector
             :time="false"
             default-view="month"
             :disable-views="['week']"&gt;
    &lt;/vue-cal&gt;
  highlight-message Refer to the #[a(href="#api") API] section to read more about all the options.

  //- Example.
  h4.title
    a(href="#ex--hiding-particular-week-days") # Hiding particular week days &amp; showing weeks numbers
    a#ex--hiding-particular-week-days(name="ex--hiding-particular-week-days")
  p.
    If you want to hide particular days of the week, you can use the #[span.code hide-weekdays]
    option.#[br]It accepts an array of days to hide (day numbers),
    #[strong starting at #[span.code 1] for Monday, to #[span.code 7] for Sunday].#[br]
    This option will apply on #[span.code month] &amp; #[span.code week] views.#[br]#[br]
    If you want to hide Saturday and Sunday you can put #[span.code 6, 7] in the array or use
    #[span.code hide-weekends] in supplement of #[span.code hide-weekdays].#[br]#[br]
    You can show the weeks numbers column on the #[span.code month] view with the #[span.code show-week-numbers] option.#[br]
    You can also provide a custom renderer to the weeks numbers cells through the #[span.code week-number-cell] slot.

  highlight-message.
    Refer to the #[a(href="#api") API] section to read more about all the options.#[br]

  v-card.mx-auto.main-content(style="height: 350px")
    vue-cal.vuecal--green-theme(
      :time="false"
      show-week-numbers
      :hide-weekdays="[2, 3, 5]"
      :disable-views="['years', 'year']")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal
             :time="false"
             show-week-numbers
             :hide-weekdays="[2, 3, 5]"
             :disable-views="['years', 'year']"&gt;
    &lt;/vue-cal&gt;

  //- Example.
  h3.title
    a(href="#ex--internationalization")
      v-icon.mr-2 translate
      | Internationalization (i18n)
  v-layout(row align-end wrap)
    h4.title.mt-6
      a(href="#ex--internationalization") # Internationalization
    v-spacer
    v-layout.shrink(row align-center)
      v-icon.mr-2(color="primary") translate
      span.mr-2 Current language:
      v-select.pa-0.ma-0.shrink(
        :items="localesList"
        item-value="code"
        item-text="label"
        v-model="locale"
        hide-details single-line
        style="width: 250px")
        template(v-slot:selection="{ item }")
          span.mr-2 {{ item.label }}
          v-chip.code.ma-0(small color="#ddd") {{ item.code }}
  a#ex--internationalization(name="ex--internationalization")
  p.
    Let you translate the calendar texts into your own language (#[span.code locale]).#[br]
    Refer to the #[span.code locale] option in the #[a(href="#api") API] section to know more or if you want to provide a translation.#[br]
    Try it in Codepen: #[a(href="https://codepen.io/antoniandre/pen/dxXvwv" target="_blank") Vue Cal - Internationalization].
  v-card.my-2.ma-auto.main-content(style="width: 500px;height: 340px;max-width: 100%")
    vue-cal.vuecal--green-theme(:time="false" small default-view="year" :locale="locale")
  sshpre(language="html-vue" label="Vue Template").
    &lt;v-select :items="localesList" v-model="locale"&gt;&lt;/v-select&gt;
    &lt;vue-cal hide-view-selector :time="false" small default-view="year" :locale="locale"&gt;&lt;/vue-cal&gt;
  highlight-message(type="warning") Don't forget to import the locale file you want as follows:
  sshpre(language="js" label="Javascript").
    // In your Vue.js component import the locale file in your component:
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/i18n/{{locale}}.js'
    import 'vue-cal/dist/vuecal.css'

  h3.title
    a(href="#ex--timeline")
      v-icon.mr-2 access_time
      | Timeline &amp; Today

  //- Example.
  h4.title
    a(href="#ex--timeline") # Timeline
    a#ex--timeline(name="ex--timeline")
  p.
    Timelines are visible on week view and day view.#[br]
    This examples has a set time range from 08:00 to 19:00, time step of 30 minutes (1 hour by default), 24-hour format, and hidden weekends.
  v-card.my-2.ma-auto.main-content(style="height: 450px")
    vue-cal.vuecal--green-theme(:time-from="8 * 60" :time-to="19 * 60" :time-step="30" hide-weekends)
  sshpre(language="html-vue" label="Vue Template").
    &lt;!-- Time-start time-end &amp; time-step are expected in minutes. --&gt;
    &lt;vue-cal :time-from="8 * 60" :time-to="19 * 60" :time-step="30" hide-weekends&gt;&lt;/vue-cal&gt;
  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h4.title
    a(href="#ex--today-current-time-and-disabled-views") # Today's current time &amp; disabled views
    a#ex--today-current-time-and-disabled-views(name="ex--today-current-time-and-disabled-views")
  p.mb-0.
    When you choose to show the time in vue-cal, the current time of today's date will
    be marked with a line (scroll to the current time to see it).#[br]
    The line position will be updated every time the calendar current view is re-rendered (by interacting).#[br]
    You can easily customize the now-line as you wish via CSS.
    Changing the line and arrow color is as easy as:#[br]
  sshpre.mt-6(language="css" label="CSS").
    .vuecal__now-line {color: #06c;}
  p.
    If you don't want this feature you can simply hide it: #[span.code .vuecal__now-line {display: none}].#[br]
    This feature has no impact on performance.

  p.
    If you want the now line to keep accurate position even while your calendar is iddle, you can use the option
    #[span.code watchRealTime] (see more in the #[a(href="#api") API] section).
  v-card.my-2.ma-auto.main-content(style="width: 360px;height: 360px;max-width: 100%")
    vue-cal.vuecal--green-theme.ex--today-current-time-and-disabled-views(
      xsmall
      :time-cell-height="26"
      default-view="day"
      :disable-views="['years', 'year', 'month']")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal xsmall
             default-view="day"
             :disable-views="['years', 'year', 'month']"&gt;
    &lt;/vue-cal&gt;

  //- Example.
  h4.title
    a(href="#ex--adding-a-today-button") # Adding a Today button
    a#ex--adding-a-today-button(name="ex--adding-a-today-button")
  p.
    By default the selected date is today. But if you get lost in time travel, you can add
    a Today button to select Today's date with the option #[span.code today-button].#[br]
    Like navigation arrows, there is also a slot to customize as you want.#[br]
    Bellow are the default Today button on the left and a custom one with icon and tooltip on the right.
  p.ex--adding-a-today-button
    | If you are not satisfied with the position of this button, you can also place it
    | outside of Vue Cal like so:
    v-btn.ma-1.today-button(small color="primary" outlined rounded @click="selectedDate = new Date()") Another Today Button
    | #[br]You might want to change view as well when going to Today's date, here is an example how:
    a.mx-1(href="https://codepen.io/antoniandre/pen/yrREOL?editors=1010" target="_blank") Today Button
    v-icon(small color="green lighten-2") fab fa-codepen
  v-layout(justify-center)
    v-card.my-2.mr-3.main-content(style="max-width: 280px;height: 250px")
      vue-cal.vuecal--green-theme.ex--adding-a-today-button(
        ref="vuecal2"
        xsmall
        hide-weekends
        :disable-views="['years']"
        :time="false"
        today-button
        default-view="month"
        :selected-date="selectedDate || new Date(new Date().getFullYear(), 11, 31)")
    v-card.my-2.main-content(style="max-width: 280px;height: 250px")
      vue-cal.vuecal--green-theme.ex--adding-a-today-button(
        ref="vuecal2"
        xsmall
        hide-weekends
        :disable-views="['years']"
        :time="false"
        today-button
        default-view="month"
        :selected-date="selectedDate || new Date(new Date().getFullYear(), 11, 31)")
        template(v-slot:today-button)
          v-tooltip(bottom)
            template(v-slot:activator="{ on }")
              v-btn(x-Programmatically small fab text v-on="on")
                v-icon(color="primary" size="20") my_location
            span Go to Today's date
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal ref="vuecal"
             xsmall
             hide-weekends
             :disable-views="['years']"
             :time="false"
             today-button
             default-view="month"
             :selected-date="selectedDate"&gt;
      &lt;!-- Optional slot for the custom button. --&gt;
      &lt;template v-slot:today-button&gt;
        &lt;!-- Using Vuetify --&gt;
        &lt;v-tooltip&gt;
          &lt;template v-slot:activator="{ on }"&gt;
            &lt;v-btn v-on="on"&gt;
              &lt;v-icon&gt;my_location&lt;/v-icon&gt;
            &lt;/v-btn&gt;
            &lt;span&gt;Go to Today's date&lt;/span&gt;
          &lt;/template&gt;
        &lt;/v-tooltip&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;

    &lt;button @click="selectedDate = new Date()"&gt;ANOTHER TODAY BUTTON&lt;/button&gt;
  sshpre(language="js" label="Javascript").
    data: () => ({
      // Default to next new year eve.
      selectedDate: new Date(new Date().getFullYear(), 11, 31)
    })

  h3.title
    a(href="#ex--timeless-events")
      v-icon.mr-2 event
      | Events

  //- Example.
  h4.title
    a(href="#ex--timeless-events") # Timeless events
    a#ex--timeless-events(name="ex--timeless-events")
  p.
    The events have associated dates but no time information.#[br]
    Timeless events cannot be resized as they have no time or duration information.#[br]
    Refer to the #[span.code events] option in the #[a(href="#api") API] section.
  v-card.my-2.ma-auto.main-content(style="height: 350px")
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time="false"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="timelessEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time="false"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-21',
          end: '2018-11-21',
          title: 'Need to go shopping',
          content: '&lt;i class="v-icon material-icons"&gt;shopping_cart&lt;/i&gt;',
          class: 'leisure'
        },
        {
          start: '2018-11-21',
          end: '2018-11-21',
          title: 'Golf with John',
          content: '&lt;i class="v-icon material-icons"&gt;golf_course&lt;/i&gt;',
          class: 'sport'
        },
        {
          start: '2018-11-22',
          end: '2018-11-22',
          title: 'Dad\'s birthday!',
          content: '&lt;i class="v-icon material-icons"&gt;cake&lt;/i&gt;',
          class: 'sport'
        }
      ]
  sshpre(language="css" label="CSS").
    /* Different color for different event types. */
    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
    .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

  //- Example.
  h4.title
    a(href="#ex--events-with-time") # Events with time information
    a#ex--events-with-time(name="ex--events-with-time")
  p.
    Read-only events (by default events are not editable) with custom HTML content and css class (for event types).#[br]
    Note that the events are always selectable (drop shadow and higher z-index), even when uneditable.
    The difference with timeless events is that a time is set in the #[span.code start] and #[span.code end] attributes of the events.

  highlight-message.mt-3(type="tips").
    Important Note: If you want to end an event at #[span.code 00:00], you have to set
    #[span.code 24:00] instead, to keep it to the same day you intended.

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="events")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             :events="events"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="js" label="Javascript").
    events: [
    {
      start: '2018-11-16 10:30',
      end: '2018-11-16 11:30',
      // You can also define event dates with Javascript Date objects:
      // startDate: new Date('2018-11-16 10:30'),
      // endDate: new Date('2018-11-16 11:30'),
      title: 'Doctor appointment',
      content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
      class: 'health'
    },
    ...

  //- Example.
  h4.title
    a(href="#ex--open-dialog-on-event-click") # Open a dialog box on event click / dblclick
    a#ex--open-dialog-on-event-click(name="ex--open-dialog-on-event-click")
  p.mb-2.
    By passing a function to the option #[span.code on-event-click] or #[span.code on-event-dblclick],
    you can control what happens when you click or double click an event - on any view where the events are displayed.#[br]
    The callback function you provide will receive 2 arguments:
  ul
    li #[span.code event]: the clicked calendar event's object
    li #[span.code e]: the associated javascript DOM event
  highlight-message.mt-3(type="tips") You can set any custom attribute you want on an event, you will then be able to access it in the dialog box!#[br]
  v-card.my-2.ma-auto.main-content(style="height: 523px")
    vue-cal.vuecal--green-theme.ex--open-dialog-on-event-click(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :time-to="19 * 60"
      :disable-views="['years', 'year']"
      hide-weekends
      :events="eventsToPop"
      :on-event-click="onEventClick")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :time-to="19 * 60"
             :disable-views="['years', 'year']"
             hide-weekends
             :events="events"
             :on-event-click="onEventClick"&gt;
    &lt;/vue-cal&gt;
    ...
    &lt;!-- Using Vuetify --&gt;
    &lt;v-dialog v-model="showDialog"&gt;
      &lt;v-card&gt;
        &lt;v-card-title&gt;
          &lt;v-icon&gt;{{ '\{\{ selectedEvent.icon \}\}' }}&lt;/v-icon&gt;
          &lt;span&gt;{{ '\{\{ selectedEvent.title \}\}' }}&lt;/span&gt;
          &lt;v-spacer/&gt;
          &lt;strong&gt;{{ '\{\{ (selectedEvent.start || \'\').substr(0, 10) \}\}' }}&lt;/strong&gt;
        &lt;/v-card-title&gt;
        &lt;v-card-text&gt;
          &lt;p v-html="selectedEvent.contentFull"/&gt;
          &lt;strong&gt;Event details:&lt;/strong&gt;
          &lt;ul&gt;
            &lt;!-- You can also manipulate the Date objects `startDate` &amp; `endDate`. --&gt;
            &lt;li&gt;Event starts at: {{ '\{\{ (selectedEvent.start || \'\').substr(11) \}\}' }}&lt;/li&gt;
            &lt;li&gt;Event ends at: {{ '\{\{ (selectedEvent.end || \'\').substr(11) \}\}' }}&lt;/li&gt;
          &lt;/ul&gt;
        &lt;/v-card-text&gt;
      &lt;/v-card&gt;
    &lt;/v-dialog&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      selectedEvent: {},
      showDialog: false,
      events: [
        {
          start: '2018-11-20 14:00',
          end: '2018-11-20 18:00',
          title: 'Need to go shopping',
          icon: 'shopping_cart', // Custom attribute.
          content: 'Click to see my shopping list',
          contentFull: 'My shopping list is rather long:&lt;br&gt;&lt;ul&gt;&lt;li&gt;Avocadoes&lt;/li&gt;&lt;li&gt;Tomatoes&lt;/li&gt;&lt;li&gt;Potatoes&lt;/li&gt;&lt;li&gt;Mangoes&lt;/li&gt;&lt;/ul&gt;', // Custom attribute.
          class: 'leisure'
        },
        {
          start: '2018-11-22 10:00',
          end: '2018-11-22 15:00',
          title: 'Golf with John',
          icon: 'golf_course', // Custom attribute.
          content: 'Do I need to tell how many holes?',
          contentFull: 'Okay.&lt;br&gt;It will be a 18 hole golf course.', // Custom attribute.
          class: 'sport'
        }
      ]
    }),
    methods: {
      onEventClick (event, e) {
        this.selectedEvent = event
        this.showDialog = true

        // Prevent navigating to narrower view (default vue-cal behavior).
        e.stopPropagation()
      }
    }

  sshpre(language="css" label="CSS").
    .vuecal__event {cursor: pointer;}

    .vuecal__event-title {
      font-size: 1.2em;
      font-weight: bold;
      margin: 4px 0 8px;
    }

    .vuecal__event-time {
      display: inline-block;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .vuecal__event-content {
      font-style: italic;
    }

  //- Example.
  h4.title
    a(href="#ex--events-indicators") # Events indicators - #[span.code years], #[span.code year] &amp; #[span.code month] views
    a#ex--events-indicators(name="ex--events-indicators")
  p.mb-0.
    When you define events the #[span.code month] view will display an events count per day.#[br]
    You can use the option #[span.code eventsCountOnYearView] to show the events count on
    #[span.code years] &amp; #[span.code year] views as well.#[br]
    You can customize the events count as you wish via CSS.
  p.mt-3.layout.align-center
    span.mr-2 Choose an indicator style:
    v-radio-group.ma-0.pt-0.d-inline-block(v-model="indicatorStyle" hide-details row)
      v-radio(label="count (default)" value="count" color="primary")
      v-radio(label="dash" value="dash" color="primary")
      v-radio(label="dot" value="dot" color="primary")
      v-radio(label="cell background" value="cell" color="primary")
  v-layout.ma-auto(row justify-center wrap)
    v-card.ma-2.my-2.ma-auto.main-content(style="width: 300px;height: 360px")
      vue-cal.vuecal--green-theme(
        :class="'event-indicator--' + indicatorStyle"
        selected-date="2018-11-19"
        xsmall
        :time-from="10 * 60"
        default-view="month"
        :disable-views="['day']"
        events-count-on-year-view
        :events="events")
    v-card.ma-2.my-2.ma-auto.main-content(style="width: 300px;height: 360px")
      vue-cal.vuecal--yellow-theme(
        :class="'event-indicator--' + indicatorStyle"
        selected-date="2018-11-19"
        xsmall
        :time-from="10 * 60"
        :disable-views="['day']"
        events-count-on-year-view
        default-view="month"
        :events="events")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             xsmall
             :time-from="10 * 60"
             :disable-views="['day']"
             events-count-on-year-view
             default-view="month"
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="css" label="CSS").
    /* Default indicator is count, but you can override it with one of the following rules. */

    /* Dash indicator */
    .vuecal__cell-events-count {
      width: 18px;
      height: 2px;
      color: transparent;
    }

    /* Dot indicator */
    .vuecal__cell-events-count {
      width: 4px;
      min-width: 0;
      height: 4px;
      padding: 0;
      color: transparent;
    }

    /* Cell background indicator */
    .vuecal__cell--has-events {background-color: #fffacd;}
    .vuecal__cell-events-count {display: none;}

  //- Example.
  h4.title
    a(href="#ex--events-on-month-view") # Display events on month view
    a#ex--events-on-month-view(name="ex--events-on-month-view")
  p.
    With the option #[span.code events-on-month-view], you can choose whether to display the events on the month view or not.#[br]
    #[span.code events-on-month-view] accepts a Boolean to show or hide, or the string '#[span.code short]' to show only the event's title.#[br]
    If #[span.code events-on-month-view] is set to #[span.code true], all the informations are displayed, you can then hide
    any event information via CSS.#[br]
    If you want all the cells to have the same height on this view, this is also your call, you can do it via CSS.
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.vuecal--full-height-delete.ex--events-on-month-view(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :disable-views="['years', 'year']"
      default-view="month"
      hide-weekends
      events-on-month-view="short"
      :events="events"
      style="height: 600px")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :disable-views="['years', 'year']"
             default-view="month"
             hide-weekends
             events-on-month-view="short"
             :events="events"
             style="height: 600px"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="css" label="CSS").
    .vuecal--month-view .vuecal__cell {height: 80px;}

    .vuecal--month-view .vuecal__cell-content {
      justify-content: flex-start;
      height: 100%;
      align-items: flex-end;
    }

    .vuecal--month-view .vuecal__cell-date {padding: 4px;}
    .vuecal--month-view .vuecal__no-event {display: none;}

  //- Example.
  h4.title
    a(href="#ex--edit-delete-create-events") # Edit, delete &amp; create events
    a#ex--edit-delete-create-events(name="ex--edit-delete-create-events")
  p
    | The option #[span.code editable-events] Allows editing event title, deleting
    | (by clicking and holding an event), resizing (by dragging handle) and creating
    | new event (by clicking and holding a cell).#[br]#[br]
    | Event creation is only possible on a day cell, so not on years &amp; year views.#[br]
    em Learn more about event creation in the #[a(href="#ex--more-advanced-event-creation") more advanced event creation] example.
    | #[br]#[br]
    | Vue Cal emits events on calendar event change, read more about it in the
    | #[a(href="#ex--emitted-events") emitted events] example.

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="10 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year']"
      hide-view-selector
      hide-weekends
      editable-events
      :events="editableEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="10 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year']"
             hide-view-selector
             hide-weekends
             editable-events
             :events="events"
             class="vuecal--full-height-delete"&gt;
    &lt;/vue-cal&gt;
  highlight-message(type="tips")
    ul
      li.
        You can override the #[span.code editable-events] ability in each events with the event
        attributes #[span.code deletable: false] &amp; #[span.code resizable: false].
      li.
        By default the delete button only appears at the top of the event with a set height (1.4em).
        If you want a full-height delete button like in this example, you can apply the CSS class
        #[span.code .vuecal--full-height-delete] to your &lt;vue-cal&gt; tag.
  highlight-message Refer to the #[span.code editableEvents] option in the #[a(href="#api") API] section.

  //- Example.
  h4.title
    a(href="#ex--more-advanced-event-creation") # More advanced event creation
    a#ex--more-advanced-event-creation(name="ex--more-advanced-event-creation")
  p.
    There are 3 ways to create an event: on cell click  &amp; hold (default), on cell single/double click,
    or programmatically.
  highlight-message Event creation will not trigger with a single/double click or click &amp; hold #[strong if your cursor is on an event].
  p Let's see the 3 cases in order of complexity:

  ol.pl-3
    li.mt-3
      h5.subtitle-1.font-weight-bold On cell single or double click
      p.
        As the #[span.code cell-click] &amp; #[span.code cell-dblclick] emitted
        events return a date and time at cursor position (refer to the
        #[a(href="#ex--emitted-events") emitted events example]),
        you simply need to call the #[span.code createEvent()] function straight
        away from #[span.code cell-dblclick]:
      v-layout(row wrap)
        v-card.flex.my-2.mr-3.main-content(style="height: 280px")
          vue-cal.vuecal--green-theme.vuecal--full-height-delete(
            ref="vuecal3"
            selected-date="2018-11-19"
            small
            :time-from="10 * 60"
            :time-to="16 * 60"
            :disable-views="['years', 'year', 'month', 'day']"
            hide-view-selector
            hide-title-bar
            hide-weekends
            :cell-click-hold="false"
            editable-events
            :events="events"
            @cell-dblclick="$refs.vuecal3.createEvent($event, { title: 'New Event', classes: ['blue-event'] })")
        sshpre.my-2.caption(language="html-vue").
          &lt;vue-cal ref="vuecal"
                   selected-date="2018-11-19"
                   small
                   :time-from="10 * 60"
                   :time-to="16 * 60"
                   :disable-views="['years', 'year']"
                   hide-view-selector
                   hide-weekends
                   hide-title-bar
                   :cell-click-hold="false"
                   editable-events
                   :events="events"
                   @cell-dblclick="$refs.vuecal.createEvent($event, { title: 'New Event', classes: ['blue-event'] })"&gt;
          &lt;/vue-cal&gt;
      p You may then want to disable the default event creation on cell click &amp; hold by setting #[span.code :cell-click-hold="false"]
    li.mt-12
      h5.subtitle-1.font-weight-bold Programmatically &amp; externally
      p.my-2.
        To allow an external button to create events, you will need to call the
        vue-cal #[span.code createEvent()] function from a Vue ref.
      v-layout.mb-3(row align-center)
        | This
        v-btn.mx-1(x-small color="primary" @click="customEventCreation") button
        | will prompt you to choose a date and time as the event start.

      v-layout(row align-top wrap)
        v-card.flex.my-2.mr-3.main-content(style="height: 280px")
          vue-cal.vuecal--green-theme.vuecal--full-height-delete(
            ref="vuecal"
            selected-date="2018-11-19"
            small
            :time-from="10 * 60"
            :time-to="16 * 60"
            :disable-views="['years', 'year']"
            hide-view-selector
            hide-title-bar
            hide-weekends
            editable-events
            :events="events")
        sshpre.my-2.caption(language="html-vue").
          &lt;button @click="customEventCreation"&gt;
              button
          &lt;/button&gt;

          &lt;vue-cal ref="vuecal"
                   selected-date="2018-11-19"
                   small
                   :time-from="10 * 60"
                   :time-to="16 * 60"
                   :disable-views="['years', 'year']"
                   hide-view-selector
                   hide-title-bar
                   hide-weekends
                   editable-events
                   :events="events"&gt;
          &lt;/vue-cal&gt;
      p Then you can give custom event attributes as you wish:
      sshpre.mt-3(language="js" label="Javascript").
        // In methods.
        customEventCreation () {
            const dateTime = prompt('Create event on (yyyy-mm-dd hh:mm)', '2018-11-20 13:15')

            // Check if date format is correct before creating event.
            if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(date)) {
              this.$refs.vuecal.createEvent(
                // Formatted start date and time or JavaScript Date object.
                dateTime,
                // Custom event props (optional).
                { title: 'New Event', content: 'yay! 🎉', classes: ['leisure'] }
              )
            } else if (date) alert('Wrong date format.')
        }
      highlight-message(type="warning").
        Note that you can also override the default end date (2 hours duration),
        by setting the property #[span.code end], but for internal Vue Cal calculations
        #[strong you will also need to set the property #[span.code endTimeMinutes]].

    li.mt-12
      h5.subtitle-1.font-weight-bold Adding a dialog box to the default #[strong cell click &amp; hold] behavior
      p.mt-3.
        By default, event will be created with these attributes:
      sshpre.mt-0(language="js" label="Javascript").
        {
            start: {String}, // (Formatted date) starting from your cursor position in the day cell you clicked.
            end: {String}, // (Formatted date) Event start + 2 hours
            title: '',
            content: '',
            split /* if any */: {Integer} // The current day split you clicked.
        }

      p.
        If you want to customize those attributes you can modify the event directly through
        the callback function that you provide to #[span.code :on-event-create] as follows:#[br]
      sshpre.mt-6(language="js" label="Javascript").
        // :on-event-create="onEventCreate", in template.

        /**
        * @param event {Object} The newly created event that you can override.
        * @param deleteEventFunction {Function} Allows you to delete this event programmatically.
        * @return {Object} The event to be passed back to Vue Cal.
        */
        onEventCreate (event, deleteEventFunction) {
            // You can modify event here and return it.
            // You can also return false to reject the event creation.
            return event
          }

      p.
        In this example, we are adding a dialog box to the default simple click &amp; hold.#[br]
        The dialog box will allow you to set all the event attributes.
      v-layout(row wrap)
        v-card.flex.my-2.mr-3.main-content(style="height: 280px")
          vue-cal.vuecal--green-theme.vuecal--full-height-delete(
            selected-date="2018-11-19"
            small
            :time-from="10 * 60"
            :time-to="16 * 60"
            :disable-views="['years', 'year']"
            hide-view-selector
            hide-title-bar
            hide-weekends
            editable-events
            :events="events"
            :on-event-create="onEventCreate")
        sshpre.my-2.caption(language="html-vue").
          &lt;vue-cal selected-date="2018-11-19"
                   small
                   :time-from="10 * 60"
                   :time-to="16 * 60"
                   :disable-views="['years', 'year']"
                   hide-view-selector
                   hide-weekends
                   hide-title-bar
                   editable-events
                   :events="events"
                   :on-event-create="onEventCreate"&gt;
          &lt;/vue-cal&gt;
    sshpre(language="html-vue" label="Vue Template - dialog box").
      &lt;!-- Using Vuetify --&gt;
      &lt;v-dialog v-model="showEventCreationDialog" :persistent="true" max-width="420"&gt;
        &lt;v-card&gt;
          &lt;v-card-title&gt;
            &lt;v-text-field v-model="selectedEvent.title" placeholder="Event Title"/&gt;
          &lt;/v-card-title&gt;
          &lt;v-card-text&gt;
            &lt;v-textarea v-model="selectedEvent.content" placeholder="Event Content"/&gt;
            &lt;v-layout&gt;
              &lt;v-select
                :items="eventsCssClasses"
                placeholder="Event CSS Class"
                @change="selectedEvent.classes = [$event]"/&gt;
              &lt;v-switch v-model="selectedEvent.background" label="background Event"/&gt;
            &lt;/v-layout&gt;
            &lt;v-layout&gt;
              &lt;v-btn @click="cancelEventCreation()"&gt;Cancel&lt;/v-btn&gt;
              &lt;v-btn @click="closeCreationDialog()"&gt;Save&lt;/v-btn&gt;
            &lt;/v-layout&gt;
          &lt;/v-card-text&gt;
        &lt;/v-card&gt;

    sshpre(language="js" label="Javascript").
      data: () => ({
        selectedEvent: null,
        showEventCreationDialog: false,
        eventsCssClasses: ['leisure', 'sport', 'health']
      }),
      methods: {
        onEventCreate (event, deleteEventFunction) {
          this.selectedEvent = event
          this.showEventCreationDialog = true
          this.deleteEventFunction = deleteEventFunction

          return event
        },
        cancelEventCreation () {
          this.closeCreationDialog()
          this.deleteEventFunction()
        },
        closeCreationDialog () {
          this.showEventCreationDialog = false
          this.selectedEvent = {}
        }
      }

  //- Example.
  h4.title
    a(href="#ex--multiple-day-events") # Multiple day events
    a#ex--multiple-day-events(name="ex--multiple-day-events")
  p.
    Multiple day events work like a set of single day events linked together.#[br]
    Deleting one of the day of a multiple day event, will also delete all the other days.#[br]
    Updating the duration by dragging or changing the title will also update on all the days.#[br]
    Try to resize, rename and delete the events.#[br]You can also resize horizontally thanks to
    the option #[span.code resize-x].
  highlight-message(type="tips").
    3 CSS classes are available to target the event first day, the last day and all the days in between:
    #[span.code event-start], #[span.code event-middle], #[span.code event-end].
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.ex--multiple-day-events.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="8 * 60"
      :time-to="23 * 60"
      hide-weekends
      events-count-on-year-view
      editable-events
      resize-x
      :events="multipleDayEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="8 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             editable-events
             resize-x
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-16 10:00',
          end: '2018-11-20 12:37',
          title: 'Running Marathon',
          content: '&lt;i class="v-icon material-icons"&gt;directions_run&lt;/i&gt;',
          class: 'sport'
        },
        {
          start: '2018-11-20 10:00',
          end: '2018-11-20 10:25',
          title: 'Drink water!',
          content: '&lt;i class="v-icon material-icons"&gt;local_drink&lt;/i&gt;',
          class: 'health'
        },
        {
          start: '2018-11-21 19:00',
          end: '2018-11-23 11:30',
          title: 'Trip to India',
          content: '&lt;i class="v-icon material-icons"&gt;flight&lt;/i&gt;',
          class: 'leisure'
        }
      ]
    })

  //- Example.
  h4.title
    a(href="#ex--overlapping-events") # Overlapping events
    a#ex--overlapping-events(name="ex--overlapping-events")
  p.
    Overlapping, editable &amp; deletable events.#[br]
    Overlapping now supports more than 3 simultaneous events.#[br]
    Try to resize &amp; delete events to see the overlapping redrawn.

  v-layout.mb-3(align-center)
    | Optionally you can set a min width (in percent) to the events:
    v-btn.ml-2(small color="primary" @click="minEventWidth = minEventWidth ? 0 : 50")
      v-icon {{ minEventWidth ? 'close' : 'add' }}
      | {{ minEventWidth ? 'min-event-width="50"' : 'Add min-event-width' }}
  div(style="min-height: 40px")
    v-slide-y-transition
      .grey--text(v-if="minEventWidth").
        #[span.code min-event-width="50"] will only apply a min width of 50% on events that
        would be smaller than that.
  highlight-message.mb-6.
    In some cases you may want to set the events overlaps calculation only per same time step
    (default time step is 1 hour), like in
    #[a(href="https://github.com/antoniandre/vue-cal/pull/182" target="_blank") this use case].#[br]
    You can achieve this event overlaps grouping with the option #[span.code overlaps-per-time-step].

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="10 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      editable-events
      :min-event-width="minEventWidth"
      :events="overlappingEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="10 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             editable-events
             :min-event-width="minEventWidth"
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      minEventWidth: 0,
      events: [
        {
          start: '2018-11-21 14:00',
          end: '2018-11-21 22:00',
          title: 'A big thing',
          content: '&lt;i class="v-icon material-icons"&gt;sentiment_satisfied_alt&lt;/i&gt;',
          class: 'health'
        },
        {
          start: '2018-11-21 16:00',
          end: '2018-11-21 19:00',
          title: 'Another thing',
          content: '&lt;i class="v-icon material-icons"&gt;thumb_up&lt;/i&gt;',
          class: 'blue-event'
        },
        {
          start: '2018-11-20 18:30',
          end: '2018-11-20 20:30',
          title: 'Crossfit',
          content: '&lt;i class="v-icon material-icons"&gt;fitness_center&lt;/i&gt;',
          class: 'sport'
        },
        ...
      ]
    })

  //- Example.
  h4.title
    a(href="#ex--background-events") # Background events
    a#ex--background-events(name="ex--background-events")
  p.
    Just add the property #[span.code background: true] to your events.#[br]
    The particularity of background events is that they can fully be overlapped but not overlapping.#[br]
    And they don't overlap like other events: when overlapping both events won't change width.#[br]
    Note that you can still select a background event to put it on top of others and see it.
    Refer to the #[span.code events] option in the #[a(href="#api") API] section.
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="7 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="backgroundEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="7 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-19 12:00',
          end: '2018-11-19 14:00',
          title: 'LUNCH',
          class: 'lunch',
          background: true
        },
        {
          start: '2018-11-20 12:00',
          end: '2018-11-20 14:00',
          title: 'LUNCH',
          class: 'lunch',
          background: true
        },
        ...
      ]
    })

  sshpre(language="css" label="CSS").
    .vuecal__event.lunch {
      background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);/* IE 10+ */
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .vuecal__event.lunch .vuecal__event-time {display: none;align-items: center;}

  //- Example.
  h4.title
    a(href="#ex--all-day-events") # All day events
    a#ex--all-day-events(name="ex--all-day-events")

  ul
    li.mb-2.
      When the #[span.code showAllDayEvents] is set to #[span.code true] the events with an
      #[span.code allDay] attribute set to #[span.code true] will be displayed in a fixed top
      bar on the #[span.code week] &amp; #[span.code day] views.#[br]
      The all day events bar will only show up if the options #[span.code showAllDayEvents] &amp;
      #[span.code time] are set to #[span.code true].#[br]
      #[span.code time] is important since without time information every event is an all-day
      event there is no point in separating them then.
    li.mb-2.
      When #[span.code showAllDayEvents] is set to #[span.code false], all the all day events
      (#[span.code allDay] attribute set to #[span.code true]), will show up as a normal
      #[strong background event].
    li.mb-2.
      On month view, switching #[span.code showAllDayEvents] on and off will not have any impact
      since both should display the all day events.
    li.mb-2.
      #[span.code showAllDayEvents] accepts a #[span.code Boolean] or the string
      #[span.code 'short'], to display only the event title.

  highlight-message.
    Multiple-day events feature will be improved in a future version to display across
    multiple cells in the all day bar.

  v-btn.ma-1(small color="primary" @click="showAllDayEvents = (showAllDayEvents + 1) % 3")
    span.code :show-all-day-events="{{ ["'short'", 'true', 'false'][showAllDayEvents] }}"
  v-btn.ma-1(small color="primary" @click="shortEventsOnMonthView = !shortEventsOnMonthView")
    span.code :events-on-month-views="{{ ['true', "'short'"][shortEventsOnMonthView * 1] }}"

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.ex--all-day-events(
      selected-date="2019-02-11"
      :time-from="7 * 60"
      :disable-views="['years', 'year']"
      hide-weekends
      :show-all-day-events="['short', true, false][showAllDayEvents]"
      :events-on-month-view="[true, 'short'][shortEventsOnMonthView * 1]"
      :events="allDayEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;button @click="showAllDayEvents = (showAllDayEvents + 1) % 3"&gt;
      :show-all-day-events="{{ "\{\{ [\"'short'\", 'true', 'false'][showAllDayEvents] \}\}" }}"
    &lt;/button&gt;
    &lt;button @click="shortEventsOnMonthView = !shortEventsOnMonthView"&gt;
      :events-on-month-views="{{ "\{\{ ['true', \"'short'\"][shortEventsOnMonthView * 1] \}\}" }}"
    &lt;/button&gt;

    &lt;vue-cal selected-date="2019-02-11"
             :time-from="7 * 60"
             :disable-views="['years', 'year']"
             hide-weekends
             :show-all-day-events="['short', true, false][showAllDayEvents]"
             :events-on-month-view="[true, 'short'][shortEventsOnMonthView * 1]"
             :events="events"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="js" label="Javascript").
    showAllDayEvents: 0,
    shortEventsOnMonthView: false,
    events: [
      {
        start: '2019-02-12',
        end: '2019-02-12',
        title: 'Day off!',
        content: '&lt;i class="v-icon material-icons"&gt;beach_access&lt;/i&gt;',
        class: 'beach',
        allDay: true
      },
      {
        start: '2019-02-14',
        end: '2019-02-14',
        title: 'Valentine\'s day',
        content: '&lt;i class="v-icon material-icons"&gt;favorite_outline&lt;/i&gt;',
        class: 'love',
        allDay: true
      },
      ...
    ]

  sshpre(language="css" label="CSS").
    .vuecal__cell-content {align-self: flex-start;}
    .vuecal__cell-date {text-align: right;padding: 4px;}

    .vuecal--week-view .vuecal__bg .vuecal__event--all-day.love,
    .vuecal--day-view .vuecal__bg .vuecal__event--all-day.love {right: 50%;}
    .vuecal--week-view .vuecal__bg .vuecal__event--all-day.leisure,
    .vuecal--day-view .vuecal__bg .vuecal__event--all-day.leisure {left: 50%;}

  //- Example.
  h4.title
    a(href="#ex--splitting-days") # Splitting days &amp; split events
    a#ex--splitting-days(name="ex--splitting-days")
  p.mb-6
    | Split each day into multiple containers passing a CSS class &amp; a label per split, and allow split-specific events.
    br
    br
    | By default the body of the calendar will fit the container.#[br]
    | But with the options #[span.code.black--text min-cell-width] or #[span.code.black--text min-split-width], you can increase the calendar
    | body width and it will become scrollable horizontally.
    ul
      li #[span.code min-cell-width.black--text] will only be activated on week view, since there is only 1 cell in day view.
      li If both #[span.code.black--text min-cell-width] and #[span.code.black--text min-split-width] are set, #[span.code.black--text min-split-width] will be used.

    | #[br]You can also use the option #[span.code.black--text sticky-split-labels] to place the split labels in the header.#[br]
    | Refer to the #[span.code min-cell-width.black--text], #[span.code.black--text min-split-width] and #[span.code.black--text splitDays] option in the #[a(href="#api") API] section.#[br]#[br]

    v-layout(align-center)
      v-btn.mr-2(
        small
        color="primary"
        :outlined="!splitsExample.minCellWidth"
        @click="splitsExample.minCellWidth = splitsExample.minCellWidth ? 0 : 400")
        v-icon.mr-2 {{ splitsExample.minCellWidth ? 'close' : 'add' }}
        | {{ splitsExample.minCellWidth ? `Min cell width: ${splitsExample.minCellWidth}px` : 'Add min cell width' }}

      v-btn.mr-2(
        small
        color="primary"
        :outlined="!splitsExample.minSplitWidth"
        @click="splitsExample.minSplitWidth = splitsExample.minSplitWidth ? 0 : 200")
        v-icon.mr-2 {{ splitsExample.minSplitWidth ? 'close' : 'add' }}
        | {{ splitsExample.minSplitWidth ? `Min split width: ${splitsExample.minSplitWidth}px` : 'Add min split width' }}

      v-btn(
        small
        color="primary"
        :outlined="!splitsExample.stickySplitLabels"
        @click="splitsExample.stickySplitLabels = !splitsExample.stickySplitLabels")
        v-icon.mr-2 {{ splitsExample.stickySplitLabels ? 'close' : 'add' }}
        | Sticky Split Labels

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="8 * 60"
      :time-step="30"
      :disable-views="['years', 'year']"
      editable-events
      :events="splitEvents"
      show-week-numbers
      :split-days="splitsExample.splitDays"
      :sticky-split-labels="splitsExample.stickySplitLabels"
      :min-cell-width="splitsExample.minCellWidth"
      :min-split-width="splitsExample.minSplitWidth")
      template(v-slot:no-event) Nothing here.
  sshpre(language="html-vue" label="Vue Template").
    &lt;button @click="minCellWidth = minCellWidth ? 0 : 400"&gt;
      {{ '\{\{ minCellWidth ? \'min cell width: 400px\' : \'Add min cell width\' \}\}' }}
    &lt;/button&gt;
    &lt;button @click="minSplitWidth = minSplitWidth ? 0 : 200"&gt;
      {{ '\{\{ minSplitWidth ? \'min split width: 200px\' : \'Add min split width\' \}\}' }}
    &lt;/button&gt;
    &lt;button @click="stickySplitLabels = !stickySplitLabels"&gt;
      Sticky Split Labels
    &lt;/button&gt;

    &lt;vue-cal selected-date="2018-11-19"
             :time-from="8 * 60"
             :time-step="30"
             :disable-views="['years', 'year', 'month']"
             editable-events
             :events="events"
             :split-days="splitDays"
             :sticky-split-labels="stickySplitLabels"
             :min-cell-width="minCellWidth"
             :min-split-width="minSplitWidth"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      stickySplitLabels: false,
      minCellWidth: 400,
      minSplitWidth: 0,
      splitDays: [
        { class: 'mom', label: 'Mom' },
        { class: 'dad', label: 'Dad' },
        { class: 'kid1', label: 'Kid 1' },
        { class: 'kid2', label: 'Kid 2' },
        { class: 'kid3', label: 'Kid 3' }
      ]
      events: [
        {
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health',
          split: 1
        },
        {
          start: '2018-11-19 18:30',
          end: '2018-11-19 19:15',
          title: 'Dentist appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health',
          split: 2
        },
        {
          start: '2018-11-20 18:30',
          end: '2018-11-20 20:30',
          title: 'Crossfit',
          content: '&lt;i class="v-icon material-icons"&gt;fitness_center&lt;/i&gt;',
          class: 'sport',
          split: 1
        },
        ...
      ]
    })

  sshpre(language="css" label="CSS").
    /* You can easily set a different style for each split of your days. */
    .vuecal__cell-split.dad {background-color: rgba(221, 238, 255, 0.5);}
    .vuecal__cell-split.mom {background-color: rgba(255, 232, 251, 0.5);}
    .vuecal__cell-split.kid1 {background-color: rgba(221, 255, 239, 0.5);}
    .vuecal__cell-split.kid2 {background-color: rgba(255, 250, 196, 0.5);}
    .vuecal__cell-split.kid3 {background-color: rgba(255, 206, 178, 0.5);}
    .vuecal__cell-split .split-label {color: rgba(0, 0, 0, 0.1);font-size: 26px;}

    /* Different color for different event types. */
    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
    .vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
    .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

  h3.title
    a(href="#ex--emitted-events")
      v-icon.mr-2(medium) swap_horiz
      | Communicating with Vue Cal

  //- Example.
  h4.title
    a(href="#ex--emitted-events") # Vue Cal emitted events
    a#ex--emitted-events(name="ex--emitted-events")
  p.mb-0.
    Vue Cal emits events that you can listen to, to trigger an action outside of Vue Cal.#[br]
    If you are not familiar with Vue JS events, you should read about it here:
    #[a(href="https://vuejs.org/v2/guide/events.html" target="_blank") vuejs.org/v2/guide/events.html #[v-icon(small color="primary") open_in_new]]#[br]#[br]
    Here is the list of emitted events:
  h4.mt-2 View-related
  ul
    li #[span.code ready]
    li #[span.code view-change]
    li #[span.code cell-click] - returns a JS native #[span.code Date] object
    li #[span.code cell-dblclick] - returns a JS native #[span.code Date] object
    li #[span.code cell-focus] - returns a JS native #[span.code Date] object
  highlight-message(type="tips")
    ul
      li.
        #[span.code cell-click] is fired every time you click a day, whereas
        #[span.code cell-focus] is fired only when the selected day changes.
      li.
        #[span.code cell-click], #[span.code cell-dblclick] and #[span.code cell-focus]
        return the time at cursor position, unless the cell was focused from tab key.
        It would then return the cell start date (at midnight).
      li.
        If split-days is provided, #[span.code cell-click], #[span.code cell-dblclick] and #[span.code cell-focus]
        emitted events will return an object containing the date and the clicked split id.

  highlight-message
    | The emitted events #[span.code ready] &amp; #[span.code view-change] return an object:#[br]
    sshpre.mt-2(language="js").
      {
        view: [String],
        startDate: [Date], // View start - JS native Date object.
        endDate: [Date], // View end - JS native Date object.
        firstCellDate: [Date], // Month view only, in case cell is out of current month - JS native Date object.
        lastCellDate: [Date], // Month view only, in case cell is out of current month - JS native Date object.
        outOfScopeEvents: [Array], // Month view only, all the events that are out of the current month.
        events: [Array], // All the events in the current view.
        week: [Integer] // Week number. Only returned if view is 'week'.
      }
    strong.
      Note that on a month view, the events from the out of scope days
      (cells before and after the current month) are also returned in the array.

  h4.mt-2 Events-related
  p.mb-0 In all events, properties #[span.code startDate] &amp; #[span.code endDate] are JS native #[span.code Date] objects:
  ul
    li #[span.code event-focus]
    li #[span.code event-mouse-enter]
    li #[span.code event-mouse-leave]
    li #[span.code event-create]
    li #[span.code event-delete]
    li #[span.code event-change]
    li #[span.code event-title-change]
    li #[span.code event-content-change]
    li #[span.code event-duration-change] &nbsp;#[span.code.grey--text // Only fired at the end of event resizing.]
  highlight-message(type="tips")
    ul
      li.
        The #[span.code event-change] emitted event groups all the events triggered on a calendar event property change:
        #[span.code event-title-change], #[span.code event-content-change],
        #[span.code event-duration-change]. So you have the choice to listen to
        #[span.code event-change] to cover any calendar event change or listen to a specific action emitted event.
      li.mt-3.
        To help you manipulate an event's date, vue-cal returns native #[span.code Date]
        objects in the event properties #[span.code startDate] &amp; #[span.code endDate].#[br]
        So for instance, you can easily access the day of the week of an event with #[span.code event.startDate.getDay()].
  p.mb-0 Watch the list of emitted events (latest on top) as you play with Vue Cal:
  pre.mt-2.ssh-pre.mb-2
    v-layout(wrap align-center)
      div.grey--text //&nbsp;
        strong event-name:&nbsp;
        span arguments-list
      v-spacer
      v-btn.ma-1.ma-0(color="primary" outlined small @click="clearEventsLog")
        v-icon(small).mr-1 clear
        | Clear log
      v-btn.ma-1.my-0.mr-0.ml-2(color="primary" outlined small @click="logMouseEvents = !logMouseEvents")
        v-icon(small).mr-1 {{ logMouseEvents ? 'remove' : 'add' }}
        | {{ logMouseEvents ? 'Hide' : 'Track' }} mouse hover events
    div.scrollable
      div.mt-2.pt-2(v-for="(l, i) in logs" :key="i" :style="i && 'border-top: 1px solid #ddd'")
        strong.mr-1 {{ l.name }}:
        span {{ l.args }}
  v-card.mt-6.mb-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="7 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year']"
      hide-weekends
      editable-events
      :events="eventsCopy3"
      @ready="logEvents('ready', $event)"
      @view-change="logEvents('view-change', $event)"
      @cell-click="logEvents('cell-click', $event)"
      @cell-dblclick="logEvents('cell-dblclick', $event)"
      @cell-focus="logEvents('cell-focus', $event)"
      @event-focus="logEvents('event-focus', $event)"
      @event-mouse-enter="logEvents('event-mouse-enter', $event)"
      @event-mouse-leave="logEvents('event-mouse-leave', $event)"
      @event-title-change="logEvents('event-title-change', $event)"
      @event-content-change="logEvents('event-content-change', $event)"
      @event-duration-change="logEvents('event-duration-change', $event)"
      @event-create="logEvents('event-create', $event)"
      @event-delete="logEvents('event-delete', $event)")

  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="7 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year']"
             hide-weekends
             editable-events
             :events="events"
             @ready="logEvents('ready', $event)"
             @view-change="logEvents('view-change', $event)"
             @cell-click="logEvents('cell-click', $event)"
             @cell-dblclick="logEvents('cell-dblclick', $event)"
             @cell-focus="logEvents('cell-focus', $event)"
             @event-focus="logEvents('event-focus', $event)"
             @event-mouse-enter="logEvents('event-mouse-enter', $event)"
             @event-mouse-leave="logEvents('event-mouse-leave', $event)"
             @event-title-change="logEvents('event-title-change', $event)"
             @event-content-change="logEvents('event-content-change', $event)"
             @event-duration-change="logEvents('event-duration-change', $event)"
             @event-create="logEvents('event-create', $event)"
             @event-delete="logEvents('event-delete', $event)"&gt;
    &lt;/vue-cal&gt;

  //- Example.
  h4.title
    a(href="#ex--external-controls") # External controls &amp; use of Vue Cal methods
    a#ex--external-controls(name="ex--external-controls")
  p.
    You can access any #[strong Vue Cal] internal method through Vue refs.#[br]
    This example shows how to control the Previous, Next and Today functions and the view selections
    from external buttons.

  v-layout.my-2.mx-auto(align-center style="max-width: 500px")
    v-btn.mx-1.flex(small color="primary darken-1" @click="$refs.vuecal4.switchView('day')") Day
    v-btn.mx-1.flex(small color="primary darken-1" @click="$refs.vuecal4.switchView('week')") Week
    v-btn.mx-1.flex(small color="primary darken-1" @click="$refs.vuecal4.switchView('month')") Month
    v-btn.mx-1.flex(small color="primary darken-1" @click="$refs.vuecal4.switchView('year')") Year
    v-btn.mx-1.flex(small color="primary darken-1" @click="$refs.vuecal4.switchView('years')") Years

  v-layout.mt-2.mb-6.mx-auto(justify-center style="max-width: 500px")
    v-btn.mx-1.flex(small color="primary lighten-1" @click="$refs.vuecal4.previous()")
      v-icon.mr-1 keyboard_arrow_left
      | Previous
    v-btn.mx-1.flex(small color="primary lighten-1" @click="$refs.vuecal4.switchView('day', new Date())")
      v-icon.mr-1(small) my_location
      | Today
    v-btn.mx-1.flex(small color="primary lighten-1" @click="$refs.vuecal4.next()")
      | Next
      v-icon.ml-1 keyboard_arrow_right

  v-layout(align-center justify-center)
    vue-cal.vuecal--green-theme(
      small
      ref="vuecal4"
      :time="false"
      hide-view-selector
      :selected-date="selectedDate"
      style="max-width: 500px;height: 260px")
  sshpre(language="html-vue" label="Vue Template").
    &lt;button @click="$refs.vuecal.switchView('day')"&gt;Day&lt;/button&gt;
    &lt;button @click="$refs.vuecal.switchView('week')"&gt;Week&lt;/button&gt;
    &lt;button @click="$refs.vuecal.switchView('month')"&gt;Month&lt;/button&gt;
    &lt;button @click="$refs.vuecal.switchView('year')"&gt;Year&lt;/button&gt;
    &lt;button @click="$refs.vuecal.switchView('years')"&gt;Years&lt;/button&gt;
    &lt;br /&gt;
    &lt;button @click="$refs.vuecal.previous()"&gt;Previous&lt;/button&gt;
    &lt;button @click="$refs.vuecal.switchView('day', new Date())"&gt;Today&lt;/button&gt;
    &lt;button @click="$refs.vuecal.next()"&gt;Next&lt;/button&gt;

    &lt;vue-cal small
      ref="vuecal"
      :time="false"
      hide-view-selector
      :selected-date="selectedDate"&gt;
    &lt;/vue-cal&gt;

  h5.subtitle-1.font-weight-bold Other useful Vue Cal internal methods &amp; Date prototypes
  highlight-message(type="tips")
    | Along with these Vue Cal internal methods that you can use externally,
    | you can also call other useful Vue Cal methods.
    ul
      li
        code #[span.code switchToNarrowerView()]
        p Will drilldown the current view on selected date if there is a narrower view available.
      li
        code minutesAtCursor(e)
        p.
          Will return the time (in minutes) at the cursor position when a DOM event occurs.
          `e` is the DOM event.
      li
        code formatDate(date, format = 'yyyy-mm-dd')
        p.
          Will return a string with formatted date (and time if given) using the loaded locale.#[br]
          For the formatting syntax, refer to the #[span.code locale] &amp; #[span.code timeFormat]
          in the [a(href="#api") API section].
      li
        code formatTime(time, format = 'HH:mm' | 'h:mm{am}' if `twelve-hour`)
        p.
          Will return a string with formatted time using the loaded locale.#[br]
          For the formatting syntax, refer to the #[span.code timeFormat] in the [a(href="#api") API section].

    strong Useful #[span.code Date] prototypes
    p.
      Vue Cal has no dependency and performs date operations through 3 useful #[span.code Date] functions that have been
      added to the native #[span.code Date] class through prototype for convenience. (E.g. #[span.code (new Date()).addDays(2)])
    ul
      li
        code.mr-2 addDays(days)
        | allows you to easily add days directly on the Date object. `days` is an integer.
      li
        code.mr-2 subtractDays(days)
        | allows you to easily subtract days directly on the Date object. `days` is an integer.
      li
        code.mr-2 getWeek()
        | allows you to get the week number of a Date, directly on the Date object.

  //- Example.
  h4.title
    a(href="#ex--sync-two-calendars") # Sync two vue-cal instances
    a#ex--sync-two-calendars(name="ex--sync-two-calendars")
  p.
    In this example the right calendar is used as a date picker and the selected date is
    updated on the left calendar via the #[span.code @cell-focus] event listener.#[br]
    To know more about emitted events refer to the
    #[a(href="#ex--emitted-events") emitted events example].

  v-layout(align-center justify-center)
    vue-cal.vuecal--blue-theme(
      small
      :time="false"
      hide-view-selector
      default-view="week"
      :disable-views="['years', 'year', 'month']"
      :selected-date="selectedDate"
      style="max-width: 360px;height: 260px")
    vue-cal.vuecal--blue-theme.vuecal--rounded-theme(
      xsmall
      :time="false"
      hide-view-selector
      default-view="month"
      :disable-views="['years', 'year', 'week', 'day']"
      @cell-focus="selectedDate = $event"
      style="max-width: 270px;height: 290px;transform: scale(0.9)")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal small
      :time="false"
      hide-view-selector
      default-view="week"
      :disable-views="['years', 'year', 'month']"
      :selected-date="selectedDate"
      class="vuecal--blue-theme"
      style="max-width: 360px;height: 260px"&gt;
    &lt;/vue-cal&gt;
    &lt;vue-cal xsmall
      :time="false"
      hide-view-selector
      default-view="month"
      :disable-views="['years', 'year', 'week', 'day']"
      @cell-focus="selectedDate = $event"
      class="vuecal--blue-theme vuecal--rounded-theme"
      style="max-width: 270px;height: 290px"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      selectedDate: null
    })

  //- Example.
  h4.title
    a(href="#ex--modifying-events-from-outside") # Modifying the array of events outside of Vue Cal
    a#ex--modifying-events-from-outside(name="ex--modifying-events-from-outside")
  highlight-message(type="tips").
    It is possible to modify the array of events like adding or removing an event
    after the first load, but be aware that by doing so all the events in Vue Cal
    will be replaced by the new array of events. You may lose your changes if you
    modified events within Vue Cal.
  v-btn.ma-1(color="primary" small @click="eventsCopy.push({ start: '2018-11-20 12:00', end: '2018-11-20 17:00', title: 'A new event', class: 'blue-event' })")
    v-icon.mr-2 add
    | Add an event
  v-btn.ma-1(color="primary" small @click="eventsCopy.pop()")
    v-icon.mr-2 remove
    | Remove last event
  p.mb-0 Here is the live array of event titles:
  pre {{ eventsCopy.map(e => e.title) }}

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="7 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="eventsCopy")
  sshpre(language="html-vue" label="Vue Template").
    &lt;button @click="events.push({
           start: '2018-11-20 12:00',
           end: '2018-11-20 17:00',
           title: 'A new event',
           class: 'blue-event'
    })"&gt;Add an event&lt;/button&gt;
    &lt;button @click="events.pop()"&gt;Remove last event&lt;/button&gt;

    &lt;vue-cal selected-date="2018-11-19"
             :time-from="7 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health'
        },
        ...
      ]
    })

  h3.title
    a(href="#ex--timeline-tweaking")
      v-icon.mr-2 tune
      | Advanced Vue Cal customization
      small.ml-2 #[em="- when CSS won't do it"]

  highlight-message.mt-6
    | Here is the list of available slots:
    ul
      li #[span.code title]
      li #[span.code arrow-prev]
      li #[span.code arrow-next]
      li #[span.code today-button]
      li #[span.code time-cell]
      li #[span.code week-number-cell]
      li #[span.code cell-content]
      li #[span.code no-event]
      li #[span.code events-count]
      li #[span.code event-renderer]

  //- Example.
  h4.title
    a(href="#ex--timeline-tweaking") # Timeline tweaking
    a#ex--timeline-tweaking(name="ex--timeline-tweaking")
  p.mb-0.
    If you want to have more fancy time cells, you can override them with the
    #[span.code time-cell-height] option (in pixels) and scoped slots.#[br]
    For even more flexibility, the horizontal lines are painted when you set the CSS class #[span.code line] on the tag you choose.
    So if you don't set this class you are free to paint the lines yourself or not.
  v-card.my-2.ma-auto.main-content(style="width: 360px;height: 360px;max-width: 100%")
    vue-cal.vuecal--green-theme(
      small
      :time-from="5 * 60"
      :time-step="15"
      :time-cell-height="18"
      default-view="day"
      :disable-views="['years', 'year', 'month']"
      hide-weekends)
      template(v-slot:time-cell="{ hours, minutes }")
        .line(:class="{ hours: !minutes }")
          strong.primary--text(v-if="!minutes" style="font-size: 15px;line-height: 18px") {{ hours }}
          span(v-else style="font-size: 11px;line-height: 18px") {{ minutes }}
  highlight-message.mt-6(type="tips").
    If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]]
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal small
             :time-from="5 * 60"
             :time-step="15"
             :time-cell-height="18"
             default-view="day"
             :disable-views="['years', 'year', 'month']"
             hide-weekends&gt;
      &lt;template v-slot:time-cell="{ hours, minutes }"&gt;
        &lt;div :class="{ line: true, hours: !minutes }"&gt;
          &lt;strong v-if="!minutes" style="font-size: 15px"&gt;{{ '\{\{ hours \}\}' }}&lt;/strong&gt;
          &lt;span v-else style="font-size: 11px"&gt;{{ '\{\{ minutes \}\}' }}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;

  sshpre.mt-6(language="css" label="CSS").
    .vuecal__time-cell .hours.line:before {border-color: #42b983;}

  //- Example.
  h4.title
    a(href="#ex--custom-events-count") # Custom events count
    a#ex--custom-events-count(name="ex--custom-events-count")

  highlight-message(type="tips").
    Using Vue.js scoped slots, you can also override the counting events method if you need.#[br]
    If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]]
  p.
    In the following example, we only count the events which have the custom
    #[span.code leisure] CSS class.

  v-card.my-2.ma-auto.main-content(style="width: 300px;height: 360px;max-width: 100%")
    vue-cal.vuecal--green-theme.ex--custom-events-count(
      selected-date="2018-11-19"
      xsmall
      :time-from="10 * 60"
      :time-step="2 * 60"
      default-view="month"
      :disable-views="['day']"
      events-count-on-year-view
      :events="events")
      template(v-slot:events-count="{ events, view }")
        span(v-if="customEventsCount(events)") {{ customEventsCount(events) }}

  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             xsmall
             :time-from="10 * 60"
             :time-step="2 * 60"
             :disable-views="['day']"
             default-view="month"
             events-count-on-year-view
             :events="events"&gt;
        &lt;template v-slot:events-count="{ events, view }"&gt;
          &lt;span v-if="customEventsCount(events)"&gt;
            {{ '\{\{ customEventsCount(events) \}\}' }}
          &lt;/span&gt;
        &lt;/template&gt;
    &lt;/vue-cal&gt;

  p.
    Alternatively, you could also use the #[span.code cell-content] slot
    instead of the #[span.code events-count] slot to perform the same task:#[br]
    (Refer to the next example to know more:
    #[a(href="#ex--custom-title-and-cells" v-scroll-to="'#ex--custom-title-and-cells'") Custom title &amp; cells])
  sshpre.mt-2(language="html-vue" label="Vue Template").
    &lt;template v-slot:cell-content="{ cell, view, events }"&gt;
      &lt;span class="vuecal__cell-date"&gt;{{ '\{\{ cell.content \}\}' }}&lt;/span&gt;
      &lt;span class="vuecal__cell-events-count" v-if="['years', 'year', 'month'].includes(view.id) &amp;&amp; customEventsCount(events)"&gt;
        {{ '\{\{ customEventsCount(events) \}\}' }}
      &lt;/span&gt;
    &lt;/template&gt;

  sshpre(language="js" label="Javascript").
    // In your Vue component.
    methods: {
      customEventsCount: events => {
        return events ? events.filter(e => e.class === 'leisure').length : 0
      }
    }

  sshpre(language="css" label="CSS").
    .vuecal__cell-events-count {background: transparent;}
    .vuecal__cell-events-count span {
      background: #42b983;
      height: 100%;
      min-width: 12px;
      padding: 0 3px;
      border-radius: 12px;
      display: block;
    }

  //- Example.
  h4.title
    a(href="#ex--custom-title-and-cells") # Custom title &amp; cells
    a#ex--custom-title-and-cells(name="ex--custom-title-and-cells")
  highlight-message(type="tips").
    Using Vue.js scoped slots, you can override the calendar main date title and calendar cells.#[br]
    If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]]
  h5.mt-6.subtitle-1.font-weight-medium
    v-icon(size="22") keyboard_arrow_right
    | Custom title
  p.ml-2.mb-2.
    2 arguments are available through the scoped slot: #[span.code v-slot:title="{ title, view }"]
  ul
    li
      | #[span.code title], the formatted title (different on all the views). E.g.
      em.ml-2 "Week 2 (January 2019)"
    li
      | #[span.code view], an object containing the active view info.
      sshpre(language="js").mt-2.mb-3.
        {
          id: {String}, // Current view, one of: years, year, month, week, day.
          startDate: {Date}, // JavaScript Date object.
          endDate: {Date}, // JavaScript Date object.
          selectedDate: {Date} // JavaScript Date object.
        }
  p.
    You can use one or the other to format the title as you wish.#[br]
    Using the pre-formatted #[span.code title] will be easy but not very flexible.#[br]
    If you render the date yourself from #[span.code view.startDate], don't forget
    the different formats for all the views: years, year, month, week, day.

  h5.mt-6.subtitle-1.font-weight-medium
    v-icon(size="22") keyboard_arrow_right
    | Custom cells
  p.ml-2.mb-2.
    In this example, only the cell number is clickable on month view.#[br]
    5 arguments are available through the scoped slot:#[br]
    #[span.code v-slot:cell-content="{ cell, view, split, events, goNarrower }"]
  ul
    li #[span.code cell], object containing the cell date.
      sshpre(language="js").mt-2.mb-2.
        {
          content: {String}, // Pre-formatted cell content if any.
          startDate: {Date}, // JavaScript Date object.
          endDate: {Date}, // JavaScript Date object.
          formattedDate: {String}, // formatted start date. E.g. "2019-04-05".
          today: {Boolean}
        }
    li #[span.code view], object containing the active view info.
      sshpre(language="js").mt-2.mb-2.
        {
          id: {String}, // Current view, one of: years, year, month, week, day.
          startDate: {Date}, // JavaScript Date object.
          endDate: {Date}, // JavaScript Date object.
          selectedDate: {Date} // JavaScript Date object.
        }
    li #[span.code split], when splitting days, object containing the current split info.
    li #[span.code events], array containing all the events of the current cell or split.
    li #[span.code goNarrower], function to navigate to narrower view if possible.
  highlight-message.my-3(type="info")
    | By default a cell is rendered as follows.#[br]
    | It is a good idea to reuse the same CSS classes as the different elements have associated styles:#[br]
    sshpre.mt-3.mb-1(language="html-vue").
      &lt;div class="vuecal__flex vuecal__cell-content"&gt;
    sshpre.my-2.ml-5(language="html-vue").
      Now this is the part you can customize:

      &lt;!-- Will be added if splitting days and split labels are set --&gt;
      &lt;div class="split-label" /&gt;
      &lt;!-- Will be added on years, year &amp; month view --&gt;
      &lt;div class="vuecal__cell-date" /&gt;
      &lt;!-- Will be added on month view --&gt;
      &lt;div class="vuecal__cell-events-count" /&gt;
      &lt;!-- Will be added on week and day view if no event --&gt;
      &lt;div class="vuecal__no-event" /&gt;
    sshpre.my-1(language="html-vue").
          &lt;div class="vuecal__cell-events" /&gt;
      &lt;/div&gt;

  v-card.my-2.ma-auto.main-content(style="height: 400px")
    vue-cal.vuecal--green-theme.ex--custom-title-and-cells(
      :time="false"
      :dblclick-to-navigate="false"
      default-view="month"
      :events="events")
      template(v-slot:title="{ title, view }")
        | 🎉&nbsp;{{ view.startDate.getFullYear() }}-{{ (view.startDate.getMonth() + 1) < 10 ? '0' : '' }}{{ view.startDate.getMonth() + 1 }}
        span(v-if="view.id === 'week'") &nbsp;—&nbsp;w{{ view.startDate.getWeek() }}
        span(v-else-if="view.id === 'day'") -{{ view.startDate.getDate() < 10 ? '0' : '' }}{{ view.startDate.getDate() }}
        | &nbsp;🎉
      template(v-slot:cell-content="{ cell, view, events, goNarrower }")
        span.vuecal__cell-date.clickable(v-if="view.id !== 'day'" :class="view.id" @click="goNarrower") {{ cell.content }}
        .vuecal__cell-events-count(v-if="['years', 'year', 'month'].includes(view.id) && events.length") {{ events.length }}
        .vuecal__no-event(v-if="['week', 'day'].includes(view.id) && !events.length") Nothing here 👌

  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal :time="false"
             :dblclick-to-navigate="false"
             default-view="month"
             :events="events"&gt;

      &lt;!-- Custom title --&gt;
      &lt;template v-slot:title="{ title, view }"&gt;
        🎉 {{ '\{\{ view.startDate.getFullYear() \}\}' }}-{{ '\{\{ (view.startDate.getMonth() + 1) < 10 ? \'0\' : \'\' \}\}' }}{{ '\{\{ view.startDate.getMonth() + 1 \}\}' }}
        &lt;!-- Print week number on week view --&gt;
        &lt;span v-if="view.id === 'week'"&gt;— w{{ '\{\{ view.startDate.getWeek() \}\}' }}&lt;/span&gt;
        &lt;!-- Print current day on day view --&gt;
        &lt;span v-else-if="view.id === 'day'"&gt;-{{ '\{\{ view.startDate.getDate() < 10 ? \'0\' : \'\' \}\}' }}{{ '\{\{ view.startDate.getDate() \}\}' }}&lt;/span&gt;
        🎉
      &lt;/template&gt;

      &lt;!-- Custom cells --&gt;
      &lt;template v-slot:cell-content="{ cell, view, events, goNarrower }"&gt;
        &lt;span class="vuecal__cell-date" :class="view.id" v-if="view.id === 'day'" @click="goNarrower"&gt;
          {{ '\{\{ cell.date.getDate() \}\}' }}
        &lt;/span&gt;
        &lt;span class="vuecal__cell-events-count" v-if="view.id === 'month' &amp;&amp; events.length"&gt;{{ '\{\{ events.length \}\}' }}&lt;/span&gt;
        &lt;span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) &amp;&amp; !events.length"&gt;Nothing here 👌&lt;/span&gt;
      &lt;/template&gt;

      &lt;!-- Alternatively to custom cells if you just want custom no-event text: --&gt;
      &lt;!-- &lt;template v-slot:no-event&gt;Nothing here 👌&lt;/template&gt; --&gt;
    &lt;/vue-cal&gt;

  //- Example.
  h4.title
    a(href="#ex--custom-event-rendering") # Custom event rendering
    a#ex--custom-event-rendering(name="ex--custom-event-rendering")
  p.mb-2 Using Vue.js scoped slots, you can override the events rendering.

  highlight-message.my-2(type="tips").
    If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]].
  highlight-message.my-3(type="info")
    | By default an event is rendered as follows.#[br]
    | It is a good idea to reuse the same CSS classes as the different elements have associated styles:#[br]
    sshpre.mt-3.mb-1(language="html-vue").
      &lt;div class="vuecal__event"&gt;
          &lt;!-- Will be added if `editable-events` option is set to `true` --&gt;
          &lt;div class="vuecal__event-delete" /&gt;
    sshpre.my-2.ml-5(language="html-vue").
      Now this is the part you can customize:

      &lt;!-- Will be added if a title is set --&gt;
      &lt;div class="vuecal__event-title" /&gt;
      &lt;!-- or if title is set and `editable-events` option is set to `true` --&gt;
      &lt;div class="vuecal__event-title vuecal__event-title--edit" contenteditable /&gt;

      &lt;!-- Will be added if `time` option is set to `true` --&gt;
      &lt;div class="vuecal__event-time" /&gt;

      &lt;!-- Will be added if a content is set --&gt;
      &lt;div class="vuecal__event-content" /&gt;
    sshpre.my-1(language="html-vue").
          &lt;!-- Will be added if `editable-events` option is set to `true` --&gt;
          &lt;div class="vuecal__event-resize-handle" /&gt;
      &lt;/div&gt;
  p.mb-2.
    Two parameters are passed through the scoped slot:
  ul
    li #[span.code event]: The event full object containing dates, time, title, content and custom attributes.
    li #[span.code view]: The current selected view id.
  p.mt-2.
    You can set any custom attribute you want on an event, they will then be accessible in your custom event renderer!#[br]
    Note that #[span.code _eid] is a reserved keyword.

  v-card.my-2.ma-auto.main-content(style="height: 523px")
    vue-cal.vuecal--green-theme.ex--custom-event-rendering(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :time-to="19 * 60"
      hide-weekends
      :events="eventsToPop")
      template(v-slot:event-renderer="{ event, view }")
        v-icon.mt-2(color="white" x-large) {{ event.icon }}
        .vuecal__event-title.mb-6(v-html="event.title")
        small.vuecal__event-time
          strong.mr-1 Event start:
          span {{ event.start.substr(11) }}
          br
          strong.mr-1 Event end:
          span {{ event.end.substr(11) }}
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :time-to="19 * 60"
             hide-weekends
             :events="events"&gt;
      &lt;template v-slot:event-renderer="{ event, view }"&gt;
        &lt;v-icon&gt;{{ '\{\{ event.icon \}\}' }}&lt;/v-icon&gt;

        &lt;div class="vuecal__event-title" v-html="event.title" /&gt;
        &lt;!-- Or if your events are editable: --&gt;
        &lt;div class="vuecal__event-title vuecal__event-title--edit"
             contenteditable
             @blur="event.title = $event.target.innerHTML"
             v-html="event.title" /&gt;

        &lt;small class="vuecal__event-time"&gt;
          &lt;strong&gt;Event start:&lt;/strong&gt; &lt;span&gt;{{ '\{\{ event.start.substr(11) \}\}' }}&lt;/span&gt;&lt;br/&gt;
          &lt;strong&gt;Event end:&lt;/strong&gt; &lt;span&gt;{{ '\{\{ event.end.substr(11) \}\}' }}&lt;/span&gt;
        &lt;/small&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    events: [
      {
        start: '2018-11-20 14:00',
        end: '2018-11-20 18:00',
        title: 'Need to go shopping',
        icon: 'shopping_cart', // Custom attribute.
        class: 'leisure'
      },
      {
        start: '2018-11-22 10:00',
        end: '2018-11-22 15:00',
        title: 'Golf with John',
        icon: 'golf_course', // Custom attribute.
        class: 'sport'
      }
    ]

  //- API
  h2.headline.mt-12.pt-12
    a(href="#api") API
    a#api(name="api")
  p Here is the list of all the available views.
  sshpre.mt-2(language="js").
    ['years', 'year', 'month', 'week', 'day']
  p.
    Here is the list of all the parameters available and their decription bellow this table.#[br]
    Don't forget that in HTML the #[span.code camelCase] is not correct and you must use
    the #[span.code kebab-case].
  sshpre.mt-2(language="js").
    locale:                 [String],          default: 'en'
    hideViewSelector:       [Boolean],         default: false
    hideTitleBar:           [Boolean],         default: false
    hideBody:               [Boolean],         default: false
    hideWeekends:           [Boolean],         default: false
    hideWeekdays:           [Array],           default: []
    disableViews:           [Array],           default: []
    defaultView:            [String],          default: 'week'
    todayButton:            [Boolean],         default: false
    showAllDayEvents:       [Boolean, String], default: false
    showWeekNumbers:        [Boolean, String], default: false
    selectedDate:           [String, Date],    default: ''
    minDate:                [String, Date],    default: ''
    maxDate:                [String, Date],    default: ''
    startWeekOnSunday:      [Boolean],         default: false
    small:                  [Boolean],         default: false
    xsmall:                 [Boolean],         default: false
    transitions:            [Boolean],         default: true
    clickToNavigate:        [Boolean],         default: false
    dblclickToNavigate:     [Boolean],         default: true
    cellClickHold:          [Boolean],         default: true
    time:                   [Boolean],         default: true
    timeFrom:               [Number],          default: 0 // In minutes.
    timeTo:                 [Number],          default: 24 * 60 // In minutes.
    timeStep:               [Number],          default: 30 // In minutes.
    timeCellHeight:         [Number],          default: 40 // In pixels.
    twelveHour:             [Boolean],         default: false
    timeFormat:             [String],          default: ''
    watchRealTime:          [Boolean],         default: false
    minEventWidth:          [Number],          default: 0 // In percent.
    overlapsPerTimeStep:    [Boolean],         default: false
    minCellWidth:           [Number],          default: 0 // In pixels.
    minSplitWidth:          [Number],          default: 0 // In pixels.
    splitDays:              [Array],           default: []
    stickySplitLabels:      [Boolean],         default: false
    events:                 [Array],           default: []
    editableEvents:         [Boolean],         default: false
    resizeX:                [Boolean],         default: false
    eventsOnMonthView:      [Boolean, String], default: false
    eventsCountOnYearView:  [Boolean],         default: false
    onEventClick:           [Function],        default: null
    onEventDblclick:        [Function],        default: null
    onEventCreate:          [Function],        default: null

  ul.pl-0.api-options
    li
      code.mr-2 locale
      span.code [String], default: 'en'
      p.
        Allows you to translate the calendar texts in a given language.#[br]
        Use a 2 letter locale code
        (#[a(href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank") ISO 639-1])
        unless a distinction is needed. E.g. #[span.code 'pt-br'] for Portuguese-Brasilian.
      highlight-message(type="info")
        | Currently available languages are {{ localesList.map(l => l.label).join(', ') }}.#[br]
        | If you are interested in providing a language support please do a pull request with a json file into the i18n directory.#[br]
        | this is what a language json looks like.

        sshpre.my-2(language="json").
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
            "dateFormat": "DDDD d mmmm yyyy"
          }
        p.
          Regarding the #[span.code dateFormat] translation, this is the format of the full
          date you can see in a single day view title.#[br]
          #[span.code DDDD] stands for the full-letter day of week, #[span.code mmmm] stands for
          full-letter month, #[span.code d] stands for the date of the month (0-31),
          #[span.code yyyy] stands for full year, #[span.code {S}] stands for st/nd/rd/th and only in English.

      highlight-message(type="tips").
        Note that 2 media queries will shorten the days of the week to 3 letters then 1 letter when it does not fit.#[br]
        You can read more about it in the # Responsiveness &amp; Media Queries section in the #[a(href="#css-notes") CSS Notes].
    li
      code.mr-2 hideViewSelector
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the top view selector will disappear.#[br]
        You can still navigate from a view to another by clicking a cell (narrower view) or
        the view title (broader view).
    li
      code.mr-2 hideTitleBar
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the title bar with navigating arrows will disappear.#[br]
        You can still navigate from a view to another with the view selector and clicking
        a cell (narrower view).
    li
      code.mr-2 hideBody
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the whole calendar body will disappear - cells and timeline.#[br]
        Also means that all the logic usually triggered from the calendar's body won't run at all.
    li
      code.mr-2 hideWeekends
      span.code [Boolean], default: false
      p.
        Hide the weekend and shows only Monday to Friday on month view and week view.#[br]
        The weekend are still visible in day view not to break the behavior of the arrows.#[br]
        Note that by hiding the arrows you won't be able to see a weekend day in day view if hideWeekends is true.
    li
      code.mr-2 hideWeekdays
      span.code [Array], default: []
      p.
        Hide particular days of the week. This option accepts an array of days (day numbers) to hide,
        #[strong starting at #[span.code 1] for Monday, to #[span.code 7] for Sunday].#[br]
        This option will apply on month &amp; week views.#[br]#[br]
        If you want to hide Saturday and Sunday you can put #[span.code 6, 7] in the array or use
        #[span.code hideWeekends] in supplement of #[span.code hideWeekdays].
    li
      code.mr-2 disableViews
      span.code [Array], default: []
      p.
        Allows you to totally disable one or more of the available views.#[br]
        Accepted view names are 'years', 'year', 'month', 'week', 'day'.#[br]
        Note that the navigation between views via cells click or title click won't
        break and will only navigate to views you have allowed.
    li
      code.mr-2 defaultView
      span.code [String], default: 'week'
      p.
        Allows you to set a default view, for the first time you load the calendar.#[br]
        Accepts one of 'years', 'year', 'month', 'week', 'day'.
    li
      code.mr-2 todayButton
      span.code [Boolean], default: false
      p Adds a Today button in the title bar to quickly go to Today's date.#[br]
    li
      code.mr-2 showAllDayEvents
      span.code [Boolean, String], default: false
      ul
        li.mb-2.
          When the #[span.code showAllDayEvents] is set to #[span.code true] the events with an
          #[span.code allDay] attribute set to #[span.code true] will be displayed in a fixed top
          bar on the #[span.code week] &amp; #[span.code day] views.#[br]
          The all day events bar will only show up if the options #[span.code showAllDayEvents] &amp;
          #[span.code time] are set to #[span.code true].#[br]
          #[span.code time] is important since without time information every event is an all-day
          event there is no point in separating them then.
        li.mb-2.
          When #[span.code showAllDayEvents] is set to #[span.code false], all the all day events
          (#[span.code allDay] attribute set to #[span.code true]), will show up as a normal
          background event.
        li.mb-2.
          On month view, switching #[span.code showAllDayEvents] on and off will not have any impact
          since both should display the all day events.
        li.mb-2.
          #[span.code showAllDayEvents] accepts a #[span.code Boolean] or the string
          #[span.code 'short'], to display only the event title.
    li
      code.mr-2 showWeekNumbers
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the weeks numbers will show in the first column on the #[span.code month] view (only).#[br]
        You can also provide a custom renderer to the weeks numbers cells through the #[span.code week-number-cell] slot.
      highlight-message
        Strong Did you know there can be 53 weeks in the year?#[br]
        | This happens every time the year starts a Thursday, or starts a Wednesday of a leap year. In this case the week number will be 53 instead of 1.
    li
      code.mr-2 selectedDate
      span.code [String, Date], default: ''
      p.
        Accepts a formatted string or plain JS Date object.#[br]
        Set a selected date, for the first time you load the calendar.#[br]
        This day will be highlighted and the first view will naturally show this date.#[br]
        E.g. setting a date in year 2000 with a defaultView of week, will show you that week of year 2000.#[br]#[br]
        Updating the #[span.code selectedDate] programmatically after the first calendar load,
        will update the view if needed to show this date.#[br]Refer to the #[a(href="#ex--sync-two-calendars") Sync two vue-cal instances] example.
      highlight-message(type="warning").
        A correct string date format is #[code {{ currentDateFormatted }}] or
        #[code="{{ currentDateFormatted.split(' ')[0] }}"] if you don't need the time.
        Only these formats will work as a string. You can also provide a native Javascript Date object.
    li
      code.mr-2 minDate
      span.code [String, Date], default: ''
      p.
        Accepts a formatted string or plain JS Date object.#[br]
        Set a minimum date for the cells to be selectable.#[br]
        By default the cell will be grayed out when out of range but CSS classes let you customize this.
    li
      code.mr-2 maxDate
      span.code [String, Date], default: ''
      p.
        Accepts a formatted string or plain JS Date object.#[br]
        Set a maximum date for the cells to be selectable.#[br]
        By default the cell will be grayed out when out of range but CSS classes let you customize this.
    li
      code.mr-2 startWeekOnSunday
      span.code [Boolean], default: false
      p.
        By default weeks start on Monday but with this option you can start the week on Sunday.
    li
      code.mr-2 small
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the days of the week headings will be truncated to 3 letters.#[br]
        Does not apply to the title of the day view.#[br]
        2 media queries are truncating the days of the week bellow 450px,
        read on in the #[a(href="#css-notes") CSS Notes].
    li
      code.mr-2 xsmall
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the days of the week headings will be truncated to 1 letter.#[br]
        Does not apply to the title of the day view.#[br]
        In Addition, the whole calendar gets applied a smaller font size of 0.9em,
        and the current view title is also reduced.#[br]
        2 media queries are truncating the days of the week bellow 450px,
        read on in the #[a(href="#css-notes") CSS Notes].
    li
      code.mr-2 transitions
      span.code [Boolean], default: true
      p Enable / disable the CSS transitions between all the views and view states.
    li
      code.mr-2 clickToNavigate
      span.code [Boolean], default: false
      p.
        When set to #[span.code true] a single click (or tap for touch devices) will take you to a narrower view if available.#[br]
        You can always go back to a broader view by clicking the view title or selecting another view from the view selector if enabled.#[br]
        The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate] and #[span.code dblclickToNavigate] to false.
    li
      code.mr-2 dblclickToNavigate
      span.code [Boolean], default: true
      p.
        When set to #[span.code true] a double click (or double tap for touch devices) will take you to a narrower view if available.#[br]
        You can always go back to a broader view by clicking the view title or selecting another view from the view selector if enabled.#[br]
        The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate] and #[span.code dblclickToNavigate] to false.
    li
      code.mr-2 cellClickHold
      span.code [Boolean], default: true
      p.
        Allows you to disable the default event creation on cell click &amp; hold which only
        happens if #[span.code editableEvents] is set to #[span.code true].
    li
      code.mr-2 time
      span.code [Boolean], default: true
      p.
        Whether you want to display the timeline and handle events with time or only date.#[br]
        Note that time is made of #[span.code hours:minutes] #[strong.ml-2 and no second].
    li
      code.mr-2 timeFrom
      span.code [Number], default: 0
      p.
        If #[span.code time] is enabled, set the start of the timeline in minutes.
        By default it starts at midnight.
    li
      code.mr-2 timeTo
      span.code [Number], default: 24 * 60
      p.
        If #[span.code time] is enabled, set the end of the timeline in minutes.
        By default it ends at 23.59.
    li
      code.mr-2 timeStep
      span.code [Number], default: 30
      p.
        If #[span.code time] is enabled, set the time increment in minutes.
    li
      code.mr-2 timeCellHeight
      span.code [Number], default: 40
      p.
        If #[span.code time] is enabled, set the time cell height in pixels.#[br]
        this is very important as it is used to calculate the events position in the day.
    li
      code.mr-2 twelveHour
      span.code [Boolean], default: false
      p.
        If #[span.code time] is enabled, the default time format is 24hour.#[br]
        With #[span.code twelveHour] set to #[span.code true] (use #[span.code twelve-hour] in template),
        the time format will show 12 hours suffixed with am/pm.
    li
      code.mr-2 timeFormat
      span.code [String], default: ''
      p.mb-2.
        When defined, overrides the default time format in time cells and events.#[br]
        Formatted time can contain any character but the following characters will be replaced:
      ul.ml-3
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
      code.mr-2 watchRealTime
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the current time line in today's cell, on #[span.code week] and
        #[span.code day] views, will stay in sync with real time.#[br]
        #[span.grey--text (This requires a #[span.code setTimeout] every minute)]
    li
      code.mr-2 minEventWidth
      span.code [Number], default: 0
      p.
        When a number is set, in percent, each event within a cell will have a minimum width.#[br]
        If the provided percentage is bigger than what it would naturally be, the events will partially overlap.
    li
      code.mr-2 overlapsPerTimeStep
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], each event of the same cell will have a width of
        #[span.code 100% / [number of simultaneous events]] only if these events are within the same time step.#[br]
        Refere to #[a(href="https://github.com/antoniandre/vue-cal/pull/182" target="_blank") this use case].
    li
      code.mr-2 minCellWidth
      span.code [Number], default: 0
      p.
        When a number is set, in pixels, each cell #[strong of the #[span.code week] view (only)]
        will have this minimum width.#[br]
        If it does not fit in the calendar body, the overflow will be scrollable.
        If #[span.code minSplitWidth] is also set, it will override #[span.code minCellWidth].
    li
      code.mr-2 minSplitWidth
      span.code [Number], default: 0
      p.
        This is for day splits only, and it applies to the
        #[strong #[span.code week] and #[span.code day] views (only)].#[br]
        When a number is set, in pixels, each split of each cell will have this minimum width.#[br]
        If it does not fit in the calendar body, the overflow will be scrollable.#[br]
        If #[span.code minCellWidth] is also set, #[span.code minSplitWidth] will override it on
        #[span.code week] view.
    li
      code.mr-2 splitDays
      span.code [Array], default: []
      p.
        Split each day into multiple vertical splits.#[br]
        Accepts an array of split objects with attributes.#[br]
        Each split object can have these attributes: #[span.code { class: 'string', label: 'string' }]
    li
      code.mr-2 stickySplitLabels
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the day splits labels will be displayed in the header
        instead of in-cell.
    li
      code.mr-2 editableEvents
      span.code [Boolean], default: false
      p
        | When #[span.code editableEvents] is set to #[span.code true], allows:
        ul
          li Dragging events (this feature is coming soon)
          li Resizing events by dragging the handle showing at the bottom of each event if #[span.code time] is set to #[span.code true],
          li Deleting events by click and hold an event.
          li Editing events title
      highlight-message You can still force an event to be undeletable or unresizable from the #[span.code deletable] &amp; #[span.code resizable] event attributes.
    li
      code.mr-2 resizeX
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], allows resizing an event across multiple days.#[br]
        Resizing on the X axis is only available on #[span.code week] view.
    li
      code.mr-2 eventsOnMonthView
      span.code [Boolean, String], default: false
      p.
        When set to #[span.code true], the events will also be displayed on month view
        (including events from visible out of scope days).#[br]
        When set to the string '#[span.code short]', only the event's title will be displayed.
    li
      code.mr-2 eventsCountOnYearView
      span.code [Boolean], default: false
      p.
        When set to #[span.code true], the events count will also be displayed on #[span.code years]
        &amp; #[span.code year] views.
    li
      code.mr-2 onEventClick
      span.code [Function], default: null
      p.
        A callback function to execute when an event is clicked.#[br]
        this function receives 2 parameters: #[span.code event], the clicked calendar event,
        and #[span.code e], the associated JavaScript DOM event.
    li
      code.mr-2 onEventDblclick
      span.code [Function], default: null
      p.
        A callback function to execute when an event is double clicked.#[br]
        this function receives 2 parameters: #[span.code event], the double clicked calendar event,
        and #[span.code e], the associated JavaScript DOM event.
    li
      code.mr-2 onEventCreate
      span.code [Function], default: null
      p.
        A callback function to execute when an event is created.#[br]
        This function receives 2 parameters: #[span.code event], the created event,
        and #[span.code deleteEvent], a function to delete the created event.#[br]
        //- You can modify and override the received #[span.code event] and return it to vue-cal.#[br]
        If this function returns #[span.code false], the event creation will be cancelled.
    li
      code.mr-2 events
      span.code [Array], default: []
      p.
        Allows you to place events in the calendar.#[br]
        Accepts an array of event objects.#[br]
        This is what an event object must look like:
      p
        sshpre.mt-2(language="js").
          {
            start: '2018-11-19 12:00', // Required.
            end: '2018-11-19 14:00', // Required.
            // Instead of formatted dates, you can also provide Javascript Date objects:
            // startDate: new Date('2018-11-16 10:30'),
            // endDate: new Date('2018-11-16 11:30'),
            title: 'String', // Optional.
            content: 'String', // Optional.
            class: 'String', // Optional - space-separated css classes.
            background: [Boolean] // Optional. (Event type not CSS property)
            split: [Number] // Optional.
            allDay: [Boolean] // Optional.
            deletable: false // optional - force undeletable when events are editable.
            resizable: false // optional - force unresizable when events are editable.
          }
        ul
          li If no #[span.code title] is provided, no title will be displayed.
          li.
            #[span.code content] accepts free HTML, for instance:
            '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;'.#[br]
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
            starting from 1, corresponding to the split you want the event to appear in.
          li.
            When the #[span.code showAllDayEvents] and #[span.code time] options are set to true,
            all the events with an attribute #[span.code allDay] set to true will show up in a
            fixed bar (week &amp; day views).

      highlight-message(type="warning")
        p.title.mt-0.ml-1 Important notes
        ul
          li The events are internally identified by the key #[span.code `_eid`]. #[strong This is a reserved keyword.]
          li.mt-2
            | Correct date formats are #[code {{ currentDateFormatted }}],
            | #[code="{{ currentDateFormatted.split(' ')[0] }}"] if you don't want any time in the whole calendar,
            | or a JavaScript #[code Date] object. Only these formats will work.#[br]
            strong You can't mix events with time and events without, and you can only remove time if the time option is set to false.
          li.mt-2.
            You can set an event end at #[span.code 24:00] if for some reasons that's what you want,
            #[strong but internally the date will be set at #[span.code 23:59:59]] so the date stays the same instead
            of natural behavior of taking the next day at #[span.code 00:00:00].#[br]
            When returned from emitted events, this event #[span.code endDate] will contain a date ending at #[span.code 23:59:59].
          li.mt-2.
            If you want to end an event at #[span.code 00:00], you have to set
            #[span.code 24:00] instead, to keep it to the same day you intended.

  h2.headline.mt-12.pt-12
    a(href="#css-notes") CSS Notes
    a#css-notes(name="css-notes")
  p You can easily change the calendar design with CSS.

  h3.mt-12 # Color &amp; rounded Themes
  p.
    Currently 2 color themes (green &amp; blue) are available, in addition to the standard grey theme.#[br]
    You can apply a green or blue theme by using the CSS class #[span.code vuecal--green-theme] or  #[span.code vuecal--blue-theme].
  p.
    If you want another color theme, you can define your own easily.#[br]
    This is what a standard color theme looks like.
    You can copy and change any color to quickly get a nice render.#[br]
    If that is still not doing what you want you can change even more in your own CSS.

  sshpre(language="css" label="CSS").
    /* Green-theme. */
    .vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
    .vuecal__menu button {border-bottom-color: #fff;color: #fff;}
    .vuecal__menu button.active {background-color: rgba(255, 255, 255, 0.15);}
    .vuecal__title-bar {background-color: #e4f5ef;}
    .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
    .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
    .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}

  p
    strong Rounded Theme#[br]
    | You can use the rounded cells theme like in the Example #[a(href="#ex--calendar-themes") Calendar themes - Rounded cells],
    | by applying the CSS class #[span.code vuecal--rounded-theme] to the Vue Cal wrapper.

  h3.mt-12 # Responsiveness &amp; Media Queries
  p.
    This calendar is fully responsive.#[br]
    To help you in making the calendar always look perfect,
    2 media queries (to keep it simple) are in place for small screens.#[br]
    The media queries operate downward from 550px &amp; 450px, to truncate the text
    of the days of the week from full day name to 3 letters and to 1 letter according to the available space.#[br]#[br]

    If this is not enough for your particular use, you can add your own in your CSS.#[br]
    Additionally, you can use the options #[span.code small] &amp; #[span.code xsmall]
    to truncate week days at any size.

  h3.mt-12 # Disabled Text Selection
  p.
    By default the selection is disabled in the whole calendar except in the events.
    you can override this by CSS.

  h2.headline.mt-12.pt-12.mb-2
    a(href="#release-notes") Release Notes
    a#release-notes(name="release-notes")

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
  div #[strong Version 2.1.0] Added clicked split id in #[span.code cell-click], #[span.code cell-dblclick] &amp; #[span.code cell-focus] emitted events
  div #[strong Version 2.0.0]
    highlight-message(type="warning") Due to the new scoped slots syntax, Vue Cal now requires Vue@2.6.0+
    highlight-message(type="success")
      h3.mt-0.pt-0 New features
      ul
        li
          | Added an option to hide particular days of the week
          em.grey--text.ml-1 (ref. #[span.code hideWeekdays] in the #[a(href="#api") API] section)
        li
          | Added new emitted event #[span.code cell-dblclick]
          em.grey--text.ml-1 (ref. #[a(href="#ex--emitted-events") Emitted events] example)
        li
          | Added ability to resize horizontally
          em.grey--text.ml-1 (ref. #[span.code resizeX] in the #[a(href="#api") API] section)
        li
          | Added ability to create events on cell single/double click
          em.grey--text.ml-1 (ref. #[a(href="#ex--more-advanced-event-creation") More advanced event creation] example)
        li
          | Added function to get minutes at cursor (on click of a cell)
          em.grey--text.ml-1 (ref. #[a(href="#ex--emitted-events") Emitted events] example)
        li
          | Now support displaying more than 3 overlapping events!
        li
          | Events start &amp; end can now also be defined with Date objects through #[span.code startDate] &amp; #[span.code endDate]
          em.grey--text.ml-1 (ref. #[span.code events] in the #[a(href="#api") API] section)
        li
          | Added an option to display day splits labels in the header
          em.grey--text.ml-1 (ref. #[span.code stickySplitLabels] in the #[a(href="#api") API] section)
        li
          | Added #[span.code deletable], #[span.code resizable] attributes on events to override globals
          em.grey--text.ml-1 (ref. #[a(href="#ex--edit-delete-create-events") Edit, delete &amp; create events] example)
        li.
          Vue Cal is now more accessible (WAI-ARIA). You can now navigate through the calendar with the keyboard.#[br]
          Select or focus a cell or an event with the #[kbd tab] key.#[br]
          Pressing #[kbd enter] on a cell will go to a narrower view if any, and pressing
          #[kbd enter] on an event will act like a click.

      h3.mt-3 Big changes
      ul
        li New scoped slots syntax #[em.grey--text.ml-1 (internal change - requires Vue 2.6+)]
        li the #[span.code no-event-overlaps] option is now useless and removed
        li.
          Externalize all locales from main library
          #[em.grey--text.ml-1 (ref. #[a(href="#ex--internationalization") Internationalization] example)]#[br]
          Now, only the locale you need will be loaded on demand (as a separate request).#[br]
          This will ensure Vue Cal keeps its file size as light as possible.
        li.
          If you have a custom color theme, you need to edit #[span.code .vuecal__menu li] to
          #[span.code .vuecal__menu button]. #[em.grey--text.ml-1 (ref. #[a(href="#css-notes") CSS Notes])].#[br]
          This is for accessibility purpose.

      h3.mt-3 Other noticeable changes
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
  div.mt-3 #[strong Version 1.1.0] Allow event resizing + Spanish &amp; Portuguese-Brasil languages.
  div.mt-3 #[strong Version 1.0.0] First public release

  v-dialog(v-model="showDialog" max-width="600")
    v-card
      v-card-title.primary.white--text
        v-icon.mr-3(color="white") {{ selectedEvent.icon }}
        span.headline.text-uppercase {{ selectedEvent.title }}
        v-spacer
        strong {{ (selectedEvent.start || '').substr(0, 10) }}
      v-card-text
        p(v-html="selectedEvent.contentFull")
        strong Event details:
        ul
          li Event starts at: -{{ (selectedEvent.start || '').substr(11) }}
          li Event ends at: -{{ (selectedEvent.end || '').substr(11) }}

  v-dialog(v-model="showEventCreationDialog" :persistent="true" max-width="420")
    v-card
      v-card-title.pa-2.primary.white--text
        v-text-field.ma-0.pa-0(v-model="selectedEvent.title" placeholder="Event Title" hide-details color="white")
      v-card-text
        v-textarea.ma-0.pa-0(v-model="selectedEvent.content" placeholder="Event Content" hide-details)
        v-layout.justify-space-between
          v-select.flex.shrink(
            :items="eventsCssClasses"
            placeholder="Event CSS Class"
            @change="selectedEvent.classes = [$event]"
            hide-details
            style="max-width: 170px")
          v-switch.flex.shrink(v-model="selectedEvent.background" label="background Event" color="primary")
        v-layout
          v-spacer
          v-btn.ma-1(small @click="cancelEventCreation()") Cancel
          v-btn.ma-1(small color="primary" @click="closeCreationDialog()") Save
</template>

<script>
import VueCal from '@/components/vue-cal'
import Sshpre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import highlightMessage from '@/components/highlight-message'

const events = [
  {
    start: '2018-10-30 10:30',
    end: '2018-10-30 11:30',
    title: 'Doctor appointment',
    content: '<i class="v-icon material-icons">local_hospital</i>',
    class: 'health',
    split: 1
  },
  {
    start: '2018-11-16 10:30',
    end: '2018-11-16 11:30',
    title: 'Doctor appointment',
    content: '<i class="v-icon material-icons">local_hospital</i>',
    class: 'health',
    split: 1
  },
  {
    start: '2018-11-19 10:35',
    end: '2018-11-19 11:30',
    title: 'Doctor appointment',
    content: '<i class="v-icon material-icons">local_hospital</i>',
    class: 'health',
    split: 1
  },
  {
    start: '2018-11-19 18:30',
    end: '2018-11-19 19:15',
    title: 'Dentist appointment',
    content: '<i class="v-icon material-icons">local_hospital</i>',
    class: 'health',
    split: 2
  },
  {
    start: '2018-11-20 18:30',
    end: '2018-11-20 20:30',
    title: 'Crossfit',
    content: '<i class="v-icon material-icons">fitness_center</i>',
    class: 'sport',
    split: 2
  },
  {
    start: '2018-11-21 11:00',
    end: '2018-11-21 13:00',
    title: 'Brunch with Jane',
    content: '<i class="v-icon material-icons">local_cafe</i>',
    class: 'leisure',
    split: 1,
    background: false
  },
  {
    start: '2018-11-21 19:30',
    end: '2018-11-21 23:00',
    title: 'Swimming lesson',
    content: '<i class="v-icon material-icons">pool</i>',
    class: 'sport',
    split: 2
  },
  {
    start: '2018-11-23 12:30',
    end: '2018-11-23 13:00',
    title: 'Macca\'s with Mark',
    content: '<i class="v-icon material-icons">fastfood</i>',
    class: 'leisure',
    split: 2
  },
  {
    start: '2018-11-23 21:00',
    end: '2018-11-23 23:30',
    title: 'Movie time',
    content: '<i class="v-icon material-icons">local_play</i>',
    class: 'leisure',
    split: 1
  },
  {
    start: '2018-11-30 21:00',
    end: '2018-11-30 23:30',
    title: 'Another movie tonight',
    content: '<i class="v-icon material-icons">local_play</i>',
    class: 'leisure',
    split: 1
  }
]

export default {
  components: { VueCal, Sshpre, highlightMessage },
  data: () => ({
    localesList: [
      { code: 'ar', label: 'Arabic' },
      { code: 'bn', label: 'Bangla' },
      { code: 'bs', label: 'Bosnian' },
      { code: 'bg', label: 'Bulgarian' },
      { code: 'ca', label: 'Catalan' },
      { code: 'cs', label: 'Czech' },
      { code: 'zh-cn', label: 'Chinese (Simplified)' },
      { code: 'zh-hk', label: 'Chinese (Traditional)' },
      { code: 'hr', label: 'Croatian' },
      { code: 'da', label: 'Danish' },
      { code: 'nl', label: 'Dutch' },
      { code: 'en', label: 'English' },
      { code: 'fa', label: 'Farsi' },
      { code: 'fr', label: 'French' },
      { code: 'ka', label: 'Georgian' },
      { code: 'de', label: 'German' },
      { code: 'el', label: 'Greek' },
      { code: 'he', label: 'Hebrew' },
      { code: 'hu', label: 'Hungarian' },
      { code: 'it', label: 'Italian' },
      { code: 'id', label: 'Indonesian' },
      { code: 'ja', label: 'Japanese' },
      { code: 'ko', label: 'Korean' },
      { code: 'no', label: 'Norwegian' },
      { code: 'pl', label: 'Polish' },
      { code: 'pt-br', label: 'Portuguese Brasilian' },
      { code: 'ro', label: 'Romanian' },
      { code: 'ru', label: 'Russian' },
      { code: 'sr', label: 'Serbian' },
      { code: 'sk', label: 'Slovak' },
      { code: 'sl', label: 'Slovenian' },
      { code: 'es', label: 'Spanish' },
      { code: 'sv', label: 'Swedish' },
      { code: 'tr', label: 'Turkish' },
      { code: 'uk', label: 'Ukrainian' },
      { code: 'vi', label: 'Vietnamese' }
    ],
    locale: 'zh-cn',
    splitsExample: {
      minCellWidth: 400,
      minSplitWidth: 0,
      stickySplitLabels: false,
      splitDays: [
        { class: 'mom', label: 'Mom' },
        { class: 'dad', label: 'Dad' },
        { class: 'kid1', label: 'Kid 1' },
        { class: 'kid2', label: 'Kid 2' },
        { class: 'kid3', label: 'Kid 3' }
      ]
    },
    example1theme: 'green',
    minEventWidth: 0,
    indicatorStyle: 'count',
    now: new Date(),
    logs: [],
    showDialog: false,
    showEventCreationDialog: false,
    showAllDayEvents: 0,
    shortEventsOnMonthView: false,
    events,
    selectedEvent: {},
    eventsCssClasses: ['leisure', 'sport', 'health'],
    selectedDate: null,
    logMouseEvents: false,
    editableEvents: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-20 14:00',
        end: '2018-11-20 17:00',
        title: 'Boring event',
        content: '<i class="v-icon material-icons">block</i><br>I am not deletable and not resizable.',
        class: 'blue-event',
        deletable: false,
        resizable: false
      }
    ],
    overlappingEvents: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-21 14:00',
        end: '2018-11-21 22:00',
        title: 'A big thing',
        content: '<i class="v-icon material-icons">sentiment_satisfied_alt</i>',
        class: 'health'
      },
      {
        start: '2018-11-21 16:00',
        end: '2018-11-21 19:00',
        title: 'Another thing',
        content: '<i class="v-icon material-icons">thumb_up</i>',
        class: 'blue-event'
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Eat pop corns',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure'
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Enjoy the movie',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure'
      }
    ],
    eventsCopy: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-21 12:00',
        end: '2018-11-21 12:30',
        title: 'Recall Dave',
        content: '<i class="v-icon material-icons">local_cafe</i>',
        class: 'leisure'
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Eat pop corns',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure'
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Enjoy the movie',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure'
      }
    ],
    eventsCopy2: [
      ...events.map(e => ({ ...e })) // Clone when reusing, so events are independent.
    ],
    eventsCopy3: [
      ...events.map(e => ({ ...e })) // Clone when reusing, so events are independent.
    ],
    multipleDayEvents: [
      {
        start: '2018-11-16 10:00',
        end: '2018-11-20 12:37',
        title: 'Running Marathon',
        content: '<i class="v-icon material-icons">directions_run</i>',
        class: 'sport'
      },
      {
        start: '2018-11-20 10:00',
        end: '2018-11-20 10:25',
        title: 'Drink water!',
        content: '<i class="v-icon material-icons">local_drink</i>',
        class: 'health drink-water'
      },
      {
        start: '2018-11-21 19:00',
        end: '2018-11-23 11:30',
        title: 'Trip to India',
        content: '<i class="v-icon material-icons">flight</i>',
        class: 'leisure'
      }
    ],
    allDayEvents: [
      {
        start: '2019-02-12',
        end: '2019-02-12',
        title: 'Day off!',
        content: '<i class="v-icon material-icons">beach_access</i>',
        class: 'beach',
        allDay: true
      },
      {
        start: '2019-02-14',
        end: '2019-02-14',
        title: 'Valentine\'s day',
        content: '<i class="v-icon material-icons">favorite_outline</i>',
        class: 'love',
        allDay: true
      },
      {
        start: '2019-02-14',
        end: '2019-02-14',
        title: 'Need to go shopping',
        content: '<i class="v-icon material-icons">shopping_cart</i>',
        class: 'leisure',
        allDay: true
      },
      {
        start: '2019-02-11 10:35',
        end: '2019-02-11 11:30',
        title: 'Doctor appointment',
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: 'health',
        split: 1
      },
      {
        start: '2019-02-11 18:30',
        end: '2019-02-11 19:15',
        title: 'Dentist appointment',
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: 'health',
        split: 2
      },
      {
        start: '2019-02-12 18:30',
        end: '2019-02-12 20:30',
        title: 'Crossfit',
        content: '<i class="v-icon material-icons">fitness_center</i>',
        class: 'sport',
        split: 1
      },
      {
        start: '2019-02-13 11:00',
        end: '2019-02-13 13:00',
        title: 'Brunch with Jane',
        content: '<i class="v-icon material-icons">local_cafe</i>',
        class: 'leisure',
        split: 1
      },
      {
        start: '2019-02-13 19:30',
        end: '2019-02-13 23:00',
        title: 'Swimming lesson',
        content: '<i class="v-icon material-icons">pool</i>',
        class: 'sport',
        split: 2
      },
      {
        start: '2019-02-15 12:30',
        end: '2019-02-15 13:00',
        title: 'Macca\'s with Mark',
        content: '<i class="v-icon material-icons">fastfood</i>',
        class: 'leisure',
        split: 2
      },
      {
        start: '2019-02-15 21:00',
        end: '2019-02-15 23:30',
        title: 'Movie time',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure',
        split: 1
      }
    ],
    splitEvents: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-21 12:00',
        end: '2018-11-21 12:30',
        title: 'Recall Dave',
        content: '<i class="v-icon material-icons">local_cafe</i>',
        class: 'leisure',
        split: 1
      },
      {
        start: '2018-11-21 20:00',
        end: '2018-11-21 22:00',
        title: 'Salsa',
        content: '<i class="v-icon material-icons">directions_walk</i>',
        class: 'sport',
        split: 1
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Movie time',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure',
        split: 2
      }
    ],
    backgroundEvents: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-19 12:00',
        end: '2018-11-19 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      },
      {
        start: '2018-11-20 12:00',
        end: '2018-11-20 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      },
      {
        start: '2018-11-21 12:00',
        end: '2018-11-21 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      },
      {
        start: '2018-11-22 12:00',
        end: '2018-11-22 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      },
      {
        start: '2018-11-23 12:00',
        end: '2018-11-23 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      }
    ],
    timelessEvents: [
      {
        start: '2018-11-21',
        end: '2018-11-21',
        title: 'Need to go shopping',
        content: '<i class="v-icon material-icons">shopping_cart</i>',
        class: 'leisure'
      },
      {
        start: '2018-11-21',
        end: '2018-11-21',
        title: 'Golf with John',
        content: '<i class="v-icon material-icons">golf_course</i>',
        class: 'sport'
      },
      {
        start: '2018-11-22',
        end: '2018-11-22',
        title: 'Dad\'s birthday!',
        content: '<i class="v-icon material-icons">cake</i>',
        class: 'sport'
      },
      {
        start: '2018-11-23',
        end: '2018-11-23',
        title: 'Black Friday',
        content: '<i class="v-icon material-icons">shopping_cart</i>',
        class: 'leisure'
      }
    ],
    eventsToPop: [
      {
        start: '2018-11-20 14:00',
        end: '2018-11-20 18:00',
        title: 'Need to go shopping',
        icon: 'shopping_cart',
        content: 'Click to see my shopping list',
        contentFull: 'My shopping list is rather long:<br><ul><li>Avocadoes</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>',
        class: 'leisure'
      },
      {
        start: '2018-11-22 10:00',
        end: '2018-11-22 15:00',
        title: 'Golf with John',
        icon: 'golf_course',
        content: 'Do I need to tell how many holes?',
        contentFull: 'Okay.<br>It will be a 18 hole golf course.',
        class: 'sport'
      }
    ],
    deleteEventFunction: null
  }),
  methods: {
    logEvents (emittedEventName, params) {
      if (!this.logMouseEvents && ['event-mouse-enter', 'event-mouse-leave'].includes(emittedEventName)) {
        return
      }
      this.logs.unshift({ name: emittedEventName, args: JSON.stringify(params) })
    },
    clearEventsLog () {
      this.logs = []
    },
    customEventsCount: events => events ? events.filter(e => e.class === 'leisure').length : 0,
    onEventClick (event, e) {
      this.selectedEvent = event
      this.showDialog = true
      e.stopPropagation()
    },
    cancelEventCreation () {
      this.closeCreationDialog()
      this.deleteEventFunction()
    },
    closeCreationDialog () {
      this.showEventCreationDialog = false
      this.selectedEvent = {}
    },
    onEventCreate (event, deleteEventFunction) {
      this.selectedEvent = event
      this.showEventCreationDialog = true
      this.deleteEventFunction = deleteEventFunction

      return event
    },
    customEventCreation () {
      const dateTime = prompt('Create event on (yyyy-mm-dd hh:mm)', '2018-11-20 13:15')
      if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
        this.$refs.vuecal.createEvent(dateTime, { title: 'New Event', content: 'yay! 🎉', classes: ['leisure'] })
      }
      else if (dateTime) alert('Wrong date format.')
    }
  },
  computed: {
    currentDateFormatted () {
      const y = this.now.getFullYear()
      const m = this.now.getMonth()
      const d = this.now.getDate()
      const h = this.now.getHours()
      const min = this.now.getMinutes()
      return `${y}-${(m < 10 ? '0' : '') + m}-${(d < 10 ? '0' : '') + d} ${(h < 10 ? '0' : '') + h}:${(min < 10 ? '0' : '') + min}`
    },
    minDate () {
      let now = new Date()
      let date = new Date(now)
      date.setDate(now.getDate() - 15)
      return date
    },
    maxDate () {
      let now = new Date()
      let date = new Date(now)
      date.setDate(now.getDate() + 15)
      return date
    }
  }
}
</script>

<style lang="scss">
$primary: #42b983;

.scrollable {
  height: 250px;
  overflow-y: scroll;
  padding-right: 1.8em;
}

.main-content {
  max-width: 800px;
  height: 650px;
}

.documentation {
  h2:not(.todo) {
    font-size: 27px !important;
    border-bottom: 1px solid #eee;
    margin-bottom: 30px;
    padding-bottom: 8px;
  }

  h3 {
    margin-top: 80px;
    padding: 10px 0 0;
  }

  h3 a {
    font-size: 26px;
    font-weight: normal;
    color: #888 !important;

    .v-icon {vertical-align: middle;}
  }

  h4 {margin: 70px 0 8px;}
  h3 + h4 {margin-top: 20px;}

  h4 a {color: inherit !important;}

  .todo .v-chip__content {
    padding: 0 3px;
  }

  .flame {
    max-width: 90px;
    opacity: 0.6;
    color: rgb(254, 247, 176);
    text-shadow: 1px 0 0 #fd0, -1px 0 0 #fd0, 0 1px 0 #fd0, 0 -1px 0 #fd0;
  }

  .api-options {list-style-type: none;}
  .api-options > li {margin-top: 2em;}
  .api-options p {margin-left: 1.5em;margin-top: 0.5em;}
}

// Yellow theme.
.vuecal--yellow-theme {
  .vuecal__menu, .vuecal__cell-events-count {background-color: rgba(255, 179, 0, 0.8);color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title-bar {background-color: rgba(255, 236, 202, 0.5);}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  &:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(255, 236, 202, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(235, 216, 182, 0.5);}
}

// Examples.
// =====================================================
.ex--min-max-dates {
  .disabled {text-decoration: line-through;}
  .before-min {color: #b6d6c7;}
  .after-max {color: #008b8b;}
}
// Custom vue-cal title & "no event" text example.
.ex--custom-title-and-cells {
  .vuecal__cell-events-count {margin-top: -2px;}

  .vuecal__cell .clickable {display: block;}

  .vuecal__cell .clickable.month {
    position: absolute;
    top: 0;
    right: 0;
    color: $primary;
    font-size: 1.2em;
    padding: 0 4px;
    text-decoration: underline;
    display: inline-block;
  }

  .vuecal__cell .vuecal__cell-content {height: 100%;}

  .vuecal__no-event {padding-top: 3em;}
}

// Today-current-time example.
.ex--today-current-time-and-disabled-views {
  .vuecal__now-line {color: #06c;}
}

// Events on month view example.
.event-indicator--dash .vuecal__cell-events-count {
  width: 18px;
  height: 2px;
  color: transparent;
}

.event-indicator--dot .vuecal__cell-events-count {
  width: 4px;
  min-width: 0;
  height: 4px;
  padding: 0;
  color: transparent;
}

.ex--events-indicators {
  .vuecal__cell-events-count span {
    background: $primary;
    height: 100%;
    border-radius: 12px;
    display: block;
  }
}

.ex--custom-events-count {
  .vuecal__cell-events-count span {
    background: $primary;
    height: 100%;
    min-width: 12px;
    padding: 0 3px;
    border-radius: 12px;
    display: block;
  }
  .vuecal__cell-events-count {background: transparent;}
}

.ex--events-on-month-view.vuecal--month-view {
  .vuecal__cell {height: 80px;}

  .vuecal__cell-content {
    justify-content: flex-start;
    height: 100%;
    align-items: flex-end;
  }

  .vuecal__cell-date {padding: 3px 4px;}
}

.event-indicator--cell .vuecal__cell--has-events {background-color: #fffacd;}
.event-indicator--cell .vuecal__cell-events-count {display: none;}

.vuecal--month-view .vuecal__no-event {display: none;}

// Today button example.
.ex--adding-a-today-button {
  .today-button {
    // font-size: 0.7em;
    min-width: 0;
    height: auto;
    padding: 1px 8px;
  }
  .v-btn--floating.v-btn--small {width: 26px;height: 26px;background-color: transparent !important;}
}

// Split days example.
.vuecal__cell-split.dad {background-color: rgba(221, 238, 255, 0.5);}
.vuecal__cell-split.mom {background-color: rgba(255, 232, 251, 0.5);}
.vuecal__cell-split.kid1 {background-color: rgba(221, 255, 239, 0.5);}
.vuecal__cell-split.kid2 {background-color: rgba(255, 250, 196, 0.5);}
.vuecal__cell-split.kid3 {background-color: rgba(255, 206, 178, 0.5);}
.vuecal__cell-split .split-label {color: rgba(0, 0, 0, 0.1);font-size: 26px;font-weight: 500;}

.vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.85);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.85);border: 1px solid rgb(235, 82, 82);color: #fff;}
.vuecal__event.love {background-color: rgba(255, 58, 143, 0.7);border: 1px solid rgb(235, 38, 123);color: #fff;}
.vuecal__event.blue-event {background-color: rgba(100, 200, 255, 0.8);border: 1px solid rgb(80, 180, 235);color: #fff;}
.vuecal__event.beach {background-color: rgba(255, 200, 90, 0.75);border: 1px solid #ffc356;}

.vuecal__event.lunch {
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vuecal__event.lunch .vuecal__event-time {display: none;align-items: center;}

.vuecal__time-cell .hours.line:before {border-color: $primary;}

.ex--multiple-day-events .vuecal__event {
  border-radius: 5px;

  &.sport {
    background-color: rgba(255, 185, 185, 0.8);
    border: none;
    border-left: 3px solid rgba(230, 55, 55, 0.3);
    color: #c55656;
  }
  &.leisure {
    background-color: rgba(255, 202, 154, 0.8);
    border: none;
    border-left: 3px solid rgba(250, 118, 36, 0.3);
    color: #b57335;
  }
  &.health {
    background-color: rgba(200, 248, 233, 0.8);
    border: none;
    border-left: 3px solid rgba(99, 186, 139, 0.4);
    color: #219671;
  }

  &.event-start {border-radius: 5px 5px 0 0;}
  &.event-middle {border-radius: 0;}
  &.event-end {border-radius: 0 0 5px 5px;}
  &.drink-water {font-size: 0.85em;line-height: 1;padding-top: 0.2em;}
}

.ex--open-dialog-on-event-click {
  .vuecal__event {cursor: pointer;}

  .vuecal__event-title {
    font-size: 1.2em;
    font-weight: bold;
    margin: 4px 0 8px;
  }

  .vuecal__event-time {
    display: inline-block;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  .vuecal__event-content {
    font-style: italic;
  }
}

.ex--all-day-events {
  .vuecal__cell-content {
    align-self: flex-start;
  }

  .vuecal__cell-date {
    text-align: right;
    padding: 4px;
  }

  &.vuecal--week-view .vuecal__bg .vuecal__event--all-day.love,
  &.vuecal--day-view .vuecal__bg .vuecal__event--all-day.love {right: 50%;}
  &.vuecal--week-view .vuecal__bg .vuecal__event--all-day.leisure,
  &.vuecal--day-view .vuecal__bg .vuecal__event--all-day.leisure {left: 50%;}
}
</style>
