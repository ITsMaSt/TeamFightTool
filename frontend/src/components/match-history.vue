<template>
  <div>
    <h3 class="section-title">Match History (last {{ matches.length }} matches)</h3>
    <div v-if="loading">Loading matches...</div>
    <div v-else-if="puuid">
      <template v-for="match in filteredAndSortedMatches" :key="match.metadata?.match_id || match?.match_id || match">
        <match-entry
            :match="match"
            :puuid="puuid"
        />
      </template>
    </div>
    <div v-else>
      <p class="text-warning">No PUUID available to show match data.</p>
    </div>
  </div>
</template>

<script>
import MatchEntry from './match-entry.vue'

export default {
  name: 'match-history',
  components: { MatchEntry },
  props: {
    matches: Array,
    puuid: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      matchDetails: [],
      loading: true
    }
  },
  computed: {
    filteredAndSortedMatches() {
      return (this.matchDetails || [])
          .filter(match => match && match.info && match.info.participants)
          .sort((a, b) => {
            const timeA = a.info.game_datetime || 0;
            const timeB = b.info.game_datetime || 0;
            return timeB - timeA;
          })
    }
  },
  mounted() {
    this.loadMatches()
  },
  watch: {
    matches: {
      immediate: true,
      handler(newVal) {
        if (newVal?.length) this.loadMatches()
      }
    }
  },
  methods: {
    async loadMatches() {
      this.loading = true
      this.matchDetails = []
      try {
        const promises = this.matches.map(id =>
            fetch(`/api/match/${id}`)
                .then(res => res.ok ? res.json() : { match: {} })
                .then(data => data.match)
        )
        this.matchDetails = await Promise.all(promises)
      } catch (err) {
        console.error('Failed to load match details:', err)
      } finally {
        this.loading = false
      }
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
.text-warning {
  color: orange;
  text-align: center;
  margin-top: 1rem;
}
</style>