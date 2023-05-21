<template>
  <div class="container">
    <div class="header">
      <h3>Sales</h3>

      <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
    </div>

    <dashboard-total-event-sales />

    <div class="sales">
      <table>
        <thead>
          <tr class="sales-header">
            <th>Sales by tickets</th>
            <!-- <th></th> -->
            <th>Amount sold</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sale, index) in sales" :key="index">
            <td>
              <span class="name">{{ sale.title }}</span>
              <span class="total">{{ sale.total }}</span>
            </td>
            <!-- <td>
              <span class="total">41/100</span>
            </td> -->
            <td>
              <span class="amount">{{ sale.amount }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="sales mobile">
      <div class="sale" v-for="(sale, index) in sales" :key="index">
        <div class="left">
          <span class="type">Regular</span>
          <span class="name">
            21/12/2022 • 03:00 PM
            <br />
            Schedule 1
          </span>
        </div>
        <div class="right">
          <span class="amount">{{ sale.amount }}</span>
          <span class="description">{{ sale.total }} Sold</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component
export default class SalesPage extends Vue {
  @Prop() eventDetails!: EventDetailsFull

  // sales = []

  sales = [
    {
      title: 'Schedule 1 • 21/12/2022 • 03:00 PM',
      total: '41/100',
      amount: 'N 2,300,000',
    },
  ]
}
</script>

<style lang="scss" scoped>
.container {
  // width: 60%;
  // margin: 0 auto;

  // @media (max-width: 1024px) {
  //   width: 90%;
  // }

  // @media (max-width: 768px) {
  //   // margin: 2rem auto;
  //   width: 100%;
  // }

  .header {
    margin: 2rem 0 4rem 0;
    width: 100%;

    @media (max-width: 768px) {
      margin: 2rem 0;
    }

    h3 {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .sales {
    margin: 4rem 0;

    &.mobile {
      display: none;

      .sale {
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 5px 15px #00000014;
        background-color: #fff;
        padding: 10px 15px;
        border-radius: 5px;
        gap: 20px;

        .left,
        .right {
          display: flex;
          flex-direction: column;
        }

        .type {
          font-weight: bold;
          color: #15b743;
        }

        .right {
          align-items: flex-end;
        }
      }
    }

    @media (max-width: 768px) {
      display: none;
      margin: 2rem 0;

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
      padding: 15px 5px;
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

    .name {
      font-weight: 400;
      color: black;
      margin-right: 150px;

      @media (max-width: 1024px) {
        margin-right: 100px;
      }
    }

    .amount {
      font-weight: bold;
      color: #15b743;
    }
  }
}
</style>