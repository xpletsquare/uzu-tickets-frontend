<template>
  <section class="max-600 mx-auto" v-if="eventInitialized">
    <div class="content">
      <div class="text-right" v-if="!isNewEvent && !editMode">
        <primary-button @click="toggleEditMode" label="Edit Event"></primary-button>
      </div>

      <div v-if="editMode">
        <event-forms-basic 
          :eventDetails="event" 
          ref="basic" 
          @save="updateForm" 
          v-if="stage === 1"
        ></event-forms-basic>

        <event-forms-schedules
          :eventDetails="event"
          ref="schedule"
          @save="updateForm"
          v-if="stage === 2"
        ></event-forms-schedules>

        <event-forms-tickets
          :eventDetails="event"
          ref="tickets"
          @save="updateForm"
          v-if="stage === 3"
        ></event-forms-tickets>

        <event-forms-details
          :eventDetails="event"
          ref="details"
          @save="updateForm"
          v-if="stage === 4"
        ></event-forms-details>

        <event-forms-summary 
          :eventDetails="event" 
          ref="summary" 
          v-if="stage === 5"
        ></event-forms-summary>
      </div>

      <div v-else>
        <event-forms-summary :eventDetails="event" ref="summary" v-if="stage === 1"></event-forms-summary>
        <event-forms-sales :eventDetails="event" ref="sales" v-if="stage === 2"></event-forms-sales>
      </div>
    </div>

    <div class="flex justify-end">
      <div class="px-4">
        <button v-if="showBackButton" @click="back" class="border p-3 rounded">
          PREV <i class="fas fa-chevron-left"></i>
        </button>
      </div>

      <button v-if="showNextButton" @click="next" class="border p-3 rounded">
        NEXT <i class="fas fa-chevron-right"></i>
      </button>

      <div v-else-if="!showNextButton">
        <primary-button
          v-if="isNewEvent"
          @click="createEvent"
          :loading="isLoading"
          label="PUBLISH"
        ></primary-button>

        <primary-button
          v-else
          @click="updateEvent"
          :loading="isLoading"
          label="Save Changes"
        ></primary-button>
      </div>

    </div>

    <fullscreen-loader v-if="isLoading"></fullscreen-loader>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ElementWithValidateFunction, EventDetailsFull } from '~/common/models/interfaces'
import { message } from 'ant-design-vue'
import { EventsApi } from '~/common/api/events.api';
import { AppState, StoreMutations } from '~/common/storeHelpers';

@Component
export default class EventDetails extends Vue {
  @Prop() eventDetails!: EventDetailsFull
  event: Partial<EventDetailsFull> | null = null;

  isLoading = false;

  get editMode(){
   return this.$store.state.editEvent as boolean;
  }

  get eventInitialized(){
    return this.event !== null;
  }

  get stage() {
    const stage = (this.$route.query.stage as string) || '1'
    return parseInt(stage)
  }

  get showBackButton(){
    return this.stage > 1;
  }

  get showNextButton() {
    if (this.editMode) {
      return this.stage < 5
    }

    return this.stage < 2
  }

  get isNewEvent() {
    return this.$route.path.includes('/dashboard/events/create');
  }

  get currentStageRef(): ElementWithValidateFunction & any {
    switch (this.stage) {
      case 1:
        return this.$refs.basic
      case 2:
        return this.$refs.schedule
      case 3:
        return this.$refs.tickets
      case 4:
        return this.$refs.details
      case 5:
        return this.$refs.summary
      default:
        return null
    }
  }

  get currentUser(){
    const { currentUser } = this.$store.state as AppState;
    return currentUser;
  }

  mounted() {
    if (this.eventDetails) {
      this.event = { ...this.eventDetails };
      return
    }

    this.event = {
      id: '',
      title: '',
      images: {
        landscape: '',
        portrait: '',
      },
      description: '',
      category: '',
      location: '',
      schedules: [],
      tickets: [],
      tags: [],
      isPublished: false,
      status: 'DRAFT',
      author: this.currentUser?.id
    }

    this.toggleEditMode();
  }

  toggleEditMode(){
    const current = this.editMode;
    this.$store.commit(StoreMutations.setEditMode, !current);
    console.log('edit mode toggled');
  }

  updateForm(formData: any) {
    this.event = { ...this.event, ...formData };
  }

  next() {
    console.log(this.stage);

    if (this.stage >= 5) {
      return
    }

    if (!this.isNewEvent) {
      const ref: ElementWithValidateFunction = this.currentStageRef

      if (!ref) {
        return
      }

      const error = ref?.validate()

      if (error) {
        message.error(error)
        return
      }
    }

    const nextStage = this.stage + 1
    const stageAsString = nextStage + ''
    const query = { ...this.$route.query, stage: stageAsString }
    this.$router.replace({ query })
  }

  back(){
    const prevStage = this.stage - 1
    const stageAsString = prevStage + ''
    const query = { ...this.$route.query, stage: stageAsString }
    this.$router.replace({ query })
  }

  async createEvent() {
    // make api call to publish event
    const { currentUser } = this.$store.state as AppState;

    const author = currentUser?.id || '';

    const details: Partial<EventDetailsFull> = { ...this.event, author };
    details.venue = details.location;


    console.log({eventToPublish: details});

    this.isLoading = true
    const { error, data } = await EventsApi.createEvent(details);
    this.isLoading = false

    if (error) {
      return message.error(error as string)
    }

    message.success('Event published');

    this.$router.push('/dashboard/events');
  }

  async updateEvent(){
    const { currentUser } = this.$store.state as AppState;

    const author = currentUser?.id || '';

    const details: Partial<EventDetailsFull> = { ...this.event, author };

    this.isLoading = true
    const { error, data } = await EventsApi.update(this.eventDetails.id, {});
    this.isLoading = false

    if (error) {
      return message.error(error as string)
    }

    message.success('Event Updated Successfully');

    this.toggleEditMode();
  }
}
</script>

<style scoped>
button {
  border: 1px solid gray;
}

.content {
  min-height: 60vh;
  margin-bottom: 4rem;
}
</style>