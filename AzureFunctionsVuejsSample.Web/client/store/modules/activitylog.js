import AzureStorage from 'azure-storage'

export const ACTIVITYLOG_STORAGE_TABLE_NAME = 'activitylog'

const ActivityLogModule = {
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
          Timestamp: entity.Timestamp._.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          TalkId: entity.TalkId._ || '',
          PartitionKey: entity.PartitionKey._ || '',
          UserQuestion: decodeURIComponent(entity.UserQuestion._ || ''),
          ReplayQuestion: decodeURIComponent(entity.ReplayQuestion._ || ''),
          ReplayAnswer: decodeURIComponent(entity.ReplayAnswer._ || ''),
          IsResolution: entity.IsResolution._,
          Score: entity.Score._ || ''
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
    reloadEntities ({ commit, state }) {
      return new Promise((resolve, reject) => {
        var tableService = AzureStorage.createTableService()
        commit('clearEntities')
        commit('startLoading')
        tableService.createTableIfNotExists(ACTIVITYLOG_STORAGE_TABLE_NAME, function (error, result, response) {
          if (error) {
            reject(error)
            commit('endLoading')
          } else {
            var query = new AzureStorage.TableQuery()
              .select([
                'Timestamp',
                'TalkId',
                'PartitionKey',
                'UserQuestion',
                'ReplayQuestion',
                'ReplayAnswer',
                'IsResolution',
                'Score'])
            tableService.queryEntities(ACTIVITYLOG_STORAGE_TABLE_NAME, query, null, function (error, result, response) {
              if (error) {
                reject(error)
              } else {
                commit('setEntities', result.entries)
              }
              commit('endLoading')
            })
          }
        })
      })
    }
  }
}

export default ActivityLogModule
