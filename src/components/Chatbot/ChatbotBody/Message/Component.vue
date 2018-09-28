<template>
  <div class="chatbot-body__message-container">
    <div :class="[`chatbot-body__message--${message.from}`]" class="chatbot-body__message">
      {{message.text}}
    </div>
    <div v-if="message.settings.bodyControls && message.settings.bodyControls.length" class="chatbot-body__message-controls">
      <div class="chatbot-body__message-control" v-for="(control, index) in (message.settings.bodyControls || [])" :key="index">
        <component :disabled="message.blockId != activeBlock.id" :is="control.type" :settings="control.settings"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import Controls from './Controls'

  export default {
    name: 'Message',
    components: {
      ...Controls
    },
    props: {
      message: Object
    },
    computed: {
      activeBlock () {
        return this.$store.getters['chatbot/lastBlock']
      }
    }
  }
</script>

<style scoped>
  .chatbot-body__message-container {
    margin-bottom: 20px;
    overflow: hidden;
  }

  .chatbot-body__message-controls {
    padding-top: 10px;
    clear: both;
  }
  .chatbot-body__message-control {
    margin-top: 20px;
  }
  .chatbot-body__message {
    padding: 15px;
    background: #f1f4ff;
    color: white;
    width: 80%;
    border-radius: 3px;
    position: relative;
  }

  .chatbot-body__message:after {
    position: absolute;
    top: 100%;
    filter: brightness(90%);
  }

  .chatbot-body__message--user {
    background: #f1f4ff;
    color: #333;
    float: right;
  }

  .chatbot-body__message--bot {
    background: #f33ba0;
    color: white;
    float: left;
  }
</style>

<style>
  .chatbot-control-title {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }
</style>
