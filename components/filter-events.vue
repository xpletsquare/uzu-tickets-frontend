<template>
  <div class="selectFilter">
    <h4 class="selectFilter__title">{{ label }}</h4>
    <div class="selectFilter__input" @click="handleShowOptions">
      <p>select {{ label }}</p>
      <div class="selectFilter__icon">
        <img
          class="selectFilter__iconImage"
          :class="showOptions ? 'selectFilter__iconImage--rotate' : ''"
          src="../assets/icons/downArrow.svg"
          alt=""
        />
      </div>
      <div v-show="showOptions" class="selectItemContainer">
        <div v-for="(option, index) in options" :key="index" class="selectItemContainer__checkItemContainer">
          <input
            :id="option"
            v-model="checkedOptions"
            :value="option"
            type="checkbox"
            class="selectItemContainer__input"
          />
          <label :for="option" class="selectItemContainer__label"
            ><span>{{ option }}</span></label
          >
        </div>
      </div>
    </div>
    <div class="selectFilter__tagsContainer">
      <p v-for="(tag, index) in tags" :key="index" class="selectFilter__tag">
        <span class="selectFilter__span">{{ tag }}</span>
        <span class="selectFilter__spanButton"
          ><img src="../assets/icons/greenButton.svg" alt="" @click="removeTag(tag)"
        /></span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class filterEvents extends Vue {
  @Prop({ type: Array, required: true }) readonly options!: string[]
  @Prop({ type: String, required: true }) readonly label!: string
  @Prop({ type: Array, required: true }) readonly tags!: string[]
  @Prop({ type: Array, required: false }) readonly modelValue!: string[]

  showOptions = false
  checkedOptions: string[] = [] as Array<string>

  //  watch for changes in the checkedOption
  @Watch('checkedOptions')
  onCheckedOptionsChange(newVal: string[], _: string[]) {
    // When the checked options change, emit the updated value
    this.$emit('input', newVal)
  }

  removeTag(tag: string) {
    const updatedSelectedItems = this.tags.filter((item) => item !== tag)
    this.checkedOptions = this.checkedOptions.filter((item) => item !== tag)
    this.$emit('input', updatedSelectedItems)
  }

  //  listen to tag-removed event on parent and then remove corresponding tag
  created() {
    this.$parent.$on('tag-removed', this.removeTag)
  }

  handleShowOptions() {
    this.showOptions = !this.showOptions
  }
}
</script>

<style lang="scss" scoped>
.selectFilter {
  width: 100%;
  height: max-content;
  color: #bfbfbf;
  font-weight: var(--medium-fontWeight);

  &__title {
    color: inherit;
    font-weight: inherit;
    text-transform: capitalize;
    font-size: 1rem;
  }

  &__input {
    width: 100%;
    height: 3rem;
    border-radius: 4px;
    border: 1px solid var(--main-green);
    font-size: 0.93rem;
    font-weight: inherit;
    padding: 1rem;
    text-align: left;
    position: relative;
    cursor: pointer;
    /* &:hover { */
    /* background-color: var(--dark-green); */
    /* border: 1px solid var(--dark-green); */
    /* } */

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
    width: 52%;

    &--rotate {
      transform: rotate(180deg);
    }
  }

  &__tagsContainer {
    width: 100%;
    height: max-content;
    padding-block: 1rem;
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

.selectItemContainer {
  width: 100%;
  max-height: 20vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: #ffffff;
  padding-bottom: 1rem;
  row-gap: 0.3rem;
  box-shadow: 0px 4px 54px 0px #00000012;
  position: absolute;
  left: 0;
  top: 110%;
  z-index: 2;
  scrollbar-width: thin;
  scrollbar-color: #868686 #ddd;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border: 5px solid white;
    /* border-radius: 10px; */
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
  }

  &__checkItemContainer {
    height: 2.5rem;
    width: 100%;
    position: relative;
    padding: 0.2rem;
  }

  &__label {
    display: block;
    position: relative;
    width: 100%;
    height: inherit;
    padding: 1rem;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background: #3fd2461a;
    }

    span {
      display: inline-block;
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &__label::after {
    content: none;
    position: absolute;
    display: inline-block;
    height: 9px;
    width: 16px;
    border-left: 2px solid #3fd246;
    border-bottom: 2px solid #3fd246;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%) rotate(-48deg);
  }

  &__input[type='checkbox'] {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  &__input[type='checkbox']:checked + &__label::after {
    content: '';
  }
  &__input[type='checkbox']:checked + &__label {
    background: #3fd2461a;
  }
}
</style>
