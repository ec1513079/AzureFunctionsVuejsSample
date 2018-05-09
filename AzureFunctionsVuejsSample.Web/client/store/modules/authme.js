/*
Azure App Serviceの"Authentication and Authorization"を利用してAPIへのアクセストークンを取得する
"Authentication and Authorization"の使い方は下記を参照すること

チュートリアル: Azure App Service でユーザーをエンド ツー エンドで認証および承認する
 https://docs.microsoft.com/ja-jp/azure/app-service/app-service-web-tutorial-auth-aad

Azure App Service での認証および承認
 https://docs.microsoft.com/ja-jp/azure/app-service/app-service-authentication-overview
*/

import Axios from 'axios'
import JsonPath from 'jsonpath'

const authMeUrl = '/.auth/me'
const typName = 'name'
const typEmail = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'

const refreshAuthUrl = '/.auth/refresh?resource=' + process.env.AZURE_FUNCTIONS_AD_APPLICATION_ID
const refreshAdminAuthUrl = '/.auth/refresh?resource=' + process.env.AZURE_FUNCTIONS_ADMIN_AD_APPLICATION_ID

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
      Axios.get(refreshAuthUrl)
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
        return Axios.get(refreshAdminAuthUrl)
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
