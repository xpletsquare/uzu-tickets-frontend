<template>
  <div class="container">
    <section class="schedules">
      <h2 class="m-0">Schedules</h2>
      <p class="p-0 m-0">
        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
      </p>

      <div class="my-8">
        <p class="p-0 m-0">Improve discoverability of your event by adding tags relevant to the subject matter.</p>

        <div class="flex items-center gap-4 mt-2 w-full">
          <input-field label="Schedule name" :value.sync="schedule.name" class="w-full"></input-field>
          <primary-button label="Add" class="btn" @click="addItem"></primary-button>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <input-field label="Date" :value.sync="schedule.date"></input-field>
          <input-field label="Start time" :value.sync="schedule.start"></input-field>
          <input-field label="End time" :value.sync="schedule.end"></input-field>
        </div>
      </div>
    </section>

    <section class="wrapper divide-y divide-gray-500">
      <div
        class="flex items-center justify-between py-2"
        v-for="(schedule, index) in formFields.schedules"
        :key="index"
      >
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black"> {{ schedule.name }} </span>
          <span class="text-black"> {{ schedule.date }} </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="start-time text-xs text-gray"> Start time </span>
          <span class="text-black"> {{ schedule.start }} </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="end-time text-xs"> End time </span>
          <span class="text-black"> {{ schedule.end }} </span>
        </div>
        <div>
          <span
            ><i
              class="fas fa-times fa-2x cursor-pointer"
              @click="removeItem(formFields.schedules.indexOf(schedule))"
            ></i>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventDetailsFull, ISchedule } from '~/common/models/interfaces'

@Component
export default class SchedulesForm extends Vue {
  @Prop() eventDetails!: EventDetailsFull

  schedule: ISchedule = {
    name: '',
    date: '',
    start: '',
    end: '',
  }

  formFields: Partial<EventDetailsFull> = {
    schedules: [],
  }

  // mounted() {
  //   if (this.eventDetails) {
  //     const { schedules } = this.eventDetails
  //     this.formFields = { schedules }
  //     return
  //   }

  //   this.formFields = {
  //     schedules: [
  //       {
  //         name: 'Schedule name',
  //         date: '21/12/2021',
  //         start: '03:00 PM',
  //         end: '05:00 PM',
  //       },
  //       {
  //         name: 'Schedule name',
  //         date: '21/12/2021',
  //         start: '03:00 PM',
  //         end: '05:00 PM',
  //       },
  //       {
  //         name: 'Schedule name',
  //         date: '21/12/2021',
  //         start: '03:00 PM',
  //         end: '05:00 PM',
  //       },
  //     ],
  //   }
  // }

  addItem() {
    const { name, date, start, end } = this.schedule

    const hasEmptyValue = [name, date, start, end].filter((key) => !key?.length)

    // console.log(hasEmptyValue)

    if (hasEmptyValue.length) {
      message.warning('Please enter all fields')
      return
    }

    this.formFields.schedules?.push(this.schedule)

    // fix bug with clearing

    this.schedule = {
      name: '',
      date: '',
      start: '',
      end: '',
    }
    console.log(this.schedule)
  }

  removeItem(index: Number) {
    // console.log(index)
    const filtered = this.formFields.schedules?.filter(
      (schedule) => this.formFields.schedules?.indexOf(schedule) !== index
    )

    // console.log(filtered)
    this.formFields.schedules = filtered
  }

  addSchedule() {
    message.success('adding')
  }

  validate(): string {
    const { schedules } = this.formFields

    if (!schedules?.length) {
      return 'Add schedules'
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