<template>
  <div class="container">
    <section class="schedules">
      <h2 class="m-0">Schedules</h2>
      <p class="p-0 m-0">
        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
      </p>

      <div class="my-8">
        <p class="p-0 m-0">Improve discoverability of your event by adding tags relevant to the subject matter.</p>

        <div class="flex items-center gap-2 mt-2">
          <input-field label="Date" v-bind:value.sync="schedule.date"></input-field>
          <input-field label="Start time" v-bind:value.sync="schedule.start"></input-field>
          <input-field label="End time" v-bind:value.sync="schedule.end"></input-field>
          <primary-button label="Add" class="btn" @click="addSchedule"></primary-button>
        </div>
      </div>
    </section>

    <!-- <section class="wrapper divide-y divide-gray-500" v-for="(item, schedule) in formFields.schedules" :key="item">
      <div class="flex items-center justify-between py-2">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black">{{ schedule }} Schedule 1 </span>
          <span class="text-black"> 21/12/2021 </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="start-time text-xs text-gray"> Start time </span>
          <span class="text-black"> 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="end-time text-xs"> End time </span>
          <span class="text-black"> 05:00 PM </span>
        </div>
        <div>
          <span><i class="fas fa-times fa-2x"></i> </span>
        </div>
      </div>
    </section> -->

    <section class="wrapper divide-y divide-gray-500">
      <div class="flex items-center justify-between py-2">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black">Schedule 1 </span>
          <span class="text-black"> 21/12/2021 </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="start-time text-xs text-gray"> Start time </span>
          <span class="text-black"> 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="end-time text-xs"> End time </span>
          <span class="text-black"> 05:00 PM </span>
        </div>
        <div>
          <span><i class="fas fa-times fa-2x"></i> </span>
        </div>
      </div>
      <div class="flex items-center justify-between py-2">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black"> Schedule 1 </span>
          <span class="text-black"> 21/12/2021 </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="start-time text-xs text-gray"> Start time </span>
          <span class="text-black"> 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="end-time text-xs"> End time </span>
          <span class="text-black"> 05:00 PM </span>
        </div>
        <div>
          <span><i class="fas fa-times fa-2x"></i> </span>
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
  @Prop() details!: EventDetailsFull

  schedule: ISchedule = {
    date: '',
    start: '',
    end: '',
  }

  formFields: Partial<EventDetailsFull> = {
    schedules: [],
  }

  addSchedule() {
    message.success('adding')
  }

  validate(): string {
    const { schedules } = this.formFields

    if (!schedules?.length) {
      return 'Add schedules'
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