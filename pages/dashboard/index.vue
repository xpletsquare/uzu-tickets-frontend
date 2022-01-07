<template>
  <div>
    dashboard index
    <div class="md:w-1/3 mt-10">
      <multiselect v-model="selectValue" :multiple="true" :options="options"></multiselect>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Multiselect from 'vue-multiselect'

@Component({
  layout: 'dashboard',
  components: { Multiselect },
})
export default class DashboardHome extends Vue {
  selectValue = ''
  options = ['list', 'of', 'options', 'to', 'select', 'from']
}
</script>

<style scoped>
</style>