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
          <input-field label="Ticket name" :value.sync="ticket.title" class="w-full"></input-field>
          <primary-button label="Add" class="btn" @click="addItem"></primary-button>
        </div>

        <div class="flex items-center gap-4 mt-2 w-4/5">
          <!-- <input-field label="Ticket schedule" :value.sync="ticket.schedule" class="w-1/2"></input-field> -->
          <multiselect
            v-model="selectValue"
            :options="options"
            :show-labels="false"
            placeholder="Ticket schedule"
            @select="onSelect"
            class="border border-gray-500 rounded"
          ></multiselect>
          <input-field label="Price" :value.sync="ticket.price" class="w-1/2"></input-field>
        </div>
      </div>
    </section>

    <section class="wrapper divide-y divide-gray-500">
      <div class="flex items-center justify-between py-3" v-for="(ticket, index) in formFields.tickets" :key="index">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black"> {{ ticket.title }} </span>
          <span class="text-black"> {{ ticket.schedule }} </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="price text-xs"> Price</span>
          <span class="text-black font-bold"> {{ ticket.price }} </span>
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
import { EventDetailsFull, ITicket } from '~/common/models/interfaces'
import Multiselect from 'vue-multiselect'

@Component({
  components: { Multiselect },
})
export default class TicketsForm extends Vue {
  @Prop() eventDetails!: EventDetailsFull

  selectValue: string = '' // should be the schedule selected
  options: string[] = ['Schedule 1', 'Schedule 2', 'Schedule 3', 'Schedule 4', 'Schedule 5']
  schedules: string[] = [] // schedules available

  ticket: ITicket = {
    // id: '',
    title: '',
    schedule: '',
    price: '',
  }

  formFields: Partial<EventDetailsFull> = {
    tickets: [],
  }

  // mounted() {
  //   if (this.eventDetails) {
  //     const { tickets } = this.eventDetails
  //     this.formFields = { tickets }
  //     return
  //   }

  //   message.warning('danger')

  //   this.formFields = {
  //     tickets: [
  //       {
  //         // id: '1',
  //         title: 'Regular',
  //         schedule: 'Schedule 1 • 21/12/2022 • 03:00 PM',
  //         price: 'N 20,000',
  //       },
  //       {
  //         // id: '2',
  //         title: 'Regular',
  //         schedule: 'Schedule 1 • 21/12/2022 • 03:00 PM',
  //         price: 'N 20,000',
  //       },
  //       {
  //         // id: '3',
  //         title: 'Regular',
  //         schedule: 'Schedule 1 • 21/12/2022 • 03:00 PM',
  //         price: 'N 20,000',
  //       },
  //     ],
  //   }
  // }

  onSelect(schedule: string) {
    message.info(schedule)
  }

  addItem() {
    const { title, schedule, price } = this.ticket

    const hasEmptyValue = [title, schedule, price].filter((key) => !key?.length)

    // console.log(hasEmptyValue)

    if (hasEmptyValue.length) {
      message.warning('Please enter all fields')
      return
    }

    this.formFields.tickets?.push(this.ticket)

    // fix bug with clearing

    this.ticket = {
      // id: '',
      title: '',
      schedule: '',
      price: '',
    }
    console.log(this.ticket)
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