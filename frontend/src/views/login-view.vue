<template>
  <div class="login-view">
    <div class="login-box">
      <h2 class="mb-4">🔐 Login via Riot ID</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Riot Name</label>
          <input v-model="gameName" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Tag (z.B. EUW)</label>
          <input v-model="tagLine" type="text" class="form-control" required />
        </div>
        <button class="btn btn-primary w-100" type="submit">Login</button>
        <div v-if="error" class="text-danger mt-2">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-view',
  data() {
    return {
      gameName: '',
      tagLine: '',
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.error = ''
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ gameName: this.gameName, tagLine: this.tagLine })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Login failed')

        // redirect
        this.$router.push(`/result/${this.gameName}`)
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>

<style scoped>
.login-view {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
}
</style>
