<template>
  <form @submit.prevent="submitSearch" class="search-form">
    <input
        v-model="name"
        type="text"
        placeholder="Search for a summoner..."
        class="search-input"
    />
    <button type="submit" class="search-button">Search</button>
  </form>
</template>

<script>
export default {
  name: 'summoner-search',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    submitSearch() {
      this.$emit('submitted', this.name.trim())
    }
  }
}
</script>

<style scoped>
.search-form {
  display: flex;
  width: 100%;
  border: 2px solid rgba(255, 248, 240, 0.85);
  border-radius: 6px;
  overflow: hidden;
}

.search-input {
  flex: 1;
  padding: 12px;
  font-size: 1.2rem;
  border: none;
  color: #3b3a38; /* Sanftes Dunkelgrau statt Schwarz */
  background-color: rgba(255, 248, 240, 0.85); /* leichtes Creme-Beige */
  outline: none;
}

.search-button {
  padding: 12px 12px;
  font-size: 1.2rem;
  color: #1e88e5;
  background-color: rgba(255, 248, 240, 0.85); /* leichtes Creme-Beige */
  border: none;
  cursor: pointer;
}

</style>
