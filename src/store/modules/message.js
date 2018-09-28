import { guid } from '@/lib'

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    send(state, { text, from, settings, blockId }) {
      const message = { text, from, id: guid(), settings, blockId }
      state.list.push(message)
    }
  },
  actions: {
    send({ commit }, { text, from, settings = {}, blockId }) {
      commit('send', { text, from, settings, blockId })
    }
  },
  getters: {
    list (state) {
      return state.list
    }
  }
}