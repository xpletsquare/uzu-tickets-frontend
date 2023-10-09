<template>
    <div>
      <div class="slider desktop-only">
        <div v-for="(item, index) in images" :key="index" class="slider-item" :class="{ active: index === activeIndex }">
          <img :src="item.src" :style="{ width: index === activeIndex ? '301px' : '106px', height: '356px', boxShadow: index === activeIndex ? '0 0 10px #3FD246' : 'none',objectFit: 'cover',maxWidth: index === activeIndex ? '100%' : 'auto', }" @click="changeSlide(index)" />
        </div>
    
        <div class="dots">
          <div
            v-for="(item, index) in images"
            :key="index"
            class="dot"
            :class="{ active: index === activeIndex }"
            @click="changeSlide(index)"
          ></div>
        </div>
      </div>
      <div class="carousel mobile-only">
        <div class="carousel-container" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
          <div v-for="(item, index) in images" :key="index" class="carousel-item">
            <img :src="item.src" alt="Carousel Item" />
          </div>
        </div>
    
        <div class="dots2">
          <div v-for="(item, index) in images" :key="index" class="dot2" :class="{ active: index === activeIndex }" @click="changeSlide(index)"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    export default {
    props: {
        images: {
        type: Array,
        required: true,
        },
        autoSlideInterval: {
        type: Number,
        default: 4000,
        },
    },
    data() {
        return {
        activeIndex: 0,
        };
    },
    methods: {
        changeSlide(index) {
        this.activeIndex = index;
        },
        startAutoSlide() {
        setInterval(() => {
            this.activeIndex = (this.activeIndex + 1) % this.images.length;
        }, this.autoSlideInterval);
        },
    },
    created() {
        this.startAutoSlide();
    },
    };
  </script>
  
  <style scoped>
  .slider {
    position: relative;
  }
  
  .slider-item {
    display: inline-block;
    margin-left: 20px; 
    transition: transform 0.3s ease;
  }
  
  .slider-item img {
    border-radius: 16px ;
  }
  
  .slider-item.active {
    object-fit: contain;
  }
  
  .dots {
    position: absolute;
    bottom: -30px;
    left: 10px;
    display: flex;
    justify-content: center;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    margin: 0 5px; 
    background-color: #d9d9d9; 
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .dot.active {
    background-color: #3fd246;
  }
  @media (max-width: 1023px) {
    .desktop-only {
        display: none; /* Hide the section on smaller screens */
    }
    .carousel {
    overflow: hidden;
    position: relative;
  }
  
  .carousel-container {
    display: flex;
    transition: transform 0.3s ease;
  }
  
  .carousel-item {
    flex: 0 0 100%;
    width: 100%;
    overflow: hidden;
  }
  
  .carousel-item img {
    width: 100%;
    height: auto;
    border-radius: 0px;
  }
  
  .dots2 {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .dot2 {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    background-color: #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 20px;
  }
  
  .dot2.active {
    background-color: #3fd246;
  }
  }
  .mobile-only{
    display: none;
  }
  @media (max-width: 810px) {
    .mobile-only{
      display: block;
    }
  }
  </style>
  