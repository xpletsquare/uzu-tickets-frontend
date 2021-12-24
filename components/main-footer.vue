
<template>
  <div class="footer">
    <div class="wrapper">
      <ul class="footer-links">
        <li>
          <NuxtLink to="/">FAQ</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">CONTACT US</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about">ABOUT US</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/terms-and-conditions">TERMS & CONDITIONS</NuxtLink>
        </li>
      </ul>

      <ul class="footer-socials">
        <li>
          <NuxtLink to="/"><fa :icon="['fab', 'twitter']" /></NuxtLink>
        </li>
        <li>
          <NuxtLink to="/"><fa :icon="['fab', 'instagram']" /></NuxtLink>
        </li>
        <li>
          <NuxtLink to="/"><fa :icon="['fab', 'facebook-f']" /></NuxtLink>
        </li>
        <li>
          <NuxtLink to="/"><fa :icon="['fab', 'linkedin']" /></NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
  background-color: #f5f5f5;
  width: 100%;
  padding: 55px auto;

  .wrapper {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px auto;
    gap: 2rem;
    padding: 55px 0px;

    @media (max-width: 1024px) {
      width: 90%;
    }

    @media (max-width: 568px) {
      flex-direction: column;
      padding: 30px 0;
    }
  }

  .footer-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    @media (max-width: 568px) {
      justify-content: space-evenly;
      flex-direction: column;
    }

    li {
      padding: 0px 20px;

      @media (max-width: 768px) {
        padding: 0 10px;
      }

      a {
        text-transform: uppercase;
        font-size: 15px;
        font-weight: bold;
        color: #707070;

        @media (max-width: 768px) {
          font-size: 12px;
        }
      }
    }
  }

  .footer-socials {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    li {
      padding: 0px 10px;

      a {
        text-transform: uppercase;
        font-size: 22px;
        font-weight: bold;
        color: #000000;

        @media (max-width: 768px) {
          font-size: 15px;
        }
      }
    }
  }
}
</style>