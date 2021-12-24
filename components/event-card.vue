<template>
  <div class="event">
    <div class="event-image">
      <img :src="imageUrl" alt="event" />

      <div class="event-pricing">
        <div class="pricing">
          <span class="icon">
            <fa icon="money-bill-wave" />
          </span>
          <p>Pricing</p>
        </div>

        <p class="amount">N10,000 - N30,000</p>
      </div>
    </div>

    <div class="event-details">
      <h4 class="name">Ada the country</h4>

      <div class="date">
        <span class="icon">
          <fa icon="calendar-check" />
        </span>
        <p>Friday Jan 2, 2022</p>
      </div>

      <div class="location">
        <span class="icon">
          <fa icon="map-marker-alt" />
        </span>
        <p>
          Ada the country ejdbhbg open fhbgh bfgh Ada the country ejdbhbg open fhbgh bfgh Ada ejdbhbg open fhbgh bfgh
          Ada
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FeaturedEvent extends Vue {
  @Prop({ type: String, required: true }) readonly imageUrl!: String
}
</script>

<style lang="scss" scoped>
.event {
  background-color: #fcfcfc;

  .event-image {
    width: 100%;
    height: 181px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .event-pricing {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: -10%;
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
    padding: 30px 18px;
    border-bottom: 0.2px solid #707070;
    border-right: 0.2px solid #707070;
    border-left: 0.2px solid #707070;

    .name {
      font-weight: bold;
      font-size: 18px;
      color: #0a0a0a;
      margin: 14px 0;
    }

    .icon {
      margin-right: 16px;
    }

    .date {
      display: flex;
      font-weight: 600;
      font-size: 14px;
      color: #15b743;
      margin: 14px 0;

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
