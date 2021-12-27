<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SelectInput extends Vue {
  @Prop({ type: String, required: true }) readonly value!: String
}
</script>

<style lang="scss" scoped>
</style>


