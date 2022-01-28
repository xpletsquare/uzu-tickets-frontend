<script lang="ts" setup>
  console.log('jones')
</script>

<template>
  <div class="main">
    <div class="inner">

          <div class="left">

            <div class="logo">
              <img src="../assets/images/logo-update.png">
            </div>
          <h1 class="title">
            We are creating <br>
            a <span class="highlight"><span></span>seamless</span><br>
            <span class="highlight"><span></span>ticketing</span> experience <br>
            for event managers <br>
            and attendees. <br>
          </h1>

          <div class="md:hidden mobile">
            <img src="../assets/images/mobile-landing.png"> 
          </div>
          

          <div class="email-list hidden">
            <div class="email-list-tag"> Sign up to our email list <img class="send-img" src="../assets/images/send.svg"> </div>

            <div class="form">

              <input-field
                label="Firstname"
              ></input-field>
              <input-field
                label="Lastname"
              ></input-field>
              <input-field
                label="Email"
              ></input-field>

              <primary-button
                label="Join waiting list"
              ></primary-button>
              
            </div>

          </div>

          <div class="socials">
            <p>For more insights and updates about uzu tickets<br>
            Follow us on our social media channels.</p>

            <div class="social_links">
              <a href="https://twitter.com/uzutickets" target="_blank"><i class="fab fa-twitter"></i></a>
              <a href="https://instagram.com/uzutickets" target="_blank"><i class="fab fa-instagram"></i></a>
              <a href="https://web.facebook.com/uzutickets/" target="_blank"><i class="fab fa-facebook-f"></i></a>
            </div>
          </div>
        </div>

        <div class="right hidden md:flex">
          <img src="../assets/images/landing.png">
        </div>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>

  .logo{
    margin: 20px 0;
  }
  .mobile{
    img{
      min-width: 120%;
      transform: translateX(-3%);
    }
  }

  .highlight{
  
    position: relative;
    span{
        display: inline-block;
        position: absolute;
        height: 20px;
        width: 100%;
        left: 0;
        bottom: 0;
        z-index: -2;
        background-color: var(--light-green);
    }
  }

  .send-img{
    display: inline-block;
    max-width: 30px;
    height: auto;
  }

  .email-list-tag{
    color: var(--dark-green);
    font-size: 15pt;
    margin: 30px 0;
  }

.socials{
  margin: 25px 0;
  p{
    font-weight: 200;
  }
}  

.social_links{
  width: 30%;
  display: flex;
  justify-content: space-between;
  a{

    color: var(--dark-green);
    font-size: 25px;

    &:hover{
      color: var(--light-green);
    }

  }
}

  .title{
    font-size: 35pt;


      @media screen and (max-width: 920px){
          font-size: 25pt;
        }
  }
  .main{
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    overflow-x:hidden ;

    @media screen and (max-width: 920px){
      justify-content: center;
      align-items: flex-start;
      padding: 80px 0;
      /*  */
    }

    .inner{

      display: flex;
      width: 70%;

      @media screen and (max-width: 920px){
          width: 92%;
        }

      .left{
        width: 50%;
        /* border: 1px solid red; */
        @media screen and (max-width: 920px){
          width: 100%;
        }
      }

      .right{
        /* overflow: hidden; */
        img{
          position: absolute;
          min-width: auto !important;
        }
      }
    }

  }

  
</style>
