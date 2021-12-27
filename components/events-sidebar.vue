<template>
  <div class="sidebar">
    <h3>Filters</h3>

    <div class="filters">
      <div class="select-input date">
        <select name="date">
          <option value="">Date</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <span class="icon">
          <fa icon="chevron-down" />
        </span>
      </div>
      <div class="select-input price">
        <select name="price">
          <option value="">Price</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <span class="icon">
          <fa icon="chevron-down" />
        </span>
      </div>
      <div class="select-input category">
        <select name="category">
          <option value="">Category</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <span class="icon">
          <fa icon="chevron-down" />
        </span>
      </div>
    </div>

    <div class="tags">
      <tag value="N20,000 - N50,000" />
      <tag value="Mar 12 2022 - Mar 22, 2022" />
      <tag value="Music" />
      <tag value="Rap" />
    </div>

    <button class="btn">APPLY FILTERS</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class FilterSideBar extends Vue {
  //   @Prop({ type: String, required: true }) readonly imageUrl!: String
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 3rem;
  gap: 1rem;
  background-color: #fafafa;

  @media (max-width: 1024px) {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    padding: 3rem;
  }

  h3 {
    font-size: 25px;
    font-weight: bold;
    color: #9f9f9f;
    margin-bottom: 15px;
  }

  .filters {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;

    @media (max-width: 768px) {
      width: 60%;
    }

    @media (max-width: 568px) {
      width: 100%;
    }
  }

  select {
    border: 0.5px solid #707070;
    border-radius: 5px;
    width: 100%;
    padding: 15px;
    font-size: 13px;
    font-weight: normal;
    color: #9f9f9f;

    &.active {
      border: 0.5px solid var(--light-green);
      color: var(--light-green);
    }
  }

  .select-input {
    position: relative;
    // display: flex;

    .icon {
      position: absolute;
      top: 30%;
      right: 8%;
      width: 17px;
      height: 17px;
      font-weight: bold;
      color: #9f9f9f;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 0;
  }

  .btn {
    background-color: var(--light-green);
    border-radius: 5px;
    padding: 10px 36px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 768px) {
      width: 60%;
      margin: 0;
    }
    
    @media (max-width: 568px) {
      width: 100%;
    }
  }
}
</style>
