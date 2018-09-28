import { Chatbot } from '@/resources'
import _ from 'underscore'
import chatbot from '@/chatbot'

export default {
  namespaced: true,
  state: {
    bot: null,
    blocks: [],
    signal: null,
    Model: {},
    preModel: {},
    typing: true
  },
  mutations: {
    set (state, bot) {
      state.bot = bot
    },
    addBlock (state, block) {
      state.blocks.push(block)
    },
    close (state) {
      state.bot = null
    },
    setSignal (state, signal) {
      state.signal = signal
    },
    updatePreModel (state, obj) {
      state.preModel = { ...state.preModel, ...obj }
    },
    resetPreModel (state) {
      state.preModel = {}
    },
    setModel (state, value={}) {
      state.Model = {...state.Model, ...value}
    },
    typing (state, value) {
      state.typing = value
    }
  },
  actions: {
    set ({ commit }, id) {
      Chatbot
        .get({ id })
        .then(response => {
          commit('addBlock', response.body)
          commit('set', response.body)
        })
    },
    close ({ commit }) {
      commit('close')
    },
    goToBlock({ commit, getters, dispatch }, id) {
      commit('setModel', getters['preModel'])
      commit('resetPreModel')
      Chatbot
        .get_block({ id })
        .then(response => {
          const object = response.body
          dispatch('addBlock', object)
        })
    },
    next: _.debounce(({ dispatch, commit, getters }) => {
      commit('setModel', getters['preModel'])
      commit('resetPreModel')
      const id = getters['lastBlock'].id
      Chatbot
        .next_block({id})
        .then(response => {
          const objects = response.body
          const object = chatbot.activeAction(objects)
          dispatch('addBlock', object)
        })
    }, 300),
    addBlock ({ commit, dispatch }, block) {
      if (block) {
        if (chatbot.evalBlock[block.type]) {
          const defaultDelay = block.type == 'Chatbot_BotMessageObject' ? 1000 : 0
          const delay = parseInt(block.connection && block.connection.settings.isDelay ? block.connection.settings.delay : defaultDelay)

          chatbot.evalBlock[block.type](block, { delay }).then(next => {
            commit('addBlock', block)

            if (next) {
              dispatch('next')
            }
          })
        } else {
          console.error(`Block Eval with type ${block.type} not found!`)
        }

      }
    },
    updatePreModel ({ commit }, obj) {
      commit('updatePreModel', obj)
    }
  },
  getters: {
    bot (state) {
      return state.bot
    },
    lastBlock (state) {
      return _.last(state.blocks)
    },
    Model (state) {
      return state.Model
    },
    preModel (state) {
      return state.preModel
    },
    signal (state) {
      return state.signal
    },
    typing (state) {
      return state.typing
    }
  }
}