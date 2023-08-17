<template>
  <div>
    <navbar />
    <section class="content-wrapper">
      <nuxt />
    </section>
    <main-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {}
</script>

<style scoped>
.content-wrapper{
  min-height: auto;
}
.ant-pagination-item-active{
  border-color: red !important;
}
</style>