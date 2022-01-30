<template>
  <div class="wrapper">
    <span class="loader"></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FullScreenLoader extends Vue {}
</script>

<style scoped>
.wrapper {
  position: fixed;
  background: rgba(0, 0, 0, 0.719);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.loader {
	height: 40px;
  width: 40px;
  border: 3px solid white;
	border-top-color: gray;
  border-radius: 50%;
	animation: spin 1s linear infinite;
}


@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>