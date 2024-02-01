<template>
  <div class="date">
    <p>Date</p>
    <div class="date__dateInputContainer" :class="!startDate ? 'disabled' : ''">
      <a-date-picker v-model="startDate" :format="dateFormat" placeholder="From Date" :disabled-date="disabledDate" />
      <a-date-picker
        v-model="endDate"
        :format="dateFormat"
        placeholder="To Date"
        :disabled-date="disabledEndDate"
        :disabled="!startDate"
      />
    </div>
    <div class="tagContainer">
      <p v-show="startDate && endDate" class="tagContainer__tag">
        <span class="tagContainer__span">{{ formattedStartDate }} - {{ formattedEndDate }}</span>
        <span class="tagContainer__spanButton"
          ><img src="../assets/icons/greenButton.svg" alt="" @click="removeTag"
        /></span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { formatDate, formatTimestamp } from '~/common/utilities'

@Component({})
export default class SelectDate extends Vue {
  startDate = ''
  endDate = ''
  size = 'large'
  dateFormat = 'DD/MM/YYYY'
  formatDate = formatDate

  disabledDate = (current: number) => {
    // Calculate yesterday's date as a timestamp (in milliseconds)
    const yesterdayTimestamp = Date.now() - 24 * 60 * 60 * 1000

    // Disable dates before yesterday (including today)
    return current && current < yesterdayTimestamp
  }

  disabledEndDate(current: number) {
    const startTimeStamp = +this.startDate
    if (!startTimeStamp) {
      return false
    }

    return current < startTimeStamp
  }

  @Watch('startDate')
  onStartDateChange(newStartDate: string, _: string) {
    // Convert startDate to a timestamp
    const startTimestamp = +newStartDate
    const endTimeStamp = +this.endDate

    // reset endTimeStamp whenever it is lower than starTimestamp
    if (endTimeStamp < startTimestamp) {
      this.endDate = ''
    }
    // If startDate is not selected, allow all dates
    if (!startTimestamp) {
      this.disabledEndDate = () => false
    } else {
      // Disable dates before startDate (including startDate)
      this.disabledEndDate = (current: number) => current < startTimestamp
    }

    this.$emit('start-date-updated', newStartDate)
  }

  @Watch('endDate')
  onEndDateChange(newEndDate: string, _: string) {
    this.$emit('end-date-updated', newEndDate)
  }

  get formattedStartDate() {
    return formatTimestamp(+this.startDate) // Call the formatDate function with startDate
  }

  get formattedEndDate() {
    return formatTimestamp(+this.endDate) // Call the formatDate function with startDate
  }

  removeTag() {
    this.startDate = ''
    this.endDate = ''
    this.$emit('date-tag-removed')
  }

  // Listen for the emitted event
  created() {
    this.$parent.$on('date-tag-removed', this.removeTag)
  }
}
</script>
<style lang="scss" scoped>
.date {
  margin-bottom: 1.1rem;
  color: #bfbfbf;
  font-weight: var(--medium-fontWeight);

  p {
    color: inherit;
    font-weight: inherit;
    text-transform: capitalize;
    font-size: 1rem;
  }

  &__dateInputContainer {
    /* width: 100%; */
    height: 3rem;
    /* border: 1px solid var(--main-green); */
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }

  .tagContainer {
    width: 100%;
    max-width: 40rem;
    height: max-content;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.8rem;

    &__tag {
      padding: 0.3rem 0.6rem;
      border-radius: 50px;
      border: 1px solid #3fd246;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.8rem;
      color: #3fd246;
      background: #3fd2461a;
      margin-block: auto;
    }

    &__span {
      display: inline-block;
    }

    &__spanButton {
      cursor: pointer;
    }
  }
}
</style>
