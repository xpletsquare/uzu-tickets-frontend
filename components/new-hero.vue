<template>
  <header class="main">
    <div class="bg relative w-full md:flex hidden">
      <img class="absolute -top-40 -right-[60%] pointer-events-none" src="~/assets/images/bg.png" />
      <img class="absolute -top-20 -left-[60%] pointer-events-none" src="~/assets/images/bg.png" />
    </div>

    <div class="top-slide w-full">
      <!-- top slider  -->
      <div class="top-slider-title" :style="{ transform: `translateY(${translate}%)` }">
        <section class="flex top items-center justify-between mx-auto">
          <div class="top-left">
            <h1 class="event-title md:text-[58px] text-[30px] w-[100%] leading-tight font-bold">Picnic in Bayelsa</h1>
            <p class="md:text-[18px] text-[14px] w-[80%]">Come have fun with games, drinks, music and more...</p>
            <div class="links flex gap-5 items-center">
              <NuxtLink to="/events/1694b928-5acc-4691-b444-2f784e0b4639">
                <primary-button label="Buy tickets"></primary-button
              ></NuxtLink>
              <h3 class="text-3xl">N20,000</h3>
            </div>
          </div>
          <div class="top-right md:flex hidden">
            <div class="date">
              <h2 class="month text-[40px] leading-none">Aug</h2>
              <h2 class="day text-[70px] leading-[30%]">26</h2>
              <h3 class="year text-[40px] leading-none">2023</h3>
            </div>
          </div>
        </section>

        <!-- break -->

        <section class="flex top items-center justify-between mx-auto">
          <div class="top-left">
            <h1 class="event-title md:text-[58px] text-[30px] w-[100%] leading-tight font-bold">Apple Fest 2024</h1>
            <p class="md:text-[18px] text-[14px] w-[80%]">It's time to showcase your musical talents once again.</p>
            <div class="links flex gap-5 items-center">
              <primary-button label="Buy tickets"></primary-button>
              <h3 class="text-3xl">FREE</h3>
            </div>
          </div>
          <div class="top-right md:flex hidden">
            <div class="date">
              <h2 class="month text-[40px] leading-none">Dec</h2>
              <h2 class="day text-[70px] leading-[20%]">26</h2>
              <h3 class="year text-[40px] leading-none">2023</h3>
            </div>
          </div>
        </section>

        <!-- break -->

        <section class="flex top items-center justify-between mx-auto">
          <div class="top-left">
            <h1 class="event-title md:text-[58px] text-[30px] w-[100%] leading-tight font-bold">Who's next 2024</h1>
            <p class="md:text-[18px] text-[14px] w-[80%]">It's time to showcase your musical talents once again.</p>
            <div class="links flex gap-5 items-center">
              <primary-button label="Buy tickets"></primary-button>
              <h3 class="text-3xl">N10,000</h3>
            </div>
          </div>
          <div class="top-right md:flex hidden">
            <div class="date">
              <h2 class="month text-[40px] leading-none">Dec</h2>
              <h2 class="day text-[70px] leading-[20%]">26</h2>
              <h3 class="year text-[40px] leading-none">2023</h3>
            </div>
          </div>
        </section>

        <!-- break -->
      </div>
      <!-- end of top slider -->
      <!-- break -->
    </div>

    <section class="bottom">
      <swiper class="images">
        <div
          v-for="image in images"
          :key="image.id"
          :class="{ last: image.last, back: !image.active && !image.last, front: image.active, absolute: true }"
          class="image pointer-events-none"
        >
          <img :src="image.url" alt="poster" />
        </div>
      </swiper>
    </section>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NewHero extends Vue {
  translate = 0
  current = 0

  images = [
    {
      id: 0,
      url: 'https://res.cloudinary.com/drof5sggk/image/upload/v1707030055/posters/rhoiimrtm7rahutaecye.jpg',
      zIndex: 1,
      width: 80,
      translate: 20,
      active: true,
      last: false,
    },
    {
      id: 1,
      url: 'https://media.istockphoto.com/id/1181806308/photo/happiness-makes-you-glow.jpg?s=170667a&w=0&k=20&c=UfBpChhaH2uxFchU6JJsBZ-kpj3sTg5ojzOcwkYr5aI=',
      zIndex: 2,
      width: 80,
      translate: 20,
      active: false,
      last: false,
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/drof5sggk/image/upload/v1692311054/event%20banners/PHOTO-2023-08-15-11-55-19_yenu5b.jpg',
      zIndex: 3,
      width: 80,
      translate: 20,
      active: false,
      last: true,
    },
  ]

  mounted() {
    setInterval(() => {
      // if(this.current >= this.images.length){
      //   this.current = 0
      //   this.translate = 0
      //   this.images[this.images.length - 1].active = false
      //   this.images[0].active = true;
      //   return
      // }

      if (this.current < this.images.length) {
        // determine the last slide
        if (this.current === this.images.length - 1) {
          this.images[this.current - 2].last = false
          this.images[this.current - 1].last = true
          this.images[this.current - 0].last = false
        }

        // determine that it is secomd slide
        if (this.current + 1 === this.images.length - 1) {
          this.images[this.current - 1].last = true
          this.images[this.current + 1].last = false
          this.images[this.current - 0].last = false
        }

        // determine that it is first slide
        if (this.current + 1 < this.images.length - 1) {
          this.images[this.current + 2].last = true
          this.images[this.current + 1].last = false
          this.images[this.current - 0].last = false
        }

        this.images[this.current - 0].last = false

        this.images.forEach((img) => {
          // console.log(this.current + 1)
          if (img.id === this.current) {
            img.active = true
            img.last = false
          } else {
            img.active = false
          }
        })

        if (this.current === this.images.length - 1) {
          this.translate = this.current * -33.3
          // this.translate = this.current * -290
          this.current = 0
          return true
        }
        this.translate = this.current * -33.3
        // this.translate = this.current * -290
        this.current += 1
      } else {
        this.current = 0
        this.translate = 0
        this.images[this.images.length - 1].active = false
        this.images[0].active = true
      }
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  width: 600px;
  height: 300px;
}

.front {
  z-index: 10;
  width: 100% !important;
  transform: translateY(0px) !important;
}

.back {
  z-index: 5;
  width: 80% !important;
  transform: translateY(-30px) !important;
}
.last {
  z-index: 0;
  width: 60% !important;
  transform: translateY(-60px) !important;
}
.top-slider-title {
  display: flex;
  flex-direction: column;
}
.top-slide {
  overflow: hidden;
  height: 280px;

  @media (max-width: 768px) {
    height: 240px;
  }
}

.main {
  width: 1200px;
  margin-inline: auto;
  height: max-content;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.top {
  margin-block: 30px;
  width: 80%;
}

.date {
  width: max-content;
  background-color: var(--light-green);
  border-radius: 10px;
  padding: 30px;
  padding-inline: 35px;

  * {
    color: white !important;
  }
}

.bottom {
  .images {
    width: 100%;
    margin-top: 80px;
    position: relative !important;
    display: flex;
    justify-content: center;
    min-height: 550px;

    @media (max-width: 768px) {
      min-height: 250px;
    }
  }
  .image {
    height: 550px !important;
    overflow: hidden !important;
    margin-inline: auto;
    /*border-radius: 80px 80px 0 0 ; */
    /* border-radius: 80px; */
    position: absolute !important;
    object-fit: cover;

    @media (max-width: 768px) {
      height: 250px !important;
    }

    img {
      width: 100%;
    }
  }
}

.glow {
  box-shadow: 0px 0px 40px var(--light-green);
}
</style>
