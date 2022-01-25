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
          <a-date-picker placeholder="Date" :format="dateFormat" :value="date" size="large" @change="onDateChange" />
          <a-time-picker
            :value="start"
            format="hh:mm a"
            placeholder="Start time"
            @change="onStartChange"
            size="large"
            use12-hours
          />
          <a-time-picker
            :value="end"
            format="hh:mm a"
            placeholder="End time"
            @change="onEndChange"
            size="large"
            use12-hours
          />
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
              class="fas fa-times fa-2x cursor-pointer hover:text-red-500"
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

import moment from 'moment'

@Component({
  components: {},
})
export default class SchedulesForm extends Vue {
  @Prop() eventDetails!: EventDetailsFull

  moment = moment
  dateFormat = 'DD/MM/YYYY'
  date = null
  start = null
  end = null

  schedule: ISchedule = {
    name: '',
    date: '',
    start: '',
    end: '',
  }

  formFields: Partial<EventDetailsFull> = {
    schedules: [],
  }

  onDateChange(date: any) {
    this.date = date
    const formattedDate = moment(date).format(this.dateFormat)
    this.schedule.date = formattedDate
  }

  onStartChange(time: any) {
    this.start = time
    const startTime = moment(time).format('hh:mm a')
    this.schedule.start = startTime
  }

  onEndChange(time: any) {
    this.end = time
    const endTime = moment(time).format('hh:mm a')
    this.schedule.end = endTime
  }

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
    message.success('adding schedule')
  }

  validate(): string {
    const { schedules } = this.formFields

    if (!schedules?.length) {
      return 'Add a schedule'
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