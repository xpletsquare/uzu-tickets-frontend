<template>
  <section class="wrapper md:flex justify-center items-center">
    <div class="checkout-card rounded bg-white ">
      <button class="close-btn shadow-lg" @click="close">&times;</button>

      <section class="right relative bg-gray-50">
        <img class="bg-gray-200" :src="singleEvent.image.portrait" />
        <div class="p-8">
          <div class="font-medium mb-8">Order Summary</div>

          <div v-for="item in ticketCartArray.ticketCart" :key="item.ticketId" class="flex justify-between gap-12 mb-3">
            <div class="w-3/5">{{ item.count }} x {{ item.title }}</div>
            <div class="font-semibold w-16 text-right">{{ formatCurrency(String(item.totalPrice)) }}</div>
          </div>

          <!-- <div class="flex justify-between gap-12 mb-3">
            <div class="w-3/5">1 x VIP Early bird entry tickets</div>
            <div class="font-semibold w-16 text-right">{{ formatCurrency(4000) }}</div>
          </div>

          <div class="flex justify-between gap-12 mb-3">
            <div class="w-3/5">1 x VIP Early bird entry tickets</div>
            <div class="font-semibold w-16 text-right">{{ formatCurrency(4000) }}</div>
          </div>

          <div class="flex justify-between gap-12 mb-3 border-t-2 pt-2">
            <div>Subtotal</div>
            <div class="font-semibold w-16 text-right">{{ formatCurrency(4000) }}</div>
          </div>

          <div class="flex justify-between gap-12 mb-3 border-t-2 border-black pt-3">
            <div class="font-bold text-xl">Total</div>
            <div class="font-bold w-auto text-right text-xl">{{ formatCurrency(4000) }}</div>
          </div> -->

          <div class="flex justify-between gap-12 mb-3 border-t-2 border-black pt-3">
            <div class="font-bold text-xl">Total</div>
            <div class="font-bold w-auto text-right text-xl">{{ Number(ticketCartArray.total) > 0 ? formatCurrency(String(ticketCartArray.total)) : "FREE" }}</div>
          </div>
        </div>
      </section>

      <section class="left relative p-8 md:p-14 text-sm">
        <div class="bg-gray-100 p-4 rounded">
          Each ticket admits 1 and is only valid for the Dates present in the ticket. Other terms and conditions may apply for seperate tickets
        </div>

        <!-- <div class="mt-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique ad incidunt consectetur iure in hic magni
          fugit sit quos explicabo laboriosam voluptatibus ex doloribus eligendi maiores, facilis, perspiciatis ratione
          voluptate.
        </div> -->

        <div class="mt-8">
          <primary-button label="Send to Single Email"></primary-button>
          <!-- <button class="border p-4">Send to multiple emails</button> -->
        </div>

        <div class="mt-8 mb-40 md:mb-8">
          <div class="font-semibold mb-4">Complete Order</div>
          <div class="font-medium my-2">Ticket 1: {{ singleEvent.schedules[0].name }}</div>
          <div class="contact-form">
            <input v-model="userFirstName" placeholder="First Name" type="text" />
            <input v-model="userLastName" placeholder="Last Name" type="text" />
            <input v-model="userEmail" class="full" placeholder="Email Address" type="email" />
          </div>
        </div>

        <div class="text-right mt-10 pay-button-wrapper bg-white">
          <p class="text-center font-bold block md:hidden">{{ Number(ticketCartArray.total) > 0 ? formatCurrency(String(ticketCartArray.total)) : "FREE" }}</p>
          <primary-button @click="pay" buttonClass="w-full md:w-full" label="Get Ticket"></primary-button>
        </div>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
import { payApi } from '~/common/api/payment.api'
import { formatCurrency } from '~/common/utilities'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component
export default class Checkout extends Vue {
  @Prop({ type: Object, required: true }) singleEvent!: EventDetailsFull
  @Prop({ type: Array, required: true }) purchases!: [{ ticketId: string; count: number }]

  formatCurrency = formatCurrency
  userFirstName: string = ''
  userLastName: string = ''
  userEmail: string = ''

  get ticketCartArray() {
    let total = 0

    const ticketCart = this.purchases.map((item) => {
      const ticket = this.singleEvent.tickets.find((t) => t.id === item.ticketId)
      const ticketName = ticket?.title
      const totalPrice = ticket ? Number(ticket.price) * Number(item.count) : 0
      total += totalPrice

      return {
        ticketId: item.ticketId,
        title: ticketName,
        count: item.count,
        price: ticket ? ticket.price : 0,
        totalPrice,
      }
    })

    return { ticketCart, total }
  }

  async pay() {
    // validate input
    // show loading spinner
    // make api call
    // show success message
    // redirect to homepage

    const payload = {
      eventId: this.singleEvent.id,
      userFirstName: this.userFirstName,
      userLastName: this.userLastName,
      userEmail: this.userEmail,
      purchases: this.purchases,
    }

    if (!payload.userFirstName.length || !payload.userLastName.length || !payload.userEmail) {
      return message.warning('Please enter a valid first-name, last-name and email')
    }

    // this.loading = true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error, data } = await payApi.pay(payload)
    // this.loading = false

    if (error) {
      return message.error(error as string)
    }

    message.success('payment successful')
    this.userFirstName = ''
    this.userLastName = ''
    this.userEmail = ''
    this.$router.push('/')
  }

  close() {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 50;
  /* backdrop-filter: blur(10px); */
  overflow-y: scroll;
  background-color: rgba(0,0,0,0.4);

  .checkout-card {
    position: relative;
    width: 100%;
    display: block;
    height: 100vh;
    overflow: scroll;

    @media screen and (min-width: 700px) {
      display: inline-grid;
      /* display: inline-grid; */
      grid-template-columns: auto 400px;
      grid-template-rows: 100%;
      width: min(92vw, 1000px);
      height: 80vh;

      > section {
        height: inherit;
        overflow-y: scroll;
      }

      .left {
        grid-column: 1;
        grid-row: 1;
      }

      .right {
        grid-column: 2;
        grid-row: 1;
      }
    }
  }

  // .checkout-card{
  //   display: inline-grid;

  //   grid-template-columns: auto 400px;
  //   position: relative;
  //   // overflow: hidden;

  //   @media screen and (max-width: 700px) {
  //     width: 100%;
  //     display: block;
  //     grid-template-columns: 100%;
  //     grid-template-rows: auto auto;
  //     overflow-y: scroll;

  //     .left{
  //       grid-row: 2;
  //       grid-column: 1;
  //     }

  //     .right{
  //       grid-row: 1;
  //       grid-column: 1;
  //     }

  //     >section{
  //       height: auto;
  //       overflow-y: scroll;
  //     }
  //   }

  //   .left{
  //     grid-column: 1;
  //     grid-row: 1;
  //   }

  //   .right{
  //     grid-column: 2;
  //     grid-row: 1;
  //   }

  //   >section{
  //     height: inherit;
  //     overflow-y: scroll;
  //   }
  // }

  img {
    width: 100%;
    height: 240px;
  }

  .contact-form {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1em;

    @media screen and (max-width: 1000px) {
      grid-template-columns: 100%;
    }

    input {
      border: 1px solid lightgray;
      padding: 0.7em;
      border-radius: 4px;
    }

    .full {
      grid-column: 1/-1;
    }
  }

  .close-btn {
    width: 40px;
    height: 40px;
    display: inline-grid;
    place-content: center;
    border-radius: 50%;
    background: white;
    position: absolute;
    right: 1em;
    top: 1em;
    z-index: 20;
    font-weight: 700;

    @media screen and (max-width: 700px) {
      position: fixed;
      top: 1em;
      right: 1em;
    }
  }

  .pay-button-wrapper {
    @media screen and (max-width: 700px) {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 1em;
      z-index: 20;
    }
  }
}
</style>
