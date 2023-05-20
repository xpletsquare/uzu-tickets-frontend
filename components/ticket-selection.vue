<template>
  <section class="grids-wrapper">
    <div v-for="item of tickets" :key="item" class="rounded shadow-lg p-3 inline-flex justify-between items-center gap-3">
      <div class="border rounded-md border-green-400 bg-green-500 text-green-600 bg-opacity-20 p-3">
        <div class="uppercase text-sm">{{item.title}}</div>
        <div class="font-semibold">{{item.price}}</div>
      </div>

      <div class="flex-auto text-sm">
        <div>{{item.schedule.name}}</div>
        <div class="opacity-50">Jan 2, 2020 | 9.00 pm</div>
      </div>

      <div class="inline-flex justify-between items-center gap-3">
        <button class="p-1">-</button>
        <span class="font-semibold text-xl">0</span>
        <button class="p-1">+</button>
      </div>
    </div>
  </section>
</template>


<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';


  @Component
  export default class TicketSelection extends Vue {
    // @Prop({ type: Array, required: true }) tickets!: [];
    @Prop() tickets!:[]
    @Prop() age!: number;

    ticket = [];

    async mounted(){
     this.ticket = this.tickets;
     console.log(this.ticket, "finally")
    }

    }

</script>

<style scoped>
.grids-wrapper{
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>