<template>
  <div>
    <dashboard-event-details></dashboard-event-details>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'dashboard',
})
export default class NewEventPage extends Vue {}
</script>

<style scoped>
</style>