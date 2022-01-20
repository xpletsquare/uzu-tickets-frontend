<template>
  <section class="max-600 mx-auto">
    <div class="content">
      <event-forms-basic :details="event" ref="basic" v-if="stage === 1"></event-forms-basic>
      <event-forms-schedules ref="schedule" v-if="stage === 2"></event-forms-schedules>
      <event-forms-tickets ref="tickets" v-if="stage === 3"></event-forms-tickets>
      <event-forms-details ref="details" v-if="stage === 4"></event-forms-details>
      <event-forms-summary ref="summary" v-if="stage === 5"></event-forms-summary>
    </div>
    
    <div class="flex justify-end">
      <button v-if="showNextButton" @click="next" class="border p-3 rounded">
        NEXT <i class="fas fa-chevron-right"></i>
      </button>
      <primary-button v-else @click="publish" label="PUBLISH"></primary-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ElementWithValidateFunction, EventDetailsFull } from '~/common/models/interfaces'

import { message } from 'ant-design-vue'

@Component
export default class EventDetails extends Vue {
  @Prop() details!: EventDetailsFull
  event: EventDetailsFull | null = null

  get stage() {
    const stage = (this.$route.query.stage as string) || '1'
    return parseInt(stage)
  }

  get showNextButton() {
    return this.stage < 5
  }

  get currentStageRef(): ElementWithValidateFunction & any {
    switch (this.stage) {
      case 1:
        return this.$refs.basic
      case 2:
        return this.$refs.schedule
      case 3:
        return this.$refs.tickets
      case 4:
        return this.$refs.details
      case 5:
        return this.$refs.summary
      default:
        return null
    }
  }

  mounted() {
    if (this.details) {
      this.event = { ...this.details }
      return
    }

    this.event = {
      id: '',
      title: '',
      images: {
        landscape: '',
        portrait: '',
      },
      description: '',
      category: '',
      location: '',
      schedules: [],
      tickets: [],
      tags: [],
      isPublished: false,
    }
  }

  next() {
    if (this.stage >= 5) {
      return
    }

    const ref: ElementWithValidateFunction = this.currentStageRef

    if (!ref) {
      return
    }

    const error = ref.validate()

    if (error) {
      message.error(error)
      return
    }

    const nextStage = this.stage + 1
    const stageAsString = nextStage + ''
    const query = { ...this.$route.query, stage: stageAsString }
    this.$router.replace({ query })
  }

  publish() {
    message.success('publishing')
  }
}
</script>

<style scoped>
button {
  border: 1px solid gray;
}

.content {
  min-height: 60vh;
  margin-bottom: 4rem;
}
</style>