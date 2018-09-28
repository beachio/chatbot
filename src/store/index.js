import Vue from 'vue'
import Vuex from 'vuex'
import chatbot from './modules/chatbot'
import message from './modules/message'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    message,
    chatbot
  }
})

export default store