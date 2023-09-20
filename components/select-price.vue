<template>
  <div class="selectPrice">
    <h4 class="selectPrice__title">Price</h4>
    <div class="selectPrice__input">
      <div class="selectContainer">
        <select
          id="max-price"
          v-model="value"
          class="selectContainer__selectInput"
          name="max-price"
          @change="handlePriceChange"
        >
          <option class="selectContainer__selectInput" disabled value="">Select Price</option>
          <option class="selectContainer__selectInput" :value="0">Free</option>
          <option class="selectContainer__selectInput" :value="Number.MAX_VALUE">Paid</option>
        </select>
        <div class="selectPrice__icon">
          <img class="selectPrice__iconImage--smaller" src="../assets/icons/downArrow.svg" alt="" />
        </div>
      </div>
    </div>
    <div v-show="showTag" class="selectPrice__tagsContainer">
      <p class="selectPrice__tag">
        <span class="selectPrice__span">{{ value === 0 ? 'Free' : 'Paid' }}</span>
        <span class="selectPrice__spanButton"><img src="../assets/icons/greenButton.svg" alt="" @click="reset" /></span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class SelectPrice extends Vue {
  showTag = false
  value: string | number = ''

  handlePriceChange() {
    this.$emit('update:price', this.value)
    this.showTag = true
  }

  reset() {
    this.value = ''
    this.showTag = false
    this.$emit('update:price', '')
  }

  // Listen for the emitted event
  created() {
    this.$parent.$on('price-tag-removed', this.handlePriceTagRemoved)
  }

  // Define a method to handle the event
  handlePriceTagRemoved() {
    // Handle the removal of the price tag here
    this.value = ''
    this.showTag = false
    this.$emit('update:price', '')
  }
}
</script>
<style lang="scss" scoped>
.selectPrice {
  width: 100%;
  height: max-content;
  color: #bfbfbf;
  font-weight: var(--medium-fontWeight);
  margin-bottom: 1.5rem;

  &__title {
    color: inherit;
    font-weight: inherit;
    text-transform: capitalize;
    font-size: 1rem;
  }

  &__input {
    width: 100%;
    height: 3rem;
    border-radius: 5px;
    /* border: 1px solid var(--main-green); */
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
    font-weight: inherit;
    padding-block: 1rem;
    text-align: left;
    position: relative;
    cursor: pointer;

    p {
      position: absolute;
      top: 50%;
      left: 1rem;
      text-transform: capitalize;
      transform: translateY(-50%);
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__iconImage {
    width: 75%;

    &--smaller {
      width: 52%;
    }
  }

  &__tagsContainer {
    width: 100%;
    height: max-content;
    padding-top: 1rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 0.5rem;
  }

  &__tag {
    padding: 0.3rem 0.6rem;
    border-radius: 50px;
    border: 1px solid #3fd246;
    display: flex;
    justify-content: flex-start;
    margin-block: auto;
    align-items: center;
    gap: 0.8rem;
    color: #3fd246;
    background: #3fd2461a;
  }

  &__span {
    display: inline-block;
  }

  &__spanButton {
    cursor: pointer;
  }
}

.selectContainer {
  width: 100%;
  height: 3rem;
  border-radius: 5px;
  position: relative;
  cursor: pointer;

  &__selectInput {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 100%;
    height: 100%;
    padding-inline: 1rem;
    border-radius: 5px;
    background-color: white;
    border: 1px solid var(--main-green);
    cursor: pointer;
  }
}
</style>
