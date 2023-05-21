<script lang="ts" setup>
import {Vue, Component} from 'vue-property-decorator';
import { formatCurrency, formatPercentage } from '~/common/utilities/index';

@Component
export default class TotalEventSales extends Vue {
  formatCurrency = formatCurrency;
  formatPercentage = formatPercentage;
}
</script>

<template>
  <main>
    <div class="gross">
      <div class="label">Gross sales</div>
      <div class="amount gross">{{ formatCurrency('20500000') }}</div>
    </div>
    <div class="net">
      <div class="label">Net sales</div>
      <div class="amount net">{{ formatCurrency('20500000') }}</div>
    </div>
    <div class="percent-section">
      <div class="percent">{{ formatPercentage('90.2') }}</div>
    </div>
  </main>
</template>


<style lang="scss" scoped>
  main{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    /* border: 1px solid red; */
    padding: 20px 20px;
    border-radius: 5px;
    background: var(--light-grey-b);


    .label{
      color: var(--grey);
    }
    .amount{
      font-size: 20pt;
      font-weight: 600;
    }

    .net{
      color: var(--light-green);
    }

    .percent{
      color: var(--light-green);
      border: 1px solid var(--light-green);
      background-color: var(--pale-green);
      width: max-content;
      padding: 0 10px;
      height: 45px;
      font-size: 18pt;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media screen and (max-width: 900px){
       .amount{
      font-size: 14pt;
      font-weight: 600;
      } 
    .percent{
      display: none;
    }

    }
  }
</style>
