
<template>
  <div>
    <button class="p-3 rounded" @click="sayHi">{{ welcomeText }}</button>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class SimpleButton extends Vue {
    welcomeText = 'hello world';

    sayHi(){
      this.welcomeText = 'say hi'
    }
  }

</script>

<style lang="scss" scoped>
button{
  background: red;
}
</style>