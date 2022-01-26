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
          <input-field label="Email" :defaultValue="user.email" :disabled="profileEditDisabled"></input-field>
          <span class="count"> 14/40 </span>
        </div>
        <div class="wrap">
          <input-field
            label="Firstname"
            :defaultValue="capitalize(user.firstName)"
            :value.sync="user.firstName"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Lastname"
            :defaultValue="capitalize(user.lastName)"
            :value.sync="user.lastName"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Date of birth"
            :defaultValue="dob"
            :value.sync="user.dob"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Phone number"
            :defaultValue="user.phone"
            :value.sync="user.phone"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Gender"
            :defaultValue="gender"
            :value.sync="user.gender"
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
          :value.sync="passwordInfo.currentPassword"
          :disabled="passwordEditDisabled"
        ></input-field>
        <input-field
          label="New password"
          :value.sync="passwordInfo.newPassword"
          type="password"
          :disabled="passwordEditDisabled"
        ></input-field>
        <input-field
          label="Retype password"
          :value.sync="passwordInfo.confirmNewPassword"
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
import { capitalize } from '~/common/utilities/index'

@Component({
  layout: 'dashboard',
})
export default class ProfilePage extends Vue {
  capitalize = capitalize
  user = this.activeUser

  dob = ''
  gender = ''

  passwordInfo = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  loading = false
  profileEditDisabled = true
  passwordEditDisabled = true

  get activeUser() {
    const { currentUser } = this.$store.state as AppState
    return currentUser
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

  save() {
    console.log('saving')

    if (!this.profileEditDisabled) {
      console.log(this.user)
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