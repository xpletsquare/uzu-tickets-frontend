<template>
  <div class="nav">
    <div class="nav-logo">
      <NuxtLink to="/">
        <img alt="logo" src="~/assets/images/logo.svg" />
      </NuxtLink>
    </div>

    <!-- ============= Mobile Nav Icon =========== -->
    <div class="mobile">
      <div class="icon">
        <fa icon="bars" />
      </div>
    </div>

    <ul class="nav-links">
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/">BUY TICKETS</NuxtLink>
      </li>
      <li>
        <primary-button label='BUY TICKETS' ></primary-button>
      </li>


    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {
  // showNav() {
  //   const nav = document.getElementById("mobileNav");
  //   nav.classList.toggle("hidden");
  // },
}
</script>

<style lang="scss" scoped>
.nav {
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;

  @media (max-width: 1024px) {
    width: 90%;
  }

  .mobile {
    display: none;

    @media (max-width: 768px) {
      display: block;

      .icon {
        font-size: 30px;
        color: #0f1711;
        width: 45px;
        height: 45px;
        font-weight: bold;
        display: flex;
        justify-content: center;
      }
    }
  }

  .nav-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;

    @media (max-width: 768px) {
      display: none;
    }

    li {
      padding: 14px 24px;

      a {
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 600;
        color: #0f1711;
      }

      &.nav-button {
        background-color: #31d760;
        border-radius: 5px;

        a {
          color: #ffffff;
        }
      }
    }
  }
}
</style>