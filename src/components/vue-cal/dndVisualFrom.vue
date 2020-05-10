<template>
  <div
    v-if="dndVisualFromVisible"
    class="dndVisual"
    :style="dndDimensions"
  ></div>
</template>
<script>
export default {
  inject: ["vuecal", "utils", "modules", "view", "domEvents"],
  props: ["split", "splitsCount"],
  computed: {
    dndVisualFromVisible() {
      if (!this.vuecal.domEvents.dragAnEvent._eid) {
        return false;
      }
      if (this.splitsCount > 0) {
        if (
          this.vuecal.dragData.draggedEvent == null ||
          this.vuecal.dragData.draggedEvent.split != this.split.id
        ) {
          return false;
        }
      }
      return true;
    },
    draggedEvent() {
      if (!this.vuecal.dragData.draggedEvent) {
        return { startTimeMinutes: 0, endTimeMinutes: 0 };
      }
      let {
        startTimeMinutes,
        endTimeMinutes
      } = this.vuecal.dragData.draggedEvent;
      return { startTimeMinutes, endTimeMinutes };
    },
    dndDimensions() {
      const { startTimeMinutes, endTimeMinutes } = this.draggedEvent;
      // Top of event.
      let minutesFromTop = startTimeMinutes - this.vuecal.timeFrom;
      const top = Math.max(
        Math.round(
          (minutesFromTop * this.vuecal.timeCellHeight) / this.vuecal.timeStep
        ),
        0
      );

      // Bottom of event.
      minutesFromTop =
        Math.min(endTimeMinutes, this.vuecal.timeTo) - this.vuecal.timeFrom;
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
.dndVisual {
  position: absolute;
  width: 10px;
  background-color: red;
}
</style>
