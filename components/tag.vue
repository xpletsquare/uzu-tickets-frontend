<template>
  <button class="tag">
    <span>
      {{ value }}
    </span>

    <span class="icon">
      <fa icon="times" />
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Tag extends Vue {
  @Prop({ type: String, required: true }) readonly value!: String
}
</script>

<style lang="scss" scoped>
.tag {
  background-color: var(--pale-green);
  border: 1px solid #15b743;
  color: #15b743;
  border-radius: 20px;
  padding: 10px;
  font-size: 12px;
  gap: 12px;
  //   position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .icon {
    // position: absolute;
    // top: 30%;
    // right: 1%;
    width: 17px;
    height: 17px;
    font-weight: bold;
    color: #31d760;
  }
}
</style>


