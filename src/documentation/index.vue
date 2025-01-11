<template lang="pug">
.documentation.page-container
  //- Main demo.
  main-demo

  //- Github project.
  h2.mt12.pt12.mb4.title2 Github project &nbsp;&amp;&nbsp; important notes
  .announcement.announcement--github.w-flex.align-center.mb8
    w-icon.mr5.lightgrey(size="46") fab fa-github
    a.title4(href="https://github.com/antoniandre/vue-cal-v4" target="_blank") //github.com/antoniandre/vue-cal-v4 #[w-icon(color="primary") material-icons open_in_new]

  .announcement.w-flex.align-center.mb8
    w-icon.ml-1.mr4(size="50" color="amber-light3") material-icons info
    w-alert.message-box.important-notes(border-left color="orange-dark1" bg-color="yellow-light5")
      ul.ml6
        li.mb2
          a.text-bold.title2.inherit(href="https://github.com/antoniandre/vue-cal/" target="_blank") Vue Cal v5 is cooking! #[w-icon.mb1(color="primary" md) material-icons open_in_new]
        li.mb2
          a.text-bold.inherit(href="https://github.com/antoniandre/vue-cal-v4/discussions" target="_blank") NEW: You can start discussions in this channel #[w-icon.mb1(color="primary" sm) material-icons open_in_new]
        li.mb2
          strong Always check the #[a(href="#release-notes") Release Notes] when you upgrade
        li
          strong Philosophy: separate logic &amp; styles
          br
          small
            | For performance, simplified logic, readability, structure &amp; maintenance of your own code,
            | what can be done via CSS should be done via CSS. CSS classes will help you style your events,
            | cells, splits, etc.#[br]
            | Vue Cal provides the minimum needed CSS styles, not the nicest one: that makes it highly
            | customizable for all the scenarii and a breeze to override.#[br]
            strong You most likely don't need the #[code !important] flag.

  .announcement.w-flex.align-center.mb8
    w-icon.ml-1.mr4(size="50" color="orange-light3") material-icons report
    w-alert.message-box(border-left color="orange-dark1")
      p.
        Vue 2 has reached EOL, and so has Vue Cal legacy branch.#[br]
        You can still use it for Vue 2 projects with #[code.grey-light6--bg.bdrs1.px1 npm i vue-cal@#[strong legacy]], but
        it will not receive further updates or support.#[br]Time to move on! 🚀


  .announcement.w-flex.align-center.mb8
    w-icon.ml-1.mr4(size="50" color="pink-light3") material-icons favorite
    w-alert.message-box(border-left color="pink")
      | If you like Vue Cal, you can
      a.pink.mx2(
        href="https://github.com/sponsors/antoniandre"
        target="_blank"
        style="text-decoration: underline") #[strong Sponsor me]
      | or
      a.pink.ml2(
        href="https://www.paypal.me/antoniandre1"
        target="_blank"
        style="text-decoration: underline") #[strong buy me a coffee]
      | !
      div Thank you so much to all the backers! #[span.title2.ml1 🙏]

  .announcement.w-flex.align-center.mb8
    svg.mr4.blue-light1(viewBox="0 0 725 477" style="width: 50px;stroke: #497ca2;stroke-width: 5px")
      path(fill="#497ca2" d="M449 0c-78 5-152 39-217 82-19 13-37 26-54 40-39 1-77 15-110 34-34 21-53 60-61 99-11 52-8 108 6 159 7 23 16 46 33 63 4-4 13-4 13-11-1-5-7-8-9-14-27-48-32-108-11-159 13-32 36-63 68-77 19-9 42-7 58 6 6 7 18 4 24-2 6-4 11-10 19-10-24 25-39 60-38 95 1 15 3 31 8 45 16 36 41 69 76 89 5 2 10 6 16 7 5-2 14-5 14-12-4-9-14-12-21-18-27-23-56-48-67-82-9-29-1-60 8-88 7-15 21-32 39-29 15 1 28 13 43 8 11-5 13-17 16-27 5-17 3-38-10-51-16-18-40-23-62-25l-11-2c23-19 53-26 81-31 21-3 43-5 64-2 18 3 28 21 42 31-33 47-57 102-56 159a170 170 0 0086 149c6-1 13-7 10-14-5-11-17-16-25-25-33-30-52-75-50-121 1-29 11-58 24-84 12-25 25-52 47-71 9-8 22-13 33-7 20 8 42 14 63 13-35 27-55 70-64 113-9 44-7 91 12 133 15 37 45 68 81 85 32 16 67 24 101 27 18 1 36 2 53-4 4-1 6-7 2-9-13-6-28-4-42-6-45-5-92-16-127-45-34-28-54-71-60-114-5-47 7-97 34-137 11-15 26-31 45-34 14-1 25 12 31 23 6 12 16 24 29 28 20-10 40-26 43-50 2-17-6-34-14-49-15-25-40-43-69-48-20-5-41-2-61-6-22-21-54-24-83-24zm6 21c22 0 48 5 62 25 4 7 8 16 8 24-1 10-10 22-21 19-9-7-18-14-30-16-14-4-31-1-43 8-6 6-17 8-24 2-9-6-17-15-28-17-27-7-54 1-81 6a364 364 0 01157-51zm117 29c33 0 66 25 72 58 3 12 3 28-8 35-3 2-6 4-8 1-8-12-12-27-23-37-3-7-12-8-19-9-13-2-26 0-39-4 7-7 6-17 4-25l-3-16 24-3zm-372 92l46 2c18 2 33 16 34 34 1 7 1 17-6 21-6 0-12-4-18-6-21-8-46-14-67-3-6 2-11 9-17 5-10-4-18-14-30-12-30 1-56 21-77 42-16 17-30 37-43 56 0-39 17-80 49-104 26-22 61-30 94-34l35-1z")
    w-alert.message-box.ml-1(border-left color="pale-blue")
      strong
        | Check out my Vue UI framework!
        a.title3.ml4(
          href="https://antoniandre.github.io/wave-ui"
          target="_blank"
          style="width: 50px;color: #1471b8;text-decoration: underline")
            strong Wave UI


  //- To Do list.
  h2.title2.mt12.pt12
    a(href="#to-do-list") To do...
    a#to-do-list(name="to-do-list")

  w-accordion(:model-value="[false, true]" expand-icon-right expand-single)
    w-accordion-item
      template(#title)
        w-icon.mr2.primary material-icons check_circle
        strong.mra Done
      template(#content)
        .w-flex.wrap.align-center
          todo-list-item default active view
          todo-list-item Enable / disable views
          todo-list-item Hide / show weekends
          todo-list-item Add timeline w/ time range &amp; increment
          todo-list-item Add timeline
          todo-list-item time format 12/24 h
          todo-list-item Support for i18n
          todo-list-item Split days
          todo-list-item Support events
          todo-list-item Background events
          todo-list-item Overlap events
          todo-list-item Keep only default style in CSS
          todo-list-item Allow custom arrows
          todo-list-item Default active date
          todo-list-item Double tap on touch devices
          todo-list-item 1st NPM Release!
          todo-list-item Built-in themes
          todo-list-item Resize events
          todo-list-item Delete events
          todo-list-item Emit DOM events
          todo-list-item Event indicator on month view
          todo-list-item Custom time format
          todo-list-item Highlight current time
          todo-list-item Show events on month view
          todo-list-item sync 2 vue-cal instances
          todo-list-item Add CSS transitions
          todo-list-item Multiple day events
          todo-list-item Custom events rendering
          todo-list-item Custom callback on event click
          todo-list-item Option to start week on Sunday
          todo-list-item All day events in top bar
          todo-list-item Custom cell rendering
          todo-list-item Events count on year(s) views
          todo-list-item Create new event
          todo-list-item min &amp; max dates
          todo-list-item Today button
          todo-list-item Externalize locales
          todo-list-item Support more simultaneous events
          todo-list-item Sticky day splits labels
          todo-list-item Hide particular weekdays
          todo-list-item Optional week number
          todo-list-item Date prototypes
          todo-list-item Business hours
          todo-list-item Drag &amp; drop events
          todo-list-item Resize events snap to time
          todo-list-item Drag events snap to time
          todo-list-item Drag &amp; drop ext. events into Vue Cal
          todo-list-item Disable days
          todo-list-item Support Vue 3

    w-accordion-item
      template(#title)
        w-icon.mr2.orange material-icons access_time
        strong.mra Backlog
      template(#content)
        .w-flex.wrap
          todo-list-item(status="doing") Recurring events
          todo-list-item(status="todo") Drag &amp; drop multiple day events
          todo-list-item(status="todo") Drag &amp; drop events on touch devices
          todo-list-item(status="todo")
            a(href="https://github.com/antoniandre/vue-cal-v4/issues/168" target="_blank" style="text-decoration: underline;color: inherit") Full Typescript support
          todo-list-item(status="todo")
            a(href="https://github.com/antoniandre/vue-cal-v4/issues/127" target="_blank" style="text-decoration: underline;color: inherit") Full SSR support
          todo-list-item(status="todo") Improve multiple day events Month view
          todo-list-item(status="todo") Prevent event intersect. on drag/resize
          todo-list-item(status="todo") Horizontal timeline
          //- TODO:
            General
            - do all the @todo in the codebase
            - check overlaps only on the cell that has changed on event create/drag/background change
            Multiple-day events:
            - Fix event segments when dragging too fast on x axis.
            - multiple days on month view like google calendar
            - if more than 24 hour duration, consider as all-day

  //- Installation
  h2.title2.mt12.pt12
    a(href="#installation") Installation
    a#installation(name="installation")
  p.mt2 You have 2 options: using #[strong NPM] or #[strong.code &lt;script&gt;] tag.
  ul.ml4
    li
      h3.mt4 Via NPM
      .w-flex.align-center.mt2.xs-column.xs-align-start
        ssh-pre.my0(language="shell") npm i vue-cal # Vue 3
        span.mx6 or
        ssh-pre.my0(language="shell") npm i vue-cal@legacy # Vue 2

      p.mt6.mb3 Then import Vue Cal in your Vue component and use it.
      w-flex.vs-d-block(gap="6")
        w-tabs.w-flex.column.bdrs2(:items="2" content-class="pa0 fill-height")
          template(#item-title.1) Options API
          template(#item-content.1)
            ssh-pre.fill-height.ma0.bd0(language="js").
              import VueCal from 'vue-cal'
              import 'vue-cal/dist/vuecal.css'

              export default {
                components: { VueCal },
                ...
              }

          template(#item-title.2) Composition API
          template(#item-content.2)
            ssh-pre.fill-height.ma0.bd0(language="js").
              import VueCal from 'vue-cal'
              import 'vue-cal/dist/vuecal.css'

        .highlight-box.grow
          .title2 Demos on StackBlitz
          p.body.mb4.grey Check the different setups for bundlers
          .w-flex.align-center
            w-icon.ml3.mr2.bolt(color="grey-light2" size="4.5em") material-icons bolt
            ul.no-bullet
              li
                w-icon.mr2 wi-chevron-right
                a.ml1(href="https://stackblitz.com/edit/vuecal-vuecli?file=src%2FApp.vue" target="_blank")
                  | Vue Cal + Vue 3 + Vue CLI
                  w-icon.ml2(sm style="margin-top: -2px") material-icons open_in_new
              li
                w-icon.mr2 wi-chevron-right
                a.ml1(href="https://stackblitz.com/edit/vuecal-vite?file=src%2FApp.vue" target="_blank")
                  | Vue Cal + Vue 3 + Vite
                  w-icon.ml2(sm style="margin-top: -2px") material-icons open_in_new
              li
                w-icon.mr2 wi-chevron-right
                a.ml1(href="https://stackblitz.com/edit/vuecal-vite-composition-api?file=src%2FApp.vue" target="_blank")
                  | Vue Cal + Vue 3 &amp; composition API + Vite
                  w-icon.ml2(sm style="margin-top: -2px") material-icons open_in_new

              li
                w-icon.mr2 wi-chevron-right
                a.ml1(href="https://stackblitz.com/edit/vuecal-vue2?file=src%2FApp.vue" target="_blank")
                  | Vue Cal + Vue 2 + Vue CLI
                  w-icon.ml2(sm style="margin-top: -2px") material-icons open_in_new

    li.mt8
      h3.mt4 Or via #[span.code &lt;script&gt;] tag
      p Include the Vue Cal script in your document #[span.code &lt;head&gt;] as follows:
      w-tabs.my4(:items="2" content-class="pa0")
        template(#item-title.1) Vue 3
        template(#item-content.1)
          ssh-pre.ma0(language="html").
            &lt;head&gt;
              ...
              &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
              &lt;script src="https://unpkg.com/vue-cal"&gt;&lt;/script&gt;
              &lt;link href="https://unpkg.com/vue-cal/dist/vuecal.css" rel="stylesheet"&gt;
            &lt;/head&gt;

        template(#item-title.2) Vue 2
        template(#item-content.2)
          ssh-pre.ma0(language="html").
            &lt;head&gt;
              ...
              &lt;script src="https://unpkg.com/vue@legacy"&gt;&lt;/script&gt;
              &lt;script src="https://unpkg.com/vue-cal@legacy"&gt;&lt;/script&gt;
              &lt;link href="https://unpkg.com/vue-cal@legacy/dist/vuecal.css" rel="stylesheet"&gt;
            &lt;/head&gt;

      p.
        Then define the component to use in your template if you are not using the Vue composition
        API:
      w-flex.vs-d-block(gap="6")
        ssh-pre.grow.ma0.mt4.pa3.bdrs2(language="js").
          // In your Vue.js component.
          export default {
            components: { VueCal: vuecal },
            ...
          }
        .highlight-box.grow.mt4
          .title2 Demos on Codepen
          p.body.mb4.grey Check the different setups for direct browser use
          .w-flex.align-center
            w-icon.ml3.mr2.bolt.pa6(color="grey-light2" size="2.8em") fab fa-codepen
            ul.no-bullet
              li
                w-icon.mr2 wi-chevron-right
                a.ml1(href="https://codepen.io/antoniandre/pen/XWEgLxg?editors=1010" target="_blank")
                  | Vue Cal + Vue 3 (IIFE build)
                  w-icon.ml2(sm style="margin-top: -2px") material-icons open_in_new
              li
                w-icon.mr2 wi-chevron-right
                a.ml1(href="https://codepen.io/antoniandre/pen/pGJWjL" target="_blank")
                  | Vue Cal + Vue 2 (UMD build)
                  w-icon.ml1(sm style="margin-top: -2px") material-icons open_in_new

  h2.title2.mt12.pt12
    a(href="#how-to-use") How to use
    a#how-to-use(name="how-to-use")
  highlight-message(type="warning")
    p.
      Wait! Before you dive in, make sure you place Vue Cal in a container that #[strong has a set height]! (not auto or initial)#[br]
      By default Vue Cal will take the full width &amp; height of its container if it has a set height.
    ssh-pre.my2(language="html-vue").
      &lt;!-- If the container has no height, set a height on vue-cal --&gt;
      &lt;vue-cal style="height: 250px" /&gt;
    vue-cal(small :time="false" hide-view-selector style="height: 250px")

  //- Examples.
  examples(:locales-list="localesList")

  //- API.
  api(:locales-list="localesList")

  //- CSS notes.
  h2.title2.mt12.pt12
    a(href="#css-notes") CSS Notes
    a#css-notes(name="css-notes")
  p You can easily change the calendar design with CSS.

  h3.mt12 # Color themes &amp; rounded theme
  p.
    Currently 2 color themes (green &amp; blue) are available, in addition to the standard grey theme.#[br]
    You can apply a green or blue theme by using the CSS class #[span.code vuecal--green-theme]
    or #[span.code vuecal--blue-theme].
  p.
    If you want another color theme, you can define your own easily.#[br]
    This is what a standard color theme looks like.
    You can copy and change any color to quickly get a nice render.#[br]
    If that is still not doing what you want you can change even more in your own CSS.

  ssh-pre(language="css" label="CSS").
    /* Green-theme. */
    .vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
    .vuecal__title-bar {background-color: #e4f5ef;}
    .vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
    .vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
    .vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}
    /* Cells and buttons get highlighted when an event is dragged over it. */
    .vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
    .vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
    .vuecal__arrow.vuecal__arrow--highlighted,
    .vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}

  p
    strong Rounded theme#[br]
    | You can use the rounded cells theme like in the Example
    | #[a(href="#ex--calendar-themes") Calendar themes - Rounded cells],
    | by applying the CSS class #[span.code vuecal--rounded-theme] to the Vue Cal wrapper.

  h3.mt12 # Responsiveness &amp; media queries
  p.
    This calendar is fully responsive.#[br]
    To help you in making the calendar always look perfect,
    2 media queries (to keep it simple) are in place for small screens.#[br]
    The media queries operate downwards from 550px &amp; 450px, to truncate the text
    of the days of the week from full day name to 3 letters and to 1 letter according to the available space.#[br]#[br]

    If this is not enough for your particular use, you can add your own in your CSS.#[br]
    Additionally, you can use the options #[span.code small] &amp; #[span.code xsmall]
    to truncate week days at any size.

  h3.mt12 # Disabled text selection
  p.
    Notice that on Windows machines, and on devices where the scrollbar takes some space and
    pushes the calendar main content (#[span.code week] and #[span.code day] views), the
    weekdays headings and the all-day bar get an added padding right to align well with the main content.#[br]
    This is done once, in the #[span.code mounted] hook.

  h3.mt12 # Disabled text selection
  p.
    By default the selection is disabled in the whole calendar except in the events.
    you can override this by CSS.

  //- Release notes.
  h2.title2.mt12.pt12.mb4
    a(href="#release-notes") Release notes
    a#release-notes(name="release-notes")
  release-notes
</template>

<script>
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import VueCal from '@/vue-cal-v4/index.vue'
import HighlightMessage from './components/highlight-message.vue'
import TodoListItem from './components/todo-list-item.vue'
import MainDemo from './main-demo.vue'
import Examples from './examples.vue'
import Api from './api.vue'
import ReleaseNotes from './release-notes.vue'
import '@/scss/documentation.scss'

const localesList = [
  { code: 'sq', label: 'Albanian' },
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
  { code: 'et', label: 'Estonian' },
  { code: 'fa', label: 'Farsi' },
  { code: 'fr', label: 'French' },
  { code: 'ka', label: 'Georgian' },
  { code: 'de', label: 'German' },
  { code: 'el', label: 'Greek' },
  { code: 'he', label: 'Hebrew' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'is', label: 'Icelandic' },
  { code: 'it', label: 'Italian' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'lt', label: 'Lithuanian' },
  { code: 'mn', label: 'Mongolian' },
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
]

export default {
  components: {
    VueCal,
    SshPre,
    HighlightMessage,
    TodoListItem,
    MainDemo,
    Examples,
    Api,
    ReleaseNotes
  },

  data: () => ({
    localesList
  }),

  computed: {
    nowFormatted () {
      return Date.prototype.format && (new Date()).format('YYYY{MM}DD')
    }
  }
}
</script>

<style lang="scss">
.w-tabs__content-wrap {flex-grow: 1;}

.highlight-box {
  background: linear-gradient(45deg, #ecf8f1, rgba(#fff, 0));
  padding: 16px;
  border-radius: 8px;

  .w-icon.bolt {
    width: 68px;
    height: 68px;
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 830px) {
  .w-app .vs-d-block {display: block;}
}
</style>
