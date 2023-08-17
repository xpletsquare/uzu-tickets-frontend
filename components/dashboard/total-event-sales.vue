

<template>
  <main>
    <div class="gross">
      <div class="label">Gross sales </div>
      <div class="amount gross">{{ formatCurrency( gross.toString() ) }}</div>
    </div>
    <div class="net">
      <div class="label">Net sales</div>
      <div class="amount net">{{ formatCurrency( net.toString() ) }}</div>
    </div>
    <div class="percent-section">
      <div class="percent">{{ formatPercentage('96') }}</div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { formatCurrency, formatPercentage } from '~/common/utilities/index';

@Component
export default class TotalEventSales extends Vue {

  formatCurrency = formatCurrency;
  formatPercentage = formatPercentage;
  @Prop() eventDetails!: any

  gross:any = 0
  net = 0
  tickets:any = []
  mounted(){
    this.tickets = this.eventDetails.tickets;



    const money = this.tickets.map( (ticket:any) => ticket.price * ticket.nSold);

    this.gross = money.reduce( (acc:number, currVal:number) => acc + currVal, 0 );
    this.net = this.gross * 0.96

    // this.gross = total;
  }
 
}
</script>


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
