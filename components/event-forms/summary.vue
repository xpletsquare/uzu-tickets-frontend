<template>
  <div>
    <h2>Summary</h2>
    <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique. For free event, set price to zero [0]</p>
        <div class="flex gap-4">
      <div class="landscape">
        <label for="landscape-photo">Landscape photo</label>

        <div class="box rounded fill">
                <img src="~/assets/images/Tems.png" height="100%" width="100%" />
        </div>
        <div class="preview">
          <p>Tems.png</p>
        </div>
      </div>

      <div class="portrait">
        <label for="Portrait-photo">Portrait photo</label>

        <div class="box rounded fill">
                <img src="~/assets/images/dancer.jpg" height="100%" width="100%" />
        </div>
        <div class="preview">
          <p>dancer.jpg</p>
        </div>
      </div>
    </div>
          <div class="description mt-10">
      <h3>Descripion</h3>
      <p>We are in a truly pivotal time in history where the collective momentum of the voices of women across the globe can no longer be ignored and is therefore changing the shape of the world as we know it. We are seeing over and over that where institutions have failed, women are taking ownership and doing the work to build the world they desire. With Ada The Country, we are bringing to the stage this remarkable idea of a woman as her own nation, her own country; autonomous, resourceful and powerful.</p>
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
        <div>
          <span><i class="fas fa-times fa-2x"></i> </span>
        </div>
      </div>
      <v-container class="schedule-list">
      <div class="flex items-center justify-between py-2">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black">Schedule 1 • Regular</span>
          <span class="text-black">  Schedule 1 • 21/12/2022 • 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="price text-xs"> Price </span>
          <span class="font-bold text-black"> N20,000 </span>
        </div>
      </div>
      <div class="flex items-center justify-between py-2">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black">Schedule 1 • Regular</span>
          <span class="text-black">  Schedule 1 • 21/12/2022 • 03:00 PM </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="price text-xs"> Price </span>
          <span class="font-bold text-black"> N20,000 </span>
        </div>
      </div>
      <div class="flex items-center justify-between py-2">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black">Schedule 1 • Regular</span>
          <span class="text-black">  Schedule 1 • 21/12/2022 • 03:00 PM </span>
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
        <div>
          <span><i class="fas fa-times fa-2x"></i> </span>
        </div>
      </div>
       <v-container class="schedule-list">
      <div class="flex items-center justify-between py-2">
        <div class="flex flex-col">
          <span class="mb-1 font-bold text-black">Schedule 2 • Regular</span>
          <span class="text-black">  Schedule 2 • 21/12/2022 • 03:00 PM </span>
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
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Summary extends Vue {
    
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

.center {
  display: flex;
  align-items: center;
  justify-content: center;

  & label {
    cursor: pointer;
  }

  > input {
    display: none;
  }
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: 'Upload image';
  display: inline-block;
  background-image: url('~/assets/images/imgup.png');
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}

.custom-file-input:hover::before {
  border-color: black;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}

.schedule-list{
  border-left: 5pt solid #15B743;
}

.fill {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}
.fill img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%
}
</style>