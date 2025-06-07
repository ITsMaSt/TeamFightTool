<template>
  <div class="summoner-card">
    <div class="profile">
      <img
          v-if="iconId"
          :src="`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${iconId}.png`"
          alt="Profile Icon"
          class="profile-icon"
      />
      <h2 class="name">{{ name }}</h2>
      <p class="rank" v-if="rank">Rank: {{ rank }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'summoner-card',
  props: {
    name: String,
    iconId: Number,
    rank: String
  }
}
</script>

<style scoped>
.summoner-card {
  background-color: rgba(66, 135, 245, 0.2); /* leichtes Blau */
  border: 2px solid #4287f5;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-bottom: 10px;
}

.name {
  margin: 10px 0 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #222; /* Change from #fff to #222 for visibility */
}

.rank {
  margin: 4px 0 0;
  font-size: 1rem;
  font-weight: 400;
  color: #aee1ff;
}
</style>
