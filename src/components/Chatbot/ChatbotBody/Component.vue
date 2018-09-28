<template>
  <div class="chatbot-body" ref="scrollContainer">
    <div class="chatbot-body__messages">
      <Message :active="index == messages.length - 1" :key="message.id" v-for="(message, index) in messages" :message="message" />
      <div class="chatbot-typing">
        <hollow-dots-spinner
          v-if="botTyping"
          :animation-duration="1000"
          :dot-size="8"
          :dots-num="3"
          :color="'#df4e9e'"
        />
      </div>
    </div>

  </div>
</template>

<script>
  import Message from './Message'
  import { HollowDotsSpinner } from 'epic-spinners'

  export default {
    name: 'ChatbotBody',
    components: {
      Message,
      HollowDotsSpinner
    },
    computed: {
      messages () {
        this.scroll()
        return this.$store.getters['message/list']
      },
      botTyping () {
        return this.$store.getters['chatbot/typing']
      }
    },
    methods: {
      scroll () {
        if (this.$refs.scrollContainer) {
          const oldScrollTop = this.$refs.scrollContainer.scrollTop,
                oldScrollHeight = this.$refs.scrollContainer.scrollHeight

          this.$nextTick(function () {
            setTimeout(() => {
              const newScrollHeight = this.$refs.scrollContainer.scrollHeight
              this.$scrollTo('.chatbot-typing', 500, {})
            }, 100)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .chatbot-body {
    flex: auto;
    overflow: hidden auto;
    position: relative;
  }
  

  .chatbot-body__messages {
    list-style: none;
    padding: 20px;
    margin: 0;
    text-align: left;
  }

  .chatbot-typing {
    height: 8px;
  }
</style>
