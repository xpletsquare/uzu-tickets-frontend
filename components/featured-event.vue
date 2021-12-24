<template>
  <div class="featured">
    <img :src="imageUrl" alt="featured event" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FeaturedEvent extends Vue {
  @Prop({ type: String, required: true }) readonly imageUrl!: String
}
</script>

<style lang="scss" scoped>
.featured {
  border-radius: 10px;
  height: 180px;
  width: 100%;

  @media (max-width: 568px) {
    height: auto;
  }

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
