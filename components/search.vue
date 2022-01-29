<template>
  <div class="search">
    <input type="search" name="search" :placeholder="placeholder" />
    <span class="icon">
      <fa icon="search" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Search extends Vue {
  @Prop({ type: String, required: true }) readonly placeholder!: string
}
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 32px;
  position: relative;

  input[type='search'] {
    border: 1px solid var(--light-grey);
    border-radius: 5px;
    padding: 16px 20px;
    background-color: #fff;
    width: 100%;
    outline: none;

    &:focus{
       border: 1px solid var(--light-green);
    }
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