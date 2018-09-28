<template>
  <v-app light id="app" v-if="bot">
    <Layout />
  </v-app>
</template>

<script>
import Layout from './components/Layout.vue'

export default {
  name: 'app',
  components: {
    Layout
  },
  computed: {
    bot () {
      return this.$store.getters['chatbot/bot']
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
