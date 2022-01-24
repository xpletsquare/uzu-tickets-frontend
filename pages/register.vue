<template>
  <main>
    <navbar />
    <div class="main">
      <div class="left">
        <div>
          <div>
            <h2>Register</h2>
          </div>

          <input-field v-bind:value.sync="details.email" label="Email"></input-field>
          <input-field v-bind:value.sync="details.firstName" label="Firstname"></input-field>
          <input-field v-bind:value.sync="details.lastName" label="Lastname"></input-field>
          <input-field v-bind:value.sync="details.phone" label="Phone number"></input-field>
          <input-field v-bind:value.sync="details.password" label="Password" type="password"></input-field>

          <div class="mt-5">
            <primary-button @click="handleSubmit" :loading="isLoading" label="REGISTER" full="true" />
            <p class="reg-alt">
              Already have an account with us? Login <NuxtLink to="/login" class="light-green-link">here</NuxtLink>
            </p>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="inner">
          <div class="right-left">
            <div class="image-r-l-top">
              <img src="../assets/images/dancer.jpg" alt="ad one" />
            </div>
            <div class="image-r-l-bottom">
              <img src="../assets/images/photob.jpg" alt="ad one" />
            </div>
          </div>
          <div class="right-right">
            <div class="image-r-r">
              <img src="../assets/images/photoa.jpg" alt="ad one" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { Component, Vue } from 'vue-property-decorator'
import { AuthApi } from '~/common/api/auth.api'
import { RegisterUserPayload, User } from '~/common/models/interfaces'
import { catchAsync } from '~/common/utilities'

@Component
export default class RegistrationPage extends Vue {
  isLoading = false
  details: RegisterUserPayload = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
  }

  mounted() {
    const userEmail = localStorage.getItem('userToActivate')

    if (!userEmail) {
      return
    }

    this.$router.push('/activate-account')
  }

  validateData() {
    const { email, firstName, lastName, phone, password } = this.details

    const hasEmptyValue = [email, firstName, lastName, phone, password].filter((key) => !key?.length)

    if (hasEmptyValue.length) {
      return 'Please enter all fields'
    }

    if (password.length < 8) {
      return 'Passwords must have at least 8 characters'
    }

    return ''
  }

  async handleSubmit() {
    const details = { ...this.details }
    const errorMessage = this.validateData()

    if (errorMessage) {
      return message.error(errorMessage)
    }

    this.isLoading = true
    const { error } = await catchAsync(() => AuthApi.signup(details))
    this.isLoading = false

    if (error) {
      return message.error(error as string)
    }

    message.success('Registration Successful')
    localStorage.setItem('userToActivate', details.email as string)

    this.$router.push('/activate-account')
  }
}
</script>

<style lang="scss" scoped>
.light-green-link {
  color: var(--light-green);
  cursor: pointer;
}
.reg-alt {
  text-align: center;
  width: 80%;
  margin: auto;
  margin-top: 20px;
}
.fg-password {
  height: 30px;
  color: var(--light-green);
  text-align: right;
  cursor: pointer;
}
.main {
  display: flex;
  height: 92vh;
}

.left {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 70%;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 1200px) {
    min-width: 100%;

    div {
      width: 60%;
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media screen and (max-width: 900px) {
    min-width: 100%;

    div {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
    }
  }
}

.right {
  width: 60%;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1200px) {
    visibility: hidden;
  }
  .inner {
    width: 95%;
    height: 95%;
    /* border: 1px solid red; */
    display: flex;
    gap: 20px;
  }

  .right-left {
    width: 50%;
    height: 100%;
    /* border: 1px solid rgb(0, 183, 255); */
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }

  .right-right {
    width: 50%;
    height: 100%;
    /* border: 1px solid rgb(0, 183, 255); */
  }

  .image-r-l-top {
    height: 40%;
    width: 100%;
    background-color: var(--light-green);
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .image-r-l-bottom {
    height: 35%;
    width: 80%;
    background-color: var(--light-green);
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .image-r-r {
    width: 100%;
    height: 100%;
    background-color: var(--light-green);
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
