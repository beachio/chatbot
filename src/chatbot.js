import store from './store'
import _ from 'underscore'

const chatbot = {
  activeAction(signals=[], { conditionField='condition' }) {
    const scope = chatbot.scope()
    return signals.find(s => {
      return isNaN(s[conditionField]) || _.template(`{{!!(${s[conditionField]})}}`)(scope) == 'true'
    })
  },
  template (string) {
    return _.template(string)(chatbot.scope())
  },
  scope () {
    return {
      signal: store.getters['chatbot/signal'],
      Model: store.getters['chatbot/Model'],
      ...store.getters['chatbot/preModel']
    }
  },
  evalBlock: {
    Chatbot_BotMessageObject (object) {
      return new Promise(resolve => {
        store.commit('chatbot/typing', true)
        setTimeout(() => {
          resolve(!object.info.settings.actionsControls.length && !object.info.settings.allowCustomInput)
        }, 1000);
      })
      .then(res => {
        store.dispatch('message/send', {
          from: 'bot',
          text: chatbot.template(_.sample(object.info.settings.messages).text),
          blockId: object.id,
          settings: object.info.settings
        }, {root: true})
        store.commit('chatbot/typing', false)

        return res
      })

    },
    Chatbot_UserMessageObject (object) {
      return new Promise(resolve => {
        store.dispatch('message/send', {
          from: 'user',
          text: chatbot.template(object.info.settings.message),
          blockId: object.id,
        }, {root: true})
  
        resolve(true)
      })
    },
    Chatbot_RouterObject (object) {
      return new Promise(resolve => {
        const action = chatbot.activeAction(object.info.settings.actions, { signalField: 'condition' })
        if (action.type == 'SEND_BOT_MESSAGE') {
          store.dispatch('chatbot/goToBlock', action.settings.botMessage)
        }
      })
    }
  }
}

export default chatbot