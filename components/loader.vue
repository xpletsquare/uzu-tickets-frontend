<template>
  <div class="loader">
    <div class="spinner"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loader extends Vue {}
</script>

<style scoped lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Adjust the height as needed */
}

.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #93eb97;
  border-top-color: #3fd246;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
