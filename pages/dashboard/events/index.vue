<template>
  <div class="main">
    <div class="container">
      <div class="top_label">
        <div class="left">
          <h1>Events</h1>
          <p>
            Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
          </p>
        </div>
        <div class="right">
          <primary-button @click="openNewEventPage" class="desktop-button" label="create" />
        </div>
      </div>
      <dashboard-total-event-sales></dashboard-total-event-sales>
      <!-- <div v-for="(event, index) in events" :key="index">
        <dashboard-events-card :event="event"></dashboard-events-card>
      </div> -->
      <dashboard-events-card></dashboard-events-card>
      <dashboard-events-card></dashboard-events-card>
      <dashboard-events-card></dashboard-events-card>
      <dashboard-events-card></dashboard-events-card>
      <dashboard-events-card></dashboard-events-card>
    </div>

    <div class="round-btn">+</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppState } from '~/common/storeHelpers'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component({
  layout: 'dashboard',
})
export default class ProfilePage extends Vue {
  events: EventDetailsFull[] = []

  openNewEventPage() {
    this.$router.push('/dashboard/events/create')
  }

  get currentEvents() {
    const { currentUser } = this.$store.state as AppState
    return currentUser?.events
  }

  mounted() {
    if (this.currentEvents) {
      this.events = [...this.currentEvents]
      return
    }

    // this.events = [
    //   {
    //     id: '1',
    //     title: 'Codova hive',
    //     images: {
    //       landscape: 'Codova-hive.jpeg',
    //       portrait: 'Codova-hive.jpeg',
    //     },
    //     description: 'Codova hive',
    //     category: 'fashion',
    //     location: 'Muson center, Lagos',
    //     schedules: [],
    //     tickets: [],
    //     tags: [],
    //     isPublished: true,
    //     sales: [],
    //     promoters: [],
    //   },
    // ]
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  // height: 100%;

  display: flex;
  margin: 1.5rem auto;

  @media screen and (max-width: 900px) {
    margin: 2rem auto;
  }
}

.container {
  width: 100%;
  // height: 100%;
  /* border: 1px solid red; */

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
  }

  .top_label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    /* border: 1px solid red; */
    min-width: 100% !important;

    .right {
      display: flex;
      @media screen and (max-width: 900px) {
        display: none;
      }
    }
  }
}

h1 {
  font-size: 20pt;
  font-weight: 600;
  margin: 0;
}

.round-btn {
  width: 50px;
  height: 50px;
  background-color: var(--light-green);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  bottom: 50px;
  right: 50px;
  z-index: 200;
  cursor: pointer;
  color: white;
  font-size: 20pt;
  margin: 0;
  box-shadow: 10px 10px 10px (var(--light-green), 0.5);

  @media screen and (min-width: 900px) {
    display: none;
  }
}
</style>