<template lang="pug">
w-toolbar.top-bar.pa0(:class="{ scrolled: offsetTop > 108 }")
  .top-bar__title
    span.top-bar__title-line
    span.top-bar__title-line
    h1.w-flex.align-center.primary.px5
      a.w-flex.align-center.top-bar__logo-link.no-grow(href="#top" v-scroll-to="'#top'")
        .logo.top-bar__logo {{ todayDate < 10 ? `0${todayDate}` : todayDate }}
        .top-bar__logo-title
          | Vue Cal
          .version v. {{ version }}
      span.intro Vue.js full cal&nbsp; #[span.code --no-deps --no-bs]&nbsp; :metal:

  .top-bar__items.fill-height.mr3
    w-menu(
      show-on-hover
      hide-on-menu-click
      align-right
      transition="slide-fade-down"
      menu-class="mt0 top-menu top-menu--doc"
      append-to=".top-bar__items"
      custom)
      template(#activator="{ on }")
        w-button.bd0(
          v-on="on"
          text
          tile
          color="secondary"
          height="100%")
          w-icon.mr2(lg) material-icons school
          span DOC

      w-list.mt0.pa0.sh2.white--bg.bdrs1(
        nav
        :items="docs"
        item-route-key="href"
        item-class="pa0")
        template(#item="{ item }")
          w-divider.grow(v-if="item.class === 'w-divider'" color="grey-light1")
          .w-flex.grow.align-center.px5.py2(
            v-else-if="item.href"
            v-scroll-to="`${item.href}`")
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(v-html="item.label")
          span.py2(v-else)
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(v-html="item.label")

    w-menu(
      show-on-hover
      hide-on-menu-click
      align-right
      transition="slide-fade-down"
      menu-class="mt0 top-menu top-menu--examples"
      append-to=".top-bar__items"
      custom)
      template(#activator="{ on }")
        w-button.bd0(
          v-on="on"
          text
          tile
          color="secondary"
          href="#examples"
          v-scroll-to="'#examples'"
          height="100%")
          w-icon.mr2(lg) material-icons apps
          span EXAMPLES
      w-list.mt0.pa0.sh2.white--bg.bdrs1(
        nav
        :items="examples"
        item-route-key="href"
        item-class="pa0"
        style="max-height: 90vh;overflow: auto;white-space: nowrap")
        template(#item="{ item }")
          w-divider.grow(v-if="item.class === 'w-divider'" color="grey-light1")
          .w-flex.grow.align-center.px5.py2(
            v-else-if="item.href"
            v-scroll-to="`${item.href}`")
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(:class="{ ml8: !item.icon }" v-html="item.label")
          .w-flex.grow.align-center.px5.py2(v-else)
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(:class="{ ml8: !item.icon }" v-html="item.label")
</template>

<script>
export default {
  props: {
    offsetTop: { type: Number, default: 0 }
  },

  data: () => ({
    todayDate: (new Date()).getDate(),
    docs: [
      { href: '#installation', label: 'Installation' },
      { href: '#how-to-use', label: 'How to use' },
      { href: '#api', label: 'API' },
      { href: '#date-prototypes', label: 'Date prototypes' },
      { href: '#css-notes', label: 'CSS notes' },
      { href: '#release-notes', label: 'Release notes' }
    ],
    examples: [
      { class: 'heading', href: '#ex--basic', label: 'BASIC &amp; VIEW OPTIONS', icon: 'material-icons done' },
      { href: '#ex--basic', label: 'Basic, hide weekends' },
      { href: '#ex--alternative-header', label: 'Alternative header' },
      { href: '#ex--small-cal', label: 'Small calendar, no view selector, custom arrows' },
      { href: '#ex--disable-views', label: 'Disable views, default view' },
      { href: '#ex--min-max-dates', label: 'Min / max dates &amp; single click to navigate' },
      { href: '#ex--disable-days', label: 'Disable days' },
      { href: '#ex--calendar-themes', label: 'Calendar themes' },
      { href: '#ex--hiding-particular-week-days', label: 'Hide particular weekdays &amp; show week numbers' },
      { class: 'heading', href: '#ex--internationalization', label: 'INTERNATIONALIZATION (I18N)', icon: 'material-icons translate' },
      { href: '#ex--internationalization', label: 'Internationalization' },
      { class: 'heading', href: '#ex--timeline', label: 'TIMELINE, BUSINESS HOURS &amp; TODAY', icon: 'material-icons access_time' },
      { href: '#ex--timeline', label: 'Timeline' },
      { href: '#ex--special-hours', label: 'Business Hours' },
      { href: '#ex--today-current-time', label: 'Today\'s current time' },
      { href: '#ex--adding-a-today-button', label: 'Adding a Today button' },

      { class: 'heading', href: '#ex--timeless-events', label:'EVENTS', icon: 'material-icons event' },
      { href: '#ex--timeless-events', label: 'Timeless events' },
      { href: '#ex--events-with-time', label: 'Events with time information' },
      { href: '#ex--open-dialog-on-event-click', label: 'Open a dialog box on event click / dblclick' },
      { href: '#ex--events-indicators', label: 'Events indicators' },
      { href: '#ex--events-on-month-view', label: 'Display events on month view' },
      { href: '#ex--edit-and-delete-events', label: 'Edit &amp; delete events' },
      { href: '#ex--create-events', label: 'Create events' },
      { href: '#ex--other-event-creation-methods', label: 'Other event creation methods' },
      { href: '#ex--drag-and-drop', label: 'Drag &amp; drop' },
      { href: '#ex--external-events-drag-and-drop', label: 'External events drag &amp; drop' },
      { href: '#ex--multiple-day-events', label: 'Multiple day events' },
      { href: '#ex--recurring-events', label: 'Recurring events' },
      { href: '#ex--overlapping-events', label: 'Overlapping events' },
      { href: '#ex--background-events', label: 'Background events' },
      { href: '#ex--all-day-events', label: 'All day events' },
      { href: '#ex--splitting-days', label: 'Splitting days' },

      { class: 'heading', href: '#ex--emitted-events', label: 'COMMUNICATING WITH VUE CAL', icon: 'material-icons swap_horiz' },
      { href: '#ex--emitted-events', label: 'Vue Cal emitted events' },
      { href: '#ex--external-controls', label: 'External controls &amp; use of Vue Cal methods' },
      { href: '#ex--sync-two-calendars', label: 'Sync two vue-cal instances' },
      { href: '#ex--modifying-events-from-outside', label: 'Modifying events from outside' },

      { class: 'heading', href: '#ex--timeline-tweaking', label: 'ADVANCED CUSTOMIZATION', icon: 'material-icons tune' },
      { href: '#ex--scroll-to-time', label: 'Scroll the view to a particular time' },
      { href: '#ex--timeline-tweaking', label: 'Timeline tweaking' },
      { href: '#ex--custom-events-count', label: 'Custom events count' },
      { href: '#ex--custom-title-and-cells', label: 'Custom title &amp; cells' },
      { href: '#ex--custom-event-rendering', label: 'Custom event rendering' },
      { href: '#ex--custom-day-split-labels', label: 'Custom day split labels' }

      // w-tag.ml2(color="primary" outline) NEW
      // w-tag.ml2(color="blue" outline) UPDATED
    ]
  }),

  computed: {
    version () {
      return process.env.VITE_APP_VERSION.replace(
        /-(\w)(\w+)\.(\d+)/,
        (m0, m1, m2, m3) => ` <strong>${m1.toUpperCase()}${m2} ${m3}</strong>`
      )
    }
  },

  directives: {
    scrollTo: {
      mounted: (el, binding) => {
        el.addEventListener('click', () => {
          const target = binding.value && document.querySelector(binding.value)
          target.scrollIntoView()
        })
      }
    }
  }
}
</script>

<style lang="scss">
$primary: #42b983;
$secondary: #2c3e50;
$lighter-text: #ccc;

.top-bar {
  z-index: 10;
  position: absolute;
  border-bottom: 1px solid transparent;
  background: rgba(255, 255, 255, 0.1);
  @include backdrop-blur;
  transition: 0.3s ease-in-out all, 0.1s 0s ease-in-out border-color;
  top: 0;
  left: 0;
  right: 0;
  padding-right: 30px;
  box-sizing: content-box;

  h1 {height: 100%;}

  &__title {
    position: relative;
    overflow: visible;
    margin-left: auto;
    margin-right: auto;
    width: 15.5em;
    height: 100%;
    transition: 0.3s ease-in-out;
    font-size: 1em;
  }

  &__title-line {
    position: absolute;
    top: 50%;
    width: 130px;
    right: 100%;

    & + & {right: auto;left: 100%;}

    &:before, &:after {
      content: "";
      position: absolute;
      top: 0%;
      width: 100%;
      display: block;
      z-index: -1;
      border-left: none !important;
      border-right: none !important;
    }

    &:before {
      margin-top: -1px;
      border: 2px solid $primary;
    }

    &:after {
      margin-top: 5px;
      border: 1px solid $secondary;
    }
  }

  &__logo {
    position: relative;
    flex-shrink: 0;
    margin-right: 15px;
    vertical-align: middle;
    box-sizing: border-box;
    transition: 0.2s 0s ease-in-out;
    background-color: $primary;
    width: 38px;
    height: 36px;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    opacity: 0.8;
    margin-top: -2px;
    padding-top: 9px;
    font-family: impact, arial black, arial, sans-serif;
    transition: 0.4s 0.4s ease-in-out;
    transform: translate(3px, 3px) scale(0.9);
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0);

    &:before, &:after {
      content: '';
      position: absolute;
      top: 5px;
      width: 5px;
      height: 5px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    &:before {left: 5px;}
    &:after {right: 5px;}

    .ready & {
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
      transform: translate(0, 0);
    }
  }

  &__logo-link {
    display: inline-flex;
    height: 100%;
    font-size: 0.7em;
  }

  &__logo-title {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    transition: 0.3s ease-in-out;
    font-size: 30px;
    font-weight: 500;
  }

  &__logo-title:after {
    content: "*";
    position: absolute;
    top: 0;
    left: 100%;
    margin-left: 4px;
    line-height: 1;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  .version {
    opacity: 0;
    color: #bbb;
    font-style: italic;
    font-size: 11px;
    position: absolute;
    bottom: -8px;
    right: 0;
  }

  &__items {
    position: absolute;
    right: 0;
    transition: 0.3s ease-in-out;
    transform: translateX(100%);
    opacity: 0;
  }

  .w-menu__content {max-height: 90vh;}
  .w-menu__content .v-list-item {
    height: 30px;
    font-size: 1em;
    padding-left: 32px;

    &.heading {
      padding-left: 8px;
      margin-top: 8px;
      color: #888 !important;
    }
  }

  .w-tag {
    height: 16px;
    line-height: 1;
    font-size: 0.8em;
    padding: 0 7px;
  }

  .intro {
    position: absolute;
    top: 3em;
    left: 76px;
    color: #888;
    opacity: 1;
    transform: translateY(0em);
    transition: 0.3s .4s ease-in-out, 0s 0s top;
    font-size: 12px;
    font-weight: normal;
    border: none;
    text-align: left;
    white-space: nowrap;
  }

  .intro:before {
    content: "* ";
    vertical-align: super;
  }

  .intro em {
    padding-top: 3px;
    opacity: 0.6;
    transition: 0.3s;

    &:hover {opacity: 0.9;}
  }

  // When scrolled: sticky top bar.
  &.scrolled {
    transition: 0.6s ease-in-out all, 0.3s 0.5s ease-in-out border-color;
    border-bottom-color: rgba($lighter-text, 0.5) !important;
    position: fixed !important;

    .top-bar__title {width: 100%;height: 40px;}
    .top-bar__logo {
      width: 32px;
      height: 30px;
      font-size: 0.8em;
      padding-top: 10px;
    }
    .top-bar__logo-title {font-size: 0.9em;font-weight: 600;}
    .top-bar__logo-title:after {opacity: 0;}
    .version {opacity: 1;}

    .top-bar__items {
      transition: 0.3s 0.3s ease-in-out all;
      transform: translateX(0%);
      opacity: 1;
    }

    .intro {
      transition: 0.2s 0s ease-in-out all, 0s 0.3s top;
      transform: translateY(1em);
      opacity: 0;
      top: -5em;
    }
  }
}

.top-menu li {font-size: 15px;}
.top-menu li .heading {
  font-size: 14px;
  color: #888;
  margin-top: 20px;
  padding: 8px 0;
  border-top: 1px solid #eee;
  background: linear-gradient(90deg, rgba(128, 231, 172, 0.12), rgba(255, 255, 255, 0));

  &:before {background: inherit;}
  &:focus:before, &:hover:before {opacity: 1;}
}

@media screen and (max-width: 600px) {
  .scrolled .top-bar__logo {transform: scale(0.7);}

  .top-bar.scrolled,
  .top-bar.scrolled .w-toolbar__content,
  .scrolled .top-bar__logo-link {height: 32px !important;}

  .top-bar__items .w-button {padding: 0 10px !important;}
}

@media screen and (max-width: 449px) {
  .top-bar.scrolled .top-bar__items {margin-right: 0;}
  .top-bar.scrolled .top-bar__title > .w-flex {padding-left: 8px;}
  .top-bar__title {width: 14.5em;}
  .top-bar .intro {
    font-size: 11px;
    left: 72px;
    letter-spacing: -0.3px;
  }
  .top-bar__items .w-button__content span {display: none;}
  .top-menu--examples li {font-size: 13px;}
  .top-menu--examples li .heading {
    margin-top: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 30px;
  }
  .top-menu--examples li .w-list__item-label > div {padding-left: 8px;}
}
</style>
