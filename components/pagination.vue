<template>
  <a-pagination :current="current" :total="50" show-less-items />
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  current = 2
}
</script>