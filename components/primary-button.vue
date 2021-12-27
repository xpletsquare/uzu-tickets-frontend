<script lang="ts" setup>
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class PrimaryButton extends Vue {
  @Prop() label?: string
  @Prop() full?: boolean
  @Prop() loading?: boolean
  @Prop() link_to?: string
}
</script>

<template>
  <NuxtLink :to="link_to ? link_to : ''">
    <button :class="full ? 'full' : ''">
      {{ label }}
      <div :class="loading ? 'loader' : 'hide'"></div>
    </button>
  </NuxtLink>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 150px;
  background-color: var(--light-green);
  height: 45px;
  border-radius: 2.5px;
  color: var(--white);
  padding: 0 30px;
  text-transform: uppercase;
  font-weight: 600;

  div {
    display: inline;
  }

  &:hover {
    background-color: var(--dark-green);
  }
}

.full {
  width: 100%;
}
.hide {
  visibility: hidden;
}
.loader {
  border: 3px solid var(--white); /* Light grey */
  border-top: 3px solid var(--light-green); /* white */
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
