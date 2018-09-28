<template>
  <div class="chatbot-message__image" v-if="src">
    <img width="100%" :src="src" alt="">
  </div>
</template>

<script>
  export default {
    name: 'Chatbot_BotMessageObject_Image',
    props: {
      settings: Object
    },
    computed: {
      src () {
        if (this.settings.image) {
          return this.settings.image.body.thumb.url
        } else {
          return null
        }
      }
    }
  }
</script>

<style scoped>
  .chatbot-message__image {
    margin-top: 15px;
  }
</style>
