<template>
  <div class="main">
    <div class="nav pt-3">
      <div class="nav-logo">
        <NuxtLink to="/">
          <img class="w-16 h-auto hidden md:inline-block" alt="logo" src="~/assets/images/logo.svg" />
          <img class="w-12 h-auto inline-block md:hidden" alt="logo" src="~/assets/images/mobile-logo.svg" />
        </NuxtLink>
      </div>

      <div class="inline-flex rounded items-center gap-4 md:p-3 cursor-pointer hover:bg-gray-100" v-if="userName">
        <span class="font-medium uppercase">{{ userName }}</span>
        <div class="w-8 h-8 rounded-full bg-gray-800 inline-flex justify-center items-center text-gray-50">
          <i class="fas fa-user-alt"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppState } from '~/common/storeHelpers'

@Component
export default class DashboardNavbar extends Vue {
  get userName() {
    const state = this.$store.state as AppState
    return state.currentUser?.firstName || ''
  }
}
</script>

<style lang="scss" scoped>
.main {
  max-height: 80px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    max-height: 75px;
  }
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 2em;
  height: inherit;

  @media (max-width: 1024px) {
    // width: 90%;
  }

  // @media (max-width: 768px) {
  //   margin: 10px auto;
  // }

  // .nav-logo {
  //   display: block;
  //   position: relative;
  //   // top: -5px;

  //   // @media (max-width: 768px) {
  //   //   display: none;
  //   // }
  // }
}
</style>