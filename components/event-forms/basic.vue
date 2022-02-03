<template>
  <div class="container" v-if="formFields">
    <section class="basic-info main">
      <h2>Basic info</h2>
      <p class="p-0 m-0">
        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
      </p>

      <input-field
        label="Title"
        :value.sync="formFields.title"
        :defaultValue="formFields.title"
        class="mt-8"
      ></input-field>

      <!-- <input type="text" v-model="formFields.title" class="mt-8 p-2 rounded border"> -->

      <div class="md:w-2/4 mt-4 border rounded border-gray-500">
        <multiselect
          v-model="formFields.category"
          :options="categories"
          :show-labels="false"
          placeholder="Category"
        ></multiselect>
      </div>

      <div class="basic-info mt-10 sub">
        <h4 class="mt-5 font-semibold">Add Tags (Optional)</h4>
        <p>Improve discoverability of your event by adding tags relevant to the subject matter.</p>

        <div class="flex items-center">
          <!-- <input-field label="Tags" class="bi" :value.sync="tag"></input-field> -->
          <div class="input-wrapper border bi top-1">
            <input @keyup.enter="addItem" class=" outline-none border focus:border-green-600" v-model="tag" type="text">
          </div>

          <primary-button class="btn" label="Add" @click="addItem" />
        </div>

        <div class="my-6 flex flex-wrap">
          <span class="filled py-2 px-3 text-xs cursor-pointer" v-for="(tag, index) in formFields.tags" :key="index">
            {{ tag }}
            <i class="fa fa-times ml-2" aria-hidden="true" @click="removeItem(tag)"></i
          ></span>
        </div>
      </div>
    </section>

    <section class="location">
      <h2 class="mt-4">Location</h2>
      <p>Help people in the area discover your event and let attendees know where to show up.</p>

      <!-- <template v-if="showLocationInput">
        <VueGoogleAutocomplete
          id="map"
          classname="block p-2 mt-3 border w-full gray-border rounded"
          placeholder="Search Location"
          @placechanged="getAddressData"
          :country="['ng']"
          v-model="formFields.location"
        >
        </VueGoogleAutocomplete>
      </template> -->

      <input-field
        label="Venue"
        :value.sync="formFields.venue"
        :defaultValue="formFields.venue"
        class="mt-4"
      ></input-field>

      <input-field
        label="Address (Optional)"
        :value.sync="formFields.address"
        :defaultValue="formFields.address"
        class="mt-4"
      ></input-field>
      
    </section>

    <section class="date-time">
      <p class="mt-10 py-6 opacity-50">
        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique. Name
        your event and tell event-goers why they should come. Add details that highlight what makes it unique. Name your
        event and tell event-goers why they should come. Add details that highlight what makes it unique.Name your event
        and tell event-goers why they should come. Add details that highlight what makes it unique.
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { EventDetailsFull } from '~/common/models/interfaces'
import Multiselect from 'vue-multiselect';

// @ts-ignore
import VueGoogleAutocomplete from 'vue-google-autocomplete';


@Component({
  components: { Multiselect, VueGoogleAutocomplete },
})
export default class BasicForm extends Vue {
  @Prop() eventDetails!: EventDetailsFull;

  showLocationInput = false;

  disabled = false;

  selectValue: string = '';
  categories: string[] = ['fashion', 'art', 'business'];
  tag: string = '';

  formFields: Partial<EventDetailsFull> | null = null;

  mounted() {
    // this.checkGoogle();

    this.formFields = {
      title: this.eventDetails?.title || '',
      category: this.eventDetails?.category || '',
      tags: this.eventDetails?.tags || [],
      address: this.eventDetails?.address || '',
      venue: this.eventDetails.venue || ''
    }
  }

  checkGoogle(){
    // @ts-ignore
    if(window.google){
      this.showLocationInput = true;
      return;
    }

    setTimeout(() => this.checkGoogle(), 300);
  }

  addItem() {
    if (this.tag === '') {
      message.warning('Add a tag')
      return
    }

    this.formFields?.tags?.push(this.tag)

    // fix bug with clearing tag
    this.tag = '';
    console.log(this.tag);
  }

  removeItem(item: string) {
    if(!this.formFields){
      return;
    }

    const filtered = this.formFields?.tags?.filter((eTag) => eTag !== item)

    // console.log(filtered)
    this.formFields.tags = filtered;
  }

  setOnlineEvent(value: string) {
    if(!this.formFields){
      return;
    }
    
    message.info('Setting online event')
    this.formFields.location = value;

    this.disabled = value.length > 0;
  }

  setSingleEvent() {
    message.info('Setting single event')
  }

  setMultipleEvent() {
    message.info('Setting multiple event')
  }

  getAddressData(addressData: any, placeResultData: any, id: string){
    const location = this.formFields?.location;
    console.log({ addressData, placeResultData, id, location });
  }

  validate(): string {
    const { title, category, tags, venue } = this.formFields as Partial<EventDetailsFull>

    if (!title) {
      return 'Invalid title'
    }

    if (!category) {
      return 'Invalid category'
    }

    if (!venue) {
      return 'Invalid location'
    }

    // emit event to save data in parent
    this.$emit('save', this.formFields)

    return '';
  }
}
</script>

<style lang="scss" scoped>
section {
  padding: 2rem 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid var(--grey);
  }
}

.input-wrapper{
  position: relative;

  label{
    position: absolute;
    left: 20px;
    top: 5px;
    background: white;
  }

  input{
    border: 1px solid lightgray;
    padding: 0.5em;
    border-radius: 3px;
    width: 100%;
    height: 45px;
  
    &:focus{
      border: 1px solid var(--light-green);

      &+label{
        top: -10px;
      }
    }
  
  }
}


.btn {
  float: right;
  margin-top: 10px;
}

.bi {
  width: 551pt;
  margin-right: 10pt;
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

input .border{
  height: 45px;
  border: 1px solid lightgray;
}

.gray-border{
  border: 1px solid gray;
  height: 45px;
  outline: none;
}
</style>
