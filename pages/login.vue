<template>
  <main>
    <navbar />
    <div class="main">
      <div class="left">
        <div>
          <input-field></input-field>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';


  @Component
  export default class LoginPage extends Vue {
    
  }
</script>

<style lang="scss" scoped>
  .main{
    display: flex;
    height: 80vh;
  }

  .left{
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;

    div{
      width: 65%;
    }
  }
</style>
