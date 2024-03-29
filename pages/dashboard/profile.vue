<template>
  <div v-if="user" class="container">
    <section class="profile">
      <div class="main-content">
        <div>
          <h3>Profile</h3>

          <p>
            Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
          </p>
        </div>
        <div class="btn-wrapper">
          <button @click="setEdit('profile')" v-if="profileEditDisabled">
            Edit
            <span class="icon">
              <i class="fas fa-pen"></i>
            </span>
          </button>
          <template v-else>
            <button class="cancel" @click="resetDetails('profile')">
              Cancel
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
            </button>
            <button class="save" @click="saveDetails('profile')">
              Save
              <span class="icon">
                <i class="far fa-save"></i>
              </span>
            </button>
          </template>
        </div>
      </div>

      <div class="profile-form">
        <div class="wide">
          <input-field label="Email" :defaultValue="user.email" :disabled="profileEditDisabled"></input-field>
          <!-- <span class="count"> 14/40 </span> -->
        </div>
        <div class="wrap">
          <input-field
            label="Firstname"
            :default-value="capitalize(user.firstName)"
            :value.sync="user.firstName"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Lastname"
            :default-value="capitalize(user.lastName)"
            :value.sync="user.lastName"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Date of birth"
            :default-value="dob"
            :value.sync="user.dob"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Phone number"
            :default-value="user.phone"
            :value.sync="user.phone"
            :disabled="profileEditDisabled"
          ></input-field>
          <input-field
            label="Gender"
            :default-value="gender"
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
        <div class="btn-wrapper">
          <button @click="setEdit('password')" v-if="passwordEditDisabled">
            Edit
            <span class="icon">
              <i class="fas fa-pen"></i>
            </span>
          </button>
          <template v-else>
            <button class="cancel" @click="resetDetails('password')">
              Cancel
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
            </button>
            <button class="save" @click="saveDetails('password')">
              Save
              <span class="icon">
                <i class="far fa-save"></i>
              </span>
            </button>
          </template>
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

    <!-- <div class="save">
      <primary-button label="SAVE" :loading="loading" @click="save"></primary-button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { message } from 'ant-design-vue'
// import { AuthApi } from '~/common/api/auth.api'
import { AppState, AuthUser } from '~/common/storeHelpers'
import { capitalize } from '~/common/utilities/index'

@Component({
  layout: 'dashboard',
})
export default class ProfilePage extends Vue {
  capitalize = capitalize
  user: AuthUser | null = null

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

  mounted() {
    this.user = Object.assign({}, this.activeUser)
  }

  get activeUser() {
    const { currentUser } = this.$store.state as AppState
    return currentUser
  }

  setEdit(section: string) {
    if (section === 'profile') {
      this.profileEditDisabled = false
    }

    if (section === 'password') {
      this.passwordEditDisabled = false
    }
  }

  resetDetails(section: string) {
    if (section === 'profile') {
      this.profileEditDisabled = true
      message.info('resetiing profile')
    }

    if (section === 'password') {
      this.passwordEditDisabled = true
      message.info('resetiing password')
    }
  }

  saveDetails(section: string) {
    if (section === 'profile') {
      message.info('saving profile')
    }

    if (section === 'password') {
      message.info('saving password')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 65%;
  margin: 0 auto;

  // @media (max-width: 1024px) {
  //   width: 100%;
  // }

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

    .btn-wrapper {
      display: inline-flex;
      gap: 10px;

      button {
        min-width: 80px;
        padding: 11px 16px;
        font-size: 12px;
        border-radius: 20px;
        border: 1px solid var(--dark-grey);
        color: var(--dark-grey);
        background-color: #f2f2f2;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 600;

        &:hover {
          background-color: var(--dark-grey);
          color: #f2f2f2;
        }

        &.save {
          background-color: var(--light-green);
          color: #f2f2f2;
          border: 1px solid var(--white);
          text-transform: uppercase;

          &:hover {
            background-color: var(--dark-green);
          }
        }

        &.cancel {
          background-color: var(--grey);
          color: #f2f2f2;
          border: 1px solid var(--white);
          text-transform: uppercase;

          &:hover {
            background-color: var(--dark-grey);
          }
        }
      }
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