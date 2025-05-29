<template>
  <form @submit.prevent="submit">
    <input
        v-model="name"
        placeholder="enter summoner name"
        required
    />
    <button type="submit">submit</button>
  </form>
</template>

<script>
export default {
  name: 'summoner-input',
  emits: ['submitted'],
  data() {
    return {
      name: ''
    }
  },
  methods: {
    submit() {
      this.$emit('submitted', this.name.trim())
    }
  }
}
</script>
