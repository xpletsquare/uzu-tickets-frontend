<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: 'red',
      },
    }"
  >
    <section class="wrapper md:flex justify-center items-center">
      <div class="checkout-card rounded-2xl bg-white">
        <button class="close-btn shadow-lg" @click="close">&times;</button>

        <section class="right relative bg-gray-50">
          <img class="bg-gray-200" :src="singleEvent.image.portrait" />
          <div class="p-8">
            <div class="font-medium mb-8">Order Summary</div>

            <div
              v-for="item in ticketCartArray.ticketCart"
              :key="item.ticketId"
              class="flex justify-between gap-12 mb-3"
            >
              <div class="w-3/5">{{ item.count }} x {{ item.title }}</div>
              <div class="font-semibold w-16 text-right">{{ formatCurrency(String(item.totalPrice)) }}</div>
            </div>

            <div class="flex justify-between gap-12 mb-3 border-t-2 border-black pt-3">
              <div class="font-bold text-xl">Total</div>
              <div class="font-bold w-auto text-right text-xl">
                {{ Number(ticketCartArray.total) > 0 ? formatCurrency(String(ticketCartArray.total)) : 'FREE' }}
              </div>
            </div>
          </div>
        </section>

        <section class="left relative p-8 md:p-14 text-sm">
          <!-- paystack payment screen -->

          <section id="payment-frame" :class="{ hidden: isVisible }">
            <iframe id="paystack-frame" :src="pay_link" width="100%"></iframe>
          </section>
          <!-- end of pays tack -->

          <div class="bg-gray-100 p-4 rounded">
            Each ticket admits 1 and is only valid for the Dates present in the ticket. Other terms and conditions may
            apply for seperate tickets
          </div>

          <div class="mt-8 flex items-between justify-between">
            <!-- <primary-button label="Send to Single Email"></primary-button> -->
            <p class="font-bold">Send tickets to multiple Emails</p>
            <a-switch :checked="sendToMany" @click="toggleCheck" />
            <!-- <button class="border p-4">Send to multiple emails</button> -->
          </div>

          <div class="mt-8 mb-40 md:mb-8">
            <div class="font-semibold mb-4">Complete Order</div>

            <!-- send ticket to multiple recipients -->
            <div v-if="sendToMany">
              <!-- email section -->
              <div v-for="(purchase, index) in ticketCartArray.fullTix" :key="index">
                <div class="font-medium my-2">Recipient {{ index + 1 }}: {{ purchase.ticketName }}</div>
                <div class="contact-form">
                  <input v-model="purchase.userFirstName" placeholder="First Name" type="text" />
                  <input v-model="purchase.userLastName" placeholder="Last Name" type="text" />
                  <input v-model.trim="purchase.userEmail" class="full" placeholder="Email Address" type="email" />
                </div>
              </div>
              <!-- end of email section -->
            </div>
            <!-- single recipient -->
            <div v-else>
              <div class="font-medium my-2">Recipient</div>
              <div class="contact-form">
                <input v-model="userFirstName" name="" placeholder="First Name" type="text" />
                <input v-model="userLastName" name="" placeholder="Last Name" type="text" />
                <input v-model.trim="userEmail" name="" class="full" placeholder="Email Address" type="email" />
              </div>
            </div>
          </div>

          <div class="text-right mt-10 pay-button-wrapper bg-white">
            <p class="text-center font-bold block md:hidden">
              {{ Number(ticketCartArray.total) > 0 ? formatCurrency(String(ticketCartArray.total)) : 'FREE' }}
            </p>
            <primary-button
              :loading="loading"
              button-class="w-full md:w-full"
              label="Get Ticket"
              @click="pay"
            ></primary-button>
          </div>
        </section>
      </div>
    </section>
  </a-config-provider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
import { payApi } from '~/common/api/payment.api'
import { formatCurrency } from '~/common/utilities'
import { EventDetailsFull } from '~/common/models/interfaces'

// interface emd {
//   userFirstName: string,
//   userLastName: string,
//   userEmail: string,
// }

@Component
export default class Checkout extends Vue {
  @Prop({ type: Object, required: true }) singleEvent!: EventDetailsFull
  @Prop({ type: Array, required: true }) purchases!: [{ ticketId: string; count: number }]

  formatCurrency = formatCurrency
  userFirstName: string = ''
  userLastName: string = ''
  userEmail: string = ''
  loading: boolean = false
  pay_link = ''
  isVisible = true
  sendToMany = false

  dataset = []

  toggleCheck() {
    this.sendToMany = !this.sendToMany
    // console.log({dataset:this.ticketCartArray.fullTix})
  }

  closeIFrame() {
    console.log('closing iframe now')

    this.isVisible = true
    this.pay_link = ''
    this.loading = false
    this.close()
  }

  mounted() {
    console.log({ purchase: this.purchases })

    window.addEventListener('message', (event) => {
      if (event.data === 'closePaymentModal') {
        this.closeIFrame()
      }

      if (event.data === 'exploreMore') {
        window.removeEventListener('message', (event) => {
          return event
        })
        this.$router.push('/')
      }
    })
  }

  get ticketCartArray() {
    let total = 0
    const fullTix: any = []

    const ticketCart = this.purchases.map((item) => {
      const ticket = this.singleEvent.tickets.find((t) => t.id === item.ticketId)
      const ticketName = ticket?.title
      const totalPrice = ticket ? Number(ticket.price) * Number(item.count) : 0
      total += totalPrice

      for (let i = 1; i <= item.count; i++) {
        fullTix.push({
          ticketName,
          ticketId: item.ticketId,
          count: 1,
          userFirstName: '',
          userLastName: '',
          userEmail: '',
        })
      }

      return {
        ticketId: item.ticketId,
        title: ticketName,
        count: item.count,
        price: ticket ? ticket.price : 0,
        totalPrice,
      }
    })

    return { ticketCart, total, fullTix }
  }

  async pay() {
    // validate input
    // show loading spinner
    // make api call
    // show success message
    // redirect to homepage

    const payload = {
      eventId: this.singleEvent.id,
      userFirstName: this.userFirstName || this.ticketCartArray.fullTix[0].userFirstName,
      userLastName: this.userLastName || this.ticketCartArray.fullTix[0].userLastName,
      userEmail: this.userEmail || this.ticketCartArray.fullTix[0].userEmail,
      purchases: this.sendToMany ? this.ticketCartArray.fullTix : this.purchases,
    }

    // if (!payload.userFirstName.length || !payload.userLastName.length || !payload.userEmail) {
    //   return message.warning('Please enter a valid first-name, last-name and email')
    // }

    // set the button state to loading
    this.loading = true

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error, data } = await payApi.pay(payload)
    // this.loading = false
    // if ticket is free, run this code
    if (data?.data?.purchase?.paid) {
      this.pay_link = `/payment-success?paid=${data?.data?.purchase?.paid}`
      this.isVisible = false
      return
    }

    const url = data?.data?.payment?.data?.authorization_url
    this.pay_link = url
    this.isVisible = false

    if (error) {
      return message.error(error as string)
    }

    // message.success('payment successful')
    this.userFirstName = ''
    this.userLastName = ''
    this.userEmail = ''
    // this.$router.push('/')
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
  /* backdrop-filter: blur(10px); */
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.7);

  .hidden {
    display: none !important;
    z-index: 2 !important;
  }

  .flex {
    display: flex;
  }

  #payment-frame {
    position: absolute;
    width: 100% !important;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    z-index: 2;

    .paystack-frame {
      width: 100%;
      height: 100%;
    }

    @media screen and (min-width: 700px) {
      margin-bottom: 200px;
    }
  }

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
        position: relative;
      }

      .right {
        grid-column: 2;
        grid-row: 1;
        position: relative;
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
