<template>
  <div class="container mb-10">
    <div class="details">
      <h2>Detail</h2>
      <p>
        Name your event and tell event-goers why they should come. Add details that highlight what makes it unique. For
        free event, set price to zero [0]
      </p>
    </div>

    <div class="flex gap-4">
      <div class="landscape">
        <label for="landscape-photo">Landscape photo</label>

        <div class="box rounded overflow-hidden">
          <div class="center">
            <label for="landscape">
              <div class="flex justify-center overflow-hidden">
                <img class="object-cover" :src="lan" height="" width="100%" />
              </div>
              Upload Image
            </label>
            <input type="file" id="landscape" ref="landscape" accept="image/*" @change="onLandscapeChange($event)" />
          </div>
        </div>

        <div class="preview">
          <p id="file-chosen">{{ truncateText(landscape, 30) }}</p>
        </div>
      </div>

      <div class="portrait">
        <label for="Portrait-photo">Portrait photo</label>

        <div class="box rounded overflow-hidden">
          <div class="center">
            <label for="portrait">
              <div class="flex justify-center overflow-hidden">
                <img class="object-cover" :src="pot" height="100%" width="" />
              </div>
              Upload Image
            </label>
            <input type="file" id="portrait" ref="portrait" accept="image/*" @change="onPortraitChange($event)" />
          </div>
        </div>
        <div class="preview">
          <p id="file-chosen">{{ truncateText(portrait, 20) }}</p>
        </div>
      </div>
    </div>

    <div class="description mt-10">
      <p>Descripion</p>
      <v-textarea
        v-model="formFields.description"
        class="txtarea"
        counter="100"
        filled
        @input="handleDescriptionChange"
      ></v-textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { truncateText } from '../../common/utilities/index'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component
export default class DetailsForm extends Vue {
  @Prop() eventDetails!: EventDetailsFull

  truncateText = truncateText
  landscape: string = 'No file chosen'
  portrait: string = 'No file chosen'
  lan: File | string = ''
  pot: File | string = ''

  formFields: Partial<EventDetailsFull> = {
    image: {
      landscape: '',
      portrait: '',
    },
    description: '',
  }

  url: string = ''

  mounted() {
    // this.formFields.image = this.eventDetails.image || this.eventDetails.images;
    this.formFields.description = this.eventDetails.description || ''
  }

  async onPortraitChange(event: any) {
    const file = await event.target.files[0]

    this.portrait = file.name
    this.pot = URL.createObjectURL(file)

    // this.url = URL.createObjectURL(file)

    // console.log({img: URL.createObjectURL(file)})
    this.formFields = { ...this.formFields, image: { landscape: this.formFields.image?.landscape, portrait: file } }

    message.info('upload image')
    // this.pot =  URL.createObjectURL(this.formFields.image?.portrait);
  }

  async onLandscapeChange(event: any) {
    const [file] = await event.target.files // Get the file from the upload
    // console.log(file)
    this.landscape = file.name
    this.lan = URL.createObjectURL(file)

    this.formFields = { ...this.formFields, image: { portrait: this.formFields.image?.portrait, landscape: file } }

    // this.url = URL.createObjectURL(file)
    // this.formFields = {...this.formFields, image: {...this.formFields.image, landscape: file}}
    message.info('upload image')
    // this.lan =  URL.createObjectURL(this.formFields.image?.landscape);
  }

  handleDescriptionChange(value: string) {
    this.formFields.description = value
  }

  validate(): string {
    const { description } = this.formFields

    if (!description) {
      return 'Please add a description'
    }

    // emit event to save data in parent
    this.$emit('save', this.formFields)

    return ''
  }
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
</style>
