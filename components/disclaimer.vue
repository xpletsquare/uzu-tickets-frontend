<template>
  <div class="disclaimer">
    <div>
      <h4 class="bold-text">Uzu tickets COVID-19 Safety Protocols applicable</h4>
      <p class="sub-text">
        We partnered with risk management and health experts to empower event creators to thoughtfully consider
        potential safety and security risks at your event. See the playbook.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FeaturedEvent extends Vue {}
</script>

<style lang="scss" scoped>
.disclaimer {
  width: 90%;
  border-left: 5px solid #31d760;
  box-shadow: 0px 3px 20px #00000019;
  border-radius: 0px 10px 10px 0px;
  padding: 32px 48px;

  @media (max-width: 568px) {
    padding: 20px;
    width: 80%;
  }

  .bold-text {
    font-weight: 600;
    font-size: 20px;
    color: #002c0c;
    margin-bottom: 6px;

    @media (max-width: 568px) {
      font-size: 16px;
    }
  }

  .sub-text {
    font-weight: 500;
    font-size: 14px;
    color: #002c0c;
    width: 80%;

    @media (max-width: 568px) {
      font-size: 12px;
      width: 100%;
    }
  }
}
</style>
