<template>
  <div>
    <h2>Summary</h2>
    <p>
      Name your event and tell event-goers why they should come. Add details that highlight what makes it unique. For
      free event, set price to zero [0]
    </p>

    <div class="flex gap-4">
      <div class="landscape">
        <p>Landscape photo</p>

        <div class="box rounded">
          <img src="~/assets/images/Tems.png" />
        </div>
        <div class="preview">
          <p>Tems.png</p>
        </div>
      </div>

      <div class="portrait">
        <p>Portrait photo</p>

        <div class="box rounded">
          <img src="~/assets/images/dancer.jpg" />
        </div>
        <div class="preview">
          <p>dancer.jpg</p>
        </div>
      </div>
    </div>

    <div class="description mt-10">
      <h3>Descripion</h3>
      <p>
        We are in a truly pivotal time in history where the collective momentum of the voices of women across the globe
        can no longer be ignored and is therefore changing the shape of the world as we know it. We are seeing over and
        over that where institutions have failed, women are taking ownership and doing the work to build the world they
        desire. With Ada The Country, we are bringing to the stage this remarkable idea of a woman as her own nation,
        her own country; autonomous, resourceful and powerful.
      </p>
    </div>

    <div class="schedule">
      <div class="flex items-center justify-between py-2">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black">Schedule 1 </span>
          <span class="text-black"> 21/12/2021 </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="start-time text-xs text-gray"> Start time </span>
          <span class="text-black"> 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="end-time text-xs"> End time </span>
          <span class="text-black"> 05:00 PM </span>
        </div>
      </div>

      <v-container class="schedule-list">
        <div class="flex items-center justify-between py-2">
          <div class="flex flex-col">
            <span class="mb-1 font-bold text-black">Schedule 1 • Regular</span>
            <span class="text-black"> Schedule 1 • 21/12/2022 • 03:00 PM </span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="price text-xs"> Price </span>
            <span class="font-bold text-black"> N20,000 </span>
          </div>
        </div>
        <div class="flex items-center justify-between py-2">
          <div class="flex flex-col">
            <span class="mb-1 font-bold text-black">Schedule 1 • Regular</span>
            <span class="text-black"> Schedule 1 • 21/12/2022 • 03:00 PM </span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="price text-xs"> Price </span>
            <span class="font-bold text-black"> N20,000 </span>
          </div>
        </div>
        <div class="flex items-center justify-between py-2">
          <div class="flex flex-col">
            <span class="mb-1 font-bold text-black">Schedule 1 • Regular</span>
            <span class="text-black"> Schedule 1 • 21/12/2022 • 03:00 PM </span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="price text-xs"> Price </span>
            <span class="font-bold text-black"> N20,000 </span>
          </div>
        </div>
      </v-container>

      <div class="flex items-center justify-between py-2">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black">Schedule 2 </span>
          <span class="text-black"> 21/12/2021 </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="start-time text-xs text-gray"> Start time </span>
          <span class="text-black"> 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="end-time text-xs"> End time </span>
          <span class="text-black"> 05:00 PM </span>
        </div>
      </div>

      <v-container class="schedule-list">
        <div class="flex items-center justify-between py-2">
          <div class="flex flex-col">
            <span class="mb-1 font-bold text-black">Schedule 2 • Regular</span>
            <span class="text-black"> Schedule 2 • 21/12/2022 • 03:00 PM </span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="price text-xs"> Price </span>
            <span class="font-bold text-black"> N20,000 </span>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component
export default class Summary extends Vue {
  @Prop() eventDetails!: EventDetailsFull
}
</script>

<style lang="scss" scoped>
.box {
  height: 180pt;
  margin: 1rem 0;
  border: 0.5pt solid #707070;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

h2 {
  font-size: 24pt;
}

.landscape {
  width: 70%;
}

.portrait {
  width: 30%;
}

.schedule-list {
  border-left: 5pt solid #15b743;
  margin: 1rem 0;
}
</style>