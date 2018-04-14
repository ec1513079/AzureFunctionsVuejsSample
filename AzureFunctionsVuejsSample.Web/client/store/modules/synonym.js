import AzureSearch from 'azure-search'

/* ================ 要リファクタ(テンプレート側に移す) ================ */
import Vue from 'vue'
import Message from 'vue-bulma-message'
const MessageComponent = Vue.extend(Message)
const OpenMessage = (propsData = {
  title: '',
  message: '',
  type: 'danger',
  direction: '',
  duration: 0,
  container: '.messages',
  showCloseButton: true
}) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}
/* ================ 要リファクタ(テンプレート側に移す) ================ */

const FaqModule = {
  namespaced: true,

  state () {
    return {
      entities: [], // 初期値
      isLoading: false
    }
  },

  mutations: {
    setEntities (state, payload) {
      payload.forEach(entity => {
        state.entities.push({
          RowKey: entity.RowKey._ || '',
          Title: entity.Title._ || '',
          Question: entity.Question._ || '',
          Answer: entity.Answer._ || '',
          Keywords: entity.Keywords._ || '',
          Category: entity.Category._ || '',
          Remark: entity.Remark._ || '',
          Timestamp: entity.Timestamp._ || ''
        })
      })
    },
    clearEntities (state) {
      state.entities.length = 0
    },
    startLoading (state) {
      state.isLoading = true
    },
    endLoading (state) {
      state.isLoading = false
    }
  },

  actions: {
    reloadEntities ({ commit }) {
    },

    upsertEntity ({ commit, dispatch }, payload) {
    },

    deleteEntity ({ commit, dispatch }, payload) {
    }
  }
}

export default FaqModule
