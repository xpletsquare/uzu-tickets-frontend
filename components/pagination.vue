<template>
  <a-pagination :current="current" :total="total" show-less-items />
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {

  @Prop() current: any
  @Prop() total: any
}
</script>