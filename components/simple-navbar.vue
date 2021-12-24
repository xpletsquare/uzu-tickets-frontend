<template>
  <div class="flex justify-between gap-3 items-center my-3 border px-10">
    <span>Home</span>
    <span>About Us</span>
    <span>Contact Us</span>
    <span>Bye</span>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class SimpleNavbar extends Vue {
    
  }
</script>

<style scoped>

</style>