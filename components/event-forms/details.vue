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
            <input type="file" id="landscape" ref="landscape" accept="image/*" @change="onFileChange" />
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
            <input type="file" id="portrait" ref="portrait" accept="image/*" @change="onFileChange" />
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
  @Prop() details!: EventDetailsFull

  landscape: string = 'No file chosen'
  portrait: string = 'No file chosen'

  formFields: Partial<EventDetailsFull> = {
    images: {
      landscape: '',
      portrait: '',
    },
    description: '',
  }

  onFileChange(event: any) {
    const file = event.target.files[0]

    if (this.$refs.landscape) {
      console.log(file)
      this.landscape = file.name
    } else if (this.$refs.portrait) {
      console.log(file)
    }

    // this.url = URL.createObjectURL(file)
    message.warning('upload image')
  }

  handleDescriptionChange(value: string) {
    console.log(value)

    this.formFields.description = value
  }

  validate(): string {
    const { description } = this.formFields

    if (!description) {
      return 'Please fill in the description'
    }

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
</style>