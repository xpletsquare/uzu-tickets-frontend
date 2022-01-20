<template>
  <div class="container">
    <section class="schedules">
      <h2 class="m-0">Tickets</h2>
      <p class="p-0 m-0">
        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
      </p>

      <div class="my-10">
        <p class="p-0 m-0">Ticket name is the name on the ticket: ex; Regular, VIP, VVIP</p>

        <div class="flex items-center gap-4 mt-1 w-full">
          <input-field label="Ticket name" v-bind:value.sync="ticket.title" class="w-full"></input-field>
          <primary-button label="Add" class="btn"></primary-button>
        </div>

        <div class="flex items-center gap-4 mt-2 w-4/5">
          <input-field label="Ticket schedule" v-bind:value.sync="ticket.schedule" class="w-1/2"></input-field>
          <input-field label="Price" v-bind:value.sync="ticket.price" class="w-1/2"></input-field>
        </div>
      </div>
    </section>

    <!-- <section class="wrapper divide-y divide-gray-500" v-for="(item, ticket) in tickets" :key="item">
      <div class="flex items-center justify-between py-3">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black"> {{ ticket }} Schedule 1 • Regular </span>
          <span class="text-black"> Schedule 1 • 21/12/2022 • 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="price text-xs"> Price</span>
          <span class="text-black font-bold"> N 20,000 </span>
        </div>
        <div>
          <span><i class="fas fa-times fa-2x"></i> </span>
        </div>
      </div>
    </section> -->

    <section class="wrapper divide-y divide-gray-500">
      <div class="flex items-center justify-between py-3">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black"> Schedule 1 • Regular </span>
          <span class="text-black"> Schedule 1 • 21/12/2022 • 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="price text-xs"> Price</span>
          <span class="text-black font-bold"> N 20,000 </span>
        </div>
        <div>
          <span><i class="fas fa-times fa-2x"></i> </span>
        </div>
      </div>
      <div class="flex items-center justify-between py-3">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black"> Schedule 1 • Regular </span>
          <span class="text-black"> Schedule 1 • 21/12/2022 • 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="price text-xs"> Price</span>
          <span class="text-black font-bold"> N 20,000 </span>
        </div>
        <div>
          <span><i class="fas fa-times fa-2x"></i> </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventDetailsFull, ISchedule, ITicket } from '~/common/models/interfaces'

@Component
export default class TicketsForm extends Vue {
  @Prop() details!: EventDetailsFull

  ticket: ITicket = {
    id: '',
    title: '',
    schedule: '',
    price: '',
  }

  formFields: Partial<EventDetailsFull> = {
    tickets: [],
  }

  validate(): string {
    const { tickets } = this.formFields

    if (!tickets?.length) {
      return 'Add tickets'
    }

    return ''
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 2rem 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid var(--grey);
  }
}

.wrapper {
  padding: 0.5rem 0;
}

h2 {
  font-size: 24pt;
}

.btn {
  min-width: 100px;
}
</style>