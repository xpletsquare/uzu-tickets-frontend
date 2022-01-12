
<template>
  <section class="wrapper">
    <div class="px-8 py-10 base border" v-if="showFullMenu">
      <div class="greeting text-green-500 px-2 font-semibold">Hi Jones</div>

      <div class="links-wrapper flex flex-col gap-1">
        <nuxt-link to="/dashboard/events">
          <span class="icon"><i class="fas fa-calendar-alt"></i></span>
          <span>Events</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/profile">
          <span class="icon"><i class="fas fa-user-alt"></i></span>
          <span>Profile</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/sales">
          <span class="icon"><i class="fas fa-money-check-alt"></i></span>
          <span>Sales</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/customers">
          <span class="icon"><i class="fas fa-user-friends"></i></span>
          <span>Customers</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/promoter">
          <span class="icon"><i class="fas fa-check-circle"></i></span>
          <span>Promoter</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/wallet">
          <span class="icon"><i class="fas fa-wallet"></i></span>
          <span>Wallet</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/developer">
          <span class="icon"><i class="fas fa-code"></i></span>
          <span>Development</span>
        </nuxt-link>
      </div>

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
import { StoreMutations } from '~/common/storeHelpers'

@Component
export default class DashboardMenu extends Vue {
  showFullMenu = true

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
  grid-template-rows: 50px auto 40px;
  gap: 1em;
  // font-size: 0.8em;

  .greeting {
    font-size: 22pt;
    color: #15b743;
    // color: var(--light-green);
  }

  .links-wrapper {
    margin-top: 1rem;
  }

  .logout button {
    font-size: 12pt;
    color: #000000;
  }
}

a {
  padding: 0.6em;
  font-size: 12pt;
  color: #000000;

  span.icon {
    margin-right: 10px;
    font-size: 14pt;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    color: var(--light-green);
  }
}
</style>