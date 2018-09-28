<template>
  <div class="chatbot-header">
    <div class="chatbot-header__avatar" :style="{backgroundImage: 'url('+avatar+')'}"></div>
    <div class="chatbot-header__title">{{title}}</div>
    <div class="chatbot-header__close" @click="close"><v-icon>close</v-icon></div>
  </div>
</template>

<script>
  export default {
    name: 'ChatbotHeader',
    props: {
      title: String,
      avatar: String
    },
    methods: {
      close () {
        this.$store.dispatch('chatbot/close')
      }
    }
  }
</script>

<style scoped>
  .chatbot-header {
    height: 50px;
    background: #e14e9d;
    display: flex;
    align-items: center;
    padding: 25px 15px;
  }

  .chatbot-header__title {
    text-align: left;
    color: white;
    font-weight: bold;
    font-size: 16px;
  }

  .chatbot-header__avatar {
    height: 35px;
    width: 35px;
    background-size: cover;
    border-radius: 35px;
    margin-right: 15px;
    background-color: white;
  }

  .chatbot-header__close {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
  .chatbot-header__close i {
    color: white;
  }
</style>
