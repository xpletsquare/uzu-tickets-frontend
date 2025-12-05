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

      <div class="text-right space-x-3 mb-6" v-if="showSendTicketsButtons">
        <div class="send-tickets-dropdown">
          <primary-button
            @click="toggleSendTicketsDropdown"
            label="Send Tickets"
            :loading="isSendingTickets"
          ></primary-button>

          <div v-if="showSendTicketsDropdown" class="dropdown-menu">
            <div class="dropdown-item" @click="openSendAllModal">
              <i class="fas fa-users"></i>
              <span>All Customers</span>
            </div>
            <div class="dropdown-item" @click="openSendSelectedModal">
              <i class="fas fa-user-check"></i>
              <span>Select Customers</span>
            </div>
          </div>
        </div>
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

    <!-- Confirmation Modal for Send to All -->
    <div v-if="showSendAllModal" class="modal-backdrop" @click.self="closeSendAllModal">
      <div class="modal-content" style="max-width: 400px">
        <div class="modal-header">
          <h3>Send Tickets to All Customers</h3>
          <button class="modal-close" @click="closeSendAllModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div v-if="isLoadingAllCount" class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading customer count...</span>
          </div>
          <div v-else class="confirmation-message">
            <i
              class="fas fa-info-circle"
              style="color: #15b743; font-size: 2rem; margin-bottom: 1rem; display: block"
            ></i>
            <p>
              Are you sure you want to send tickets to <strong>{{ allCustomersCount }}</strong> customers?
            </p>
            <p style="font-size: 0.875rem; color: #666; margin-top: 0.5rem">
              This action will send tickets to all customers who have purchased tickets for this event.
            </p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-secondary" @click="closeSendAllModal">Cancel</button>
          <primary-button :loading="isSendingTickets" label="Send to All" @click="sendTicketsToAll"></primary-button>
        </div>
      </div>
    </div>

    <!-- Modal for selecting customers -->
    <div v-if="showSelectedModal" class="modal-backdrop" @click.self="closeSendSelectedModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Send Tickets to Selected Customers</h3>
          <button class="modal-close" @click="closeSendSelectedModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div v-if="isLoadingPurchases" class="loading-state">
            <i class="fas fa-spinner fa-spin"></i>
            <span>Loading customers...</span>
          </div>
          <div v-else-if="eventPurchases.length === 0" class="empty-state">
            <i class="fas fa-inbox"></i>
            <p>No purchases found for this event yet.</p>
          </div>
          <div v-else class="purchase-list">
            <div class="purchase-list-header">
              <label class="select-all">
                <input
                  type="checkbox"
                  :checked="selectedPurchaseIds.length === eventPurchases.length"
                  @change="toggleSelectAll"
                />
                <span>Select All ({{ selectedPurchaseIds.length }}/{{ eventPurchases.length }})</span>
              </label>
            </div>
            <div class="purchase-items">
              <label v-for="purchase in eventPurchases" :key="purchase.id" class="purchase-item">
                <input type="checkbox" :value="purchase.id" v-model="selectedPurchaseIds" />
                <div class="purchase-info">
                  <div class="purchase-name">{{ purchase.userFirstName }} {{ purchase.userLastName }}</div>
                  <div class="purchase-email">{{ purchase.userEmail }}</div>
                  <div class="purchase-meta" v-if="purchase.paymentRef">Ref: {{ purchase.paymentRef }}</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-secondary" @click="closeSendSelectedModal">Cancel</button>
          <primary-button
            :disabled="selectedPurchaseIds.length === 0"
            :loading="isSendingTickets"
            label="Send Tickets"
            @click="sendTicketsToSelected"
          ></primary-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
import { ElementWithValidateFunction, EventDetailsFull } from '~/common/models/interfaces'
import { EventsApi } from '~/common/api/events.api'
import { payApi } from '~/common/api/payment.api'
import { AppState, StoreMutations } from '~/common/storeHelpers'

@Component
export default class EventDetails extends Vue {
  @Prop() eventDetails!: EventDetailsFull
  event: Partial<EventDetailsFull> | null = null

  placeholderImage = 'https://res.cloudinary.com/dk07kf3yl/image/upload/v1643845950/temp/placeholder_huq2kw.png'

  isLoading = false
  isSendingTickets = false
  showSendTicketsDropdown = false
  showSendAllModal = false
  showSelectedModal = false
  isLoadingPurchases = false
  isLoadingAllCount = false
  allCustomersCount = 0
  eventPurchases: any[] = []
  selectedPurchaseIds: string[] = []

  get editMode() {
    return this.$store.state.editEvent as boolean
  }

  get showEditButton() {
    if (this.event?.status !== 'DRAFT') {
      return false
    }

    return !this.isNewEvent && !this.editMode
  }

  get showSendTicketsButtons() {
    // Only show for existing private events
    if (!this.event) return false
    return !this.isNewEvent && this.event.type === 'PRIVATE'
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

    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleClickOutside)

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
      type: 'PUBLIC',
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

  toggleSendTicketsDropdown() {
    this.showSendTicketsDropdown = !this.showSendTicketsDropdown
  }

  async openSendAllModal() {
    this.showSendTicketsDropdown = false
    if (!this.eventDetails?.id) return
    this.showSendAllModal = true
    this.isLoadingAllCount = true

    // Fetch count of all customers
    const { error, data } = await payApi.listEventPurchases(this.eventDetails.id)
    this.isLoadingAllCount = false

    if (error) {
      this.showSendAllModal = false
      const errorMessage =
        typeof error === 'string' ? error : 'Failed to load customer data. Please check your authentication.'
      return message.error(errorMessage)
    }

    this.allCustomersCount = (data as any)?.data?.length || 0
  }

  closeSendAllModal() {
    this.showSendAllModal = false
    this.allCustomersCount = 0
  }

  async sendTicketsToAll() {
    if (!this.eventDetails?.id) return
    this.isSendingTickets = true
    const { error, data } = await EventsApi.sendTicketsToAll(this.eventDetails.id)
    this.isSendingTickets = false

    if (error) {
      return message.error(error as string)
    }

    const count = (data as any)?.data?.count ?? 0
    message.success(`Ticket send initiated for ${count} customers`)
    this.closeSendAllModal()
  }

  async openSendSelectedModal() {
    this.showSendTicketsDropdown = false
    if (!this.eventDetails?.id) return
    this.showSelectedModal = true
    this.isLoadingPurchases = true
    this.selectedPurchaseIds = []

    const { error, data } = await payApi.listEventPurchases(this.eventDetails.id)
    this.isLoadingPurchases = false

    if (error) {
      this.showSelectedModal = false
      const errorMessage =
        typeof error === 'string' ? error : 'Failed to load customer data. Please check your authentication.'
      return message.error(errorMessage)
    }

    this.eventPurchases = (data as any)?.data || []
  }

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      this.selectedPurchaseIds = this.eventPurchases.map((p: any) => p.id)
    } else {
      this.selectedPurchaseIds = []
    }
  }

  closeSendSelectedModal() {
    this.showSelectedModal = false
    this.selectedPurchaseIds = []
  }

  async sendTicketsToSelected() {
    if (!this.eventDetails?.id || this.selectedPurchaseIds.length === 0) return
    this.isSendingTickets = true
    const { error, data } = await EventsApi.sendTicketsToSelected(this.eventDetails.id, this.selectedPurchaseIds)
    this.isSendingTickets = false

    if (error) {
      return message.error(error as string)
    }

    const count = (data as any)?.data?.count ?? 0
    message.success(`Ticket send initiated for ${count} selected customers`)
    this.closeSendSelectedModal()
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement
    if (!target.closest('.send-tickets-dropdown')) {
      this.showSendTicketsDropdown = false
    }
  }

  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside)
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

/* Send Tickets Dropdown */
.send-tickets-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.dropdown-item i {
  width: 20px;
  color: #666;
}

.dropdown-item span {
  font-size: 14px;
  color: #333;
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.modal-close:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #999;
}

.confirmation-message {
  text-align: center;
  padding: 2rem 1rem;
}

.confirmation-message p {
  margin: 0;
  line-height: 1.6;
}

.loading-state i,
.empty-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: block;
}

.purchase-list-header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e5e5;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: #333;
}

.purchase-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.purchase-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.purchase-item:hover {
  border-color: #15b743;
  background-color: #f9fff9;
}

.purchase-item input[type='checkbox'] {
  margin-top: 0.25rem;
  cursor: pointer;
}

.purchase-info {
  flex: 1;
}

.purchase-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.purchase-email {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.purchase-meta {
  font-size: 0.75rem;
  color: #999;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e5e5;
}

.btn-secondary {
  padding: 0.625rem 1.25rem;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  background: white;
  color: #333;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f5f5f5;
  border-color: #bbb;
}
</style>
