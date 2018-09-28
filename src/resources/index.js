import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const Chatbot = Vue.resource('/vulcan/v1/chatbot{/id}', {}, {
  next_block: { method: 'GET', url: '/vulcan/v1/chatbot{/id}/next_block' },
  get_block: { method: 'GET', url: '/vulcan/v1/chatbot{/id}/get_block' }
})

export { Chatbot }