<template>
  <div class="container">
    <div class="developer">
      <div>
        <h3>Developer</h3>

        <p>
          Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.
        </p>
      </div>
      <div class="btn">
        <primary-button label="GENERATE KEY"></primary-button>
      </div>
    </div>

    <div class="api-key">
      <div>
        <h4>API KEY</h4>
        <p>7348737347384EGEGY737734</p>
      </div>

      <span class="icon">
        <i class="far fa-clone"></i>
      </span>
    </div>

    <div class="documentation">
      <h4>
        Documentation
        <span class="icon">
          <i class="far fa-paper-plane"></i>
          <!-- <fa icon="paper-plane" /> -->
        </span>
      </h4>

      <p>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'dashboard',
})
export default class DeveloperPage extends Vue {}
</script>

<style  lang="scss" scoped>
.container {
  width: 50%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  .developer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    margin: 2rem 0;

    h3 {
      font-size: 24px;
      font-weight: bold;
    }

    p {
      font-size: 12px;
      font-weight: normal;
      color: var(--grey);
    }

    .btn button {
      min-width: 170px;
    }
  }

  .api-key {
    border: 1px solid #15b743;
    border-radius: 10px;
    background-color: var(--pale-green);
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0;

    h4 {
      font-size: 12px;
      font-weight: bold;
      color: #0a0d0b;
    }

    p {
      font-size: 14px;
      font-weight: bold;
      color: #15b743;
    }

    .icon {
      cursor: pointer;
      color: #15b743;
      font-size: 20px;
    }
  }

  .documentation {
    margin: 2rem 0;

    h4 {
      color: var(--dark-grey);
      font-size: 24px;
      display: flex;
      align-items: center;
      gap: 1rem;

      .icon {
        cursor: pointer;
        color: #15b743;
        font-size: 16px;
      }
    }

    p {
      font-size: 12px;
      color: #0a0d0b;
      width: 70%;
    }
  }
}
</style>