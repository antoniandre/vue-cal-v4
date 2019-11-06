<template lang="pug">
.vuecal__header
  .vuecal__flex.vuecal__menu(v-if="!options.hideViewSelector" role="tablist" aria-label="Calendar views navigation")
    button(
      v-if="v.enabled"
      :class="{ active: viewProps.view.id === id }"
      v-for="(v, id) in viewProps.views"
      @click="$parent.switchView(id, null, true)"
      :aria-label="`${v.label} view`") {{ v.label }}
  .vuecal__title-bar(v-if="!options.hideTitleBar")
    button.vuecal__arrow.vuecal__arrow--prev(:aria-label="`Previous ${viewProps.view.id}`" @click="previous")
      slot(name="arrow-prev")
    .vuecal__flex.vuecal__title(grow)
      //- Best way to disable transition is to convert it to simple div tag.
      component(:is="options.transitions ? 'transition' : 'div'" :name="`slide-fade--${transitionDirection}`")
        component(
          :is="!!broaderView ? 'button' : 'span'"
          :aria-label="!!broaderView ? `Go to ${broaderView} view` : false"
          :key="`${viewProps.view.id}${viewProps.view.startDate.toString()}`"
          @click="switchToBroaderView")
          slot(name="title")
    button.vuecal__today-btn(v-if="options.todayButton" aria-label="Today" @click="goToToday")
      slot(name="today-button")
    button.vuecal__arrow.vuecal__arrow--next(:aria-label="`Next ${viewProps.view.id}`" @click="next")
      slot(name="arrow-next")
  weekdays-headings(
    v-if="viewProps.weekDaysInHeader"
    :vuecal="$parent"
    :view="viewProps.view"
    :week-days="weekDays"
    :transition-direction="transitionDirection"
    :switch-to-narrower-view="switchToNarrowerView")
    template(v-slot:weekday-renderer="{ heading }")
      slot(name="weekday-renderer" :heading="heading")

  //- Sticky split-days headers on day view only.
  transition(:name="`slide-fade--${transitionDirection}`")
    .vuecal__flex.vuecal__split-days-headers(v-if="viewProps.view.id === 'day' && $parent.hasSplits && options.stickySplitLabels && !options.minSplitWidth")
      .day-split-header(v-for="(split, i) in options.splitDays" :key="i" :class="split.class || false") {{ split.label }}
</template>

<script>
import WeekdaysHeadings from './weekdays-headings'

export default {
  components: { WeekdaysHeadings },
  props: {
    // Vuecal main component options (props).
    options: {
      type: Object,
      default: () => ({})
    },
    viewProps: {
      type: Object,
      default: () => ({})
    },
    weekDays: {
      type: Array,
      default: () => []
    },
    switchToNarrowerView: {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    previous () {
      this.$parent.previousNext(false)
    },

    next () {
      this.$parent.previousNext()
    },

    goToToday () {
      // Last midnight.
      this.$parent.updateSelectedDate(new Date(new Date().setHours(0, 0, 0)))
    },

    switchToBroaderView () {
      this.transitionDirection = 'left'

      if (this.broaderView) this.$parent.switchView(this.broaderView)
    }
  },

  computed: {
    transitionDirection: {
      get () {
        return this.$parent.transitionDirection
      },
      set (direction) {
        this.$parent.transitionDirection = direction
      }
    },
    broaderView () {
      let views = Object.keys(this.viewProps.views)
      views = views.slice(0, views.indexOf(this.viewProps.view.id))
      views.reverse()

      return views.find(v => this.viewProps.views[v].enabled)
    }
  }
}
</script>

<style lang="scss">
.vuecal {
  &__header button {
    background: none;
    border: none;
    outline: none;
    font: inherit;
  }

  &__menu {
    padding: 0;
    margin: 0;
    list-style-type: none;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.02);

    button {
      padding: 0.3em 1em;
      height: 2.2em;
      font-size: 1.3em;
      border-bottom: 0 solid currentColor;
      cursor: pointer;
      color: inherit;
      box-sizing: border-box;
      transition: 0.2s;
    }

    button.active {
      border-bottom-width: 2px;
      background: rgba(255, 255, 255, 0.15);
    }
  }

  &__title-bar {
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    font-size: 1.4em;
    line-height: 1.3;
    min-height: 2em;

    .vuecal--xsmall & {font-size: 1.3em;}
  }

  &__title {
    position: relative;
    justify-content: center;
    button {cursor: pointer;}
    button.slide-fade--left-leave-active,
    button.slide-fade--right-leave-active {width: 100%;}
  }

  &__today-btn {
    position: relative;
    align-items: center;
    display: flex;
    font-size: 0.8em;

    span.default {
      font-size: 0.8em;
      padding: 3px 6px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }

  &__arrow {
    cursor: pointer;
    position: relative;
    z-index: 1;

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
}

// Media queries.
//==================================//
@media screen and(max-width: 450px) {
  .vuecal__menu li {padding-left: 0.3em;padding-right: 0.3em;}
}

@media screen and(max-width: 350px) {
  .vuecal__menu li {font-size: 1.1em;}
}
</style>
