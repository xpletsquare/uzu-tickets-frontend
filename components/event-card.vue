<template>
  <div class="event cursor-pointer" @click="openEventPage">
    <div class="event-image">
      <img :src="imageUrl" alt="event" />

      <div class="event-pricing">
        <div class="pricing">
          <!-- <span class="icon">
            <fa icon="money-bill-wave" />
          </span> -->
          <p>Price</p>
        </div>
        <p class="amount">{{ Number(eventPrice) > 0 ? formatCurrency(String(eventPrice)) : 'FREE' }}</p>
      </div>
    </div>

    <div class="event-details">
      <h4 class="name">{{ eventTitle }}</h4>

      <div class="date">
        <span class="icon">
          <fa icon="calendar-check" />
        </span>

        <p>{{ formattedStartDate }}</p>
      </div>

      <div class="location">
        <span class="icon">
          <fa icon="map-marker-alt" />
        </span>
        <p>{{ eventVenue }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { formatTimestamp, formatCurrency } from '~/common/utilities'

@Component
export default class FeaturedEvent extends Vue {
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
.event:hover {
  transform: translateY(-8px);
}
.event {
  background-color: #fcfcfc;

  .event-image {
    width: 100%;
    height: 181px;
    position: relative;
    // overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .event-pricing {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 5%;
    left: 8%;
    padding: 6px 10px;
    background-color: #ffffff;
    box-shadow: 0px 3px 20px #0000001a;
    border-radius: 5px;
    width: 85%;
    gap: 5px;

    .pricing {
      font-weight: normal;
      font-size: 12px;
      color: #6f6f6f;
      display: flex;
      gap: 5px;

      .icon {
        // transform: matrix(0.97, -0.24, 0.24, 0.97, 0, 0);
        color: #15b743;
        width: 18px;
        height: 20px;
        background-color: #e8ffef;
        border: 0.30000001192092896px solid #15b743;
        border-radius: 50%;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .amount {
      font-weight: bold;
      font-size: 12px;
      color: #15b743;
    }
  }

  .event-details {
    padding: 0px 18px;
    border: 0.5px solid rgb(230, 230, 230);
    border-radius: 0px;
    overflow: hidden;

    .name {
      font-weight: bold;
      font-size: 18px;
      color: #0a0a0a;
      margin: 5px 0;
    }

    .icon {
      margin-right: 16px;
    }

    .date {
      display: flex;
      font-weight: 600;
      font-size: 14px;
      color: #15b743;
      margin: 0px 0;

      .icon {
        color: #979797;
      }
    }

    .location {
      font-weight: 500;
      font-size: 12px;
      color: #979797;
      display: flex;

      .icon {
        width: 10px;
        height: 14px;
      }
    }
  }
}
</style>
