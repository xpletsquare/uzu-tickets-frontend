<template>
  <div>
    <button class="w-full text-left" @click="goBack">
      <i class="fas fa-chevron-left pr-2"></i>
      <span>Back</span>
    </button>

    <template v-if="showEventName">
      <div class="md:w-3/4 mt-5 p-0">
        <multiselect
          v-model="selectValue"
          :options="options"
          :show-labels="false"
          placeholder="Event title"
          @select="onSelect"
          track-by="title"
          label="title"
          class="border rounded border-green-500"
        ></multiselect>
      </div>
    </template>

    <div class="space-y-4 mt-8">
      <div v-if="!detailsMode">
        <div class="event-link" :class="shouldShowAsPassed(1)" @click="setEventsMode('basic', 1)">
          <i class="fas fa-check-circle pr-2"></i> Basic Information
        </div>
        <div class="event-link" :class="shouldShowAsPassed(2)" @click="setEventsMode('schedule', 2)">
          <i class="fas fa-check-circle pr-2"></i>Schedules
        </div>
        <div class="event-link" :class="shouldShowAsPassed(3)" @click="setEventsMode('tickets', 3)">
          <i class="fas fa-check-circle pr-2"></i>Tickets
        </div>
        <div class="event-link" :class="shouldShowAsPassed(4)" @click="setEventsMode('details', 4)">
          <i class="fas fa-check-circle pr-2"></i>Details
        </div>
        <div class="event-link" :class="shouldShowAsPassed(5)" @click="setEventsMode('publish', 5)">
          <i class="fas fa-check-circle pr-2"></i>Summary
        </div>
      </div>

      <div v-else>
        <div class="event-link" :class="shouldShowAsPassed(1)" @click="setEventsMode('publish', 1)">
          <i class="fas fa-check-circle pr-2"></i>Summary
        </div>
        <div class="event-link" :class="shouldShowAsPassed(2)" @click="setEventsMode('sales', 2)">
          <i class="fas fa-check-circle pr-2"></i>Sales
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Multiselect from 'vue-multiselect'
import { AppState } from '~/common/storeHelpers'
import { EventDetailsFull } from '~/common/models/interfaces'

import { message } from 'ant-design-vue'

@Component({
  components: { Multiselect },
})
export default class EventsMenu extends Vue {
  selectValue: string = '' // should be the event selected
  options: object[] = [
    { title: 'Event title 1', description: 'event description' },
    { title: 'Event title 2', description: 'event description' },
  ] // sample events
  events: EventDetailsFull[] = [] // events available

  get showEventName() {
    return this.$route.path.includes('/dashboard/events/details')
  }

  get detailsMode() {
    return this.$route.path.includes('/dashboard/events/details')
  }

  get currentEvents() {
    const { currentUser } = this.$store.state as AppState
    return currentUser?.events
  }

  get currentStage() {
    const stage = (this.$route.query.stage as string) || '1'
    return parseInt(stage)
  }

  onSelect(event: any) {
    // console.log(event)
    message.info(event.title)

    // get id from event and reroute to new event
    this.$router.push(`/dashboard/events/details`) // event details id is supposed to be attached

    // this.setEventsMode('basic', 1)
  }

  shouldShowAsPassed(target: number) {
    return this.currentStage >= target ? 'passed' : ''
  }

  setEventsMode(eventState: string, stage = 1) {
    const stageAsString = stage + ''
    const query = { ...this.$route.query, eventState, stage: stageAsString }
    this.$router.replace({ query })
  }

  goBack() {
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
// .event-name {
//   border: 1px solid #15b743;
// }

.event-link {
  padding: 0.6em 1.5em;
  font-size: 12pt;
  color: #0000007a;
  background: rgba(255, 255, 255, 0.277);
  border-radius: 5px;
  margin-bottom: 12px;
  cursor: pointer;

  &.passed {
    background-color: rgba(255, 255, 255, 0.7);
    color: var(--light-green);
    font-weight: 500;
  }

  &:hover,
  &.active {
    color: var(--dark-green);
  }
}
</style>