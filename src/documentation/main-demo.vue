<template lang="pug">
.main-demo
  .mb10.tagline
    .title2.grey-dark1 Go for the date picker...
    .title1.text-right.primary-dark1 or unleash the full potential!
  .w-flex.wrap.align-center.justify-center
    .ma4
      //- Date picker.
      vue-cal.vuecal--date-picker.demo(
        xsmall
        :selected-date="selectedDate"
        hide-view-selector
        :time="false"
        :transitions="false"
        active-view="month"
        :events="demoExample.events"
        :disable-views="['week', 'day']"
        @cell-click="selectedDate = $event"
        style="width: 210px;height: 230px")
      .grey.code.my2(style="font-size: 13px") Selected date: '{{ selectedDate.format() }}'

    .grow.mx2(style="max-width: 800px")
      //- Full-power calendar.
      vue-cal.demo.full-cal.vuecal--full-height-delete(
        hide-weekends
        :selected-date="selectedDate"
        :time-from="8 * 60"
        :time-to="19 * 60"
        :split-days="demoExample.splits"
        sticky-split-labels
        :editable-events="demoExample.editable"
        :events="demoExample.events"
        @cell-focus="selectedDate = $event.date || $event"
        style="height: 450px")
        template(#split-label="{ split, view }")
          w-icon(:color="split.color" size="20") material-icons person
          strong(:style="`color: ${split.color}`") {{ split.label }}
      a.mt4.w-flex.justify-end.grey-light1(
        href="https://github.com/antoniandre/vue-cal/blob/master/src/documentation/main-demo.vue"
        target="_blank")
        | View this example source code
        w-icon.ml1(color="grey lighten-1") material-icons open_in_new
</template>

<script>
import VueCal from '@/vue-cal/index.vue'

const demoExample = {
  splits: [{ label: 'John', class: 'john' }, { label: 'Kate', class: 'kate' }],
  editable: { title: false, drag: true, resize: true, create: true, delete: true },
  events: []
}

export default {
  components: { VueCal },
  data: () => ({
    demoExample,
    selectedDate: new Date()
  }),

  computed: {
    // Get the Monday of the real time current week.
    previousFirstDayOfWeek () {
      return new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7))
    }
  },

  created () {
    // Place all the events in the real time current week.
    for (let i = 0; i < 5; i++) {
      const day = this.previousFirstDayOfWeek.addDays(i).format()

      this.demoExample.events.push(
        {
          start: `${day} 12:00`,
          end: `${day} 13:00`,
          title: 'LUNCH',
          class: 'lunch',
          background: true,
          deletable: false,
          resizable: false,
          split: 1
        },
        {
          start: `${day} 12:00`,
          end: `${day} 13:00`,
          title: 'LUNCH',
          class: 'lunch',
          background: true,
          deletable: false,
          resizable: false,
          split: 2
        }
      )
    }

    // Date.format() and Date.addDays() are helper methods added by Vue Cal.
    const monday = this.previousFirstDayOfWeek.format()
    const tuesday = this.previousFirstDayOfWeek.addDays(1).format()
    const thursday = this.previousFirstDayOfWeek.addDays(3).format()
    const friday = this.previousFirstDayOfWeek.addDays(4).format()
    this.demoExample.events.push(
      {
        start: `${monday} 15:30`,
        end: `${monday} 17:30`,
        title: 'Tennis',
        content: '<i class="w-icon material-icons mt1">sports_tennis</i>',
        resizable: false,
        split: 1
      },
      {
        start: `${monday} 15:30`,
        end: `${monday} 17:30`,
        title: 'Tennis',
        content: '<i class="w-icon material-icons mt1">sports_tennis</i>',
        resizable: false,
        split: 2
      },
      {
        start: `${tuesday} 08:00`,
        end: `${tuesday} 10:00`,
        title: 'Volleyball',
        content: '<i class="w-icon material-icons mt1">sports_volleyball</i>',
        resizable: false,
        split: 2
      },
      {
        start: `${thursday} 09:00`,
        end: `${thursday} 11:30`,
        title: 'Golf',
        content: '<i class="w-icon material-icons mt2">golf_course</i>',
        resizable: false,
        split: 1
      },
      {
        start: `${friday} 16:45`,
        end: `${friday} 18:45`,
        title: 'Movie',
        content: '<i class="w-icon material-icons mt1">local_play</i>',
        resizable: false,
        split: 2
      }
    )
  }
}
</script>

<style lang="scss">
@use 'sass:color';

$john: #42b983;
$kate: #ff7fc8;

.main-demo {
  font-size: 12px;

  .tagline {
    max-width: 500px;
    margin: 0 auto 5rem;

    .title1 {letter-spacing: normal;}
  }
}

.demo {
  border-radius: 4px;

  // Date picker.
  &.vuecal--date-picker .vuecal__cell-events-count {
    width: 4px;
    height: 4px;
    min-width: 0;
    padding: 0;
    margin-top: 4px;
    color: transparent;
    background-color: $john;
  }
  &.vuecal--date-picker .vuecal__cell--selected .vuecal__cell-events-count {background-color: #fff;}

  // Both calendars.
  .vuecal__cell--out-of-scope {color: rgba(0, 0, 0, 0.15);}

  // Full power calendar.
  // ------------------------------------------------------
  &.full-cal .vuecal__menu {background-color: transparent;}
  &.full-cal .vuecal__title-bar {background: rgba(0, 0, 0, 0.03);}
  .vuecal__view-btn {
    background: none;
    padding: 0 10px;
    margin: 4px 2px;
    border-radius: 30px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    text-transform: uppercase;
    border: none;
    color: inherit;

    &--active {
      background: rgb(66, 185, 130);
      color: #fff;
    }
  }
  &.full-cal .weekday-label {opacity: 0.4;font-weight: 500;}
  .vuecal__header .w-icon {color: inherit;}
  &:not(.vuecal--day-view) .vuecal__cell--selected {background-color: transparent;}
  &:not(.vuecal--day-view).full-cal .vuecal__cell--selected:before {border: 1px solid rgba($john, 0.8);}

  .vuecal__event-time {
    margin: 3px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
  }

  // John.
  .vuecal__header .john {color: color.adjust($john, $lightness: -5%);}
  .vuecal__body .john {background-color: rgba($john, 0.08);}
  .john .vuecal__event {background-color: rgba(color.adjust($john, $lightness: -5%), 0.85);color: #fff;}
  .john .lunch {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($john, 0.15) 10px, rgba($john, 0.15) 20px);
    color: rgba(color.adjust($john, $lightness: -10%), 0.4);
  }

  // Kate.
  .vuecal__header .kate {color: color.adjust($kate, $lightness: -5%);}
  .vuecal__body .kate {background-color: rgba($kate, 0.08);}
  .kate .vuecal__event {background-color: rgba(color.adjust($kate, $lightness: -5%), 0.85);color: #fff;}
  .kate .lunch {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($kate, 0.15) 10px, rgba($kate, 0.15) 20px);
    color: rgba(color.adjust($kate, $lightness: -10%), 0.4);
  }
  // ------------------------------------------------------
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: 499px) {
  .main-demo .day-split-header strong {display: none;}
}
</style>
