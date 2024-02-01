<template>
  <div class="main">
    <div class="nav-container">
      <div class="nav">
        <div class="nav-logo">
          <NuxtLink to="/">
            <img class="w-14 h-auto hidden md:inline-block" alt="logo" src="~/assets/images/logo.svg" />
            <img class="w-12 h-auto inline-block md:hidden" alt="logo" src="~/assets/images/mobile-logo.svg" />
          </NuxtLink>
        </div>

        <!-- ============= Mobile Nav Icon =========== -->
        <div class="mobile" @click="showMobileNav">
          <div class="icon">
            <fa icon="bars" />
          </div>
        </div>
      </div>

      <div class="nav-links-container" :class="{ 'nav-height': showNav }">
        <ul class="nav-links">
          <li>
            <NuxtLink to="/">HOME</NuxtLink>
          </li>
          <li @click="showMessage">
            <NuxtLink to="/">BUY TICKETS</NuxtLink>
          </li>
          <li @click="showMessage">
            <NuxtLink to="/">ABOUT</NuxtLink>
          </li>
          <li @click="showMessage">
            <NuxtLink to="/">BLOG</NuxtLink>
          </li>

          <li v-show="!isLoggedIn">
            <NuxtLink to="/register">REGISTER</NuxtLink>
          </li>
          <li v-show="!activeUser.email">
            <primary-button class="w-full" label="Create Event" link_to="/login"></primary-button>
          </li>

          <NuxtLink
            v-show="isLoggedIn"
            to="/dashboard"
            class="inline-flex rounded items-center gap-4 md:p-3 cursor-pointer hover:bg-gray-100 text-black hover:text-black"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
// import { AppState } from '~/common/storeHelpers'

@Component
export default class Navbar extends Vue {
  showNav = false

  get isLoggedIn() {
    return this.$store.getters.isLoggedIn
  }

  get activeUser() {
    return this.$store.getters.currentUser
  }

  showMobileNav() {
    this.showNav = !this.showNav
  }

  showMessage() {
    message.info('coming soon')
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: max-content !important;
  padding-block: 20px;
  /*box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05); */
  @media (max-width: 768px) {
    width: 100%;
  }
}

.nav-container {
  width: 80%;
  height: max-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
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
    width: 100%;
  }

  // .nav-logo {
  //   display: block;

  //   @media (max-width: 768px) {
  //     // display: none;
  //   }
  // }

  .mobile {
    display: none;
    &:hover {
      cursor: pointer;
    }

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
}

.nav-links-container {
  width: 80%;
  display: flex;
  justify-items: center;
  align-items: center;
  height: auto;

  @media (max-width: 768px) {
    overflow: hidden;
    height: 0;
  }
}

.nav-links {
  display: flex;
  /* height: auto; */
  width: max-content;
  justify-content: space-between;
  margin-inline: auto;
  align-items: center;
  gap: 30px;
  transition: all 0.3s;

  @media (max-width: 1204px) {
    gap: 0px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  li {
    padding: 4px 24px;

    a {
      display: inline-block;
      width: 100%;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 600;
      color: #0f1711;
      width: max-content;
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

.nav-height {
  @media (max-width: 768px) {
    height: 325.5px;
  }
}
</style>
