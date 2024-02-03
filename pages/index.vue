<template>
  <main>
    <!-- <hero /> -->
    <new-hero />

    <div class="container">
      <!-- featured events -->
      <!-- <section class="featured-events">
        <featured-event :imageUrl="require('~/assets/images/anete-lusina.png')" />
        <featured-event :imageUrl="require('~/assets/images/davido.png')" />
        <featured-event :imageUrl="require('~/assets/images/Tems.png')" />
        <div class="arrow">
          <fa icon="chevron-right" />
        </div>
      </section> -->

      <!--  disclaimer -->
      <!-- <section class="disclaimer">
        <disclaimer />
        <div class="icon">
          <fa icon="exclamation" />
        </div>
      </section> -->

      <!-- events -->
      <section class="events-container">
        <!-- <button class="filled">All events</button>
        <button class="">Events near you</button> -->

        <!-- 
          <h1>{{ person }}</h1>
          <ul>
          <li v-for="(event, index) in events" v-bind:key="index">
            {{ event }}
          </li>
        </ul> -->

        <div v-if="loading" class="loader"><loader></loader></div>

        <div v-if="events.length > 0 && !loading" class="events">
          <event-card2
            v-for="(event, index) in events.slice(0, 16)"
            :key="index"
            :image-url="event.image.landscape"
            :event-title="event.title"
            :start-date="event.startDate.toString()"
            :event-id="event.id"
            :event-venue="event.venue"
            :event-price="event.tickets[0].price"
          />

          <!-- <event-card
            v-for="(event, index) in events"
            :key="index"
            :image-url="event.image.landscape"
            event.
            :event-title="event.title"
            :start-date="event.startDate.toString()"
            :event-id="event.id"
            :event-venue="event.venue"
            :event-price="event.tickets[0].price"
          /> -->
        </div>
      </section>

      <!-- <div class="view-all">
        <primary-button :disabled="true" label="VIEW ALL" link_to="/events"></primary-button>
      </div> -->
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { message } from 'ant-design-vue'
import { EventsApi } from '~/common/api/events.api'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component({
  layout: 'public',
})
export default class IndexPage extends Vue {
  loading = true
  events: EventDetailsFull[] = []
  async getEvents() {
    this.loading = true
    const { error, data } = await EventsApi.listEvents()

    if (error) {
      message.error(error as string)
      this.loading = false
    }
    this.events = data?.data
    this.loading = false
  }

  mounted() {
    this.getEvents()
  }
}
</script>

<style lang="scss" scoped>
main {
  max-width: 100vw;
  margin-bottom: 100px;

  @media (max-width: 568px) {
    margin-bottom: 50px;
  }

  .container {
    width: 80%;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 1024px) {
      width: 90%;
    }
  }

  .featured-events {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @media (max-width: 568px) {
      // overflow-x: scroll;
      width: 100%;
      gap: 0.5rem;
    }

    .arrow {
      position: absolute;
      width: 29px;
      height: 29px;
      background-color: #31d760;
      top: 40%;
      right: -1.5%;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;

      @media (max-width: 568px) {
        top: 30%;
        right: -3%;
        width: 20px;
        height: 20px;
        font-size: 12px;
      }
    }
  }

  .disclaimer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0;

    @media (max-width: 768px) {
      margin: 30px 0;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid #ff4e00;
      color: #ff4e00;
      font-size: 14px;
    }
  }

  .events-container {
    position: relative;
    @media (max-width: 568px) {
      margin-bottom: 30px;
    }

    button {
      padding: 11px 23px;
      font-size: 15px;
      font-weight: 600;
      color: #6f6f6f;

      &.filled {
        background-color: #e8ffef;
        border: 1px solid #31d760;
        border-radius: 20px;
        color: #31d760;
        margin-right: 10px;
      }
    }

    .events {
      margin: 0px 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 20px;
      row-gap: 25px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 568px) {
        grid-template-columns: 1fr;
      }
    }
  }

  .view-all {
    // background-color: #31d760;
    // border-radius: 5px;
    // padding: 14px 36px;
    // color: #ffffff;
    // font-size: 15px;
    // font-weight: 600;
    // // width: 138px;
    margin: 0 auto;
  }

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
