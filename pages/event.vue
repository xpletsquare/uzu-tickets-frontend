<template>
  <main class="eventsSection">
    <!-- Filter container and filter options translated in and out of page-->
    <div class="filter" :class="showfilter ? 'showfilter' : ''">
      <div class="filter__buttonContainer">
        <div class="filter-container">
          <span class="filter-container__text">filter</span>
          <span>
            <img src="../assets//icons/filter.svg" alt="filter icon" />
          </span>
        </div>
        <div class="filter__closeButton" @click="handleShowFilter">
          <img src="../assets/icons/button.svg" alt="close button icon" />
        </div>
      </div>
      <div class="filter__filterOptionsContainer">
        <select-date
          @start-date-updated="handleUpdateStartDate"
          @end-date-updated="handleUpdateEndDate"
          @date-tag-removed="handleRemoveDateTag"
        ></select-date>
        <select-price @update:price="updatePrice"></select-price>
        <filter-events v-model="category" :tags="category" :options="categoryOptions" label="category"></filter-events>
        <filter-events
          v-model="locations"
          :tags="locations"
          :options="locationOptions"
          label="location"
        ></filter-events>
      </div>
      <primary-button full="true" label="Apply Filter" @click="handleApplyFilter"></primary-button>
    </div>
    <!-- End of Filter container and filter options -->

    <div class="container">
      <!-- Search Bar and Filter Button/Icon to Show filter Container -->
      <div class="searchWrapper">
        <search v-model="searchText" placeholder="search event name or event owner" />
        <div role="button" class="filter-container" @click="handleShowFilter">
          <span class="filter-container__text">filter</span>
          <span>
            <img src="../assets//icons/filter.svg" alt="filter icon" />
          </span>
        </div>
      </div>
      <!-- End of Search Bar and Filter Button/Icon to Show filter Container -->

      <!-- Display filter query tags  just below the search bar-->
      <div v-show="showFilterTags" class="tagContainer">
        <p v-for="(tag, index) in filteredTags" :key="index" class="tagContainer__tag">
          <span class="tagContainer__span">{{ tag }}</span>
          <span class="tagContainer__spanButton"
            ><img src="../assets/icons/greenButton.svg" alt="" @click="removeTag(tag)"
          /></span>
        </p>
      </div>
      <!-- End of  Display filter query tags  just below the search bar-->

      <!-- Display loading when fetching Events from api -->
      <div v-if="loading" class="loader"><loader /></div>

      <!-- Display all events when there is no search query -->
      <div v-else-if="!searchText && events.length > 0 && !loading" class="events">
        <event-card2
          v-for="(event, index) in itemsToDisplay"
          :key="index"
          :image-url="event.image.landscape"
          :event-title="event.title"
          :start-date="event.startDate.toString()"
          :event-id="event.id"
          :event-venue="event.venue"
          :event-price="event.tickets[0].price"
        />
      </div>

      <!-- Display search results -->
      <div v-if="searchText && searchResults.length > 0 && !loading" class="events">
        <event-card2
          v-for="(event, index) in itemsToDisplay"
          :key="index"
          :image-url="event.image.landscape"
          :event-title="event.title"
          :start-date="event.startDate.toString()"
          :event-id="event.id"
          :event-venue="event.venue"
          :event-price="event.tickets[0].price"
        />
      </div>

      <!-- Display Message When There is no Search Result -->
      <div v-else-if="searchText && searchResults.length === 0 && !loading" class="no-events-message2">
        No event matched your search.
      </div>

      <!-- Display Message When There Are No Events -->
      <div v-else-if="events.length <= 0 && !loading" class="no-events-message">No Event Found.</div>

      <!-- Display Message When There Are No Filtered Result -->
      <!-- <div v-if="!filterNoMatch && !loading" class="no-events-message">
        No events match your filter criteria.
      </div> -->

      <!-- Pagination Buttons -->

      <div
        v-if="(searchText && searchResults.length > 0) || (!searchText && events.length > 0)"
        class="paginationContainer"
      >
        <a-pagination
          v-model="current"
          show-quick-jumper
          :total="searchResults.length"
          :page-size="12"
          @change="onChange"
        />
      </div>
      <!--End Of Pagination Buttons -->
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
import { EventsApi } from '~/common/api/events.api'
import { EventDetailsFull } from '~/common/models/interfaces'
import { formatTimestamp } from '~/common/utilities'

@Component({
  layout: 'public',
})
export default class Event extends Vue {
  formatTimestamp = formatTimestamp
  showError = false
  loading = false
  current: number = 1
  numberOfItem: number = 12
  showfilter = false
  showFilterTags = false
  filterNoMatch = false
  events: EventDetailsFull[] = []
  filteredEvents: EventDetailsFull[] = []

  // date range value
  startDate = ''
  endDate = ''

  // search string
  searchText = ''

  //  array for filter queries
  category: string[] = [] as Array<string>
  locations: string[] = [] as Array<string>
  price: string | number = ''
  locationOptions: string[] = [] as Array<string>
  categoryOptions: string[] = [] as Array<string>

  // opens filter page
  handleShowFilter() {
    this.showfilter = !this.showfilter
  }

  // Method to update price
  updatePrice(value: number) {
    this.price = value
  }

  // method to update startDate
  handleUpdateStartDate(value: string) {
    this.startDate = value
  }

  // method to update endDate
  handleUpdateEndDate(value: string) {
    this.endDate = value
  }

  // method to dynamically remove date tag when it is deleted in the selectDate component
  handleRemoveDateTag() {
    this.startDate = ''
    this.endDate = ''
  }

  // **********delete filter tag***********
  removeTag(tag: string) {
    // Check if the tag is in the category array
    const categoryIndex = this.category.indexOf(tag)

    // Check if the tag is in the locations array
    const locationIndex = this.locations.indexOf(tag)

    // Check if the tag is related to price
    const isPriceTag = tag === 'Free' || tag === 'Paid'

    //  check if there is a date tag

    if (categoryIndex !== -1) {
      // Remove the tag from the category array
      this.category = this.category.filter((item) => item !== tag)
      // Emit an event to notify the filter-events component that a tag was removed
      this.$emit('tag-removed', tag)
    } else if (locationIndex !== -1) {
      // Remove the tag from the locations array
      this.locations = this.locations.filter((item) => item !== tag)
      // Emit an event to notify the filter-events component that a tag was removed
      this.$emit('tag-removed', tag)
    } else if (isPriceTag) {
      // Reset the price to the empty string
      this.price = ''
      // Emit an event to notify the select-price component that the price tag was removed
      this.$emit('price-tag-removed')
    } else {
      this.startDate = ''
      this.endDate = ''
      // Emit an event to notify the select-date component that the date tag was removed
      this.$emit('date-tag-removed')
    }

    this.handleApplyFilter()
  }

  // add this here to test

  //  watch filteredTags array and hide the array when it is empty
  @Watch('filteredTags', { deep: true })
  handler(newTags: string[]) {
    // Update showFilterTags when the last filter tag is removed
    if (newTags.length <= 0) {
      this.handleApplyFilter()
      this.showFilterTags = false
    }
  }
  // **********end delete filter tag logic***********

  // ******logic to add items to tags array to be displayed below search input.******
  get filteredTags() {
    const tags = []

    // Add selected categories to tags array
    this.category.forEach((category) => {
      tags.push(`${category}`)
    })

    // Add selected locations to tags array
    this.locations.forEach((location) => {
      tags.push(`${location}`)
    })

    // Conditionally add price filter tag
    if (this.price === 0) {
      tags.push('Free')
    } else if (+this.price > 0) {
      tags.push('Paid')
    }

    // conditionally add date tag
    if (Boolean(this.startDate) && Boolean(this.endDate)) {
      tags.push(`${formatTimestamp(+this.startDate)} - ${formatTimestamp(+this.endDate)}`)
    }

    return tags
  }

  // ******end of logic add items to tags array to be displayed below search input.******

  // *******Api call to get all events displayed on events*******
  async getEvents() {
    this.loading = true
    const { error, data } = await EventsApi.listEvents()
    if (error) {
      this.loading = false
      message.error(error as string)
    }

    this.events = data?.data
    this.locationOptions = [...new Set(this.events.map((event) => event?.venue))]
    this.categoryOptions = [...new Set(this.events.map((event) => event?.category))]
    this.loading = false
  }

  mounted() {
    this.getEvents()
  }
  // ******* End of Api call logic to get all events displayed on events*******

  // ****** Get Displayed Events*********
  get totalEvents() {
    let results = [...this.events]
    if (this.filteredEvents.length > 0) {
      results = results.filter((event) => this.filteredEvents.includes(event))
    }
    this.current = 1
    return results
  }

  // *********the following codes below handles the search logic *******
  // Create a computed property to filter events based on the search input
  get searchResults(): EventDetailsFull[] {
    const searchTextLower = this.searchText.toLowerCase().trim()
    let results: EventDetailsFull[] = []

    if (searchTextLower) {
      // If there is a search query, filter events
      results = this.events.filter((event) => event.title.toLowerCase().includes(searchTextLower))
    } else {
      // If there is no search query, display all events
      results = this.events
    }

    // If filters are applied, filter further based on filteredEvents
    if (this.filteredEvents.length > 0) {
      results = results.filter((event) => this.filteredEvents.includes(event))
    }
    this.current = 1
    return results
  }
  // *******end of search logic ***********/

  // *********the following codes below handles the filter logic********/
  handleApplyFilter() {
    // Create a copy of the original events to preserve the full list
    let filteredEvents = [...this.events]

    // Apply filters based on criteria
    if (this.category.length > 0) {
      filteredEvents = filteredEvents.filter((event) => this.category.includes(event.category))
    }

    if (this.locations.length > 0) {
      filteredEvents = filteredEvents.filter((event) => this.locations.includes(event.venue))
    }

    // Apply filters based on date
    if (Boolean(this.startDate) && Boolean(this.endDate)) {
      // Parse startDate and endDate as Date objects
      const startDateObj = new Date(this.startDate)
      const endDateObj = new Date(this.endDate)

      // Filter events based on date range
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.startDate) >= startDateObj && new Date(event.startDate) <= endDateObj
      )
    }

    // Filter events based on price
    if (this.price === 0) {
      // Get tickets with price equal to 0
      filteredEvents = filteredEvents.filter((event) => {
        const ticketPrice = event.tickets.find((ticket) => Number(ticket.price) === 0)
        return ticketPrice
      })
    } else if (+this.price > 0) {
      // Get tickets with prices above 0
      filteredEvents = filteredEvents.filter((event) => {
        const ticketPrice = event.tickets.find((ticket) => Number(ticket.price) > 0)
        return ticketPrice
      })
    }

    // if none of the events meets the filter criteria return an empty array remember we populated this array at the beginning
    if (
      this.category.length <= 0 &&
      this.locations.length <= 0 &&
      typeof this.price !== 'number' &&
      !(Boolean(this.startDate) && Boolean(this.endDate))
    ) {
      filteredEvents = []
    }
    // if filteration occured, Update the filtered events list
    this.filteredEvents = filteredEvents

    // Update the current page to set pagination to first page and display the filtered events
    this.current = 1

    // hide filter
    this.showfilter = false
    // show filter tags below search input
    this.showFilterTags = true
    // flag to indicate whether to dispaly a message if no filteration occured
    if (filteredEvents.length === 0) {
      this.filteredTags.length > 1 && message.info('No event matched your filter criteria')
      this.filterNoMatch = true // Set the flag to true
    } else {
      this.filterNoMatch = false // Set the flag to false
    }
  }

  // ********end of filter logic*********/

  // *************===the following codes below handles the pagination logic ********/
  // compute number of items to display per page
  get itemsToDisplay() {
    const startIndex = (this.current - 1) * this.numberOfItem
    // const endIndex = startIndex + this.numberOfItem
    const endIndex = this.searchText
      ? Math.min(startIndex + this.numberOfItem, this.searchResults.length)
      : Math.min(startIndex + this.numberOfItem, this.totalEvents.length)

    return this.searchText
      ? this.searchResults.slice(startIndex, endIndex)
      : this.totalEvents.slice(startIndex, endIndex)
  }

  get totalItems(): number {
    return this.searchText ? this.searchResults.length : this.totalEvents.length
  }

  // Udates the current page
  onChange(current: number) {
    this.current = current
  }
  // ********=== end of pagination logic *********/
}
</script>

<style lang="scss" scoped>
.eventsSection {
  min-height: 80vh;
  padding-inline: 2rem;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    padding-inline: 1.5rem;
  }
}

.container {
  width: 100%;
  max-width: var(--max-width);
  height: 100%;
  margin: 0 auto;
  padding: 0;
}

.searchWrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
}

.filter-container {
  width: max-content;
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-block: auto;
  cursor: pointer;
  span {
    display: inline-blockk;
  }

  &__text {
    font-weight: var(--medium-fontWeight);
    text-transform: capitalize;
    font-size: 1rem;
    color: #bfbfbf;

    @media (max-width: 768px) {
      display: none;
    }
  }
}

.events {
  display: grid;

  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  row-gap: 3rem;
  margin-block: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    row-gap: 2rem;
  }

  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }
}

.paginationContainer {
  width: max-content;
  margin-inline: auto;
  margin-block: 3rem;
}
.filter {
  top: 0rem;
  right: 25px;
  position: absolute;
  width: 90%;
  max-width: 24rem;
  min-height: 25rem;
  z-index: 10;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 25px 35px 0px #0000001a;
  box-shadow: 0px 4px 54px 0px #00000012;
  box-shadow: 0px 30px 100px 0px #0000001a;
  padding: 1.5rem;
  transform: translateX(120%);

  @media (max-width: 768px) {
    right: 0;
  }

  &__buttonContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__closeButton {
    width: max-content;
    cursor: pointer;
  }

  &__filterOptionsContainer {
    margin-top: 3rem;
    width: 100%;
  }
}

.tagContainer {
  width: 100%;
  max-width: 40rem;
  height: max-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;

  &__tag {
    padding: 0.3rem 0.6rem;
    border-radius: 50px;
    border: 1px solid #3fd246;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.8rem;
    color: #3fd246;
    background: #3fd2461a;
    margin-block: auto;
  }

  &__span {
    display: inline-block;
  }

  &__spanButton {
    cursor: pointer;
  }
}

.showfilter {
  transform: translateX(0);
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.no-events-message {
  width: max-content;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: var(--medium-fontWeight);
  color: #bfbfbf;
  font-size: 1.1rem;
}

.no-events-message2 {
  margin-top: 1rem;
  font-weight: var(--medium-fontWeight);
  color: #bfbfbf;
  font-size: 1rem;
}
</style>
