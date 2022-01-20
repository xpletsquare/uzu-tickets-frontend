<template>
  <div class="container">
    <section class="profile">
      <div class="main-content">
        <div>
          <h3>Profile</h3>

          <p>
            Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
          </p>
        </div>
        <div class="btn">
          <button @click="setEdit('profile')">
            Edit
            <span class="icon">
              <i class="fas fa-pen"></i>
            </span>
          </button>
        </div>
      </div>

      <div class="profile-form">
        <div class="wide">
          <input-field label="Email" :defaultValue="activeUser.email" :disabled="profileEditDisabled"></input-field>
          <span class="count"> 14/40 </span>
        </div>
        <div class="wrap">
          <input-field
            label="Firstname"
            :defaultValue="capitalize(activeUser.firstName)"
            @change="handleFirstNameChange"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Lastname"
            :defaultValue="capitalize(activeUser.lastName)"
            @change="handleLastNameChange"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Date of birth"
            :defaultValue="dob"
            @change="handleDOBChange"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Phone number"
            :defaultValue="activeUser.phone"
            @change="handlePhoneChange"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Gender"
            :defaultValue="gender"
            @change="handleGenderChange"
            :disabled="profileEditDisabled"
          ></input-field>
        </div>
      </div>
    </section>

    <section class="reset-password">
      <div class="main-content">
        <div>
          <h3>Reset password</h3>

          <p>
            Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
          </p>
        </div>
        <div class="btn">
          <button @click="setEdit('password')">
            Edit
            <span class="icon">
              <i class="fas fa-pen"></i>
            </span>
          </button>
        </div>
      </div>

      <div class="reset-form">
        <input-field
          label="Current password"
          type="password"
          @change="handleCurrentPasswordChange"
          :disabled="passwordEditDisabled"
        ></input-field>
        <input-field
          label="New password"
          @change="handleNewPasswordChange"
          type="password"
          :disabled="passwordEditDisabled"
        ></input-field>
        <input-field
          label="Retype password"
          @change="handleConfirmPasswordChange"
          type="password"
          :disabled="passwordEditDisabled"
        ></input-field>
      </div>
    </section>

    <div class="save">
      <primary-button label="SAVE" @click="save" :loading="loading"></primary-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
import { AuthApi } from '~/common/api/auth.api'
import { AppState, StoreMutations, AuthUser } from '~/common/storeHelpers'

@Component({
  layout: 'dashboard',
})
export default class ProfilePage extends Vue {
  // user: AuthUser | null = null
  dob = ''
  gender = ''

  currentPassword = ''
  password = ''
  confirmPassword = ''
  loading = false
  profileEditDisabled = true
  passwordEditDisabled = true

  get activeUser() {
    const { currentUser } = this.$store.state as AppState
    return currentUser
  }

  // mounted() {
  //   if (this.activeUser) {
  //     this.user = { ...this.activeUser }
  //     return
  //   }

  //   this.user = {
  //     id: '',
  //     email: '',
  //     firstName: '',
  //     middleName: '',
  //     lastName: '',
  //     dob: '',
  //     gender: '',
  //     phone: '',
  //     activated: false,
  //     flagged: false,
  //     token: '',
  //   }
  // }

  capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  setEdit(section: string) {
    console.log(section)

    if (section === 'profile') {
      this.profileEditDisabled = false
      // this.profileEditDisabled = !this.profileEditDisabled
    }

    if (section === 'password') {
      this.passwordEditDisabled = false
      // this.passwordEditDisabled = !this.passwordEditDisabled
    }
  }

  handleFirstNameChange(value: string) {
    console.log(value)
  }
  handleLastNameChange(value: string) {
    console.log(value)
  }
  handlePhoneChange(value: string) {
    console.log(value)
  }
  handleDOBChange(value: string) {
    console.log(value)
  }
  handleGenderChange(value: string) {
    console.log(value)
  }

  handleCurrentPasswordChange(value: string) {
    this.currentPassword = value
  }
  handleNewPasswordChange(value: string) {
    this.password = value
  }
  handleConfirmPasswordChange(value: string) {
    this.confirmPassword = value
  }

  save() {
    console.log('saving')
    if (!this.profileEditDisabled) {
      // console.log(this.activeUser)
      console.log('this.activeUser')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 50%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  .profile,
  .reset-password {
    margin: 2rem 0;
  }

  .main-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    @media (max-width: 768px) {
      align-items: flex-start;
      gap: 0;
    }

    h3 {
      font-size: 24px;
      font-weight: bold;
    }

    p {
      font-size: 12px;
      font-weight: normal;
      color: var(--grey);
    }

    .btn button {
      min-width: 80px;
      padding: 11px 16px;
      font-size: 11px;
      border-radius: 20px;
      border: 1px solid var(--dark-grey);
      color: var(--dark-grey);
      background-color: #f2f2f2;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }

  .reset-password {
    padding: 1rem 0;
    border-top: 1px solid var(--grey);

    @media (max-width: 768px) {
      border-top: none;
      background-color: #f2f2f2;
      padding: 1rem 1.5rem;
      border-radius: 10px;
    }

    .reset-form {
      width: 50%;

      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }

  .profile-form {
    .wide {
      display: flex;
      flex-direction: column;
      margin-bottom: 6px;

      span {
        align-self: end;
      }
    }

    .wrap {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
  }

  .save button {
    margin: 2rem 0;

    @media (max-width: 768px) {
      width: 100%;
      margin: 1rem 0;
    }
  }
}
</style>