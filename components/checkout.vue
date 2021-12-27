<template>
  <section class="wrapper md:flex justify-center items-center blur-md">
    <div class="checkout-card rounded bg-white">

      <section class="right bg-gray-50">
        <img class="bg-gray-200" src="https://images.unsplash.com/photo-1522938974444-f12497b69347?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1709&q=80" alt="">
        <div class="p-8">
          <div class="font-medium mb-8">Order Summary</div>

          <div class="flex justify-between gap-12 mb-3">
            <div class="w-3/5">1 x VIP Early bird entry tickets</div>
            <div class="font-semibold w-16 text-right">{{ formatCurrency(4000)}} </div>
          </div>

          <div class="flex justify-between gap-12 mb-3">
            <div class="w-3/5">1 x VIP Early bird entry tickets</div>
            <div class="font-semibold w-16 text-right">{{ formatCurrency(4000)}} </div>
          </div>

          <div class="flex justify-between gap-12 mb-3 border-t-2 pt-2">
            <div>Subtotal</div>
            <div class="font-semibold w-16 text-right">{{ formatCurrency(4000)}} </div>
          </div>

          <div class="flex justify-between gap-12 mb-3 border-t-2 border-black pt-3">
            <div class="font-bold text-xl">Total</div>
            <div class="font-bold w-auto text-right text-xl">{{ formatCurrency(4000)}} </div>
          </div>
        </div>
      </section>

      <section class="left p-14 text-sm">
        <div class="bg-gray-100 p-4 rounded">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Similique ad incidunt consectetur iure in hic magni fugit sit quos explicabo 
          laboriosam voluptatibus ex doloribus eligendi maiores, facilis, perspiciatis ratione voluptate.
        </div>

        <div class="mt-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
          Similique ad incidunt consectetur iure in hic magni fugit sit quos explicabo 
          laboriosam voluptatibus ex doloribus eligendi maiores, facilis, perspiciatis ratione voluptate.
        </div>

        <div class="mt-8">
          <primary-button label="Send to Single Email"></primary-button>
          <button class="border p-4">Send to multiple emails</button>
        </div>

        <div class="mt-8">
          <div class="font-semibold mb-4">Contact Information</div>
          <div class="font-medium my-2">Ticket 1: Jan 1, 2022</div>
          <div class="contact-form">
            <input placeholder="First Name" type="text">
            <input placeholder="Last Name" type="text">
            <input class="full" placeholder="Email Address" type="email">
          </div>
        </div>

        <div class="text-right mt-10">
          <primary-button label="Pay now"></primary-button>
        </div>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
import { formatCurrency } from '~/common/utilities';


  @Component
  export default class Checkout extends Vue {
    formatCurrency = formatCurrency
  }
</script>

<style lang="scss" scoped>
.wrapper{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 50;
  backdrop-filter: blur(10px);

  .checkout-card{
    display: inline-grid;
    width: min(92vw, 1000px);
    height: 80vh;
    grid-template-columns: auto 400px;
    overflow: hidden;

    @media screen and (max-width: 700px) {
      width: 100%;
      grid-template-columns: 100%;
      height: 100vh;
      overflow-y: scroll;

      .left{
        grid-row: 2;
        grid-column: 1;
      }

      .right{
        grid-row: 1;
        grid-column: 1;
      }

      >section{
        height: fit-content;
      }
    }

    .left{
      grid-column: 1;
      grid-row: 1;
    }

    .right{
      grid-column: 2;
    }

    >section{
      height: inherit;
      overflow-y: scroll;
    }
  }

  img{
    width: 100%;
    height: 240px;
  }

  .contact-form{
    display: grid;
    grid-template-columns: auto auto;
    gap: 1em;

    @media screen and (max-width: 700px) {
      grid-template-columns: 100%;
    }

    input{
      border: 1px solid lightgray;
      padding: 0.7em;
      border-radius: 4px;
    }

    .full{
      grid-column: 1/-1;
    }
  }
}
</style>