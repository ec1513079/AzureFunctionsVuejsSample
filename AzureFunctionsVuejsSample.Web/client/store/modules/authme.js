import Axios from 'axios'
import JsonPath from 'jsonpath'
import AuthenticationContext from 'adal-angular/lib/adal.js'

const authMeUrl = '/.auth/me'
const typName = 'name'
const typEmail = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'

const adalConfig = {
  tenant: 'a675d6fd-ad83-4992-a2aa-b44e7bff428d',
  clientId: '71e9f5f1-01f0-4844-ab62-38da6605f05f',
  resourceId: '4fcd0472-bcb8-4620-8753-715829a72440',
  cacheLocation: 'sessionStorage',
  cacheLocationKeyIdToken: 'adal.idtoken'
}

const AuthMeModule = {
  namespaced: true,

  state () {
    return {
      idToken: '',
      accessToken: '',
      username: '',
      email: '',
      adalToken: ''
    }
  },

  mutations: {
    setAccount (state, payload) {
      state.idToken = payload.idToken
      state.accessToken = payload.accessToken
      state.username = payload.username
      state.email = payload.email
    },

    setAdalToken (state, payload) {
      state.adalToken = payload
    },

    clearAccount (state) {
      state.idToken = ''
      state.accessToken = ''
      state.username = ''
      state.email = ''
      state.adalToken = ''
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

        window.sessionStorage.setItem(adalConfig.cacheLocationKeyIdToken, idToken)
        let authenticationContext = new AuthenticationContext(adalConfig)
        authenticationContext.getUser((error, user) => {
          if (error) {
            console.log(error)
            return
          }
          console.log(user)
          authenticationContext.acquireToken(adalConfig.resourceId, (error, token) => {
            if (error || !token) {
              console.log(error)
              return
            }
            console.log(token)
            commit('setAdalToken', token)
          })
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

export default AuthMeModule
