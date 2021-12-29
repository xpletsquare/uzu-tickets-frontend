



<template>
  <div class="main">
    <div class="container">
      <div class="top_label">
        <div class="left">
          <h1>Events</h1>
          <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
        </div>
        <div class="right">
          <primary-button class="desktop-button" label="create" />
        </div>
      </div>
      <total-event-sales></total-event-sales>
      <dashboard-events-card></dashboard-events-card>
      <dashboard-events-card></dashboard-events-card>
      <dashboard-events-card></dashboard-events-card>
      <dashboard-events-card></dashboard-events-card>
      <dashboard-events-card></dashboard-events-card>
    </div>

    <div class="round-btn">+</div>

    
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    layout: 'dashboard'
  })
  export default class ProfilePage extends Vue {
    
  }
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
    display: flex;
  }
  .container{
    width: 60%;
    height: 100%;
    /* border: 1px solid red; */

    @media screen and (max-width: 900px){
      width: 100%;
    }

    @media screen and (max-width: 1200px){
      width: 90%;
    }

    .top_label{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;

      .right{
        display: flex;
        @media screen and (max-width: 900px){
          display: none;
        }
      }
    }
  }

  h1{
    font-size: 20pt;
    font-weight: 600;
    margin: 0;
  }

  .round-btn{
    width: 50px;
    height: 50px;
    background-color: var(--light-green);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-content: center;
    position: absolute;
    bottom: 50px;
    right: 50px;
    z-index: 200;
    cursor: pointer;
    color: white;
    font-size: 20pt;
    margin: 0;
    box-shadow: 10px 10px 10px (var(--light-green), 0.5);

    @media screen and (min-width: 900px){
      display: none;
    }
  }
</style>