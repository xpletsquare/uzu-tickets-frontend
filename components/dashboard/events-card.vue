<script lang="ts" setup>
import { Vue, Component } from 'vue-property-decorator'
import { formatCurrency } from '~/common/utilities/index'

@Component
export default class DashboardEventCard extends Vue {
  formatCurrency = formatCurrency

  openEvent() {
    this.$router.push('/dashboard/events/details')
    // this.$router.push('/dashboard/events/create')
  }
}
</script>

<template>
  <main @click="openEvent">
    <div class="container">
      <div class="desktop">
        <div class="event-name">Codova hive</div>
        <div class="event-location">Muson center, Lagos</div>
        <div class="event-ticket-sold">120/400</div>
        <div class="event-date">01/02/2022</div>
        <div class="event-sale">{{ formatCurrency('122450.50') }}</div>
      </div>

      <div class="mobile">
        <div class="left">
          <div class="event-name">Codova hive</div>
          <div class="event-location">Muson center, Lagos</div>
          <div class="event-date">01/02/2022</div>
        </div>
        <div class="right">
          <div class="event-sale">{{ formatCurrency('122450.50') }}</div>
          <div class="event-ticket-sold">120/400</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
}

.container {
  width: 100%;

  .desktop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid red; */
    width: 100%;
    min-height: 50px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.05);
    margin: 0px 0;
    cursor: pointer;

    @media screen and (max-width: 900px) {
      display: none;
    }
    &:hover {
      transform: translateX(10px);
    }

    .event-name {
      color: var(--light-green);
      font-weight: 600;
    }

    .event-sale {
      font-weight: 600;
    }
  }

  .mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 0.5px solid var(--ash);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;

    @media screen and (min-width: 900px) {
      display: none;
    }

    &:hover {
      box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.05);
    }

    .left {
      .event-name {
        font-weight: 800;
        color: var(--light-green);
      }
    }

    .right {
      text-align: right;
      .event-sale {
        font-size: 15px;
        font-weight: 800;
      }
    }
  }
}
</style>
