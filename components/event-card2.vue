<template>
  <div class="eventCard" @click="openEventPage">
    <div class="eventCard__eventImage">
      <img :src="imageUrl" alt="event image" class="eventCard__image" />
    </div>
    <div class="eventCard__price">
      <p>{{ Number(eventPrice) > 0 ? formatCurrency(String(eventPrice)) : 'FREE' }}</p>
    </div>
    <div class="eventCard__eventDetails">
      <h4 class="eventCard__title">{{ eventTitle }}</h4>
      <p class="eventCard__info">
        <span><img src="../assets/icons/calender.svg" alt="calender Icon" /></span> {{ formattedStartDate
        }}<span></span>
      </p>
      <p class="eventCard__info">
        <span><img src="../assets/icons/location.svg" alt="calender Icon" /></span>
        <span>{{ eventVenue }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { formatTimestamp, formatCurrency } from '~/common/utilities'

@Component
export default class EventCard2 extends Vue {
  [x: string]: any
  @Prop({ type: String, required: true }) readonly imageUrl!: string
  @Prop({ type: String, required: true }) readonly eventTitle!: string
  @Prop({ type: String, required: true }) readonly startDate!: string
  @Prop({ type: String, required: true }) readonly eventId!: string
  @Prop({ type: String, required: true }) readonly eventVenue!: string
  @Prop({ type: [String, Number], required: true }) readonly eventPrice!: string | number
  formatCurrency = formatCurrency

  get formattedStartDate() {
    return formatTimestamp(+this.startDate) // Call the formatDate function with startDate
  }

  openEventPage() {
    this.$router.push(`/events/${this.eventId}`)
  }
}
</script>

<style lang="scss" scoped>
.eventCard {
  width: 100%;
  height: 23.4rem;
  position: relative;
  border-radius: 12px;
  border: 1px solid #cbcbcb;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
  }

  &__eventDetails,
  &__eventImage,
  &__price {
    padding-inline: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__eventDetails {
    flex-direction: column;
    padding-bottom: 1rem;
    align-items: flex-start;
  }

  &__eventDetails,
  &__eventImage {
    width: 100%;
    height: 50%;
  }

  &__eventImage {
    overflow: hidden;
    padding: 0;
  }

  &__image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__price {
    height: 3.875rem;
    width: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: var(--dark-green2);
    color: var(--main-green);
    font-weight: var(--medium-fontWeight);

    p {
      margin-block: auto;
    }
  }

  &__title {
    font-size: 1rem;
    max-width: 16.4;
    margin-top: 3rem;
    margin-bottom: 1rem;
    line-height: 1.5rem;
    color: #545f71;
    font-weight: var(--medium-fontWeight);
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: var(--medium-fontWeight);
    color: #868686;
    span {
      display: inline-block;
    }
  }
}
</style>
