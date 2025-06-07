<template>
      <div class="match-entry" :class="placementClass">
        <div class="header">
          <span class="placement">#{{ player.placement ?? 'N/A' }}</span>
          <span class="time">{{ formattedTime }}</span>
        </div>

        <div class="traits">
          <div
            v-for="trait in usedTraits"
            :key="trait.name"
            class="trait"
          >
            {{ trait.name }} ({{ trait.num_units }})
          </div>
        </div>

        <div class="units">
          <div v-for="unit in player.units ?? []" :key="unit.character_id" class="unit">
            <div class="unit-name">{{ unit.character_id?.replace('TFT11_', '') }}</div>
            <div class="items">
              <span v-for="item in unit.items ?? []" :key="item" class="item">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script>
    export default {
      name: 'match-entry',
      props: {
        match: Object,
        puuid: String
      },
      computed: {
        player() {
          if (!this.puuid || !this.match?.info?.participants) return {}
          return this.match.info.participants.find(p => p.puuid === this.puuid) || {}
        },
        usedTraits() {
          return this.player.traits?.filter(t => t.num_units > 0) || []
        },
        formattedTime() {
          const date = new Date(this.match?.info?.game_datetime)
          return isNaN(date) ? '' : date.toLocaleString()
        },
        placementClass() {
          return `placement-${this.player.placement ?? 'unknown'}`
        }
      }
    }
    </script>

    <style scoped>
    .match-entry {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      margin-bottom: 20px;
      padding: 16px;
      color: white;
    }
    .header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .traits, .units {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }
    .unit {
      background: rgba(0, 0, 0, 0.3);
      padding: 8px;
      border-radius: 6px;
      min-width: 80px;
      text-align: center;
    }
    .unit-name {
      font-weight: 600;
    }
    .items {
      font-size: 0.8rem;
      color: #ccc;
    }
    .placement-1 { border-color: gold; }
    .placement-2 { border-color: silver; }
    .placement-3 { border-color: #cd7f32; }
    </style>