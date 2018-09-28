<template>
  <div class="chatbot-actions">
    <form @submit.prevent="submitControls" class="chatbot-actions__controls" v-if="controls.length">
      <div class="chatbot-actions__control" :style="{width: (control.settings.width || 100) + '%'}" v-for="(control, index) in controls" :key="index">
        <component :ref="control.type" :is="control.type" :settings="control.settings"></component>
      </div>
    </form>
    <div class="chatbot-actions__custom-input" v-if="custom">
      <input ref="input" v-model="message" type="text" placeholder="Write a message..." @keyup.enter="sendMessage" />
    </div>
  </div>
</template>

<script>
  import Controls from './Controls'

  export default {
    name: 'ChatbotActions',
    components: {
      ...Controls
    },
    props: {
      custom: Boolean,
      controls: Array
    },
    data () {
      return {
        message: "",
        controlComponents: {}
      }
    },
    methods: {
      sendMessage () {
        if (this.message) {
          this.$store.dispatch('message/send', {text: this.message, from: 'user'})
          this.message = ""
          this.$store.commit('chatbot/setSignal', this.message)
          this.$store.dispatch('chatbot/next')
        }
      },
      submitControls () {
        const buttons = this.controls.filter(c => c.type == 'Chatbot_BotMessageObject_Button')
        if (buttons.length == 1) {
          this.$refs['Chatbot_BotMessageObject_Button'][0].doAction()
        }
      }
    },
    watch: {
      custom (val) {
        if (val) {
          this.$nextTick(function () {
            this.$refs.input.focus()
          })
        }
      }
    }
  }
</script>

<style scoped>
  .chatbot-actions {
    border-top: 1px solid #e7e7e7;
    position: relative;
  }

  .chatbot-actions__controls {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    margin: 0 -5px;
  }

  .chatbot-actions__control {
    margin: 0 5px;
  }

  .chatbot-actions__custom-input input {
    width: 100%;
    height: 49px;
    padding: 15px;
    outline: none;
  }
</style>
