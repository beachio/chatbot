<template>
  <div class="chatbot-actions__button">
    <v-btn color="primary" v-html="settings.label" @click="doAction"></v-btn>
  </div>
</template>

<script>
  import chatbot from '@/chatbot'
  export default {
    name: 'Chatbot_BotMessageObject_Button',
    props: {
      settings: Object
    },
    methods: {
      doAction () {
        const action = chatbot.activeAction(this.settings.actions, {conditionField: 'if'})
        this.$store.commit('chatbot/setSignal', chatbot.template(action.signal))
        this.$store.dispatch('chatbot/next')
      }
    }
  }
</script>

<style scoped>
  .chatbot-actions__button {
    width: 100%;
  }
</style>

<style>
  .chatbot-actions__button .v-btn {
    margin: 0 !important;
    width: 100%;
    min-width: 0;
  }

</style>
