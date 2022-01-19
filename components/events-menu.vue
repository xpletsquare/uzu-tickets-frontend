<template>
  <div>
    <button class="w-full text-left" @click="goBack">
      <i class="fas fa-chevron-left pr-2"></i>
      <span>Back</span>
    </button>

    <div class="space-y-4 mt-10">
      <div class="event-link" :class="shouldShowAsPassed(1)" @click="setEventsMode('basic', 1)">
        <i class="fas fa-check-circle pr-2"></i> Basic Information
      </div>
      <div class="event-link" :class="shouldShowAsPassed(2)" @click="setEventsMode('schedule', 2)">
        <i class="fas fa-check-circle pr-2"></i>Schedules
      </div>
      <div class="event-link" :class="shouldShowAsPassed(3)" @click="setEventsMode('tickets', 3)">
        <i class="fas fa-check-circle pr-2"></i>Tickets
      </div>
      <div class="event-link" :class="shouldShowAsPassed(4)" @click="setEventsMode('details', 4)">
        <i class="fas fa-check-circle pr-2"></i>Details
      </div>
      <div class="event-link" :class="shouldShowAsPassed(5)" @click="setEventsMode('publish', 5)">
        <i class="fas fa-check-circle pr-2"></i>Publish
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class EventsMenu extends Vue {
    get currentStage(){
      const stage = this.$route.query.stage as string || '1';
      return parseInt(stage);
    }

    shouldShowAsPassed(target: number){
      return this.currentStage >= target ? 'passed' : ''
    }

    setEventsMode(eventState: string, stage = 1) {
      const stageAsString = stage + '';
      const query = { ...this.$route.query, eventState, stage: stageAsString }
      this.$router.replace({ query })
    }

    goBack() {
      this.$router.back()
    }
  }
</script>

<style lang="scss" scoped>
.event-link {
  padding: 0.6em 1.5em;
  font-size: 12pt;
  color: #0000007a;
  background: rgba(255, 255, 255, 0.277);
  border-radius: 5px;
  margin-bottom: 12px;

  &:hover,
  &.active,
  &.passed {
    background-color: rgba(255, 255, 255, 0.7);
    color: var(--light-green);
    font-weight: 500;
  }

}
</style>