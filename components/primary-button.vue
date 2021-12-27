<template>
  <button>button</button>
</template>

<script lang="ts" setup>
</script>


<style lang="scss" scoped>
button {
  min-width: max-content;
  background-color: var(--light-green);
  height: 45px;
  border-radius: 2.5px;
  color: var(--white);
  padding: 0 30px;
  text-transform: uppercase;

  &:hover {
    background-color: var(--dark-green);
  }
}
</style>