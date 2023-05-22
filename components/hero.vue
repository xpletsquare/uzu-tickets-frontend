<template>
  <div class="hero">
    <div class="wrapper">
      <div class="main-contents">
        <!-- <search placeholder="Search events" /> -->

        <!-- <p>Conventory event date at Lagos</p> -->
        <h2 class="bold-text leading-loose">
          Check out Jake Doe's <br />
          Yours Unfaithfully <span class="alt-text">This weekend</span>
        </h2>
      </div>
      <!-- <div class="inverted-text">
        <p>
          Conventory event <br />
          date at Lagos
        </p>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Hero extends Vue {}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  width: 100vw;
  margin: 0px auto 20px;
  // height: 70vh;
  height: 600px;
  background: transparent linear-gradient(180deg, #00000013 0%, #000000cb 100%);
  box-shadow: inset 0px 3px 6px #17000029;

  @media (max-width: 568px) {
    height: 500px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://res.cloudinary.com/drof5sggk/image/upload/v1684706594/event%20banners/yours_unfaithfully_tvuvak.jpg') no-repeat center center/cover;
    opacity: 0.7;
    z-index: -1;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    margin: 0px auto;
  }

  .main-contents {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: space-between;

    .bold-text {
      font-size: 40px;
      font-weight: 600;
      color: #ffffff;
      line-height: 1;
    }

    .alt-text {
      color: #31d760;
    }

    p {
      font-size: 20px;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .inverted-text p {
    transform: matrix(0, -1, 1, 0, 0, 0);
    font-size: 40px;
    font-weight: 600;
    color: #ffffff;
    line-height: 1;

    @media (max-width: 568px) {
      display: none;
    }
  }
}
</style>