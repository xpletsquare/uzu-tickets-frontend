<template>
  <div>
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
  event: EventDetailsFull | {} = {}

  get currentEvent() {
    const { currentUser } = this.$store.state as AppState

    // const events = currentUser?.events
    // filter through user events based on event id in the url and return event

    return currentUser?.events
  }
}
</script>

<style scoped>
</style>