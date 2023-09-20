<template>
  <div class="search">
    <input
      :value="modelValue"
      type="search"
      name="search"
      placeholder="search event name"
      autocomplete="off"
      @input="handleInput"
    />
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
  @Prop({ type: String, required: false }) modelValue!: string
  @Prop({ type: String, required: false }) searchText!: string

  // Emit a custom event to update the modelValue prop in the parent component
  handleInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value
    // Emit an 'input' event with the new value
    this.$emit('input', inputValue)
  }
}
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  max-width: 40rem;
  /* margin-bottom: 32px; */
  position: relative;

  input[type='search'] {
    border: 1px solid var(--main-green);
    border-radius: 50px;
    padding: 16px 20px;
    padding-left: 55px;
    background-color: #fff;
    width: 100%;
    outline: none;
    font-weight: var(--medium-fontWeight);

    &:focus {
      border: 1px solid var(--main-green);
    }

    &::placeholder {
      font-size: 16px;
      font-weight: var(--medium-fontWeight);
      color: #bfbfbf;
    }

    @media (max-width: 768px) {
      padding-left: 50px;
    }
  }

  .icon {
    position: absolute;
    top: 20px;
    left: 18px;
    transform: translateY(-50%);
    width: 17px;
    height: 17px;
    font-size: 22px;
    font-weight: bold;
    color: #bfbfbf;
    @media (max-width: 768px) {
      font-size: 18px;
      top: 25px;
    }
  }
}
</style>
