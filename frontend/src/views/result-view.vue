<template>
  <div class="result" :style="backgroundStyle">
    <div class="container py-4">
      <div class="row gy-4">
        <!-- Summoner Card -->
        <div class="col-12">
          <div class="custom-card">
            <summoner-card v-if="summoner" :name="summoner.name" :icon-id="summoner.profileIconId" />
          </div>
        </div>

        <!-- Stat Summary -->
        <div class="col-12">
          <div class="custom-card">
            <stat-summary v-if="stats" :stats="stats" />
          </div>
        </div>

        <!-- Match History -->
        <div class="col-12">
          <div class="custom-card">
            <match-history v-if="matches.length" :matches="matches" />
          </div>
        </div>

        <!-- Error Message -->
        <div class="col-12" v-if="error">
          <div class="alert alert-danger text-center">{{ error }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SummonerCard from '@/components/summoner-card.vue'
import StatSummary from '@/components/stat-summary.vue'
import MatchHistory from '@/components/match-history.vue'

export default {
  name: 'result-view',
  components: {
    SummonerCard,
    StatSummary,
    MatchHistory
  },
  props: ['name'],
  data() {
    return {
      summoner: null,
      puuid: '',
      stats: null,
      matches: [],
      error: ''
    }
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${require('@/assets/summoner-wallpaper.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }
    }
  },
  async mounted() {
    try {
      const res = await fetch(`/api/summoner/${encodeURIComponent(this.name)}`)
      if (!res.ok) throw new Error('Summoner not found')
      const data = await res.json()
      this.summoner = data
      this.puuid = data.puuid

      const statsRes = await fetch(`/api/stats/${this.puuid}`)
      this.stats = await statsRes.json()

      const matchRes = await fetch(`/api/matches/${this.puuid}`)
      const matchData = await matchRes.json()
      this.matches = matchData.matches || []
    } catch (err) {
      this.error = err.message
    }
  }
}
</script>

<style scoped>
.custom-card {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  color: #fff;
}
</style>
