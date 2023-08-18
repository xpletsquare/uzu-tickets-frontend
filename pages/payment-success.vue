<template>
  <main> 
    <div class="success-card">
      <div v-if="!IsSuccess" class="processing">
        <loader></loader>
        <h2>Processing</h2>
        <p>Please wait while we verify your payment . Do not close this modal.  </p>
      </div>
      <div v-if="IsSuccess"  class="success">
        
             
              <div class="activate-icon"><i class="fas fa fa-check-circle"></i></div>
              <h2>Success!</h2>
              <p>Your ticket purchase was successful! if you have any challenges, please contact support at support@uzuticket.com  </p>
              
              <primary-button label="Explore more events"  @click="emitExploreMore" ></primary-button>

              <a class="mt-5" @click="close()">Close window</a>
          </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
// import { catchAsync } from '~/common/utilities';
import { payApi } from '../common/api/payment.api';
import { AuthApi } from '~/common/api/auth.api'
import { AppState, StoreMutations } from '~/common/storeHelpers'
@Component

export default class LoginPage extends Vue {
  email = ''
  password = ''
  loading = false
  txref = this.$route.query?.trxref
  paid = this.$route.query?.paid
  ref = this.$route.query?.reference || null
  IsSuccess = false
  base = window.location.origin


  async mounted() {
    const { currentUser } = this.$store.state as any as AppState

    console.log({ txref : this.txref, ref: this.ref })

    if(this.paid) {
      setTimeout( () => {
        this.IsSuccess = true
      }, 2000)
    }
    if(this.txref) {
      const payCheck = await payApi.verify( this.txref );

      const {data, error, status} = payCheck;

      if(error) {
        console.log(error)
      }

      if (status === 200 && data.status === "success") {
        this.IsSuccess = true

        // setTimeout( () => {
        //   this.close()
        // }, 3000)
      }
    }
    if (currentUser?.email !== '') {
      console.log('already logged in')

      // this.$router.push('/dashboard')
    }
  }

  handleEmailChange(value: string) {
    this.email = value
  }

  handlePasswordChange(value: string) {
    this.password = value
  }

  close() {
    window.parent?.postMessage("closePaymentModal", this.base)
  }
  
  emitExploreMore(){
    window.parent?.postMessage("exploreMore", this.base)
  }

  async login() {
    // validate input
    // show loading spinner
    // make api call
    // show success message
    // onSuccess => save token to localstorage
    // redirect to dashboard

    const payload = {
      email: this.email,
      password: this.password,
    }

    if (!payload.email.length || !payload.password.length) {
      return message.warning('Please enter a valid email and password')
    }

    this.loading = true
    const { error, data } = await AuthApi.login(payload.email, payload.password)
    this.loading = false

    if (error) {
      return message.error(error as string)
    }

    message.success('Login successful')
    sessionStorage.setItem('auth', JSON.stringify(data.data))

    this.$store.commit(StoreMutations.setUser, data.data)
    this.$router.push('/dashboard')
  }
}
</script>

<style lang="scss" scoped>

.processing{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: auto;
  text-align: center;
}
 .activate-icon{
    color: var(--light-green);
    font-size: 30px;
    margin-bottom: 20px;

    i {
      font-size: 80px;
    }
  }
.main {
  display: flex;
  height: auto;
}

.success-card {
    width: 20%;
    margin: auto;
    padding-top: 200px;


    .success{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;

    }

    @media (max-width: 768px) {
      margin-inline: auto;
      width: 80%;
    }
  
}

</style>
