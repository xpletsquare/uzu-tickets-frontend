<template>
  <div class="custom-table">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['table-entry', { 'dark-mode': darkMode }]"
    >
      <img :src="checkmarkSrc" class="checkmark" />
      <span :class="['text', { 'dark-mode': darkMode }]">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    checkmarkSrc: {
      type: String,
      default: "_nuxt/assets/images/greencheck.png", // Default checkmark source
    },
  },
};
</script>

<style scoped>
.custom-table {
  width: 100%;
}

.table-entry {
  display: flex;
  align-items: center;
  padding: 10px ;
  padding-bottom: 30px;
  border-bottom: 0.5px solid #787878;
}

.checkmark {
  width: 47px; /* Adjust the width as needed */
  margin-right: 30px; /* Adjust the spacing between the checkmark and text */
}

.text {
  color: #03161C; 
  font-size: 18px; 
  font-weight: 400;
  line-height: 20.79px;
}

.dark-mode {
  color: #fff; /* White text color for dark mode */
}
</style>
