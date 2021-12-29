

<template>
  <section class="layout-wrapper">
    <dashboard-navbar></dashboard-navbar>

    <section class="layout-grid">
      <div class="menu bg-gray-200">
        <dashboard-menu></dashboard-menu>
      </div>

      <div class="content">
        <nuxt></nuxt>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    middleware: ['authenticated']
  })
  export default class DashboardLayout extends Vue {
    
  }
</script>

<style lang="scss" scoped>
.layout-wrapper{
  display: grid;
  grid-template-rows: 60px auto;
  height: 100vh;
}

.layout-grid{
  display: grid;
  grid-template-columns: 300px auto;
  gap: 1em;

  >div{
    height: inherit;
    overflow-y: scroll;
  }
}

</style>