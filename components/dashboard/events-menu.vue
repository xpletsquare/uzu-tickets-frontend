<template>
  <div>
    <button class="text-left back" @click="goBack">
      <i class="fas fa-chevron-left pr-2"></i>
      <span class="">Back</span>
    </button>

    <template v-if="showEventName">
      <div class="md:w-3/4 mt-5 p-0 event-title-holder">
        <multiselect
          v-model="selectedEvent"
          :options="currentEvents"
          :show-labels="false"
          placeholder="Event title"
          @select="onSelect"
          track-by="title"
          label="title"
          class="event-title"
        ></multiselect>
      </div>
    </template>

    <div class="space-y-4 mt-8">
      <div v-if="editMode">
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
import { message } from 'ant-design-vue'
import Multiselect from 'vue-multiselect'
import { Component, Vue } from 'vue-property-decorator'
import { AppState } from '~/common/storeHelpers'
import { EventDetailsFull } from '~/common/models/interfaces'



@Component({
  components: { Multiselect },
})
export default class EventsMenu extends Vue {
  selectedEvent: EventDetailsFull | null = null; // should be the event selected
  
  events: EventDetailsFull[] = [] // events available

  get showEventName() {
    return this.$route.path.includes('/dashboard/events/details')
  }

  get editMode(){
   return this.$store.state.editEvent as boolean;
  }

  get detailsMode() {
    return this.$route.path.includes('/dashboard/events/details')
  }

  get currentEvents() {
    const { events } = this.$store.state as AppState
    return events
  }

  get currentStage() {
    const stage = (this.$route.query.stage as string) || '1'
    return parseInt(stage)
  }

  mounted() {
    const eventId = this.$route.params.id;
    
    const event = this.currentEvents.find(event => event.id === eventId);

    this.selectedEvent = event || null;
  }

  onSelect(event: EventDetailsFull) {
    // console.log(event)
    message.info('Changing Event...')

    // get id from event and reroute to new event
    this.$router.push(`/dashboard/events/details/${event.id}`) // event details id is supposed to be attached

    // this.setEventsMode('basic', 1)
  }

  shouldShowAsPassed(target: number) {
    return this.currentStage >= target ? 'passed' : ''
  }

  setEventsMode(eventState: string, stage = 1) {
    const stageAsString = stage + '';
    const query = { ...this.$route.query, eventState, stage: stageAsString };
    this.$router.replace({ query })
  }

  goBack() {
    this.$router.replace('/dashboard/events');
  }
}
</script>

<style lang="scss" scoped>
// .event-name {
//   border: 1px solid #15b743;
// }

.back {
  color: var(--light-green);
}
.event-link {
  padding: 0.6em 1.5em;
  font-size: 12pt;
  color: rgb(243, 255, 242) ;
  background: none;
  /* border: 1px solid var(--light-green); */
  border-radius: 5px;
  margin-bottom: 12px;
  cursor: pointer;

  &.passed {
   /* background-color: var(--light-green);
    color: var(--dark-green); 
    background-color: var(--light-green);*/
    color: var(--light-green);
    font-weight: 500;
  }

  &:hover,
  &.active {
    color: var(--dark-green);
    background-color: var(--light-green);
  }
}

.event-title-holder {
  min-width: 100% !important;
}

.event-title {
  min-width: 100%;
  // border: 1px solid var(--light-green) !important;
  border-radius: 3px !important;
  // padding: 10px 0;
  text-transform: capitalize;
}
</style>