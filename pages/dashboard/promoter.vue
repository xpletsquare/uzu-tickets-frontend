<template>
  <div class="container">
    <div class="header">
      <h3>Promoter</h3>

      <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>

      <div class="promoter-code">
        <div>
          <h4>Promoter code</h4>
          <span>352842ye623</span>
        </div>

        <span class="icon">
          <i class="far fa-clone"></i>
        </span>
      </div>
    </div>

    <div class="promoter-info">
      <div>
        <div class="shows-info">
          <h4>PROMOTED SHOWS</h4>
          <span>18</span>
        </div>
        <div class="tickets-info">
          <h4>TICKETS SOLD</h4>
          <span>820</span>
        </div>
        <div class="earnings-info">
          <h4>EARNINGS</h4>
          <div>
            <span class="main">{{ formatCurrency('1320000') }}</span>
            <span class="sub">{{ formatCurrency('120000') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="transactions">
      <table>
        <thead>
          <tr class="transaction-header">
            <th></th>
            <th>Event name</th>
            <th>Tickets sold</th>
            <th>Total sold</th>
            <th class="total-commission">Total Commission</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="index">1</span>
            </td>
            <td>
              <span class="event-name">The doyenne hangout</span>
            </td>
            <td>
              <span class="ticket-sold">23 regular, 8 VIP</span>
            </td>
            <td>
              <span class="total">31 tickets</span>
            </td>
            <td>
              <span class="commission">23,000.00</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="index">1</span>
            </td>
            <td>
              <span class="event-name">The doyenne hangout</span>
            </td>
            <td>
              <span class="ticket-sold">23 regular, 8 VIP</span>
            </td>
            <td>
              <span class="total">31 tickets</span>
            </td>
            <td>
              <span class="commission">23,000.00</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="index">1</span>
            </td>
            <td>
              <span class="event-name">The doyenne hangout</span>
            </td>
            <td>
              <span class="ticket-sold">23 regular, 8 VIP</span>
            </td>
            <td>
              <span class="total">31 tickets</span>
            </td>
            <td>
              <span class="commission">23,000.00</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="index">1</span>
            </td>
            <td>
              <span class="event-name">The doyenne hangout</span>
            </td>
            <td>
              <span class="ticket-sold">23 regular, 8 VIP</span>
            </td>
            <td>
              <span class="total">31 tickets</span>
            </td>
            <td>
              <span class="commission">23,000.00</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="index">1</span>
            </td>
            <td>
              <span class="event-name">The doyenne hangout</span>
            </td>
            <td>
              <span class="ticket-sold">23 regular, 8 VIP</span>
            </td>
            <td>
              <span class="total">31 tickets</span>
            </td>
            <td>
              <span class="commission">23,000.00</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="transactions mobile">
      <div class="transaction">
        <div class="left">
          <span class="event-name">The doyenne hangout</span>

          <span class="ticket-sold">23 regular, 8 VIP</span>
        </div>
        <div class="right">
          <span class="commission">23,000.00</span>
          <span class="total">31 tickets</span>
        </div>
      </div>
      <div class="transaction">
        <div class="left">
          <span class="event-name">The doyenne hangout</span>

          <span class="ticket-sold">23 regular, 8 VIP</span>
        </div>
        <div class="right">
          <span class="commission">23,000.00</span>
          <span class="total">31 tickets</span>
        </div>
      </div>
      <div class="transaction">
        <div class="left">
          <span class="event-name">The doyenne hangout</span>

          <span class="ticket-sold">23 regular, 8 VIP</span>
        </div>
        <div class="right">
          <span class="commission">23,000.00</span>
          <span class="total">31 tickets</span>
        </div>
      </div>
      <div class="transaction">
        <div class="left">
          <span class="event-name">The doyenne hangout</span>

          <span class="ticket-sold">23 regular, 8 VIP</span>
        </div>
        <div class="right">
          <span class="commission">23,000.00</span>
          <span class="total">31 tickets</span>
        </div>
      </div>
      <div class="transaction">
        <div class="left">
          <span class="event-name">The doyenne hangout</span>

          <span class="ticket-sold">23 regular, 8 VIP</span>
        </div>
        <div class="right">
          <span class="commission">23,000.00</span>
          <span class="total">31 tickets</span>
        </div>
      </div>
    </div>

    <div class="pagination-wrapper">
      <pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { formatCurrency } from '~/common/utilities/index'

@Component({
  layout: 'dashboard',
})
export default class PromoterPage extends Vue {
  formatCurrency = formatCurrency
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

  .promoter-code {
    border: 1px solid #15b743;
    border-radius: 10px;
    background-color: var(--pale-green);
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0;
    max-width: 28%;

    @media (max-width: 768px) {
      max-width: 100%;
      margin: 1rem 0;
    }

    h4 {
      font-size: 14px;
      font-weight: bold;
      color: #0a0d0b;
    }

    span {
      font-size: 14px;
      font-weight: bold;
      color: #15b743;
    }

    .icon {
      cursor: pointer;
      color: #15b743;
      font-size: 20px;
    }
  }

  .promoter-info {
    border-radius: 10px;
    background-color: var(--white);
    box-shadow: 0px 5px 30px #00000014;
    color: var(--dark-grey);
    padding: 30px 45px;
    margin: 3rem 0;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 80%;

      @media (max-width: 768px) {
        width: 100%;
        gap: 10px;
      }
    }

    @media (max-width: 1024px) {
      padding: 30px;
    }

    @media (max-width: 768px) {
      margin: 2rem 0;
    }

    h4 {
      font-size: 12px;
      font-weight: 400;
      margin: 0;
    }

    .shows-info,
    .tickets-info span {
      font-size: 54px;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 38px;
      }
    }

    .earnings-info {
      div > span {
        display: block;
        font-weight: 600;

        &.main {
          font-size: 36px;
          color: #15b743;

          @media (max-width: 768px) {
            font-size: 24px;
          }
        }

        &.sub {
          font-size: 20px;

          @media (max-width: 768px) {
            font-size: 12px;
          }
        }
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
      padding: 15px 10px;
    }

    th.total-commission {
      display: flex;
      justify-content: flex-end;
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

    .event-name {
      font-weight: 400;
      color: black;
    }

    .commission {
      font-weight: bold;
      color: #15b743;
      display: flex;
      justify-content: flex-end;
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