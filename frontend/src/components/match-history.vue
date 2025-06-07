<template>
  <div>
    <h3 class="section-title">Match History (last {{ matches.length }} matches)</h3>
    <ul>
      <li v-for="id in matches" :key="id">{{ id }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'match-history',
  props: {
    matches: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.section-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #4fc3f7;
  text-shadow: 0 0 4px rgba(0, 0, 0, 1);
  text-align: center;
  margin-bottom: 20px;
}
ul {
  padding-left: 1.2rem;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #4fc3f7;
  text-shadow: 0 0 4px rgba(0, 0, 0, 1);
}
</style>
