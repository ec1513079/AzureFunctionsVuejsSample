import Axios from 'axios'
import JsonPath from 'jsonpath'

const authMeUrl = '/.auth/me'
const typName = 'name'
const typEmail = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'

const AuthMeModule = {
  namespaced: true,

  state () {
    return {
      idToken: '',
      accessToken: '',
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

    clearAccount (state) {
      state.jwtToken = ''
      state.username = ''
      state.email = ''
    }
  },

  actions: {
    reloadAccount ({ commit }) {
      commit('clearAccount')
      Axios.get(authMeUrl)
      .then((res) => {
        let name = JsonPath.query(res.data, '$[0].user_claims[?(@.typ=="' + typName + '")].val')[0]
        let email = JsonPath.query(res.data, '$[0].user_claims[?(@.typ=="' + typEmail + '")].val')[0]
        let idToken = JsonPath.query(res.data, '$[0].id_token')
        let accessToken = JsonPath.query(res.data, '$[0].access_token')
        commit('setAccount', { idToken: idToken, accessToken: accessToken, username: name, email: email })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

export default AuthMeModule
