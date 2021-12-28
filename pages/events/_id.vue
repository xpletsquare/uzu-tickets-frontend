<template>
  <main class="p-4 md:p-0">
    <section class="hero relative">
      <img src="https://images.unsplash.com/photo-1640547075007-5ef0af61e768?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80" alt="" class="hero-image">
      
      <div class="overlay flex items-end pb-20">
        <div class="inline-flex lg:w-3/4 mx-auto justify-between items-start">
          <div class="text-white w-1/5">
            <div class="text-4xl mb-2"><i class="fas fa-map-marker"></i></div>
            <div class="font-semibold text-lg">Musson Center</div>
            <div>Victoria Island, Lagos</div>
          </div>

          <div class="w-1/3 text-center pt-8">
            <!-- <button class="p-3 bg-green-400 text-gray-50 rounded">Buy Tickets</button> -->
            <primary-button label="Buy Tickets"></primary-button>
          </div>

          <div class="text-white w-1/5 pl-20">
            <div class="text-4xl mb-2"><i class="far fa-calendar"></i></div>
            <div class="font-semibold text-base">January</div>
            <div class="font-semibold text-2xl">2 - 5</div>
            <div class="font-semibold text-lg">2022</div>
          </div>
        </div>
      </div>

    </section> 

    <section class="lg:w-3/4 mt-8 my-8 mx-auto hidden md:block">
      <button> <span><i class="fas fa-angle-left"></i></span> Back</button>
    </section>

    <section class="md:flex lg:w-3/4 mt-10 mb-20 md:mt-20 mx-auto gap-20 ">
      <section class="left">
        <img class="bg-gray-100 rounded-xl" src="https://images.unsplash.com/photo-1640542902140-160aac880fc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1030&q=80" alt="">
        <div class="uppercase font-semibold text-xl text-center m-3">Ada the country</div>

        <div class="uppercase text-sm mt-8">Tags</div>
        <div class="tags flex gap-2 my-2">
          <span class="bg-green-400 bg-opacity-20 uppercase py-2 px-4 text-xs text-green-500 border border-green-400">Drama</span>
          <span class="bg-green-400 bg-opacity-20 uppercase py-2 px-4 text-xs text-green-500 border border-green-400">suspense</span>
          <span class="bg-green-400 bg-opacity-20 uppercase py-2 px-4 text-xs text-green-500 border border-green-400">comedy</span>
        </div>

        <div class="text-sm text-gray-400 my-8">
          Promoters can earn commissions for this event by promoting it on their preferred platforms.
          Read our <span class="text-green-600 font-medium">promoter terms</span> for more information
        </div>

        <div class="my-8">
          <div class="font-semibold capitalize mb-2">For promoters</div>
          <primary-button label="promote this event"></primary-button>
        </div>
      </section>

      <section class="right flex-auto">
        <div class="title capitalize font-semibold text-2xl mt-20 mb-3 md:mt-3">Ada the country</div>

        <div class="description mt-10">
          <div class="font-semibold capitalize mb-2">Description</div>

          <div class="text-gray-400 text-sm leading-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti eum dolorem vitae nihil hic, 
            officia, voluptatum non accusamus soluta necessitatibus officiis a sed quas dicta deserunt voluptates 
            ipsam alias suscipit molestias sit. Recusandae quae, inventore culpa dolorum et nihil doloribus repellendus 
            facere necessitatibus autem, ipsa illo placeat. Magnam aspernatur itaque minus ipsam voluptatem quisquam
             sequi incidunt quo in. Consectetur veniam commodi omnis facere voluptatem, doloremque ullam itaque sunt 
             atque numquam consequatur aliquid, provident enim? Molestias quaerat vitae corrupti distinctio facilis 
             nulla labore aperiam. Nihil dolores sapiente, saepe placeat impedit voluptatibus, sunt itaque cupiditate, 
             quisquam aliquam iure incidunt nostrum? Sed, dolorem.
          </div>

          <div class="social-share flex gap-5 mt-8">
            <button><i class="fas fa-share-alt"></i></button>
            <button><i class="fab fa-facebook-f"></i></button>
            <button><i class="fab fa-twitter"></i></button>
            <button><i class="fab fa-facebook-messenger"></i></button>
            <button><i class="fas fa-envelope"></i></button>
          </div>

          <div class="mt-8">
            <div class="font-semibold capitalize mb-2">Ticket Categories</div>
            <div class="mb-10">
              <ticket-selection></ticket-selection>
            </div>
            <primary-button @click="toggleCheckout" buttonClass="w-full md:w-2/5" label="promote this event"></primary-button>
          </div>
        </div>
      </section>
    </section>


    <checkout v-if="showCheckout" @close="handleCheckoutClosed"></checkout>
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    layout: 'public',
  })
  export default class EventDetailPage extends Vue {
    showCheckout = true;

    toggleCheckout(){
      console.log('clicked');
      this.showCheckout = !this.showCheckout;
    }

    handleCheckoutClosed(){
      this.toggleCheckout();
    }
  }
</script>

<style lang="scss" scoped>
  main{
    min-height: 200vh;
    margin-bottom: 100px;
  }

  .hero{
    height: 80vh;

    @media screen and (max-width: 700px) {
      display: none;
    }

    img.hero-image, .overlay{
      height: inherit;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    .overlay{
      background: rgb(2,0,36);
      background: linear-gradient(0deg, rgba(12, 12, 12, 0.6) 0%, rgba(12, 12, 12, 0.2) 44%, rgba(12, 12, 12, 0) 100%);
      z-index: 10
    }

    .icon{
      font-size: 2em;
    }
  }

  .left{
    width: 300px;

    img{
      width: 100%;
      height: 400px;
    }

    .tags span{
      border-radius: 20px;
    }

    @media screen and (max-width: 700px) {
      width: 100%;

      img{
        height: 400px
      }
    }
  }
</style>
