<template>
  <div class="home">
    <div class="overlay">
      <summoner-search @submitted="handleSearch" />
      <div v-if="error" class="error-text">{{ error }}</div>

      <summoner-card
          v-if="summoner && summoner.name"
          :name="summoner.name"
          :icon-id="summoner.profileIconId"
          :rank="summoner.rank"
      />
      <stat-summary v-if="stats" :stats="stats" />
      <match-history v-if="matches.length" :matches="matches" />

      <div v-if="stats">
        <h3>Placement-Stats</h3>
        <p>⏱ Matches: {{ stats.matchCount }}</p>
        <p>📊 Avg: {{ stats.averagePlacement }}</p>
      </div>

      <div v-if="matches.length">
        <h3>Match IDs:</h3>
        <ul>
          <li v-for="m in matches" :key="m">{{ m }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SummonerSearch from '@/components/summoner-search.vue'
import SummonerCard from '@/components/summoner-card.vue'
import MatchHistory from '@/components/match-history.vue'
import StatSummary from '@/components/stat-summary.vue'

export default {
  name: 'home-view',
  components: {
    SummonerSearch,
    SummonerCard,
    MatchHistory,
    StatSummary
  },
  data() {
    return {
      summoner: null,
      puuid: '',
      stats: null,
      matches: [],
      error: ''
    }
  },
  methods: {
    handleSearch({ gameName, tagLine }) {
      if (!gameName || !tagLine) {
        this.error = 'Bitte fülle beide Felder aus.'
        return
      }

      this.error = ''
      this.$router.push(`/summoner/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`)
    }
  }
}
</script>

<style scoped>
.home {
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  padding: 0;
  border-radius: 0;
  width: auto;
  max-width: none;
}

.error-text {
  color: #e12710;
  font-weight: 600;
  font-size: 1.3rem;
  margin-top: 10px;
}
</style>
