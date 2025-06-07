<template>
  <form @submit.prevent="submitSearch" class="search-form">
    <input
        v-model="gameName"
        type="text"
        placeholder="Name"
        class="search-input"
    />
    <input
        v-model="tagLine"
        type="text"
        placeholder="Tag"
        class="search-input"
        style="max-width: 120px"
    />
    <button type="submit" class="search-button">Search</button>
  </form>
</template>

<script>
export default {
  name: 'summoner-search',
  data() {
    return {
      gameName: '',
      tagLine: ''
    }
  },
  methods: {
    submitSearch() {
      if (!this.gameName || !this.tagLine) return
      this.$emit('submitted', { gameName: this.gameName.trim(), tagLine: this.tagLine.trim() })
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
  color: #3b3a38;
  background-color: rgba(255, 248, 240, 0.85);
  outline: none;
}

.search-button {
  padding: 12px 12px;
  font-size: 1.2rem;
  color: #1e88e5;
  background-color: rgba(255, 248, 240, 0.85);
  border: none;
  cursor: pointer;
}
</style>
