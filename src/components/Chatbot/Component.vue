<template>
  <div class="chatbot">
    <ChatbotHeader :title="bot.info.settings.title" :avatar="avatar" />
    <ChatbotBody />
    <ChatbotActions :controls="actionsControls" :custom="actionsCustom" />
  </div>
</template>

<script>
  import ChatbotHeader from './ChatbotHeader'
  import ChatbotBody from './ChatbotBody'
  import ChatbotActions from './ChatbotActions'

  export default {
    name: 'Chatbot',
    components: {
      ChatbotHeader,
      ChatbotBody,
      ChatbotActions
    },
    mounted () {
      this.$store.dispatch('chatbot/next')
    },
    computed: {
      avatar () {
        const image = this.bot.info.settings.image
        if (image) {
          return this.bot.info.settings.image.body.quad.url
        } else {
          return null
        }
      },
      bot () {
        return this.$store.getters['chatbot/bot']
      },
      activeBlock () {
        return this.$store.getters['chatbot/lastBlock']
      },
      actionsControls () {
        if (this.activeBlock) {
          return this.activeBlock.info.settings.actionsControls || []
        } else {
          return []
        }
      },
      actionsCustom () {
        if (this.activeBlock) {
          return this.activeBlock.info.settings.allowCustomInput
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .chatbot {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    background: white;
    box-shadow: 0px 0px 5px rgba(0,0,0,.2);
    border-radius: 5px;
    overflow: hidden;
  }
</style>
