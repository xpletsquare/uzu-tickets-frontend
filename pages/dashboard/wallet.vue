<template>
  <div class="container">
    <template v-if="specify_amount">
      <div class="amount-popup">
        <div class="amount-popup-inner">
          Please specify amount below
          <div>
            <input-field label="Amount" type="number"></input-field>

            <div class="na-line"></div>
            Please enter your password below to authorize this request
            <input-field label="Password" type="password"></input-field>
          </div>

          <div class="buttons">
            <button class="secondary-btn" @click="showAmount">CANCEL</button>
            <primary-button label="CONFIRM" :loading="loading" @click="request_withdrawal"> </primary-button>
          </div>
        </div>
      </div>
    </template>

    <div class="header">
      <h3>Wallet</h3>

      <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
    </div>

    <div class="wallet-info">
      <div class="balance">
        <div>
          <h4>AVAILABLE BALANCE</h4>
          <p>{{ formatCurrency('8120000') }}</p>
        </div>
        <div>
          <h4>LEDGER BALANCE</h4>
          <p>{{ formatCurrency('12320000') }}</p>
        </div>
      </div>

      <button class="withdrawal-btn" @click="showAmount">WITHDRAW</button>
      <button class="withdrawal-btn mobile" @click="showAmount">REQUEST WITHDRAW</button>
    </div>

    <div class="bank-info">
      <div class="info">
        <span class="link-icon"><i class="fas fa-link"></i> </span>

        <p>
          Link a bank where your available funds can be sent to (you can only edit this details once every month and
          changes take 5 business days to take effect)
        </p>

        <div class="btn-wrapper">
          <button @click="setEdit" v-if="disabled">
            Edit
            <span class="icon">
              <i class="fas fa-pen"></i>
            </span>
          </button>
          <template v-else>
            <button class="cancel" @click="resetDetails">
              Cancel
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
            </button>
            <button class="save" @click="saveDetails">
              Save
              <span class="icon">
                <i class="far fa-save"></i>
              </span>
            </button>
          </template>
        </div>
      </div>

      <div class="mobile">
        <button>
          EDIT PAYOUT DETAILS
          <span class="icon">
            <i class="fas fa-angle-right"></i>
          </span>
        </button>
      </div>

      <div class="form">
        <input-field label="Bank name" :disabled="disabled" :value.sync="bankDetails.bankName" ref="bank"></input-field>
        <input-field label="Account name" :disabled="disabled" :value.sync="bankDetails.accountName"></input-field>
        <input-field
          label="Account number"
          :disabled="disabled"
          :value.sync="bankDetails.accountNumber"
          type="number"
        ></input-field>
      </div>
    </div>

    <div class="withdrawal-history">
      <div class="wrapper">
        <h3>Withdrawal history</h3>
        <search placeholder="Search transaction" />
      </div>

      <div class="transactions">
        <table>
          <thead>
            <tr class="transaction-header">
              <th></th>
              <th>Ref</th>
              <th>Date</th>
              <th>To</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="index">1</span>
              </td>
              <td>
                <span class="ref">1728732732</span>
              </td>
              <td>
                <span class="date">23/12/2021 09:00PM</span>
              </td>
              <td>
                <span class="to">GTBank | Jones Gabriel | ••••566</span>
              </td>
              <td>
                <span class="amount">N23,000.00</span>
              </td>
              <td>
                <span class="status">Success</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="transactions mobile">
        <div class="transaction">
          <div class="left">
            <span class="ref">1728732732</span>
            <span class="date">23/12/2021 09:00PM</span>
            <span class="to">GTBank | Jones Gabriel | ••••566</span>
          </div>
          <div class="right">
            <span class="amount">N23,000.00</span>
            <span class="status">Success</span>
          </div>
        </div>
      </div>

      <div class="pagination-wrapper">
        <pagination />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { formatCurrency } from '~/common/utilities/index'
import { WalletApi } from '~/common/api/wallet.api'
import { message } from 'ant-design-vue'
import { Wallet } from '~/common/models/interfaces'
import { AppState, StoreMutations } from '~/common/storeHelpers'

@Component({
  layout: 'dashboard',
})
export default class WalletPage extends Vue {
  formatCurrency = formatCurrency

  bankName = 'Guarantee trust bank'
  accountName = 'Jones Gabriel'
  accountNumber = '•••••••566'
  specify_amount = false
  loading = false
  disabled = true
  // errorMessage = ''

  userWallet: Wallet = {
    ledger_balance: '',
    main_balance: '',
    transactions: [],
  }

  bankDetails = {
    accountName: '',
    accountNumber: '',
    bankName: '',
  }

  setEdit() {
    this.disabled = false
    // console.log(this.$refs.bank)

    // const bankInput = this.$refs.bank

    // focus on the bank form field
    // this.$refs.bank?.$el.focus()
  }

  resetDetails() {
    this.disabled = true
    message.info('resetiing details')
  }

  saveDetails() {
    const { accountName, accountNumber, bankName } = this.bankDetails
    const hasEmptyValue = [accountName, accountNumber, bankName].filter((key) => !key?.length)

    if (hasEmptyValue.length) {
      // this.errorMessage = 'Missing field'
      return message.warning('Please enter all fields')
    }

    message.info('Bank info received')

    this.disabled = true
  }

  showAmount() {
    this.specify_amount = !this.specify_amount
  }

  request_withdrawal() {
    this.loading = true

    setTimeout(() => {
      this.loading = false
    }, 2000)
  }

  // async mounted() {
  //   const { currentUser } = this.$store.state as any as AppState
  //   const { currentUserWallet } = this.$store.state as AppState

  //   const userid = currentUser?.id

  //   console.log(userid)

  //   if (currentUserWallet !== null) {
  //     this.userWallet = currentUserWallet
  //     message.info('currentUserWallet added')
  //     return
  //   } else {
  //     const { error, data } = await WalletApi.getWalletDetails(userid!)
  //     message.info('calling api for user wallet')

  //     console.log(error, data)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.na-line {
  height: 10px;
  border-bottom: 0.5px solid var(--light-green);
  margin-bottom: 10px;
}

.buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    width: 50%;
  }
}

.secondary-btn {
  &:hover {
    color: black;
  }
}

.amount-popup {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  .amount-popup-inner {
    padding: 20px;
    width: 20%;
    height: max-content;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

    @media screen and (max-width: 1300px) {
      width: 30%;
    }

    @media screen and (max-width: 1080px) {
      width: 40%;
    }

    @media screen and (max-width: 720px) {
      width: 80%;
    }

    div {
      cursor: pointer;
    }
  }
}

.container {
  width: 65%;
  margin: 0 auto;

  // @media (max-width: 1920px) {
  //   width: 100%;
  // }

  @media (max-width: 1024px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin: 2rem auto;
    width: 100%;
  }

  .header {
    margin: 2rem auto;
    width: 100%;

    @media (max-width: 768px) {
      width: 100%;
      margin: auto;
    }

    h3 {
      font-size: 24px;
      font-weight: bold;
    }

    p {
      font-size: 12px;
      font-weight: normal;
      color: var(--grey);
      width: 100%;
    }
  }

  .wallet-info {
    border-radius: 10px;
    background-color: var(--light-green);
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
    margin: 3rem 0;

    @media (max-width: 1024px) {
      padding: 30px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
    }

    .balance {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 60%;

      @media (max-width: 768px) {
        // display: block;
        width: 100%;
      }
    }

    h4 {
      font-size: 14px;
      font-weight: 300;
      color: #ffffff;
    }

    p {
      font-size: 30px;
      font-weight: 600;
      color: #ffffff;
    }

    .withdrawal-btn {
      padding: 15px 30px;
      border-radius: 30px;
      font-weight: 600;
      color: var(--light-green);
      background-color: #ffffff;

      @media (max-width: 768px) {
        display: none;
      }

      &.mobile {
        display: none;

        @media (max-width: 768px) {
          display: block;
          width: 100%;
        }
      }
    }
  }

  .bank-info {
    margin: 2rem auto;
    width: 100%;

    .mobile {
      display: none;

      @media (max-width: 768px) {
        // display: block;
        display: flex;
        justify-content: flex-end;
      }
    }

    .info {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;

      @media (max-width: 768px) {
        display: none;
      }

      .link-icon {
        cursor: pointer;
        color: var(--light-green);
        font-size: 20px;
      }

      p {
        color: #9f9f9f;
        font-size: 14px;
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

    .form {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-left: auto;
      width: 95%;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .withdrawal-history {
    padding: 3rem 0;
    border-top: 1px solid var(--grey);
    margin: 0 auto;
    width: 100%;

    @media (max-width: 768px) {
      border-top: none;
      padding: 0;
    }

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;

      h3 {
        color: var(--light-green);
        font-size: 16px;
        font-weight: bold;
      }

      .search {
        width: 50%;
        margin: 0;

        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    .transactions {
      margin: 2rem 0;

      &.mobile {
        display: none;

        .transaction {
          display: flex;
          justify-content: space-between;
          box-shadow: 0px 5px 15px #00000014;
          background-color: #fff;
          padding: 10px 15px;
          border-radius: 5px;

          .left,
          .right {
            display: flex;
            flex-direction: column;
          }
        }
      }

      @media (max-width: 768px) {
        display: none;

        &.mobile {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      }

      table {
        width: 100%;
      }

      table,
      th,
      td {
        padding: 20px 10px;
      }

      thead {
        color: black;
      }

      tbody {
        color: var(--grey);
        font-size: 14px;

        tr {
          border-bottom: 1px solid var(--grey);
        }
      }

      .index {
        color: black;
      }

      .ref {
        font-weight: 400;
        color: black;
      }

      .amount {
        font-weight: bold;
        color: black;
      }

      .status {
        font-weight: bold;
        color: var(--light-green); // changes based on status
      }
    }
  }

  .pagination-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;

    ul {
      margin: 2rem auto;
    }
  }
}
</style>