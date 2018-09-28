<template>
  <div class="chatbot-radiolist">
    <div class="chatbot-control-title" v-html="settings.title"></div>
    <v-radio-group v-model="model" v-if="settings.options && settings.options.length">
      <v-radio :disabled="disabled" :key="option.id" v-for="option in settings.options" :label="option.value" :value="option.value"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
  export default {
    name: 'Chatbot_BotMessageObject_RadioList',
    props: {
      settings: Object,
      disabled: Boolean
    },
    data () {
      return {
        model: null
      }
    },
    watch: {
      model (value) {
        this.$store.dispatch('chatbot/updatePreModel', {
          [this.settings.model]: value
        })
      }
    }
  }
</script>

<style>
  .chatbot-radiolist {
    display: block;
    margin-top: 20px;
  }

  .chatbot-radiolist .v-input__slot {
    margin: 0 !important;
  }
  .chatbot-radiolist .v-input--selection-controls {
    margin-top: 7px;
  }
  .chatbot-radiolist .v-messages {
    display: none !important;
  }
</style>