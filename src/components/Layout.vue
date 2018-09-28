<template>
  <div class="layout">
    <Chatbot />
  </div>
</template>

<script>
  import Chatbot from './Chatbot'

  export default {
    name: 'Layout',
    components: {
      Chatbot
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layout {
    position: fixed;
    right: 10px;
    bottom: 10px;
    width: 400px;
    height: 500px;
    max-height: 80%;
  }
</style>
