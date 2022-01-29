<template>
  <div>
    <h2>Summary</h2>
    <p class="capitalize">
      Name : <strong>{{ eventDetails.title }}</strong>
    </p>
    <p class="capitalize">
      Category : <strong>{{ eventDetails.category }}</strong>
    </p>
    <!-- show tags in tags area -->
    <p v-if="tags.length">Tags : {{ tags }}</p>
    <!-- <p>Tags : {{ tags.join(', ') }}</p> -->

    <div class="flex gap-4 mt-10">
      <div class="landscape">
        <p>Landscape photo</p>

        <div class="box rounded">
          <img src="~/assets/images/Tems.png" />
        </div>
        <div class="preview">
          <p>Tems.png</p>
        </div>
      </div>

      <div class="portrait">
        <p>Portrait photo</p>

        <div class="box rounded">
          <img src="~/assets/images/dancer.jpg" />
        </div>
        <div class="preview">
          <p>dancer.jpg</p>
        </div>
      </div>
    </div>

    <div class="description mt-5">
      <h3>Descripion</h3>
      <p>{{ eventDetails.description }}</p>
    </div>

    <!-- loop through schedules and show each schedule with tickets associated with the schedule-->
    <div class="schedule-wrapper mt-5">
      <div class="border p-2 flex items-center justify-between py-2" v-for="(schedule, index) in schedules" :key="index">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black capitalize"> {{ schedule.name }} </span>
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
      </div>


      <!-- tickets within a particular schedule-->
      <div class="schedule-list pl-4">
        <div class="flex items-center justify-between py-3" v-for="(ticket, index) in tickets" :key="index">
          <div class="flex flex-col">
            <span class="mb-1 font-bold text-black"
              >{{ capitalize(ticket.schedule.name) }} • {{ capitalize(ticket.title) }}
            </span>
            <span class="text-black">
              {{ ticket.schedule.date }} • {{ ticket.schedule.start }} • {{ ticket.schedule.end }}
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="price text-xs"> Price</span>
            <span class="text-black font-bold"> {{ formatCurrency(ticket.price) }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventDetailsFull, ISchedule, ITicket } from '~/common/models/interfaces'
import { formatCurrency, capitalize } from '~/common/utilities/index'

@Component
export default class Summary extends Vue {
  @Prop() eventDetails!: EventDetailsFull;

  formatCurrency = formatCurrency
  capitalize = capitalize

  schedules: ISchedule[] = this.eventDetails.schedules // schedules available
  tickets: ITicket[] = this.eventDetails.tickets // tickets available

  tags = this.eventDetails.tags //

  // scheduleTickets = this.tickets.filter((ticket) => ticket.schedule.name === schedule.name)

  scheduleData = []
}
</script>

<style lang="scss" scoped>
.box {
  height: 180pt;
  margin: 1rem 0;
  border: 0.5pt solid #707070;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

h2 {
  font-size: 24pt;
}

.landscape {
  width: 70%;
}

.portrait {
  width: 30%;
}

.schedule-list {
  border-left: 5pt solid #15b743;
  margin: 1rem 0;
}
</style>