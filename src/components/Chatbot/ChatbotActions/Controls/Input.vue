<template>
  <div class="chatbot-actions__input">
    <input ref="input" v-model="preModel" type="text" :placeholder="settings.placeholder">
  </div>
</template>

<script>
  export default {
    name: 'Chatbot_BotMessageObject_Input',
    props: {
      settings: Object
    },
    mounted () {
      this.$refs.input.focus()
    },
    computed: {
      preModel: {
        get () {
          return this.$store.state.chatbot.preModel[this.settings.model]
        },
        set (value) {
          this.$store.dispatch('chatbot/updatePreModel', {
            [this.settings.model]: value
          })
        }
      }
    }
  }
</script>

<style scoped>
  .chatbot-actions__input {
    width: 100%;
  }
  .chatbot-actions__input input {
    outline: none;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    border-radius: 5px;
    height: 36px;
    padding: 8px 10px;
    width: 100%;
  }
</style>
