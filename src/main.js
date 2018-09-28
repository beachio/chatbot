import Vue from 'vue'

import Vuetify from 'vuetify'

import App from './App.vue'
Vue.config.productionTip = false

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons/iconfont/material-icons.css'

import store from './store'
import './resources'

import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo, {
  container: ".chatbot-body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  x: false,
  y: true
})

import _ from 'underscore'
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
}

Vue.use(Vuetify, {
  theme: {
    primary: '#df4e9e',
    blue: '#525fa6',
    success: '#6eccb9'
  }
})

class Chatbot {
  constructor (id, params) {
    this.id = id
  }

  run () {
    store.dispatch('chatbot/set', this.id)
    new Vue({
      store,
      render: h => h(App)
    }).$mount('#app')
  }

  getState () {
    return {}
  }
}

const chatbot = new Chatbot('277a5840-7689-775f-8f49-eeca4dbff872')
chatbot.run()

window.Chatbot = Chatbot