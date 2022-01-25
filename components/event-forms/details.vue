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

        <div class="box rounded">
          <div class="center">
            <label for="landscape">
              <div class="flex justify-center">
                <img src="~/assets/images/imgup.png" height="35pt" width="35pt" />
              </div>
              Upload Image
            </label>
            <input type="file" id="landscape" ref="landscape" accept="image/*" @change="onLandscapeChange($event)" />
          </div>
        </div>
        <div class="preview">
          <p id="file-chosen">{{ landscape }}</p>
        </div>
      </div>

      <div class="portrait">
        <label for="Portrait-photo">Portrait photo</label>

        <div class="box rounded">
          <div class="center">
            <label for="portrait">
              <div class="flex justify-center">
                <img src="~/assets/images/imgup.png" height="35pt" width="35pt" />
              </div>
              Upload Image
            </label>
            <input type="file" id="portrait" ref="portrait" accept="image/*" @change="onPortraitChange($event)" />
          </div>
        </div>
        <div class="preview">
          <p id="file-chosen">{{ portrait }}</p>
        </div>
      </div>
    </div>

    <div class="description mt-10">
      <p>Descripion</p>
      <v-textarea class="txtarea" counter="100" filled @input="handleDescriptionChange"></v-textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventDetailsFull } from '~/common/models/interfaces'

@Component
export default class DetailsForm extends Vue {
  @Prop() eventDetails!: EventDetailsFull

  landscape: string = 'No file chosen'
  portrait: string = 'No file chosen'

  formFields: Partial<EventDetailsFull> = {
    images: {
      landscape: '',
      portrait: '',
    },
    description: '',
  }

  onPortraitChange(event: any) {
    const file = event.target.files[0]
    console.log(file)
    this.portrait = file.name

    // this.url = URL.createObjectURL(file)
    message.info('upload image')
  }

  onLandscapeChange(event: any) {
    const file = event.target.files[0]
    console.log(file)
    this.landscape = file.name

    // this.url = URL.createObjectURL(file)
    message.info('upload image')
  }

  handleDescriptionChange(value: string) {
    this.formFields.description = value
  }

  validate(): string {
    const { description } = this.formFields
    console.log(description)

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