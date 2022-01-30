<script lang="ts" setup>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { formatCurrency, formatDate } from '~/common/utilities/index'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component
export default class DashboardEventCard extends Vue {
  @Prop() event!: EventDetailsFull

  formatCurrency = formatCurrency

  openEvent() {
    this.$router.push(`/dashboard/events/details/${this.event.id}`) // event details id is supposed to be attached
  }

  get eventTicketSoldCount(){
    return '500/2000'
  }

  get eventStartDate(){
    return formatDate(this.event.startDate);
  }
}
</script>

<template>
  <div class="card" @click="openEvent">
    <div class="desktop">
      <div class="event-name capitalize">{{event.title}}</div>
      <div class="event-location capitalize">{{event.venue}}</div>
      <div class="event-ticket-sold">{{eventTicketSoldCount}}</div>
      <div class="event-date">{{eventStartDate}}</div>
      <div class="event-sale">{{ event.status || 'DRAFT' }}</div>
    </div>

    <div class="mobile">
      <div class="left">
        <div class="event-name capitalize">{{event.title}}</div>
        <div class="event-location capitalize">{{event.venue}}</div>
        <div class="event-date">{{eventStartDate}}</div>
      </div>
      <div class="right">
        <div class="event-sale">{{ event.status || 'DRAFT' }}</div>
        <div class="event-ticket-sold">{{eventTicketSoldCount}}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
}

.card {
  width: 100%;

  .desktop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid red; */
    width: 100%;
    min-height: 50px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.05);
    margin: 0px 0;
    cursor: pointer;

    @media screen and (max-width: 900px) {
      display: none;
    }
    &:hover {
      transform: translateX(10px);
    }

    .event-name {
      color: var(--light-green);
      font-weight: 600;
    }

    .event-sale {
      font-weight: 600;
    }
  }

  .mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 0.5px solid var(--ash);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;

    @media screen and (min-width: 900px) {
      display: none;
    }

    &:hover {
      box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.05);
    }

    .left {
      .event-name {
        font-weight: 800;
        color: var(--light-green);
      }
    }

    .right {
      text-align: right;
      .event-sale {
        font-size: 15px;
        font-weight: 800;
      }
    }
  }
}
</style>
