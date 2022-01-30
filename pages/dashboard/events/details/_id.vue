<template>
  <div v-if="event">
    <dashboard-event-details :eventDetails="event"></dashboard-event-details>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppState } from '~/common/storeHelpers'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component({
  layout: 'dashboard',
})
export default class EventDetails extends Vue {
  event: EventDetailsFull | null = null;

  mounted() {
    const { id } = this.$route.params;
    const { events } = this.$store.state as AppState;

    if(!events.length){
      this.$router.push('/dashboard/events');
      return;
    }

    const details = events.find(event => event.id === id);

    if(!details){
      this.$router.push('/dashboard/events');
      return;
    }

    this.event = details;
  }
}
</script>

<style scoped>
</style>