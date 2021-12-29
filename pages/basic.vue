<template>
  <main>
    <navbar />
    <div class="main">
      <div >
        <div class="basic">
          <v-container>
          <div>
          <h2>Basic info</h2>
          <p class="l1">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
          </div>
          <input-field label="Title" ></input-field>
          <v-select id="category" class="drpdown"  placeholder="Category" :items="category">
        </v-select>
          <h4>Basic info</h4>
          <p>Improve discoverability of your event by adding tags relevant to the subject matter.</p>
          <div class="binfo">
            <input-field label="Title" class="bi" ></input-field> <primary-button class="btn" label="Add" />
            </div>
            <div><button class="filled">category 1 <i class="fa fa-times" aria-hidden="true"></i>
</button></div>

          <v-divider></v-divider>
          <h2>Location</h2>
          <p>Help people in the area discover your event and let attendees know where to show up.</p>
          <secondary-button label="Venue"></secondary-button> <primary-button label="Online event"></primary-button>
          <input-field label="Search location"></input-field>
          <v-divider></v-divider>
          <h2>Date and time</h2>
          <p>Help people in the area discover your event and let attendees know where to show up.</p>
          <secondary-button label="Single event"></secondary-button> <primary-button label="Reoccuring event"></primary-button>
          <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique. Name your event and tell event-goers why they should come. Add details that highlight what makes it unique. Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
          </v-container>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';


  @Component
  export default class BasicPage extends Vue {

      // validate input
      // show loading spinner
      // make api call
      // show success message
      // onSuccess => save token to localstorage
      // redirect to dashboard
  }
</script>

<style lang="scss" scoped>
.drpdown{
   width: 325pt;
   border: 1px solid var(--grey);
   min-height: 45px;
   padding: 0 15px;
   border-radius: 2.5px;
}
.v-select:before {
    border-style: none;
}
.v-select:after {
    border-style: none;
}
.btn{
  float: right;
  margin-top: 10px;
}
.bi{
  width: 551pt;
  margin-right: 10pt;
}
.binfo{
  display: flex;
}
.filled {
        background-color: #e8ffef;
        border: 1px solid #6f6f6f;
        border-radius: 20px;
        color: #6f6f6f;
        margin-right: 10px;
      }
.basic{
      margin-left: 200pt;
      margin-right: 100pt;

}
h2{
  font-size: 24pt;
}

.light-green-link{
  color: var(--light-green);
  cursor: pointer;

}
</style>
