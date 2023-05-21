<template>
  <main>
    <hero />

    <div class="container">
      <!-- featured events -->
      <section class="featured-events">
        <featured-event :imageUrl="require('~/assets/images/anete-lusina.png')" />
        <featured-event :imageUrl="require('~/assets/images/davido.png')" />
        <featured-event :imageUrl="require('~/assets/images/Tems.png')" />
        <div class="arrow">
          <fa icon="chevron-right" />
        </div>
      </section>

      <!--  disclaimer -->
      <!-- <section class="disclaimer">
        <disclaimer />
        <div class="icon">
          <fa icon="exclamation" />
        </div>
      </section> -->

      <!-- events -->
      <section class="events-container">
        <button class="filled">Events near you</button>
        <button>All events</button>

<!-- 
          <h1>{{ person }}</h1>
          <ul>
          <li v-for="(event, index) in events" v-bind:key="index">
            {{ event }}
          </li>
        </ul> -->

        <div class="events">

          <event-card
            v-for="(event, index) in events"
            :key="index"
            :imageUrl="require('~/assets/images/cottonbro.png')"
            event.
            :eventTitle="event.title"
            :startDate="event.startDate.toString()"
            :eventId="event.id"
          />

          <!-- <event-card :imageUrl="require('~/assets/images/women-seated.png')" />
          <event-card :imageUrl="require('~/assets/images/cottonbro.png')" />
          <event-card :imageUrl="require('~/assets/images/anete-lusina.png')" />
          <event-card :imageUrl="require('~/assets/images/women-seated.png')" />

          <event-card :imageUrl="require('~/assets/images/women-seated.png')" />
          <event-card :imageUrl="require('~/assets/images/cottonbro.png')" />
          <event-card :imageUrl="require('~/assets/images/anete-lusina.png')" />
          <event-card :imageUrl="require('~/assets/images/women-seated.png')" />

          <event-card :imageUrl="require('~/assets/images/women-seated.png')" />
          <event-card :imageUrl="require('~/assets/images/cottonbro.png')" />
          <event-card :imageUrl="require('~/assets/images/anete-lusina.png')" />
          <event-card :imageUrl="require('~/assets/images/women-seated.png')" /> -->

        </div>
      </section>

      <div class="view-all">
        <primary-button label="VIEW ALL" link_to="/events"></primary-button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { Component, Vue } from 'vue-property-decorator'

import { message } from 'ant-design-vue'
import { EventsApi } from '~/common/api/events.api'
import { EventDetailsFull } from '~/common/models/interfaces'


@Component({
  layout: 'public',
  
})
export default class IndexPage extends Vue {

  events: EventDetailsFull[] = []
  async getEvents() {
    const { error, data } = await EventsApi.listEvents()

    if (error) {
      message.error(error as string)
    }

    this.events = data?.data
    // console.log(this.events)
  }

  mounted() {
    this.getEvents()
  }

}
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100vw;
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
    margin-bottom: 50px;
    margin-top: 50px;

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
      margin: 42px 0;
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
}
</style>
