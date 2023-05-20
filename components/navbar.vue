<template>
  <div class="main">
    <div class="nav">
      <div class="nav-logo">
        <NuxtLink to="/">
          <img class="w-24 hidden md:inline-block" alt="logo" src="~/assets/images/logo.svg" />
          <img class="w-12 inline-block md:hidden" alt="logo" src="~/assets/images/mobile-logo.svg" />
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
          <NuxtLink to="/">HOME</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">BUY TICKETS</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">ABOUT</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">BLOG</NuxtLink>
        </li>

        <li v-show="activeUser.email === ''">
          <NuxtLink to="/register">REGISTER</NuxtLink>
        </li>
        <li v-show="activeUser.email === ''">
          <primary-button label="LOGIN" link_to="/login"></primary-button>
        </li>

        <NuxtLink
          to="/dashboard"
          v-show="activeUser.email !== ''"
          class="
            inline-flex
            rounded
            items-center
            gap-4
            md:p-3
            cursor-pointer
            hover:bg-gray-100
            text-black
            hover:text-black
          "
        >
          <span class="font-medium uppercase">Dashboard</span>
          <!-- <span class="font-medium uppercase">{{ userName }}</span> -->
          <div class="w-8 h-8 rounded-full bg-gray-800 inline-flex justify-center items-center text-gray-50">
            <i class="fas fa-user-alt"></i>
          </div>
        </NuxtLink>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppState } from '~/common/storeHelpers'

@Component
export default class Navbar extends Vue {
  get activeUser() {
    const { currentUser } = this.$store.state as AppState
    return currentUser
  }

  // showNav() {
  //   const nav = document.getElementById("mobileNav");
  //   nav.classList.toggle("hidden");
  // },
}
</script>

<style lang="scss" scoped>
.main {
  max-height: 75px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
}

.nav {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  /* border: 1px solid red; */

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    margin: 10px auto;
  }

  /* .nav-logo {
     display: block;

     @media (max-width: 768px) {
        display: none;
     }
   } */

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

    @media (max-width: 1024px) {
      gap: 0px;
    }

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