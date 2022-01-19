<template>
  <section class="">
    <v-container>
      <div>
        <h2>Basic info</h2>
        <p class="l1">
          Name your event and tell event-goers why they should come. Add details that highlight what makes it
          unique.
        </p>
      </div>
      <input-field label="Title" v-bind:value.sync="formFields.title"></input-field>
      <v-select id="category" class="drpdown" placeholder="Category" :items="categories"> </v-select>


      <h4 class="mt-4 font-semibold">Basic info</h4>
      <p>Improve discoverability of your event by adding tags relevant to the subject matter.</p>

      <div class="binfo">
        <input-field label="Title" class="bi"></input-field> <primary-button class="btn" label="Add" />
      </div>
      <div>
        <span class="filled p-2 text-xs">category 1 <i class="fa fa-times" aria-hidden="true"></i></span>
      </div>

      <v-divider></v-divider>

      <h2 class="mt-4">Location</h2>
      <p>Help people in the area discover your event and let attendees know where to show up.</p>
      <secondary-button label="Venue"></secondary-button> <primary-button label="Online event"></primary-button>
      <input-field label="Search location"></input-field>
      <v-divider></v-divider>
      <h2>Date and time</h2>
      <p>Help people in the area discover your event and let attendees know where to show up.</p>
      <secondary-button label="Single event"></secondary-button>
      <primary-button label="Reoccuring event"></primary-button>
      <p>
        Name your event and tell event-goers why they should come. Add details that highlight what makes it
        unique. Name your event and tell event-goers why they should come. Add details that highlight what makes
        it unique. Name your event and tell event-goers why they should come. Add details that highlight what
        makes it unique.Name your event and tell event-goers why they should come. Add details that highlight what
        makes it unique.
      </p>
    </v-container>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { EventDetailsFull } from '~/common/models/interfaces';

@Component
export default class BasicForm extends Vue {
  // validate input
  // show loading spinner
  // make api call
  // show success message
  // onSuccess => save token to localstorage
  // redirect to dashboard
  @Prop() details!: EventDetailsFull;

  formFields: Partial<EventDetailsFull> = {
    title: '',
    category: '',
    tags: [],
    location: '',
  }

  categories = ['fashion', 'art', 'business'];

  validate(): string{
    const { title, category, tags, location } = this.formFields;

    if(!title){
      return 'invalid title';
    }

    return '';
  }
}
</script>

<style lang="scss" scoped>
.drpdown {
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
.btn {
  float: right;
  margin-top: 10px;
}
.bi {
  width: 551pt;
  margin-right: 10pt;
}
.binfo {
  display: flex;
}
.filled {
  background-color: #e8ffef;
  border: 1px solid #6f6f6f;
  border-radius: 20px;
  color: #6f6f6f;
  margin-right: 10px;
}

h2 {
  font-size: 24pt;
}

.light-green-link {
  color: var(--light-green);
  cursor: pointer;
}
</style>
