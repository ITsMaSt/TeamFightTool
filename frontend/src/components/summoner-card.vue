<template>
  <div class="summoner-card">
    <div class="profile">
      <img
          v-if="iconId"
          :src="`http://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${iconId}.png`"
          alt="Profile Icon"
          class="profile-icon"
      />
      <h2>{{ name }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'summoner-card',
  props: {
    name: String,
    iconId: Number
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
</style>
