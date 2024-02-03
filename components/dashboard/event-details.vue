<template>
  <section class="max-600 mx-auto" v-if="eventInitialized">
    <div class="content">
      <div class="text-right space-x-3 mb-6" v-if="showEditButton">
        <primary-button @click="toggleEditMode" label="Edit Event"></primary-button>

        <primary-button
          v-if="event.status === 'DRAFT'"
          @click="updateStatus('ACTIVE')"
          label="Publish Event"
        ></primary-button>
      </div>

      <div v-if="editMode">
        <event-forms-basic :eventDetails="event" ref="basic" @save="updateForm" v-if="stage === 1"></event-forms-basic>

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

        <event-forms-summary :eventDetails="event" ref="summary" v-if="stage === 5"></event-forms-summary>
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
          label="CREATE EVENT"
        ></primary-button>

        <primary-button
          v-else-if="editMode"
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
import { message } from 'ant-design-vue'
import { ElementWithValidateFunction, EventDetailsFull } from '~/common/models/interfaces'
import { EventsApi } from '~/common/api/events.api'
import { AppState, StoreMutations } from '~/common/storeHelpers'

@Component
export default class EventDetails extends Vue {
  @Prop() eventDetails!: EventDetailsFull
  event: Partial<EventDetailsFull> | null = null

  placeholderImage = 'https://res.cloudinary.com/dk07kf3yl/image/upload/v1643845950/temp/placeholder_huq2kw.png'

  isLoading = false

  get editMode() {
    return this.$store.state.editEvent as boolean
  }

  get showEditButton() {
    if (this.event?.status !== 'DRAFT') {
      return false
    }

    return !this.isNewEvent && !this.editMode
  }

  get eventInitialized() {
    return this.event !== null
  }

  get stage() {
    const stage = (this.$route.query.stage as string) || '1'
    return parseInt(stage)
  }

  get showBackButton() {
    return this.stage > 1
  }

  get showNextButton() {
    if (this.editMode) {
      return this.stage < 5
    }

    return this.stage < 2
  }

  get isNewEvent() {
    return this.$route.path.includes('/dashboard/events/create')
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

  get currentUser() {
    const { currentUser } = this.$store.state as AppState
    return currentUser
  }

  mounted() {
    console.log({ summary: this.eventDetails })

    if (this.eventDetails) {
      // This checks if event details have been passed in from the local store or API
      this.$store.commit(StoreMutations.setEditMode, false)

      this.event = { ...this.eventDetails }

      this.event.images = {
        landscape: this.eventDetails.image?.landscape,
        portrait: this.eventDetails.image?.landscape,
      }
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
      author: this.currentUser?.id,
    }

    // this.toggleEditMode();
    this.$store.commit(StoreMutations.setEditMode, true)
  }

  toggleEditMode() {
    this.$store.commit(StoreMutations.setEditMode, !this.editMode)
  }

  updateForm(formData: any) {
    this.event = { ...this.event, ...formData }
  }

  next() {
    if (this.stage >= 5) {
      return
    }

    if (this.editMode) {
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

  back() {
    const prevStage = this.stage - 1
    const stageAsString = prevStage + ''
    const query = { ...this.$route.query, stage: stageAsString }
    this.$router.replace({ query })
  }

  async createEvent() {
    // make api call to publish event
    const { currentUser } = this.$store.state as AppState

    const author = currentUser?.id || ''

    const details: Partial<EventDetailsFull> = { ...this.event, author }

    this.isLoading = true

    // send details to backend for processing

    const { image, ...rest } = details // seperate object data and files
    const { landscape, portrait }: any = image // get the landscape and portrait image files

    const restSyrialized = JSON.stringify(rest) // serialize the rest of the data
    // prepare formdata
    const formData = new FormData()
    formData.append('rest', restSyrialized) // set the rest of the data here
    formData.append('landscape', new Blob([landscape], { type: 'image/jpeg' }), 'landscape') // set the landscape image
    formData.append('portrait', new Blob([portrait], { type: 'image/jpeg' }), 'portrait') // set the portrait image

    // formData.forEach((d) => console.log(d))
    const { error } = await EventsApi.createEvent(formData)
    this.isLoading = false

    if (error) {
      return message.error(error as string)
    }

    message.success('Event Created 🚀')
    this.$router.push('/dashboard/events') // Redirect user to events page in the dashbaord
  }

  async updateEvent() {
    const details: Partial<EventDetailsFull> = { ...this.event }

    this.isLoading = true
    const { error } = await EventsApi.update(this.eventDetails.id, { ...details })
    this.isLoading = false

    if (error) {
      return message.error(error as string)
    }

    message.success('Event Updated Successfully 🚀')
    this.$router.push('/dashboard/events')
  }

  async updateStatus(status: string) {
    this.isLoading = true
    const { error } = await EventsApi.changeStatus(this.eventDetails?.id, status)
    this.isLoading = false

    if (error) {
      return message.error(error as string)
    }

    message.success('Event Status Updated 🚀')

    this.$router.push('/dashboard/events')
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
