<template>
  <div class="container">
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

      <div class="md:w-2/4 mt-4 border rounded border-gray-500">
        <multiselect
          v-model="formFields.category"
          :options="categories"
          :show-labels="false"
          placeholder="Category"
        ></multiselect>
      </div>

      <div class="basic-info sub">
        <h4 class="mt-5 font-semibold">Basic info</h4>
        <p>Improve discoverability of your event by adding tags relevant to the subject matter.</p>

        <div class="flex">
          <input-field label="Tags" class="bi" :value.sync="tag"></input-field>
          <primary-button class="btn" label="Add" @click="addItem" />
        </div>

        <div class="my-6 flex flex-wrap">
          <span class="filled p-2 text-xs cursor-pointer" v-for="(tag, index) in formFields.tags" :key="index">
            {{ tag }}
            <i class="fa fa-times ml-2" aria-hidden="true" @click="removeItem(tag)"></i
          ></span>
        </div>
      </div>
    </section>

    <section class="location">
      <h2 class="mt-4">Location</h2>
      <p>Help people in the area discover your event and let attendees know where to show up.</p>
      <secondary-button label="Venue" class="mr-2"></secondary-button>
      <primary-button label="Online event" @click="setOnlineEvent"></primary-button>
      <input-field
        label="Search location"
        class="mt-4"
        :value.sync="formFields.location"
        :disabled="disabled"
      ></input-field>
    </section>

    <section class="date-time">
      <h2>Date and time</h2>
      <p>Help people in the area discover your event and let attendees know where to show up.</p>
      <secondary-button label="Single event" class="mr-2" @click="setSingleEvent"></secondary-button>
      <primary-button label="Reoccuring event" @click="setMultipleEvent"></primary-button>

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
import { message } from 'ant-design-vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { EventDetailsFull } from '~/common/models/interfaces'
import Multiselect from 'vue-multiselect'

@Component({
  components: { Multiselect },
})
export default class BasicForm extends Vue {
  @Prop() eventDetails!: EventDetailsFull

  disabled = false

  selectValue: string = ''
  categories: string[] = ['fashion', 'art', 'business']
  tag: string = ''

  formFields: Partial<EventDetailsFull> = {
    title: '',
    category: '',
    tags: [],
    // tags: ['category 1', 'category 2', 'category 3'],
    location: '',
  }

  // mounted() {
  //   if (this.eventDetails) {
  //     const { title, category, tags, location } = this.eventDetails
  //     this.formFields = { title, category, tags, location }
  //     return
  //   }

  //   this.formFields = {
  //     title: '',
  //     category: '',
  //     tags: ['category 1', 'category 2', 'category 3'],
  //     location: '',
  //   }
  // }

  addItem() {
    if (this.tag === '') {
      message.warning('Add a tag')
      return
    }

    this.formFields.tags?.push(this.tag)

    // fix bug with clearing tag
    this.tag = ''
    console.log(this.tag)
  }

  removeItem(item: string) {
    // console.log(tag)
    const filtered = this.formFields.tags?.filter((eTag) => eTag !== item)

    // console.log(filtered)
    this.formFields.tags = filtered
  }

  setOnlineEvent() {
    message.info('Setting online event')
    this.disabled = true
    this.formFields.location = 'Online event'
  }

  setSingleEvent() {
    message.info('Setting single event')
  }

  setMultipleEvent() {
    message.info('Setting multiple event')
  }

  validate(): string {
    const { title, category, tags, location } = this.formFields

    if (!title) {
      return 'Invalid title'
    }
    if (!category) {
      return 'Invalid category'
    }
    if (!tags?.length) {
      return 'Add tag(s)'
    }
    if (!location) {
      return 'Invalid location'
    }

    // emit event to save data in parent
    this.$emit('save', this.formFields)

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
</style>
