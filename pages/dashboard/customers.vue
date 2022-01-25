<template>
  <div class="container">
    <div class="header">
      <h3>Transactions</h3>

      <div class="mini-header">
        <p>
          Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
        </p>
        <span class="icon">
          <i class="fas fa-cloud-download-alt"></i>
        </span>
      </div>

      <search placeholder="Search transactions" />
    </div>

    <div class="customers">
      <table>
        <thead>
          <tr class="customers-header">
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Event name</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span class="firstname">Jones</span>
            </td>
            <td>
              <span class="lastname">Gabriel</span>
            </td>
            <td>
              <span class="email">jonesbgabriel@gmail.com</span>
            </td>
            <td>
              <span class="email">Cavemen Live</span>
            </td>
            <td>
              <span class="description">Schedule 1 • 21/12/2022 • 03:00 PM Regular x 3</span>
            </td>
            <td>
              <span class="amount">N 84,000</span>
            </td>
          </tr>
          

           <tr>
            <td>
              <span class="firstname">Jones</span>
            </td>
            <td>
              <span class="lastname">Gabriel</span>
            </td>
            <td>
              <span class="email">jonesbgabriel@gmail.com</span>
            </td>
            <td>
              <span class="email">Cavemen Live</span>
            </td>
            <td>
              <span class="description">Schedule 1 • 21/12/2022 • 03:00 PM Regular x 3</span>
            </td>
            <td>
              <span class="amount">N 84,000</span>
            </td>
          </tr>
           <tr>
            <td>
              <span class="firstname">Jones</span>
            </td>
            <td>
              <span class="lastname">Gabriel</span>
            </td>
            <td>
              <span class="email">jonesbgabriel@gmail.com</span>
            </td>
            <td>
              <span class="email">Cavemen Live</span>
            </td>
            <td>
              <span class="description">Schedule 1 • 21/12/2022 • 03:00 PM Regular x 3</span>
            </td>
            <td>
              <span class="amount">N 84,000</span>
            </td>
          </tr>
           <tr>
            <td>
              <span class="firstname">Jones</span>
            </td>
            <td>
              <span class="lastname">Gabriel</span>
            </td>
            <td>
              <span class="email">jonesbgabriel@gmail.com</span>
            </td>
            <td>
              <span class="email">Cavemen Live</span>
            </td>
            <td>
              <span class="description">Schedule 1 • 21/12/2022 • 03:00 PM Regular x 3</span>
            </td>
            <td>
              <span class="amount">N 84,000</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="customers mobile">
      <div class="customer">
        <div class="left">
          <div class="name">
            <span class="firstname">Jones</span>
            <span class="lastname">Gabriel</span>
          </div>

          <span class="email">jonesbgabriel@gmail.com</span>
        </div>
        <div class="right">
          <span class="amount">N 84,000</span>
          <span class="description">
            <span> Schedule 1 • 21/12/2022 • </span>
            <span> 03:00 PM </span>
            <span> Regular x 3 </span>
          </span>
        </div>
      </div>
      <div class="customer">
        <div class="left">
          <div class="name">
            <span class="firstname">Jones</span>
            <span class="lastname">Gabriel</span>
          </div>

          <span class="email">jonesbgabriel@gmail.com</span>
        </div>
        <div class="right">
          <span class="amount">N 84,000</span>
          <span class="description">
            <span> Schedule 1 • 21/12/2022 • </span>
            <span> 03:00 PM </span>
            <span> Regular x 3 </span>
          </span>
        </div>
      </div>
      <div class="customer">
        <div class="left">
          <div class="name">
            <span class="firstname">Jones</span>
            <span class="lastname">Gabriel</span>
          </div>

          <span class="email">jonesbgabriel@gmail.com</span>
        </div>
        <div class="right">
          <span class="amount">N 84,000</span>
          <span class="description">
            <span> Schedule 1 • 21/12/2022 • </span>
            <span> 03:00 PM </span>
            <span> Regular x 3 </span>
          </span>
        </div>
      </div>
      <div class="customer">
        <div class="left">
          <div class="name">
            <span class="firstname">Jones</span>
            <span class="lastname">Gabriel</span>
          </div>

          <span class="email">jonesbgabriel@gmail.com</span>
        </div>
        <div class="right">
          <span class="amount">N 84,000</span>
          <span class="description">
            <span> Schedule 1 • 21/12/2022 • </span>
            <span> 03:00 PM </span>
            <span> Regular x 3 </span>
          </span>
        </div>
      </div>
    </div>

    <div class="pagination-wrapper">
      <button>
        DOWNLOAD REPORT
        <span class="icon">
          <i class="fas fa-cloud-download-alt"></i>
        </span>
      </button>
      <pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'dashboard',
})
export default class CustomersPage extends Vue {}
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
    margin: 2rem 0;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      width: 100%;
      margin: auto;
      flex-direction: column;
      gap: 20px;

      h3 {
        display: none;
      }
    }

    h3 {
      font-size: 24px;
      font-weight: bold;
    }

    .mini-header {
      display: none;

      @media (max-width: 768px) {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 20px;

        p {
          color: #0a0d0b;
          font-size: 14px;
        }

        .icon {
          font-size: 24px;
          color: var(--light-green);
          margin-right: 20px;
        }
      }
    }

    .search {
      width: 60%;
      margin: 0;

      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }

  .customers {
    margin: 4rem 0;

    &.mobile {
      display: none;

      .customer {
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

        .name span {
          font-weight: bold;
          color: #15b743;
        }

        .right {
          align-items: flex-end;

          .description {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
          }
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

    .firstname,
    .lastname,
    .email {
      font-weight: 400;
      color: black;
    }

    .amount {
      font-weight: bold;
      color: #15b743;
    }
  }

  .pagination-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      justify-content: center;
    }

    button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      min-width: 150px;
      background-color: var(--light-green);
      height: 45px;
      border-radius: 2.5px;
      color: var(--white);
      padding: 0 30px;
      text-transform: uppercase;
      font-weight: 600;

      &:hover {
        background-color: var(--dark-green);
      }

      .icon {
        font-size: 15px;
        margin-left: 10px;
      }

      @media (max-width: 768px) {
        display: none;
      }
    }
  }
}
</style>