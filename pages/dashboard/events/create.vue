<template>
  <div>
    New Event - {{currentMode}}
    <event-details></event-details>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    layout: 'dashboard'
  })
  export default class NewEventPage extends Vue {
    get currentMode(){
      return this.$route.query.eventState || 'Initial'
    }
  }
</script>

<style scoped>

</style>