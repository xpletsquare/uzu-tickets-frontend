<template>
  <div class="container">
    <section class="basic-info main">
      <h2>Basic info</h2>
      <p class="p-0 m-0">
        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
      </p>

      <input-field label="Title" v-bind:value.sync="formFields.title" class="mt-8"></input-field>

      <div class="md:w-2/4 mt-4 border rounded border-gray-500">
        <multiselect
          v-model="selectValue"
          :options="categories"
          :show-labels="false"
          placeholder="Category"
        ></multiselect>
      </div>

      <div class="basic-info sub">
        <h4 class="mt-5 font-semibold">Basic info</h4>
        <p>Improve discoverability of your event by adding tags relevant to the subject matter.</p>

        <div class="flex">
          <input-field label="Tags" class="bi"></input-field> <primary-button class="btn" label="Add" />
        </div>

        <div class="my-6">
          <span class="filled p-2 text-xs cursor-pointer">
            category 1
            <i class="fa fa-times ml-2" aria-hidden="true"></i
          ></span>
        </div>
      </div>
    </section>
    <!-- <v-divider></v-divider> -->

    <section class="location">
      <h2 class="mt-4">Location</h2>
      <p>Help people in the area discover your event and let attendees know where to show up.</p>
      <secondary-button label="Venue" class="mr-2"></secondary-button>
      <primary-button label="Online event"></primary-button>
      <input-field label="Search location" class="mt-4"></input-field>
      <!-- <v-divider></v-divider> -->
    </section>

    <section class="date-time">
      <h2>Date and time</h2>
      <p>Help people in the area discover your event and let attendees know where to show up.</p>
      <secondary-button label="Single event" class="mr-2"></secondary-button>
      <primary-button label="Reoccuring event"></primary-button>

      <p class="mt-10 py-6">
        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique. Name
        your event and tell event-goers why they should come. Add details that highlight what makes it unique. Name your
        event and tell event-goers why they should come. Add details that highlight what makes it unique.Name your event
        and tell event-goers why they should come. Add details that highlight what makes it unique.
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { EventDetailsFull } from '~/common/models/interfaces'
import Multiselect from 'vue-multiselect'

@Component({
  components: { Multiselect },
})
export default class BasicForm extends Vue {
  @Prop() details!: EventDetailsFull
  selectValue: string = ''
  categories: string[] = ['fashion', 'art', 'business']

  formFields: Partial<EventDetailsFull> = {
    title: '',
    category: '',
    tags: [],
    location: '',
  }

  validate(): string {
    const { title, category, tags, location } = this.formFields

    if (!title) {
      return 'Invalid title'
    }
    if (!category) {
      return 'Invalid title'
    }
    if (!tags?.length) {
      return 'Add tag(s)'
    }
    if (!location) {
      return 'Invalid location'
    }

    return ''
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

// .drpdown {
//   width: 325pt;
//   border: 1px solid var(--grey);
//   min-height: 45px;
//   padding: 0 15px;
//   border-radius: 2.5px;
// }
// .v-select:before {
//   border-style: none;
// }
// .v-select:after {
//   border-style: none;
// }

.btn {
  float: right;
  margin-top: 10px;
}

.bi {
  width: 551pt;
  margin-right: 10pt;
}

// .binfo {
//   display: flex;
// }

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
