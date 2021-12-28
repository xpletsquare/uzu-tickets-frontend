
<template>
  <section class="wrapper">
    <div class="px-8 py-10 base border" v-if="showFullMenu">
      <div class="greeting text-green-500 font-semibold">Hello Jones</div>

      <div class="links-wrapper flex flex-col gap-1">
        <nuxt-link to="/dashboard/events">
          <span><i class="fas fa-chevron-left"></i></span> 
          <span>Events</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/profile">
          <span><i class="fas fa-chevron-left"></i></span> 
          <span>Profile</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/sales">
          <span><i class="fas fa-chevron-left"></i></span> 
          <span>Sales</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/customers">
          <span><i class="fas fa-chevron-left"></i></span> 
          <span>Customers</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/promoter">
          <span><i class="fas fa-chevron-left"></i></span> 
          <span>Promoter</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/wallet">
          <span><i class="fas fa-chevron-left"></i></span> 
          <span>Wallet</span>
        </nuxt-link>

        <nuxt-link to="/dashboard/developer">
          <span><i class="fas fa-chevron-left"></i></span> 
          <span>Development</span>
        </nuxt-link>
      </div>

      <div>
        <button @click="logout">Logout</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class DashboardMenu extends Vue {
    showFullMenu = true;

    logout(){
      this.$router.push('/');
    }
  }
</script>

<style lang="scss" scoped>
.base{
  display: grid;
  height: 90vh;
  grid-template-rows: 50px auto 40px;
  gap: 1em;
  font-size: 0.8em;
}

a{
  padding: 0.8em;

  &:hover{
    background-color: rgba(255, 255, 255, 0.4);
  }

}
</style>