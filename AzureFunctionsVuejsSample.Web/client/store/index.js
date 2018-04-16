import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'
import menu from './modules/menu'
import faq from './modules/faq'
import activitylog from './modules/activitylog'
import authme from './modules/authme'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules: {
    app,
    menu,
    faq,
    activitylog,
    authme
  },
  state: {
    pkg
  },
  mutations: {
  }
})

export default store
