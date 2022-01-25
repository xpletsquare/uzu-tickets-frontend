



<template>
  <div class="main">
    <div class="container">
      <div class="top_label">
        <div class="left">
          <h1>Schedules</h1>
          <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
        </div>
        
      </div>
      <p>Improve discoverability of your event by adding tags relevant to the subject matter.</p>

      <div class="form-field">
        <input-field class="input" label="Date"/>
        <input-field label="Start time"/>
        <input-field label="End time"/>
        <div class="right">
          <primary-button class="desktop-button" label="Add" />
        </div>
      </div>

      <div class="added_schedules">

        <div class="schedule">
          <div class="schedule-item">
            <div class="schedule_title"> Schedule 1</div>
            <div class="date"> 02/13/2022</div>
          </div>

          <div class="schedule-item">
            <div class="start_time_label">Start time</div>
            <div class="start_time"> 02/13/2022</div>
          </div>

          <div class="schedule-item">
            <div class="end_time_label"> End time</div>
            <div class="end_time"> 02/13/2022</div>
          </div>

          <div class="Close">
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
          </div>
          

        </div>
        <div class="schedule">
          <div class="schedule-item">
            <div class="schedule_title"> Schedule 2</div>
            <div class="date"> 02/13/2022</div>
          </div>

          <div class="schedule-item">
            <div class="start_time_label"> Start time</div>
            <div class="start_time"> 02/13/2022</div>
          </div>

          <div class="schedule-item">
            <div class="end_time_label"> End time</div>
            <div class="end_time"> 02/13/2022</div>
          </div>

          <div class="Close">
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
          </div>
          

        </div>
      </div>
     
      
    </div>

    <div class="round-btn">+</div>

    
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    layout: 'dashboard'
  })
  export default class Schedules extends Vue {
    
  }
  
</script>

<style lang="scss" scoped>
  .main{
    width: 100%;
    height: 100%;
    /* border: 1px solid red; */
    display: flex;
  }

.schedule{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid var(--ash);
}
  .schedule_title{
    font-weight: 700;
    font-size: 14pt;
  }

  .form-field{
    display: flex;
    justify-content: space-between;
    gap: 10px;
    border-bottom: 1px solid var(--ash);
    padding-bottom: 40px;
    width: 100%;
  }

  .icon{
    font-size: 24pt;
    cursor: pointer;

    &:hover{
      color: red;
    }
  }

 .desktop-button{
   /* border: 1px solid red; */
 }

 .right{
   /* border: 1px solid; */
   margin: 0 !important;
   /* height: max-content; */
   display: flex;
   justify-content: center;
   align-items: center;
   /* transform: translateX(0px); */
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
      /* justify-content: center; */
      /* align-items: center; */
      gap: 30px;

     
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