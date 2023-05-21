<template>
  <div class="events-page">
    <events-sidebar />
    
    <main>
      <div class="search-wrapper">
        <search placeholder="Search events"/>
      </div>

      <div class="events">
        <event-card :imageUrl="require('~/assets/images/women-seated.png')" />
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
        <event-card :imageUrl="require('~/assets/images/women-seated.png')" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'public',
})
export default class EventsPage extends Vue {}
</script>

<style lang="scss" scoped>
.events-page {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

main {
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  gap: 1rem;
  width: 90%;

  .search-wrapper {
    width: 50%;

    @media (max-width: 768px) {
      width: 60%;
    }
   
   @media (max-width: 568px) {
      width: 100%;
    }
  }

  .events {
    margin: 22px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 42px;

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
</style>