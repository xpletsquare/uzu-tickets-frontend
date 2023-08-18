
<template>
  <section class="wrapper">
    <div class="px-8 py-10 base">
      <template v-if="!showEventsMenu">
        <!-- <div class="greeting text-green-500 px-2 font-semibold capitalize">Hi {{name}}</div> -->

        <div class="links-wrapper flex flex-col gap-1">
          <!-- <nuxt-link exact active-class="active" to="/dashboard">
            <span class="icon"><i class="fas fa-home-alt"></i></span>
            <span>Dashboard</span>
          </nuxt-link> -->

          <nuxt-link active-class="active" to="/dashboard/events">
            <span class="icon"><i class="fas fa-calendar-alt"></i></span>
            <span>Events</span>
          </nuxt-link>

         
          <!-- <nuxt-link exact active-class="active" to="/dashboard/sales">
            <span class="icon"><i class="fas fa-money-check-alt"></i></span>
            <span>Sales</span>
          </nuxt-link> -->

          <nuxt-link exact active-class="active" to="/dashboard/transactions">
            <span class="icon"><i class="fas fa-address-book"></i></span>
            <span>Ticket Sales</span>
          </nuxt-link>

          <!-- <nuxt-link exact active-class="active" to="/dashboard/promoter">
            <span class="icon"><i class="fas fa-check-circle"></i></span>
            <span>Promoter</span>
          </nuxt-link> -->

          <!-- <nuxt-link exact active-class="active" to="/dashboard/wallet">
            <span class="icon"><i class="fas fa-wallet"></i></span>
            <span>Wallet</span>
          </nuxt-link> -->

          <nuxt-link active-class="active" to="/dashboard/profile">
            <span class="icon"><i class="fas fa-user-alt"></i></span>
            <span>Profile</span>
          </nuxt-link>


          <nuxt-link exact active-class="active" to="/dashboard/developer">
            <span class="icon"><i class="fas fa-code"></i></span>
            <span>Developer</span>
          </nuxt-link> 
 

           <!-- activate event creation -->
          <div class="activate-account-section">
            <div>
              <div class="activate-icon"><i class="fas fa-solid fa-paper-plane"></i></div>
              <p>If you are having any troubles using uzu tickets, contact our support and be sure to get feedback within 3 hours. <br> <br> <br>Version 1.0 </p>

              <div class="activate-button">Support</div>
            </div>
          </div>

            <!-- activate event creation -->
            <!-- <div class="activate-account-section">
            <div>
              <div class="activate-icon"><i class="fas fa-check-double"></i></div>
              <p>Are you an event owner? activate our event managemnet feature to enable you create and manage events.</p>

              <div class="activate-button">Activate</div>
            </div>
          </div> -->

        </div>

       

      </template>

      <template v-if="showEventsMenu">
        <dashboard-events-menu></dashboard-events-menu>
      </template>

     

      <div class="logout px-2">
        <button @click="logout">
          <span class="mr-2">
            <i class="fas fa-sign-out-alt"></i>
          </span>
          Logout
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppState, StoreMutations } from '~/common/storeHelpers'

@Component
export default class DashboardMenu extends Vue {
  get showEventsMenu() {
    return (
      this.$route.path.includes('/dashboard/events/create') || this.$route.path.includes('/dashboard/events/details')
    )
  }

  get name() {
    const { currentUser } = this.$store.state as AppState
    return currentUser?.firstName || currentUser?.lastName || 'User'
  }

  logout() {
    sessionStorage.removeItem('auth')
    this.$store.commit(StoreMutations.setUser, null)

    this.$router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.base {
  display: grid;
  height: 90vh;
  grid-template-rows: auto 40px;
  gap: 1em;
  // font-size: 0.8em;

  // .greeting {
  //   font-size: 22pt;
  //   color: #15b743;
  //   // color: var(--light-green);
  // }

  .links-wrapper {
    margin-top: 1rem;
  }

  .logout button {
    font-size: 12pt;
    color: var(--light-green);
  }
}

a {
  padding: 0.6em 1.5em;
  font-size: 12pt;
  transition: all .1s cubic-bezier(0.075, 0.82, 0.165, 1);
  /* color: var(--light-green); */
  color: #dbdbdb;
  /* background: rgba(255, 255, 255, 0.277); */
  background: none;
  border: 1px solid var(--light-green);
  /* border: 1px solid var(--light-green); */
  border-radius: 5px;
  margin-bottom: 12px;

  span.icon {
    display: inline-block;
    font-size: 14px;
    width: 40px;
  }

  &:hover,
  &.active {
    background-color: var(--light-green);
    color: var(--dark-green);
    font-weight: 500;
  }
}

.activate-account-section{
  width: 100%;
  color: white;
  text-align: center;
  font-size: 9pt;
  margin: 20px auto;

  .activate-icon{
    color: var(--light-green);
    font-size: 30px;
  }
  p{
    color: rgba(229, 255, 223, 0.815);
    padding: 10px 20px;
  }

  .activate-button{
    border: 1px solid var(--light-green);
    width: max-content;
    color: rgba(229, 255, 223, 0.815);
    margin: auto;
    padding: 5px 8px;
    border-radius: 30px;
    cursor: pointer;

    &:hover{
      background-color: var(--light-green);
      color: var(--dark-green);
    }
  }
}
</style>