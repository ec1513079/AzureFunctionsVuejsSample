<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Table Storage Settings</h1>
          <div class="block">
            <label class="label">ConnectionString</label>
            <p class="control">
              <input class="input is-medium" type="text" :value="tableStorageConnectionStr" placeholder="TableStorage ConnectionString" readonly>
            </p>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Azure Functions Settings</h1>
          <div class="block">
            <p class="control">
              <label class="label">Functions Endpoint</label>
              <input class="input is-medium" type="text" :value="searchEndpoint" placeholder="Azure Functions Endpoint" readonly>
            </p>
            <p class="control">
              <label class="label">Functions API Key</label>
              <input class="input is-medium" type="text" :value="searchKey" placeholder="Azure Functions API Key" readonly>
            </p>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Account Settings</h1>
          <p class="control">
            <label class="label">Account Endpoint</label>
            <input class="input is-medium" type="text" :value="authMeUrl" placeholder="AUTH Me Endpoint" readonly>
          </p>
          <p class="control">
            <label class="label">Account</label>
          </p>
          <p class="control has-icon">
            <input class="input is-medium" type="text" v-model="account.name" placeholder="UserName" readonly>
            <span class="icon is-small">
              <i class="fa fa-user"></i>
            </span>
          </p>
          <p class="control has-icon">
            <input class="input is-medium" type="email" v-model="account.email" placeholder="Email" readonly>
            <span class="icon is-small">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
          <p class="control">
            <label class="label">Logout Endpoint</label>
            <input class="input is-medium" type="text" :value="logoutUrl" placeholder="Logout Endpoint" readonly>
          </p>
          <a class="button is-primary" :href="logoutUrl">
            <span class="icon">
              <i class="fa fa-sign-out"></i>
            </span>
            <span>Logout</span>
          </a>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import JsonPath from 'jsonpath'

export default {

  data () {
    return {
      tableStorageConnectionStr: process.env.AZURE_STORAGE_CONNECTION_STRING,
      searchEndpoint: process.env.AZURE_FUNCTIONS_ENDPOINT,
      searchKey: process.env.AZURE_FUNCTIONS_API_KEY,
      authMeUrl: '/.auth/me',
      account: { name: '', email: '' },
      logoutUrl: '/.auth/logout?post_logout_redirect_uri=' + encodeURIComponent(process.env.LOGOUT_REDIRECT_URL)
    }
  },

  mounted () {
    const typName = 'name'
    const typEmail = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
    Axios.get(this.authMeUrl)
    .then((data) => {
      console.log(data)
      var name = JsonPath.query(data, '$[0].user_claims[?(@.typ=="' + typName + '")].val')[0]
      console.log(typName)
      console.log(name)
      var email = JsonPath.query(data, '$[0].user_claims[?(@.typ=="' + typEmail + '")].val')[0]
      console.log(typEmail)
      console.log(email)
      this.account = { name: name, email: email }
    })
    .catch((error) => {
      console.log(error)
      /*
      const testData = [{'user_claims':[
        {'typ':'name', 'val':'hogehoge'},
        {'typ':'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress', 'val':'hogehoge@example.com'}
      ]}]
      var name = JsonPath.query(testData, '$[0].user_claims[?(@.typ=="' + typName + '")].val')[0]
      var email = JsonPath.query(testData, '$[0].user_claims[?(@.typ=="' + typEmail + '")].val')[0]
      this.account = { name: name, email: email }
      //*/
    })
  }
}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
