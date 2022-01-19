<template>
  <main>
    <navbar />
    <div class="main">
      <div class="details">
        <v-container>
          <h2>Detail</h2>
          <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique. For free event, set price to zero [0]</p>
          <p>Description</p>
             <div class="uploadImage"> 
     <div id="app" class="solid">
      <div class="border">
          <div class="center"><label for="file-input">
    <div class="i"><img src="../assets/images/imgup.png" height="35pt" width="35pt"/></div>
    <p>Upload Image</p>
  </label><input type="file" id="file-input" accept="image/*" @change="onFileChange"></div>
  <div id="preview">
    <img v-if="url" :src="url" height="50pt" width="50pt"/>
  </div>
      </div>
   </div>
   <div id="app2" class="solid">
      <div class="border2">
          <div class="center"><label for="file-input">
    <div class="i"><img src="../assets/images/imgup.png" height="35pt" width="35pt"/></div>
    <p>Upload Image</p>
  </label><input type="file" id="file-input2" accept="image/*" @change="onFileChange"></div>
  <div id="preview2">
    <img v-if="url2" :src="url2" height="50pt" width="50pt"/>
  </div>
      </div>
   </div>
   </div>
   <p class="ds">Descripion</p>
          <v-textarea class="txtarea" counter="100" filled></v-textarea>
          <div class="bottom"> 
            <primary-button label="Next"></primary-button>
          </div>
          
        </v-container>
      </div>
    </div>
  </main>
</template>

<script > 
     export default {
         el: '#app',
  data() {
    return {
      url: null,
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    }
  },
  el: '#app2',
  data() {
    return {
      url2: null,
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url2 = URL.createObjectURL(file);
    }
  }
}       
</script>

<style lang="scss" scoped>
.ds{
  margin-top: 50pt;
}

.bottom{
  float: right;
  margin-top: 20pt;
}


.theme--light.v-text-field--filled > .v-input__control > .v-input__slot {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.38);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    &:before {
        display: none;
    }
}

.v-input--is-focused .v-input__slot {
    border: 2px solid !important;
    
}

.uploadImage{
  display: flex;
}
.solid {
    border-style: solid;
}
.border{
    border: 0.5pt solid #707070;
    width: 473pt;
    height: 180pt;
    text-align: center;
    justify-content: center;
    margin-right: 10pt;
}

.border2{
    border: 0.5pt solid #707070;
    width: 162pt;
    height: 180pt;
    text-align: center;
    justify-content: center;
}
.center{
margin-top: 90pt;
}

.center>input {
  display: none;
}

.i{
    margin-left: 48%;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}

#preview2 {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview2 img {
  max-width: 100%;
  max-height: 500px;
}
</style>