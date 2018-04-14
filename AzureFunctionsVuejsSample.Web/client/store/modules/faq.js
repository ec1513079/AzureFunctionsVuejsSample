import AzureStorage from 'azure-storage'
import Uuid from 'uuid/v4'

export const FAQ_STORAGE_TABLE_NAME = 'knowledgebase'
export const FAQ_STORAGE_PATITION_KEY = 'KB'

var replaceCRLFtoBR = (str) => {
  return str.replace(/\r?\n/g, '<br>')
}
var replaceBRtoCRLF = (str) => {
  return str.replace(/(<br>|<br \/>)/gi, '\n')
}

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
          Question: replaceBRtoCRLF(entity.Question._ || ''),
          Answer: replaceBRtoCRLF(entity.Answer._ || ''),
          Keywords: entity.Keywords._ || '',
          Category: entity.Category._ || '',
          Remark: replaceBRtoCRLF(entity.Remark._ || ''),
          IsDeleted: entity.IsDeleted._ || false
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
      return new Promise((resolve, reject) => {
        var tableService = AzureStorage.createTableService()
        commit('clearEntities')
        commit('startLoading')
        tableService.createTableIfNotExists(FAQ_STORAGE_TABLE_NAME, function (error, result, response) {
          if (error) {
            reject(error)
            commit('endLoading')
          } else {
            var query = new AzureStorage.TableQuery()
              .select([
                'RowKey',
                'Title',
                'Question',
                'Answer',
                'Keywords',
                'Category',
                'Remark',
                'IsDeleted'])
              .where('PartitionKey == ?string? and not (IsDeleted == ?bool?)', FAQ_STORAGE_PATITION_KEY, true)
            tableService.queryEntities(FAQ_STORAGE_TABLE_NAME, query, null, function (error, result, response) {
              if (error) {
                reject(error)
              } else {
                commit('setEntities', result.entries)
                resolve()
              }
              commit('endLoading')
            })
          }
        })
      })
    },

    upsertEntity ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        var tableService = AzureStorage.createTableService()
        commit('startLoading')
        var deepCopy = JSON.parse(JSON.stringify(payload))
        deepCopy.PartitionKey = FAQ_STORAGE_PATITION_KEY
        if (!deepCopy.RowKey) { deepCopy.RowKey = Uuid() }
        deepCopy.Question = replaceCRLFtoBR(deepCopy.Question || '')
        deepCopy.Answer = replaceCRLFtoBR(deepCopy.Answer || '')
        deepCopy.Remark = replaceCRLFtoBR(deepCopy.Remark || '')
        deepCopy.IsDeleted = false
        tableService.insertOrReplaceEntity(FAQ_STORAGE_TABLE_NAME, deepCopy, function (error, result, response) {
          if (error) {
            reject(error)
          }
          resolve()
          commit('endLoading')
          dispatch('reloadEntities')
        })
      })
    },

    softDeleteEntity ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        var tableService = AzureStorage.createTableService()
        commit('startLoading')
        var deepCopy = JSON.parse(JSON.stringify(payload))
        deepCopy.PartitionKey = FAQ_STORAGE_PATITION_KEY
        if (!deepCopy.RowKey) { deepCopy.RowKey = Uuid() }
        deepCopy.Question = replaceCRLFtoBR(deepCopy.Question || '')
        deepCopy.Answer = replaceCRLFtoBR(deepCopy.Answer || '')
        deepCopy.Remark = replaceCRLFtoBR(deepCopy.Remark || '')
        deepCopy.IsDeleted = true
        tableService.replaceEntity(FAQ_STORAGE_TABLE_NAME, deepCopy, function (error, result, response) {
          if (error) {
            reject(error)
          }
          resolve()
          commit('endLoading')
          dispatch('reloadEntities')
        })
      })
    }
  }
}

export default FaqModule
