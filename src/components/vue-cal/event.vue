<template lang="pug">
.vuecal__event(
  :class="eventClasses"
  :style="eventStyles"
  tabindex="0"
  @focus="focusEvent"
  @keypress.enter.stop="onClick"
  @mouseenter="onMouseEnter"
  @mouseleave="onMouseLeave"
  @touchstart.stop="onTouchStart"
  @mousedown.stop="onMouseDown"
  @click="onClick"
  @dblclick="onDblClick")
  .vuecal__event-delete(
    v-if="vuecal.editableEvents && event.deletable"
    @mousedown.stop="deleteEvent"
    @touchstart.stop="touchDeleteEvent") {{ vuecal.texts.deleteEvent }}
  slot(name="event-renderer" :event="event" :view="vuecal.view.id")
  //- Force contenteditable="false" for new events without content.
  .vuecal__event-resize-handle(
    v-if="resizable"
    contenteditable="false"
    @mousedown="onDragHandleMouseDown"
    @touchstart="onDragHandleMouseDown")
</template>

<script>
import { deleteAnEvent } from './event-utils'

export default {
  props: {
    cellFormattedDate: { type: String, default: '' },
    vuecal: { type: Object, default: () => ({}) },
    event: { type: Object, default: () => ({}) },
    cellEvents: { type: Array, default: () => [] },
    overlaps: { type: Array, default: () => [] },
    eventPosition: { type: Number, default: 0 },
    overlapsStreak: { type: Number, default: 0 },
    allDay: { type: Boolean, default: false },
    eventMaxWidth: { type: Number, default: 100 }
  },

  methods: {
    // On an event.
    onMouseDown (e, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false
      const { clickHoldAnEvent, resizeAnEvent, focusAnEvent } = this.domEvents

      // If the delete button is already out and event is on focus then delete event.
      if (focusAnEvent._eid === this.event._eid && clickHoldAnEvent._eid === this.event._eid) {
        return true
      }

      // Focus the clicked event.
      this.focusEvent()

      clickHoldAnEvent._eid = null // Reinit click hold on each click.

      // Show event delete button - only if not dragging.
      if (!resizeAnEvent._eid && this.vuecal.editableEvents) {
        clickHoldAnEvent.timeoutId = setTimeout(() => {
          clickHoldAnEvent._eid = this.event._eid
          this.event.deleting = true
        }, clickHoldAnEvent.timeout)
      }
    },

    onMouseEnter (e) {
      e.preventDefault()
      this.vuecal.emitWithEvent('event-mouse-enter', this.event)
    },

    onMouseLeave (e) {
      e.preventDefault()
      this.vuecal.emitWithEvent('event-mouse-leave', this.event)
    },

    onTouchStart (e) {
      this.onMouseDown(e, true)
    },

    onClick (e) {
      if (typeof this.vuecal.onEventClick === 'function') return this.vuecal.onEventClick(this.event, e)
    },

    onDblClick (e) {
      if (typeof this.vuecal.onEventDblclick === 'function') return this.vuecal.onEventDblclick(this.event, e)
    },

    onDragHandleMouseDown () {
      this.domEvents.resizeAnEvent = Object.assign(this.domEvents.resizeAnEvent, {
        _eid: this.event._eid,
        start: (this.segment || this.event).start,
        split: this.event.split || null,
        segment: !!this.segment && this.segment.start,
        originalEndTimeMinutes: this.event.endTimeMinutes
      })

      this.event.resizing = true
    },

    deleteEvent (touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false

      deleteAnEvent(this.event, this.vuecal)
    },

    touchDeleteEvent (event) {
      this.deleteEvent(true)
    },

    cancelDeleteEvent () {
      this.event.deleting = false
    },

    focusEvent () {
      const { focusAnEvent } = this.domEvents

      this.vuecal.emitWithEvent('event-focus', this.event)

      // Unfocus previous event if any.
      const onFocus = focusAnEvent._eid
      if (onFocus && onFocus !== this.event._eid) {
        const event = this.vuecal.view.events.find(e => e._eid === focusAnEvent._eid)
        if (event) event.focused = false
      }

      // Cancel delete on previous event if any.
      this.vuecal.cancelDelete()

      focusAnEvent._eid = this.event._eid
      this.event.focused = true
    }
  },

  computed: {
    // Don't rely on global variables otherwise whenever it would change all the events would be redrawn.
    eventStyles () {
      if (this.event.allDay || !this.vuecal.time || !this.event.endTimeMinutes || this.vuecal.view.id === 'month' || this.allDay) return {}
      let width = this.eventMaxWidth / Math.min(this.overlaps.length + 1, this.overlapsStreak)
      let left = (this.eventMaxWidth / (this.overlaps.length + 1)) * this.eventPosition

      if (this.vuecal.minEventWidth && width < this.vuecal.minEventWidth) {
        width = this.vuecal.minEventWidth
        left = ((100 - this.vuecal.minEventWidth) / this.overlaps.length) * this.eventPosition
      }

      return {
        top: `${(this.segment || this.event).top}px`,
        height: `${(this.segment || this.event).height}px`,
        width: `${width}%`,
        left: `${left}%`
      }
    },

    // Don't rely on global variables otherwise whenever it would change all the events would be redrawn.
    eventClasses () {
      const { isFirstDay, isLastDay } = this.segment || {}

      return {
        [this.event.classes.join(' ')]: true,
        'vuecal__event--focus': this.event.focused,
        'vuecal__event--resizing': this.event.resizing,
        'vuecal__event--background': this.event.background,
        'vuecal__event--deletable': this.event.deleting,
        'vuecal__event--all-day': this.event.allDay,
        // Multiple days events.
        'vuecal__event--multiple-days': !!this.segment,
        'event-start': this.segment && isFirstDay && !isLastDay,
        'event-middle': this.segment && !isFirstDay && !isLastDay,
        'event-end': this.segment && isLastDay && !isFirstDay
      }
    },
    // When multiple-day events, a segment is a portion of event spanning on 1 day.
    segment () {
      return (this.event.segments && this.event.segments[this.cellFormattedDate]) || null
    },
    resizable () {
      return (this.vuecal.editableEvents && this.event.resizable && this.vuecal.time && this.event.endTimeMinutes && !this.allDay &&
        (!this.segment || (this.segment && this.segment.isLastDay)) && this.vuecal.view.id !== 'month')
    },
    domEvents: {
      get () {
        return this.vuecal.domEvents
      },
      set (object) {
        this.vuecal.domEvents = object
      }
    }
  }
}
</script>

<style lang="scss">
.vuecal__event {
  color: #666;
  background-color: rgba(248, 248, 248, 0.8);
  position: relative;
  box-sizing: border-box;
  left: 0;
  width: 100%;
  z-index: 1;
  transition: box-shadow 0.3s, left 0.3s, width 0.3s;
  overflow: hidden;// For sliding delete button.

  .vuecal:not(.vuecal--dragging-event) &:hover {z-index: 2;}

  // Reactivate user selection in events.
  .vuecal__cell & * {user-select: text;}

  .vuecal--view-with-time &:not(&--all-day) {position: absolute;}

  .vuecal--view-with-time .vuecal__bg &--all-day {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 0;
    opacity: 0.6;
    width: auto;
    right: 0;
  }

  .vuecal--view-with-time .vuecal__all-day &--all-day {
    position: relative;
    left: 0;
  }

  &--background {z-index: 0;}
  &--focus, &:focus {box-shadow: 1px 1px 6px rgba(0,0,0,0.2);z-index: 3;outline: none;}
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
  .vuecal__event:focus &,
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
