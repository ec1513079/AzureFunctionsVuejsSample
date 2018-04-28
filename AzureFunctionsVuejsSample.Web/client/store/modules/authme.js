import Axios from 'axios'
import JsonPath from 'jsonpath'

const authMeUrl = '/.auth/me'
const typName = 'name'
const typEmail = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'

const authAdminUrl = '/.auth/refresh?resource=cf033fe2-52de-4843-9d0c-d334e7fbd327'
const authNomalUrl = '/.auth/refresh?resource=4fcd0472-bcb8-4620-8753-715829a72440'

const AuthMeModule = {
  namespaced: true,

  state () {
    return {
      idToken: '',
      accessToken: '',
      adminToken: '',
      username: '',
      email: ''
    }
  },

  mutations: {
    setAccount (state, payload) {
      state.idToken = payload.idToken
      state.accessToken = payload.accessToken
      state.username = payload.username
      state.email = payload.email
    },

    setAdminAccount (state, payload) {
      state.adminToken = payload.adminToken
    },

    clearAccount (state) {
      state.idToken = ''
      state.accessToken = ''
      state.adminToken = ''
      state.username = ''
      state.email = ''
    }
  },

  actions: {
    reloadAccount ({ commit }) {
      commit('clearAccount')
      Axios.get(authNomalUrl)
      .then((res) => {
        console.log(res)
        return Axios.get(authMeUrl)
      })
      .then((res) => {
        console.log(res)
        let name = JsonPath.query(res.data, '$[0].user_claims[?(@.typ=="' + typName + '")].val')[0]
        let email = JsonPath.query(res.data, '$[0].user_claims[?(@.typ=="' + typEmail + '")].val')[0]
        let idToken = JsonPath.query(res.data, '$[0].id_token')
        let accessToken = JsonPath.query(res.data, '$[0].access_token')
        commit('setAccount', { idToken: idToken, accessToken: accessToken, username: name, email: email })
        return Axios.get(authAdminUrl)
      })
      .then((res) => {
        console.log(res)
        return Axios.get(authMeUrl)
      })
      .then((res) => {
        console.log(res)
        let accessToken = JsonPath.query(res.data, '$[0].access_token')
        commit('setAdminAccount', { adminToken: accessToken })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}

export default AuthMeModule
