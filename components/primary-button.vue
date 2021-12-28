<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  props: ['label', 'full', 'loading', 'link_to', 'buttonClass']
})
export default class PrimaryButton extends Vue {
  @Prop() label!: string
  @Prop() full!: boolean
  @Prop() loading!: boolean
  @Prop() link_to!: string
  @Prop() buttonClass!: string

  get styleClasses(){
    return {
      loader: this.loading ? 'loader' : 'hide',
      button: `${this.buttonClass || ''} ${this.full ? 'full' : ''} inline-flex gap-2`
    }
  }

  handleClick(){
    this.goToLink();
    this.emitClick();
  }

  goToLink(){

    if(!this.link_to){
      return;
    }

    this.$router.push(this.link_to);
  }

  emitClick(){
    this.$emit('click');
  }
}

</script>

<template>
  <button :class="styleClasses.button" @click="handleClick">
    <span>{{ label }}</span>
    <div :class="styleClasses.loader"></div>
  </button>
</template>


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
  opacity: 0.6;
  border: 2px solid var(--white); /* Light grey */
  border-top: 2px solid var(--light-green); /* white */
  border-radius: 50%;
  width: 17px;
  height: 17px;
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