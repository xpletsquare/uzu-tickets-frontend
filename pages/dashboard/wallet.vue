<template>
  <div class="container">
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

      <button class="withdrawal-btn">WITHDRAW</button>
      <button class="withdrawal-btn mobile">REQUEST WITHDRAW</button>
    </div>

    <div class="bank-info">
      <div class="info">
        <span class="link-icon"><i class="fas fa-link"></i> </span>

        <p>
          Link a bank where your available funds can be sent to (you can only edit this details once every month and
          changes take 5 business days to take effect)
        </p>

        <div class="btn">
          <button>
            Edit
            <span class="icon">
              <i class="fas fa-pen"></i>
            </span>
          </button>
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
        <input-field label="Bank name"></input-field>
        <input-field label="Account name"></input-field>
        <input-field label="Account number"></input-field>
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

@Component({
  layout: 'dashboard',
})
export default class WalletPage extends Vue {
  formatCurrency = formatCurrency
  bankName = 'Guarantee trust bank'
  accountName = 'Jones Gabriel'
  accountNumber = '•••••••566'
}
</script>

<style lang="scss" scoped>
.container {
  width: 60%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    margin: 2rem auto;
    width: 100%;
  }

  .header {
    margin: 2rem auto;
    width: 90%;

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
      width: 70%;
    }
  }

  .wallet-info {
    border-radius: 10px;
    background-color: #15b743;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 59px 45px;
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
      width: 70%;

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
      color: #15b743;
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
    width: 90%;

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
        color: #15b743;
        font-size: 20px;
      }

      p {
        color: #9f9f9f;
        font-size: 14px;
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
    width: 90%;

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
        color: #15b743;
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
        color: #15b743; // changes based on status
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