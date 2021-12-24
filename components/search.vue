<template>
  <div class="search">
    <input type="search" name="search" placeholder="Search event" />
    <span class="icon">
      <fa icon="search" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Search extends Vue {}
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 32px;
  position: relative;

  input[type='search'] {
    border: 1px solid #707070;
    border-radius: 5px;
    padding: 16px 20px;
    background-color: #fff;
    width: 100%;
  }

  .icon {
    position: absolute;
    top: 30%;
    right: 6%;
    width: 17px;
    height: 17px;
    // font-size: 22px;
    font-weight: bold;
    color: #31d760;
  }
}
</style>