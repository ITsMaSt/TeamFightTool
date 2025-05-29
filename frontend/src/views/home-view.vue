<template>
  <div>
    <h1>Teamfight Tools</h1>

    <summoner-input @submitted="loadSummoner" />

    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="puuid">PUUID: {{ puuid }}</p>
  </div>
</template>

<script>
import SummonerInput from '../components/summoner-input.vue'

export default {
  name: 'home-view',
  components: {
    SummonerInput
  },
  data() {
    return {
      puuid: '',
      error: ''
    }
  },
  methods: {
    async loadSummoner(name) {
      try {
        this.error = ''
        this.puuid = ''

        const res = await fetch(`/api/summoner/${encodeURIComponent(name)}`)
        if (!res.ok) throw new Error('not found or fetch failed')

        const data = await res.json()
        this.puuid = data.puuid || 'no puuid returned'
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>
