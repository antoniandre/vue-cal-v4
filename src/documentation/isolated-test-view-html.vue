<template>
<div class="test-view">
  <vue-cal
    v-model:selectedDate="selectedDate"
    class="ml2 mr1 vuecal--blue-theme"
    xsmall
    :events="events"
    editable-events
    cell-contextmenu
    today-button
    :time-from="7 * 60"
    :time-to="20 * 60"
    :special-hours="specialHours"
    :hide-view-selector="false"
    :cell-contextmenu="log"
    header-type="row"
    :header-order="['name', 'menu', 'title-bar']"
  >
    <template #name>VueCal Test View</template>
  </vue-cal>
  <p>selectedDate: {{ selectedDate }}</p>
</div>
</template>

<script>
import VueCal from '@/vue-cal/index.vue'

// `from` and `to` are expected in minutes.
const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours', label: 'Full day shift' }

const now = new Date()

export default {
  components: { VueCal },

  data: () => ({
    selectedDate: now,
    view: 'week',
    specialHours: {
      1: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
      2: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
      3: [
        { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Morning shift</em>' },
        { from: 14 * 60, to: 19 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Afternoon shift</em>' }
      ],
      4: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
      5: { from: 9 * 60, to: 18 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Full day shift</em>' },
      6: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
      7: { from: 7 * 60, to: 20 * 60, class: 'closed', label: '<strong>Closed</strong>' }
    },
    events: [
      {
        start: new Date(new Date(now).setHours(1, 0, 0)),
        end: new Date(new Date(now).setHours(4, 0, 0)),
        allDay: true,
        title: 'Event 1',
        split: 2
      },
      {
        start: new Date(new Date(now).setHours(1, 0, 0)),
        end: new Date(new Date(now).setHours(4, 0, 0)),
        title: 'Event 2',
        split: 1
      },
      {
        start: new Date(new Date(now).setHours(3, 0, 0)),
        end: new Date(new Date(now).setHours(5, 0, 0)),
        title: 'Event 3',
        split: 2
      }
    ],
    daySplits: [
      { label: 'Tom', color: 'green' },
      { label: 'Kate', color: 'pink' }
    ]
  }),

  methods: {
    log (...params) {
      // eslint-disable-next-line
      console.log(...params)
    }
  }
}
</script>

<style lang="scss">
.test-view {
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  .vuecal {height: 400px;}
  .vuecal__event {
    background-color: rgba(160, 220, 255, 0.5);
    border: 1px solid rgba(0, 100, 150, 0.15);
  }
}

// Global.
.w-app {margin: 0;padding: 0;}
.top-bar, footer {display: none !important;}

.vuecal__special-hours {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;

  em {font-size: 0.9em;color: #999;}
}
.doctor-1 {background-color: hsl(127, 100%, 97%);color: hsl(127, 50%, 67%);}
.doctor-2 {background-color: hsl(217, 100%, 97%);color: hsl(217, 80%, 67%);}
.doctor-3 {background-color: hsl(287, 100%, 97%);color: hsl(287, 80%, 67%);}
.closed {
  background: hsl(27, 100%, 97%) repeating-linear-gradient(-45deg, hsla(27, 100%, 67%, 0.25), hsla(27, 100%, 67%, 0.25) 5px, rgba(255, 255, 255, 0) 5px, rgba(255, 255, 255, 0) 15px);
  color: hsl(27, 90%, 63%);
}
</style>
