<template>
  <main>
    <navbar />
    <div class="main">
      <div class="left">
        <div>
          <div>
          <h2>Login</h2>
          </div>
          <input-field label="Email/username" ></input-field>
          <input-field label="Password" type="password"></input-field>
          
          <div>
          <p class="fg-password" >Forgot password</p>
            <primary-button label="LOGIN" full=true />
            <p class="reg-alt" >Don't have an account with us already? Sign-up <NuxtLink to="/register" class="light-green-link">here</NuxtLink></p>
          </div>
        </div>
      </div>


      <div class="right">
        <div class="inner"> 
          <div class="right-left">
            <div class="image-r-l-top">
               <img src="../assets/images/dancer.jpg" alt="ad one"/>
            </div>
            <div class="image-r-l-bottom">
               <img src="../assets/images/photob.jpg" alt="ad one"/>
            </div>
          </div>
          <div class="right-right">
            <div class="image-r-r">
              <img src="../assets/images/photoa.jpg" alt="ad one"/>
            </div>
          </div>
        </div>
      </div>
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

.light-green-link{
  color: var(--light-green);
  cursor: pointer;
 
}
  .reg-alt{
    text-align: center;
     width: 80%;
     margin: auto;
     margin-top: 20px;
  }
  .fg-password{
    height: 30px;
    color: var(--light-green);
    text-align: right;
    cursor: pointer;
  }
  .main{
    display: flex;
    height: 92vh;
  }

  .left{
    width: 40%;
    display: flex;
    justify-content: center;

    @media screen and (max-width: 1200px){
       min-width: 100%;
      }


    div{
      width: 70%;
      margin: auto;
      
    }
  }

  .right{
    width: 60%;
    /* border: 1px solid red; */
      display: flex;
      justify-content: center;
      align-items: center;

      @media screen and (max-width: 1200px){
        visibility: hidden;
      }
    .inner{
      width: 95%;
      height: 95%;
      /* border: 1px solid red; */
      display: flex;
      gap: 20px;

    }

    .right-left{
      width: 50%;
      height: 100%;
      /* border: 1px solid rgb(0, 183, 255); */
      display: flex;
      gap: 20px;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
    }

    .right-right{
       width: 50%;
      height: 100%;
      /* border: 1px solid rgb(0, 183, 255); */
    
    }

    .image-r-l-top{
      height: 40%;
      width: 100%;
      background-color: var(--light-green);
      border-radius: 10px;
       overflow: hidden;
       img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .image-r-l-bottom{
        height:35%;
        width: 80%;
        background-color: var(--light-green);
        border-radius: 10px;
         overflow: hidden;

         img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .image-r-r{
      width: 100%;
      height: 100%;
      background-color: var(--light-green);
      border-radius: 10px;
      overflow: hidden;

      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

  }
</style>
