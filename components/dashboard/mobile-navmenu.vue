<template class="main">
<div>
  <div v-if="!isMobile()">
  <desktop>
  </desktop>
</div>
<div v-else>
  <section class="">
     <!-- <div v-if="!isMobile()"> -->
       <template v-if="!isHidden" >
          <div class="closed">
              <div v-on:click="isHidden = !isHidden">
                <i class="fas fa-bars bars" style=""></i>
                <div class="closedright">Page Name</div>
             </div>
          </div>    
       </template>   
<div class="wrapper" v-if="isHidden">
  <mobile>
    <template class="">
        <div class="links-wrapper flex flex-col gap-1">
                    <div>
        <div class="left">
            <span class="icon bars" style="font-size: 20pt; margin-left:5%"><i class="fas fa-times"  v-on:click="isHidden = !isHidden"></i></span>
        </div>
        <div class="right">Page Name</div>
        </div>
        <div style="margin-bottom:7%">
            <span class="font-medium uppercase user">Hi userName </span>
        </div>
          <nuxt-link class="pad" exact active-class="active" to="/dashboard">
            <span class="icon span"><i class="fas fa-home-alt"></i></span>
            <span>Dashboard</span>
          </nuxt-link>

          <nuxt-link class="pad" active-class="active" to="/dashboard/events">
            <span class="icon span"><i class="fas fa-calendar-alt"></i></span>
            <span>Events</span>
          </nuxt-link>

          <nuxt-link class="pad" active-class="active" to="/dashboard/profile">
            <span class="icon span"><i class="fas fa-user-alt"></i></span>
            <span>Profile</span>
          </nuxt-link>

          <nuxt-link class="pad" exact active-class="active" to="/dashboard/sales">
            <span class="icon span"><i class="fas fa-money-check-alt"></i></span>
            <span>Sales</span>
          </nuxt-link>

          <nuxt-link class="pad" exact active-class="active" to="/dashboard/customers">
            <span class="icon span"><i class="fas fa-user-friends"></i></span>
            <span>Customers</span>
          </nuxt-link>

          <nuxt-link class="pad" exact active-class="active" to="/dashboard/promoter">
            <span class="icon span"><i class="fas fa-check-circle"></i></span>
            <span>Promoter</span>
          </nuxt-link>

          <nuxt-link class="pad" exact active-class="active" to="/dashboard/wallet">
            <span class="icon span"><i class="fas fa-wallet"></i></span>
            <span>Wallet</span>
          </nuxt-link>

            
          <nuxt-link class="pad" exact active-class="active" to="/dashboard/developer">
            <span class="icon span"><i class="fas fa-code"></i></span>
            <span>Development</span>
          </nuxt-link>
        </div>
      </template>
  </mobile>
        <template v-if="showEventsMenu">
        <dashboard-events-menu></dashboard-events-menu>
      </template>

      <div class="logout px-2 pad">
        <button @click="logout">
          <span class="mr-2 span">
            <i class="fas fa-sign-out-alt"></i>
          </span>
          Logout
        </button>
      </div>
    </div> 
  </section>
</div>
</div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
import { AppState, StoreMutations } from '~/common/storeHelpers'

@Component
export default class DashboardMobileNav extends Vue {

    data () {
        return {
            isHidden: false
        }
    }
          isMobile(){
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
              return true
             } else {
                return false
          }
        }
  logout() {
    sessionStorage.removeItem('auth')
    this.$store.commit(StoreMutations.setUser, null)

    this.$router.push('/')
  }
    }   
</script>

<style lang="scss" scoped>
    .pad{
        padding-left: 2%;
        vertical-align: middle;
        height: 43pt;
        color: white;
    }
    .pad:hover{
      color: #000;
      background-color: #31D760;
    }
    .left{
        float: left;
        font-size: 20pt;
        margin-left: 2%;
    }
    .right{
        float:right;
        margin-right: 2%;
    }

    .wrapper{
        background-color: #002C0C;
        color: white;
        margin-top: 68pt;
    }
    .user{
      color: #31D760;
      font-size: 20pt;
      padding-left: 2%;
    }
    .span {
  min-height: 43pt;
  display: inline-flex;
  align-items: center;
}
.closed{
  background-color: #002C0C;
  border-radius: 50px;
  height: 52pt;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 68pt;
}

.bars{
  min-height: 52pt;
  display: inline-flex;
  align-items: center;
  height:25pt;
  width:25pt;
  color:white;
  margin-left: 2%;
}

.closedright{
  min-height: 52pt;
  display: inline-flex;
  align-items: center;
  color: white;
  float: right;
  margin-right: 2%;
}

.open{
  transform: translateX(100%);
}
</style>