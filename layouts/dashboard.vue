

<template>
  <section class="layout-wrapper">
    <dashboard-navbar></dashboard-navbar>

    <section class="layout-grid">
      <div class="menu">
        <dashboard-menu></dashboard-menu>
      </div>

      <div class="content">
        <nuxt></nuxt>
      </div>
    </section>

    <!-- GOOGLE MAPS INTEGRATION -->
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQETAxXCxJ867hOECYndGOIIBMvRrCGsQ&libraries=places"></script>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppState } from '~/common/storeHelpers'

@Component({
  middleware: ['authenticated'],
})
export default class DashboardLayout extends Vue {
  get activeUser(){
    const state = this.$store.state as AppState;
    return state.currentUser;
  }
}
</script>

<style lang="scss" scoped>

.ant-pagination-item-active{
  border-color: red !important;
}

.menu{
  background-color: var(--dark-green);
  /* background-color: var(--dark-green); */
}
.layout-wrapper {
  display: grid;
  grid-template-rows: 80px auto;
  height: 100vh;

  @media (max-width: 1024px) {
    grid-template-rows: 75px auto;
  }
}

.content{
  padding: 2em;
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 80px);
}

.layout-grid {
  display: grid;
  grid-template-columns: 300px auto;
  gap: 1em;

  // >div{
    //   height: inherit;
  //   overflow-y: scroll;
  // }

  @media (max-width: 768px) {
    grid-template-columns: auto;

    .menu {
      display: none;
    }
  }
}
</style>