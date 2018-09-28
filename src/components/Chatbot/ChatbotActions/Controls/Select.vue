<template>
  <div class="chatbot-actions__select" @click="nextOption" v-html="activeOption.value">
  </div>
</template>

<script>
  export default {
    name: 'Chatbot_BotMessageObject_Select',
    props: {
      settings: Object
    },
    data () {
      this.updatePreModel(0)
      return {
        activeOptionIndex: 0
      }
    },
    computed: {
      activeOption () {
        return this.settings.options[this.activeOptionIndex]
      }
    },
    methods: {
      nextOption () {
        if (this.settings.options.length == this.activeOptionIndex + 1) {
          this.activeOptionIndex = 0
        } else {
          this.activeOptionIndex++
        }
        this.updatePreModel(this.activeOptionIndex)
      },
      updatePreModel (activeOptionIndex) {
        this.$store.dispatch('chatbot/updatePreModel', {[this.settings.model]: this.settings.options[activeOptionIndex].value})
      }
    }
  }
</script>

<style scoped>
  .chatbot-actions__select {
    cursor: pointer;
    width: 100%;
    background-color: #f5f5f5;
    height: 36px;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    border-radius: 3px;
    user-select: none;
  }
</style>
