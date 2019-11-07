<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
vue-cal(
  :selected-date="selectedDate"
  :events="events"
  editable-events
  style="min-height: 400px;max-height: 65vh")
</template>

<script>
import VueCal from '@/components/vue-cal'

export default {
  components: { VueCal },
  data: () => ({
    selectedDate: '2020-04-05',
    events: [
      // {
      //   startDate: new Date(new Date(now).setHours(9, 0, 0, 0)),
      //   endDate: new Date(new Date(now).setHours(12, 0, 0, 0)),
      //   title: 'Event'
      // },
      {
        start: '2020-04-04 00:00',
        end: '2020-04-05 08:00',
        title: 'Event'
      }
    ]
  }),

  methods: {
  }
}
</script>

<style lang="scss">
.v-application--wrap {min-height: 0;}
footer {display: none !important;}
</style>
