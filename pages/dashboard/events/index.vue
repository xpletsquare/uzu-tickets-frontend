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

      <div v-for="event in currentEvents" :key="event.id">
        <dashboard-events-card :event="event"></dashboard-events-card>
      </div>

      <div class="py-20" v-if="!currentEvents.length">
        <a-empty description="You have no Events" />
      </div>

    </div>

    <div class="round-btn">+</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppState, StoreMutations } from '~/common/storeHelpers'
import { EventDetailsFull } from '~/common/models/interfaces'
import { EventsApi } from '~/common/api/events.api'
import { message } from 'ant-design-vue'

@Component({
  layout: 'dashboard',
})
export default class DashboardEventList extends Vue {
  events: EventDetailsFull[] = []

  openNewEventPage() {
    this.$router.push('/dashboard/events/create')
  }

  get currentEvents() {
    const { events } = this.$store.state as AppState
    return events;
  }

  async loadEventsFromServer(){
    const { currentUser } = this.$store.state as AppState;

    if(!currentUser){
      return;
    }

    const { data, error, status} = await EventsApi.getUserEvents(currentUser?.id);

    console.log({ data });

    if(status === 404){
      this.events = [];
      return;
    }

    if(error){
      message.error(error as string);
      return;
    }

    this.$store.commit(StoreMutations.setEvents, [...data.data]);
  }

  mounted() {
    this.$store.commit(StoreMutations.setEditMode, false);
    this.events = this.currentEvents; // Initial State;
    this.loadEventsFromServer();
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  // height: 100%;
  /* border: 1px solid red; */
  display: flex;
  margin: 1.5rem auto;

  @media screen and (max-width: 900px) {
    margin: 2rem auto;
  }
}

.container {
  width: 60%;
  // height: 100%;
  /* border: 1px solid red; */

  @media screen and (max-width: 900px) {
    width: 100%;
  }

  @media screen and (max-width: 1200px) {
    width: 90%;
  }

  .top_label {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

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