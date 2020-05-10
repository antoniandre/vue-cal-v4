<template>
  <div
    class="dndVisualTo"
    v-if="splitOver == split.id && this.vuecal.domEvents.dragAnEvent._eid"
    :style="dndDimensions"
  ></div>
</template>
<script>
export default {
  inject: ["vuecal", "utils", "modules", "view", "domEvents"],
  props: ["split"],
  computed: {
    event() {
      let returnData = this.vuecal.view.events.find(
        el => el._eid == this.vuecal.domEvents.dragAnEvent._eid
      );
      if (returnData == null) {
        return { endTimeMinutes: 0, startTimeMinutes: 0 };
      }
      return returnData;
    },
    cursorAt() {
      return this.vuecal.dragData.timeAtCursor.minutes;
    },  
    splitOver() {
      return this.vuecal.dragData.split;
    },
    draggedEvent() {
      let { startTimeMinutes, endTimeMinutes } = this.event;
      return { startTimeMinutes, endTimeMinutes };
    },
    dndDimensions() {
      const { startTimeMinutes, endTimeMinutes } = this.draggedEvent;
      // Top of event.
      let minutesFromTop =
        this.cursorAt -
        this.vuecal.timeFrom -
        this.vuecal.dragData.initialCursorStartDifference;
      const top = Math.max(
        Math.round(
          (minutesFromTop * this.vuecal.timeCellHeight) / this.vuecal.timeStep
        ),
        0
      );

      // Bottom of event.
      minutesFromTop =
        Math.min(
          this.cursorAt -
            this.vuecal.dragData.initialCursorStartDifference +
            this.vuecal.dragData.eventDuration,
          this.vuecal.timeTo
        ) - this.vuecal.timeFrom;
      const bottom = Math.round(
        (minutesFromTop * this.vuecal.timeCellHeight) / this.vuecal.timeStep
      );

      const height = Math.max(bottom - top, 5); // Min height is 5px.

      return { top: top + "px", height: height + "px" };
    }
  }
};
</script>
<style lang="scss" scoped>
.dndVisualTo {
  position: absolute;
  width: 10px;
  background-color: blue;
  opacity: 0.5;
}
</style>
