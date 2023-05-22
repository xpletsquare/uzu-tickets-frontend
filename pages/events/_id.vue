hero
<template>
  <main v-if="loading">
    <div class="loader-container"><loader /></div>
  </main>
  <main v-else-if="singleEvent" class="p-4 md:p-0">
    <section class="hero relative">
      <img :src="singleEvent.image.landscape" alt="event barner" class="hero-image" />

      <!-- <div class="overlay flex items-end pb-20">
        <div class="inline-flex lg:w-3/4 mx-auto justify-between items-start">
          <div class="text-white w-1/5">
            <div class="text-4xl mb-2"><i class="fas fa-map-marker"></i></div>

            <div class="font-semibold text-lg">{{ singleEvent.venue }}</div>
            <div>{{ formattedStartDate }}</div>

          </div>

           <div class="w-1/3 text-center pt-8">
            <button class="p-3 bg-green-400 text-gray-50 rounded">Buy Tickets</button>
            <primary-button label="Buy Tickets"></primary-button>
          </div>

          <div class="text-white w-1/5 pl-20">
            <div class="text-4xl mb-2"><i class="far fa-calendar"></i></div>
            <div class="font-semibold text-base">{{month}}</div>
            <div class="font-semibold text-2xl">{{start}} - {{end}}</div>
            <div class="font-semibold text-lg">{{year}}</div>
          </div>
        </div>
      </div> -->
      <div class="green-box"></div>
      <div class="venue-container">
        <div class="venue-container__item-container">
          <div class="venue-container__align"><i class="fas fa-calendar venue-container__icon"></i></div>
          <div class="venue-container__align--right">
            <span>date</span> <span>{{ formattedStartDate }}</span>
          </div>
        </div>
        <div class="venue-container__item-container">
          <div class="venue-container__align"><i class="fas fa-clock venue-container__icon"></i></div>
          <div class="venue-container__align--right">
            <span>time</span> <span>{{ singleEvent.schedules[0].start }}</span>
          </div>
        </div>
        <div class="venue-container__item-container">
          <div class="venue-container__align"><i class="fas fa-map-marker venue-container__icon"></i></div>
          <div class="venue-container__align--right">
            <span>venue</span> <span>{{ singleEvent.venue }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="lg:w-3/4 mt-8 my-8 mx-auto hidden md:block">
      <button @click="goBack" class="show-button">
        <span><i class="fas fa-angle-left"></i></span> Back
      </button>
    </section>

    <section class="md:flex lg:w-3/4 mt-10 mb-20 md:mt-20 mx-auto gap-20">
      <!-- <section class="left">
        <img class="bg-gray-100 rounded-xl" :src="singleEvent.image.portrait" alt="" />
        <div class="uppercase font-semibold text-xl text-center m-3">{{ singleEvent.title }}</div>

        <div class="uppercase text-sm mt-8">Tags</div>
        <div class="tags flex gap-2 my-2">

          <span
            v-for="(tag, index) in singleEvent.tags"
            :key="index"
            class="bg-green-400 bg-opacity-20 uppercase py-2 px-4 text-xs text-green-500 border border-green-400"
            >{{ tag }}</span
          >

        </div>

        <div class="text-sm text-gray-400 my-8">
          Promoters can earn commissions for this event by promoting it on their preferred platforms. Read our
          <span class="text-green-600 font-medium">promoter terms</span> for more information
        </div>

        <div class="my-8">
          <div class="font-semibold capitalize mb-2">For promoters</div>
          <primary-button label="promote this event"></primary-button>
        </div>
      </section> -->

      <section class="collapse-margin right flex-auto">
        <div class="title capitalize font-semibold text-2xl mt-20 mb-3 md:mt-3">{{ singleEvent.title }}</div>

        <div class="description mt-10">
          <div class="font-semibold capitalize mb-2">Description</div>

          <div class="text-gray-400 text-sm leading-6">
            {{ singleEvent.description }}
          </div>

          <div class="social-share flex gap-5 mt-8">
            <button><i class="fas fa-share-alt"></i></button>
            <button><i class="fab fa-facebook-f"></i></button>
            <button><i class="fab fa-twitter"></i></button>
            <button><i class="fab fa-facebook-messenger"></i></button>
            <button><i class="fas fa-envelope"></i></button>
          </div>
          <div class="uppercase text-sm mt-8">Tags</div>
          <div class="tags flex flex-wrap gap-2 my-2 b-radius">
            <span
              v-for="(tag, index) in singleEvent.tags"
              :key="index"
              class="bg-green-400 bg-opacity-20 rounded-full uppercase py-2 px-4 text-xs text-green-500 border border-green-400"
              >{{ tag }}</span
            >
          </div>
          <div class="mt-8">
            <div class="font-semibold capitalize mb-2">Ticket Categories</div>
            <div class="mb-10">
              <ticket-selection
                v-if="singleEvent"
                :ticket-count="ticketCounts"
                :single-event="singleEvent"
                @increase-ticket-count="increaseTicketCount"
                @decrease-ticket-count="decreaseTicketCount"
              >
              </ticket-selection>
            </div>
            <primary-button
              button-class="w-full md:w-2/5"
              label="proceed to payment"
              @click="toggleCheckout"
            ></primary-button>
          </div>
        </div>
      </section>
    </section>

    <checkout v-if="showCheckout" :single-event="singleEvent" :purchases="purchases" @close="handleCheckoutClosed">
    </checkout>
  </main>
  <main v-else>
    <h1>No event found</h1>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
import { EventDetailsFull } from '~/common/models/interfaces'
import { EventsApi } from '~/common/api/events.api'
import { formatTimestamp } from '~/common/utilities'

@Component({
  layout: 'public',
})
export default class EventDetailPage extends Vue {
  loading: boolean = true
  showCheckout: boolean = false
  id: string = ''
  ticketCounts: { [key: string]: number } = {} // Object to store ticket counts for each child component
  purchases: Array<any> = [] // Array to store ticket purchases
  singleEvent: EventDetailsFull = {
    id: '',
    startDate: '',
    endDate: '',
    title: '',
    images: {
      landscape: '',
      portrait: '',
    },
    image: {
      landscape: '',
      portrait: '',
    },
    description: '',
    category: '',
    location: '',
    schedules: [],
    tickets: [],
    tags: [],
    sales: [],
    promoters: [],
    isPublished: false,
    occurrence: '',
    address: '',
    author: '',
    venue: '',
    status: 'DRAFT',
  } // Initialize singleEvent with default values

  get formattedStartDate() {
    return formatTimestamp(+this.singleEvent.startDate) // Call the formatDate function with startDate
  }

  // get disableButton() {
  //   if (this.purchases.length > 0) {
  //     return false
  //   }
  //   return true
  // }

  async getEvents(eventid: string) {
    const { error, data } = await EventsApi.getEventDetails(eventid)

    if (error) {
      message.error(error as string)
    } else {
      this.singleEvent = data?.data
    }
    this.loading = false
  }

  mounted() {
    this.id = this.$route.params.id
    this.getEvents(this.id)
  }

  toggleCheckout() {
    if (this.purchases.length <= 0) {
      return message.error('number of tickets cannot be 0')
    }
    this.showCheckout = !this.showCheckout
  }

  handleCheckoutClosed() {
    this.toggleCheckout()
  }

  // Function to update purchases array
  updatePurchases(ticketId: string, count: number) {
    // Find existing purchase for the ticketId
    const existingPurchase = this.purchases.find((purchase) => purchase.ticketId === ticketId)

    if (count > 0) {
      // If count is greater than 0, add/update the purchase
      if (existingPurchase) {
        // Update existing purchase
        existingPurchase.count = count
      } else {
        // Add new purchase
        this.purchases.push({ ticketId, count })
      }
    } else {
      // If count is 0 or less, remove the purchase if it exists
      // eslint-disable-next-line no-lonely-if
      if (existingPurchase) {
        const index = this.purchases.indexOf(existingPurchase)
        this.purchases.splice(index, 1)
      }
    }
  }

  increaseTicketCount(ticketId: string) {
    const currentCount = this.ticketCounts[ticketId] || 0
    if (currentCount < 1) {
      this.$set(this.ticketCounts, ticketId, currentCount + 1) // in this method, we use this.$set to add or update the property ticketId in the ticketCounts object. This ensures that the changes are properly tracked and trigger reactivity.
      this.updatePurchases(ticketId, currentCount + 1)
    }
  }

  decreaseTicketCount(ticketId: string) {
    const currentCount = this.ticketCounts[ticketId] || 0
    if (currentCount > 0) {
      this.ticketCounts[ticketId] = currentCount - 1 // assign the updated value currentCount - 1 directly to this.ticketCounts[ticketId] without using this.$set, Both the this.$set approach and the direct assignment approach should work fine
      this.updatePurchases(ticketId, currentCount - 1)
    }
  }

  goBack() {
    this.$router.go(-1) // Go back to the previous page
  }
}
</script>

<style lang="scss" scoped>
main {
  min-height: max-content;
  margin-bottom: 100px;
}

.hero {
  height: 50vh;

  @media screen and (max-width: 700px) {
    height: 25vh;
    border-radius: 30px;
    margin-bottom: 16em;
  }
  @media screen and (min-width: 701px) {
    margin-top: 4em;
    width: 78%;
    margin-inline: auto;
  }
  img.hero-image {
    display: block;
    border-radius: 30px;
  }

  img.hero-image,
  .overlay {
    height: inherit;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .overlay {
    background: rgb(2, 0, 36);
    background: linear-gradient(0deg, rgba(12, 12, 12, 0.6) 0%, rgba(12, 12, 12, 0.2) 44%, rgba(12, 12, 12, 0) 100%);
    z-index: 10;
  }

  .icon {
    font-size: 2em;
  }
}

.left {
  width: 300px;

  img {
    width: 100%;
    height: 400px;
  }

  .tags span {
    border-radius: 40px;
  }

  @media screen and (max-width: 700px) {
    width: 100%;

    img {
      height: 400px;
    }
  }
}

.venue-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 115%;
  left: 0;
  @media screen and (min-width: 701px) {
    width: 90%;
    flex-direction: row;
    justify-content: space-between;
    top: 108%;
    left: 50%;
    transform: translateX(-50%);
  }

  &__item-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1em;
    @media screen and (min-width: 701px) {
      font-size: 1.3rem;
    }
  }

  &__icon {
    color: #3fd246;
    font-size: 1.2rem;
    @media screen and (min-width: 701px) {
      font-size: 2rem;
    }
  }

  &__align {
    display: inline-block;
    margin-block: 0.2em;

    &--right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      margin-left: 1.3em;
      color: rgba(156, 163, 175);
      @media screen and (min-width: 701px) {
        color: white;
      }
      span {
        text-transform: capitalize;
        &:first-child {
          font-weight: bold;
        }
      }
    }
  }
}

.green-box {
  @media screen and (min-width: 701px) {
    width: 100%;
    height: 40vh;
    background-color: #002e02;
    border-radius: 30px;
    position: absolute;
    left: 0;
    bottom: -8rem;
    z-index: -1;
  }
}
.show-button {
  @media screen and (min-width: 701px) {
    visibility: hidden;
  }
}
.loader-container {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
