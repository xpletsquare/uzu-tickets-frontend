<template>
  <main>
    ABout page
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    layout: 'public'
  })
  export default class IndexPage extends Vue {
    userName = 'ken';

    changeuserName(){
      this.userName = 'new name';
    }
  }
</script>

<style scoped>

</style>
