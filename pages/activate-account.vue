<template>
  <div class="mx-auto mt-12 w-9/11 md:w-1/3" v-if="email">
    <div class="text-center font-semibold text-xl">Activate Account</div>

    <div class="text-gray-600 mb-2 mt-2">
      Hi, we've sent an activation pin to your email <span class="text-green-500 font-semibold">{{email}}</span>. 
      Please enter the 6 digit pin here to continue.
    </div>

     <input v-model="pin" class="block border border-green-400 p-3 w-full rounded outline-none focus:outline-none" type="text" maxlength="6">

     <div class="mt-8">
       <primary-button @click="submitActivationPin" :loading="isLoading" label="Continue"></primary-button>
     </div>


     <div class="mt-10">
       Not <span class="text-green-500 font-semibold">{{email}}</span>, click <button class="font-semibold" @click="allowUserSignup">here</button> to signup.
     </div>
  </div>
</template>

<script lang="ts">
  import { message } from 'ant-design-vue';
import { Component, Vue } from 'vue-property-decorator';
import { AuthApi } from '~/common/api/auth.api';
import { StoreMutations } from '~/common/storeHelpers';
import { catchAsync } from '~/common/utilities';

  @Component({
    layout: 'public',
  })
  export default class ActivateAccountPage extends Vue {
    isLoading = false;
    email = '';
    pin = '';

    mounted() {
      const userEmail = localStorage.getItem('userToActivate');

      if(!userEmail){
        return this.$router.push('/register');
      }

      this.email = userEmail;
    }

    allowUserSignup(){
      localStorage.removeItem('userToActivate');
      this.$router.push('/register');
    }

    async submitActivationPin(){
      if(!this.pin.length){
        return;
      }

      const email = this.email.trim();
      const activationPin = parseInt(this.pin.trim());

      if(isNaN(activationPin)){
        this.pin = '';
        return message.error('Activation Pin is invalid');
      }

      this.isLoading = true;
      const { error, data } = await catchAsync(() => AuthApi.verifyAccount(email, activationPin))
      this.isLoading = false;

      if(error){
        return message.error(error as string);
      }

      this.$store.commit(StoreMutations.setUser, data.data);

      message.success('Account activated successfully');

      localStorage.removeItem('userToActivate');
      this.$router.push('/dashboard');
    }
  }
</script>

<style scoped>
input{
  border: 1px solid green;
  margin: 2em 0;
  font-size: 2em;
  letter-spacing: 1em;
  text-align: center;
}
</style>