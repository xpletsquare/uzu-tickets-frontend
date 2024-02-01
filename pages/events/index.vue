<template>
  <div class="events-page">
    <events-sidebar />

    <main>
      <div class="search-wrapper">
        <search placeholder="search event name or event owner" />
      </div>

      <div class="events">
        <event-card
          v-for="(_, index) in itemsToDisplay"
          :key="index"
          :image-url="require('~/assets/images/women-seated.png')"
        />
      </div>
      <div v-if="totalPages > 1" class="pagination-button-container">
        <button v-if="current > 1 && totalPages > 2" class="pagination-button" @click="goToFirstPage">First</button>
        <button v-if="current > 1" class="pagination-button" @click="decrementPage">Prev</button>
        <button
          v-for="pageNumber in visiblePageNumbers"
          :key="pageNumber"
          class="pagination-button"
          :class="pageNumber === current ? `${'active'}` : ''"
          @click="goToPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
        <button v-if="totalPages > 1 && current !== totalPages" class="pagination-button" @click="incrementPage">
          Next
        </button>
        <button v-if="totalPages > 2 && current !== totalPages" class="pagination-button" @click="goToLastPage">
          Last
        </button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'public',
})
export default class EventsPage extends Vue {
  eventArray = Array(200)
  current: number = 1
  numberOfItem: number = 12
  // compute number of items to display per page
  get itemsToDisplay() {
    return [...this.eventArray].slice((this.current - 1) * this.numberOfItem, this.current * this.numberOfItem)
  }

  // Compute the total number of pagination pages
  get totalPages(): number {
    return Math.ceil(this.eventArray.length / this.numberOfItem)
  }

  // Compute the visible page numbers based on current page and total pages
  get visiblePageNumbers(): number[] {
    const visiblePages = 5 // You can adjust this number as needed
    const start = Math.max(1, this.current - Math.floor(visiblePages / 2))
    const end = Math.min(this.totalPages, start + visiblePages - 1)
    const pageNumbers = []
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  // Go to a specific page
  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.current = pageNumber
    }
  }

  // Go to the first page
  goToFirstPage() {
    this.current = 1
  }

  // Go to the last page
  goToLastPage() {
    this.current = this.totalPages
  }

  // Decrement the current page
  decrementPage() {
    if (this.current > 1) {
      this.current--
    }
  }

  // Increment the current page
  incrementPage() {
    if (this.current < this.totalPages) {
      this.current++
    }
  }
}
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
  .pagination-button-container {
    margin-inline: auto;
    width: 100%;
    max-width: 700px;
    backface-visibility: red;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: wrap;
    /* row-gap: 0.5rem; */
    /* column-gap: 0.5rem; */
    gap: 14.38px;
    transition: all 0.35s ease;
  }

  .pagination-button {
    height: 46px;
    width: 46px;
    border-radius: 50%;
    background: none;
    border: 0.5px solid #f1f1f1;
    outline: none;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    color: #ffffff;
    background: var(--main-green);
    border: none;
  }
}
</style>
