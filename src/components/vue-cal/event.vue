<template lang="pug">
.vuecal__event(
  :class="eventClasses(event)"
  v-bind:style="eventStyles(event)"
  @mouseenter="onMouseEnter($event, event)"
  @mouseleave="onMouseLeave($event, event)"
  @touchstart="onTouchStart($event, event)"
  @mousedown="onMouseDown($event, event)"
  @click="onClick($event, event)"
  @dblclick="onDblClick($event, event)")
  .vuecal__event-delete(
    v-if="vuecal.editableEvents"
    @mousedown.stop.prevent="deleteEvent(event)"
    @touchstart.stop.prevent="touchDeleteEvent(event)") {{ vuecal.texts.deleteEvent }}
  slot(:event="event" :view="vuecal.view.id" name="event-renderer")
  .vuecal__event-resize-handle(
    v-if="resizable"
    @mousedown="vuecal.editableEvents && vuecal.time && onDragHandleMouseDown($event, event)"
    @touchstart="vuecal.editableEvents && vuecal.time && onDragHandleMouseDown($event, event)")
</template>

<script>
import { deleteAnEvent, deleteLinkedEvents, checkCellOverlappingEvents } from './event-utils'

export default {
  props: {
    formattedDate: {
      type: String,
      default: ''
    },
    vuecal: {
      type: Object,
      default: () => ({})
    },
    event: {
      type: Object,
      default: () => ({})
    },
    cellEvents: {
      type: Array,
      default: () => []
    },
    split: {
      type: Number,
      default: 0
    },
    allDay: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    eventStyles (event) {
      if (!this.vuecal.time || !event.startTime || this.vuecal.view.id === 'month' || this.allDay) return {}
      const resizeAnEvent = this.domEvents.resizeAnEvent

      let styles = {}
      if (event.style && event.style instanceof Object) {
        styles = event.style
      }

      return [
        {
          top: `${event.top}px`,
          height: `${resizeAnEvent.newHeight && resizeAnEvent._eid === event._eid ? resizeAnEvent.newHeight : event.height}px`
        },
        styles
      ]
    },

    eventClasses (event) {
      const { clickHoldAnEvent, focusAnEvent } = this.domEvents
      let overlapping, overlapped, simultaneous
      let forceLeft = false
      let deletable = clickHoldAnEvent._eid &&
                      (clickHoldAnEvent._eid === event._eid ||
                      event.linked.find(e => e._eid === clickHoldAnEvent._eid))

      if (this.vuecal.view.id !== 'month') {
        overlapping = Object.keys(event.overlapping).length
        overlapped = Object.keys(event.overlapped).length
        simultaneous = Object.keys(event.simultaneous).length + 1

        if (simultaneous >= 3) {
          let split3 = simultaneous - 1
          Object.keys(event.simultaneous).forEach(_eid => {
            if (split3 && Object.keys(this.cellEvents.find(e => e._eid === _eid).simultaneous).length + 1 < 3) {
              split3--
            }
          })
          if (!split3) simultaneous = 2
        }

        else if (simultaneous === 2) {
          const otherEvent = this.cellEvents.find(e => e._eid === Object.keys(event.simultaneous)[0])

          if (otherEvent && Object.keys(otherEvent.overlapping).length && Object.keys(otherEvent.overlapped).length) {
            forceLeft = true
          }
        }
      }

      return {
        [event.classes.join(' ')]: true,
        'vuecal__event--focus': focusAnEvent._eid === event._eid,
        'vuecal__event--background': event.background,
        'vuecal__event--deletable': deletable,
        'vuecal__event--overlapped': overlapped,
        'vuecal__event--overlapping': overlapping,
        'vuecal__event--split2': simultaneous === 2,
        'vuecal__event--split3': simultaneous >= 3,
        'vuecal__event--split-middle': overlapped && overlapping && simultaneous >= 3,
        'vuecal__event--split-left': forceLeft,
        'vuecal__event--all-day': event.allDay,
        // Multiple days events.
        'vuecal__event--multiple-days': Object.keys(event.multipleDays).length,
        'event-start': Object.keys(event.multipleDays).length && event.multipleDays.start,
        'event-middle': Object.keys(event.multipleDays).length && event.multipleDays.middle,
        'event-end': Object.keys(event.multipleDays).length && event.multipleDays.end
      }
    },

    // On an event.
    onMouseDown (e, event, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false
      let { clickHoldAnEvent, resizeAnEvent, focusAnEvent } = this.domEvents

      // If the delete button is already out and event is on focus then delete event.
      if (focusAnEvent._eid === event._eid && clickHoldAnEvent._eid === event._eid) {
        return true
      }

      // Focus the clicked event.
      this.focusEvent(event)

      clickHoldAnEvent._eid = null // Reinit click hold on each click.

      // Don't show delete button if dragging event.
      if (!resizeAnEvent.start && this.vuecal.editableEvents) {
        clickHoldAnEvent.timeoutId = setTimeout(() => {
          clickHoldAnEvent._eid = event._eid
        }, clickHoldAnEvent.timeout)
      }
    },

    onMouseEnter (e, event) {
      e.preventDefault()
      this.vuecal.emitWithEvent('event-mouse-enter', event)
    },

    onMouseLeave (e, event) {
      e.preventDefault()
      this.vuecal.emitWithEvent('event-mouse-leave', event)
    },

    onTouchStart (e, event) {
      this.onMouseDown(e, event, true)
    },

    onClick (e, event) {
      if (typeof this.vuecal.onEventClick === 'function') return this.vuecal.onEventClick(event, e)
    },

    onDblClick (e, event) {
      if (typeof this.vuecal.onEventDblclick === 'function') return this.vuecal.onEventDblclick(event, e)
    },

    onDragHandleMouseDown (e, event) {
      const start = 'ontouchstart' in window && e.touches ? e.touches[0].clientY : e.clientY
      this.domEvents.resizeAnEvent = Object.assign(this.domEvents.resizeAnEvent, {
        start,
        originalHeight: event.height,
        newHeight: event.height,
        _eid: event._eid,
        split: event.split || null,
        startDate: event.multipleDays.startDate || event.startDate
      })
    },

    deleteEvent (event, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false

      deleteAnEvent(event, this.vuecal)
    },

    touchDeleteEvent (event) {
      this.deleteEvent(event, true)
    },

    focusEvent (event) {
      this.vuecal.emitWithEvent('event-focus', event)
      this.domEvents.focusAnEvent._eid = event._eid
    }
  },

  computed: {
    resizable () {
      return (this.vuecal.editableEvents && this.vuecal.time && this.event.startTime && !this.allDay &&
        !this.event.multipleDays.start && !this.event.multipleDays.middle && this.vuecal.view.id !== 'month')
    },
    domEvents: {
      get () {
        return this.vuecal.domEvents
      },
      set (object) {
        this.vuecal.domEvents = object
      }
    }
  },

  watch: {
    'event.background' (val) {
      // When the event background property changes, remove all the involved overlapping events
      // if setting to background or check cell overlapping again otherwise.
      if (val) {
        deleteLinkedEvents(this.event, this.cellEvents)
        this.event.overlapping = {}
        this.event.overlapped = {}
        this.event.simultaneous = {}
      }

      else if (this.vuecal.time) checkCellOverlappingEvents(this.cellEvents, this.vuecal)
    }
  }
}
</script>

<style lang="scss">
.vuecal__event {
  color: #666;
  background-color: #f8f8f8;
  position: relative;
  left: 0;
  right: 0;
  z-index: 1;
  transition: box-shadow 0.3s, left 0.3s, right 0.3s;
  overflow: hidden;// For sliding delete button.

  .vuecal:not(.vuecal--dragging-event) &:hover {z-index: 2;}

  // Reactivate user selection in events.
  .vuecal__cell & * {user-select: auto;}

  .vuecal--view-with-time &:not(&--all-day) {position: absolute;}

  .vuecal--view-with-time .vuecal__bg &--all-day {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.6;
  }

  .vuecal--view-with-time .vuecal__all-day &--all-day {
    position: relative;
    left: 0;
    right: 0;
  }

  &--overlapped {right: 20%;}
  &--overlapping:not(.vuecal__event--split2):not(.vuecal__event--split3) {left: 30%;box-shadow: 0 0 5px rgba(#000, 0.2);}
  &--overlapped.vuecal__event--split2 {right: 25%;}
  &--overlapping.vuecal__event--split2 {left: 25%;}
  &--overlapping.vuecal__event--split2.vuecal__event--split-left {left: 0;right: 25%;}
  &--overlapped.vuecal__event--overlapping.vuecal__event--split2 {left: 25%;right: 0;}
  &--overlapped.vuecal__event--split3 {right: 40%;}
  &--overlapping.vuecal__event--split3 {left: 40%;}
  &--overlapping.vuecal__event--split3.vuecal__event--split-middle {left: 20%;right: 20%;}

  .vuecal--no-event-overlaps &--overlapping:not(.vuecal__event--split2):not(.vuecal__event--split3) {left: 30%;box-shadow: 0 0 5px rgba(#000, 0.2);}
  .vuecal--no-event-overlaps &--overlapped.vuecal__event--split2 {right: 50%;}
  .vuecal--no-event-overlaps &--overlapping.vuecal__event--split2 {left: 50%;}
  .vuecal--no-event-overlaps &--overlapping.vuecal__event--split2.vuecal__event--split-left {left: 0;right: 50%;}
  .vuecal--no-event-overlaps &--overlapped.vuecal__event--overlapping.vuecal__event--split2 {left: 50%;right: 0;}
  .vuecal--no-event-overlaps &--overlapped.vuecal__event--split3 {right: 66.66%;}
  .vuecal--no-event-overlaps &--overlapping.vuecal__event--split3 {left: 66.66%;}
  .vuecal--no-event-overlaps &--overlapping.vuecal__event--split3.vuecal__event--split-middle {left: 33.33%;right: 33.33%;}

  &--background {z-index: 0;}
  &--focus {box-shadow: 1px 1px 6px rgba(0,0,0,0.2);z-index: 3;}
}

.vuecal__event-resize-handle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1em;
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transform: translateY(110%);
  transition: 0.3s;
  cursor: ns-resize;

  .vuecal__event:hover &,
  .vuecal__event--focus & {opacity: 1;transform: translateY(0);}
}

.vuecal__event-delete {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1.4em;
  line-height: 1.4em;
  background-color: rgba(221, 51, 51, 0.85);
  color: #fff;
  z-index: 0;
  cursor: pointer;
  transform: translateY(-110%);
  transition: 0.3s;

  .vuecal--full-height-delete & {
    height: auto;
    bottom: 0;

    &:before {
      content: '';
      width: 1.7em;
      height: 1.8em;
      display: block;
      background-image: url('data:image/svg+xml;utf8,<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="m256 33c-124 0-224 100-224 224 0 124 100 224 224 224 124 0 224-100 224-224 0-124-100-224-224-224z m108 300c2 1 3 3 3 5 0 2-1 4-3 6l-21 21c-2 2-4 3-6 3-2 0-4-1-5-3l-76-75-75 76c-2 1-4 2-6 2-2 0-4-1-6-2l-21-22c-2-2-2-4-2-6 0-2 0-4 2-5l76-76-76-75c-3-3-3-9 0-12l21-21c2-2 4-3 6-3 2 0 4 1 5 3l76 74 76-74c1-2 3-3 5-3 3 0 5 1 6 3l22 21c3 3 3 9 0 12l-76 75z" transform="scale(0.046875 0.046875)" fill="%23fff" opacity="0.9"/></svg>');
    }
  }
  .vuecal__event--deletable & {transform: translateY(0);z-index: 1;}
}

.vuecal--month-view .vuecal__event-title {
  font-size: 0.85em;
}

.vuecal--short-events .vuecal__event-title {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 3px;
}

.vuecal__event-title,
.vuecal__event-content {
  hyphens: auto;
}

.vuecal__event-title--edit {
  border-bottom: 1px solid transparent;
  text-align: center;
  transition: 0.3s;
  color: inherit;
  background-image: url('data:image/svg+xml;utf8,<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="m163 440l-91-91 251-250 90 90z m309-352l-48-48c-12-11-32-11-45 2l-45 45 91 91 45-45c13-13 13-33 2-45z m-408 275l-32 117 117-32z" fill="%23000" opacity="0.4"/></svg>');
  background-repeat: no-repeat;
  background-position: 120% 0.15em;
  background-size: 0.4em;
  outline: none;
  width: 100%;

  &:hover, &:focus {
    border-color: rgba(0, 0, 0, 0.4);
    background-position: 99% 0.15em;
    background-size: 1.2em;
  }
}
</style>
