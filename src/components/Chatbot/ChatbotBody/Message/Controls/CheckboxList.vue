<template>
  <div class="chatbot-checkboxlist">
    <div class="chatbot-control-title" v-html="settings.title"></div>
    <v-checkbox :disabled="disabled" :key="option.id" v-for="option in settings.options" v-model="model" :label="option.value" :value="option.value"></v-checkbox>
  </div>
</template>

<script>
  export default {
    name: 'Chatbot_BotMessageObject_CheckboxList',
    created () {
      this.$store.dispatch('chatbot/updatePreModel', {
        [this.settings.model]: []
      })
    },
    data () {
      return {
        model: []
      }
    },
    props: {
      settings: Object,
      disabled: Boolean
    },
    watch: {
      model: {
        handler (value) {
          this.$store.dispatch('chatbot/updatePreModel', {
            [this.settings.model]: value
          })
        },
        deep: true
      }
    }
  }
</script>

<style>
  .chatbot-checkboxlist {
    display: block;
    margin-top: 20px;
  }

  .chatbot-checkboxlist .v-input__slot {
    margin: 0 !important;
  }
  .chatbot-checkboxlist .v-input--selection-controls {
    margin-top: 7px;
  }
  .chatbot-checkboxlist .v-messages {
    display: none !important;
  }
</style>