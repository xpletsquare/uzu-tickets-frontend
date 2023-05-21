<template>
  <div class="container">
    <h1 class="font-bold text-xl mt-5 text-green-400">Welcome to Uzu Tiqets</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'dashboard',
})
export default class DashboardHome extends Vue {
  mounted() {
    this.$router.replace('/dashboard/events'); 
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 60%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    margin: 2rem auto;
    width: 100%;
  }
}
</style>