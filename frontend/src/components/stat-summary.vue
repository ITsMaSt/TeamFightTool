<template>
  <div>
    <h3 class="section-title">Placement Statistics</h3>
    <p><strong>Matches:</strong> {{ stats.matchCount }}</p>
    <p><strong>Average Placement:</strong> {{ stats.averagePlacement }}</p>

    <h5>Placements:</h5>
    <ul>
      <li v-for="(count, place) in stats.placementCounts" :key="place">
        {{ place }}. Place → {{ count }}×
      </li>
    </ul>

    <placement-chart :placementCounts="stats.placementCounts" />
  </div>
</template>

<script>
import PlacementChart from './placement-chart.vue'

export default {
  name: 'stat-summary',
  components: {
    PlacementChart
  },
  props: {
    stats: {
      type: Object,
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
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 0 0 4px rgba(0, 0, 0, 1);

}
ul {
  padding-left: 1.2rem;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #4fc3f7;
  text-shadow: 0 0 4px rgba(0, 0, 0, 1);

}
p {
  color: #4fc3f7;
  text-shadow: 0 0 4px rgba(0, 0, 0, 1);

}
h4, h5 {
  color: #00bfff; /* oder deine gewählte Akzentfarbe */
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
}

</style>
