<template>
  <section class="grids-wrapper">
    <div
      v-for="ticket in singleEvent.tickets"
      :key="ticket.id"
      class="rounded shadow-lg p-3 inline-flex justify-between items-center gap-3"
    >
      <div class="border rounded-md border-green-400 bg-green-500 text-green-600 bg-opacity-20 p-3">
        <div class="uppercase text-sm">{{ ticket.title }}</div>
        <div class="font-semibold">{{ `N${ticket.price}.00` }}</div>
      </div>

      <div class="flex-auto text-sm">
        <div>Ticket valid for 1 day</div>
        <div class="opacity-50">{{ `${ticket.schedule.date} | ${ticket.schedule.start}` }}</div>
      </div>

      <div class="inline-flex justify-between items-center gap-3">
        <button class="p-1" @click="decreaseTicketCount(ticket.id)">-</button>
        <span class="font-semibold text-xl">{{ ticketCount[ticket.id] || 0 }}</span>
        <button class="p-1" @click="increaseTicketCount(ticket.id)">+</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component
export default class TicketSelection extends Vue {
  @Prop({ type: Object, required: true }) ticketCount!: { [key: string]: number }
  @Prop({ type: Object, required: true }) singleEvent!: EventDetailsFull

  increaseTicketCount(ticketId: string) {
    this.$emit('increase-ticket-count', ticketId)
  }

  decreaseTicketCount(ticketId: string) {
    this.$emit('decrease-ticket-count', ticketId)
  }
}
</script>

<style scoped>
.grids-wrapper {
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
