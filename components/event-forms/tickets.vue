<template>
  <div class="container">
    <section class="schedules">
      <h2 class="m-0">Ticket Category</h2>
      <p class="p-0 m-0">
        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
      </p>

      <div class="my-10">
        <p class="p-0 m-0">Ticket name is the name on the ticket: ex; Regular, VIP, VVIP</p>

        <div class="flex items-center gap-4 mt-1 w-full">
          <!-- <input-field label="Ticket name" :value.sync="ticket.title" class="w-full"></input-field> -->
          <div class="flex-auto">
            <div class="mt-4 mb-2">Ticket Name</div>
            <div class="border border-gray-500 rounded w-full">
              <input placeholder="Ticket name" v-model="ticket.title" class="w-full px-3 outline-none h-10" />
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4 mt-4 w-full">
          <multiselect
            v-model="selectValue"
            :options="schedules"
            :show-labels="false"
            placeholder="Ticket schedule"
            @select="onSelect"
            track-by="name"
            label="name"
            class="border border-gray-500 rounded"
          ></multiselect>

          <div class="w-1/2 border border-gray-500 rounded">
            <input placeholder="Price" v-model="ticket.price" class="w-full px-3 outline-none h-10" />
          </div>
        </div>

        <div class="mt-4 mb-2">Available Tickets</div>
        <div class="w-full border border-gray-500 rounded">
          <input v-model="ticket.nLimit" class="w-full px-3 outline-none h-10" />
        </div>

        <div class="text-right mt-4">
          <primary-button label="Add" class="btn" @click="addItem"></primary-button>
        </div>

      </div>
    </section>

    <section class="wrapper divide-y divide-gray-500">
      <div class="flex items-center justify-between py-3" v-for="(ticket, index) in formFields.tickets" :key="index">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black"
            >{{ capitalize(ticket.schedule.name) }} • {{ capitalize(ticket.title) }}
          </span>
          <span class="text-black">
            {{ ticket.schedule.date }} • {{ ticket.schedule.start }} 
            <span v-if="ticket.schedule.end != 'None'">• {{ ticket.schedule.end }}</span>
          </span>
          <span>
            {{ticket.nLimit}} tickets available
          </span>
        </div>

        <div class="flex flex-col gap-1">
          <span class="price text-xs"> Price</span>
          <span class="text-black font-bold"> {{ formatCurrency(ticket.price) }} </span>
        </div>
        <div>
          <span
            ><i class="fas fa-times fa-2x cursor-pointer" @click="removeItem(formFields.tickets.indexOf(ticket))"></i>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventDetailsFull, ITicket, ISchedule } from '~/common/models/interfaces'
import Multiselect from 'vue-multiselect'
import { formatCurrency, capitalize } from '~/common/utilities/index'

@Component({
  components: { Multiselect },
})
export default class TicketsForm extends Vue {
  @Prop() eventDetails!: EventDetailsFull
  formatCurrency = formatCurrency;
  capitalize = capitalize;
  selectValue = "";

  get schedules(){
    return this.eventDetails.schedules || []
  }

  ticket: ITicket = {
    title: '',
    schedule: {
      name: '',
      date: '',
      start: '',
      end: '',
    },
    price: '',
    nLimit: 0,
  }

  formFields: Partial<EventDetailsFull> = {
    tickets: [],
  }

  mounted() {
    this.formFields.tickets = this.eventDetails.tickets || [];
  }

  onSelect(schedule: ISchedule) {
    console.log(schedule)
    this.ticket.schedule = schedule
  }

  addItem() {
    const { title, schedule, price } = this.ticket

    const hasEmptyValue = [title, price].filter((key) => !key?.length)

    if (hasEmptyValue.length) {
      message.warning('Please enter all fields')
      return
    }

    this.formFields.tickets?.push({...this.ticket});

    this.selectValue = '';

    // TODO: fix bug with clearing

    this.ticket = {
      title: '',
      schedule: {
        name: '',
        date: '',
        start: '',
        end: '',
      },
      price: '',
      nLimit: 0
    }
  }

  removeItem(index: Number) {
    // console.log(index)
    const filtered = this.formFields.tickets?.filter((ticket) => this.formFields.tickets?.indexOf(ticket) !== index)

    // console.log(filtered)
    this.formFields.tickets = filtered
  }

  validate(): string {
    const { tickets } = this.formFields

    if (!tickets?.length) {
      return 'Add tickets'
    }

    // emit event to save data in parent
    this.$emit('save', this.formFields)
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