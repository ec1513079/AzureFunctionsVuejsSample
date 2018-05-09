<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Azure Functions Settings</h1>
          <div class="block">
            <p class="control">
              <label class="label">Functions Endpoint</label>
              <input class="input is-medium" type="text" :value="searchEndpoint" placeholder="Azure Functions Endpoint" disabled>
            </p>
            <p class="control">
              <label class="label">Functions API Key</label>
              <input class="input is-medium" type="text" :value="searchKey" placeholder="Azure Functions API Key" disabled>
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
            <label class="label">Account Endpoint (FOR DEBUB)</label>
            <input class="input is-medium" type="text" :value="authMeUrl" placeholder="AUTH Me Endpoint" disabled>
          </p>
          <p class="control">
            <label class="label">Account</label>
          </p>
          <p class="control has-icon">
            <input class="input is-medium" type="text" v-model="name" placeholder="UserName" disabled>
            <span class="icon is-small">
              <i class="fa fa-user"></i>
            </span>
          </p>
          <p class="control has-icon">
            <input class="input is-medium" type="email" v-model="email" placeholder="Email" disabled>
            <span class="icon is-small">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
          <p class="control">
            <label class="label">ID Token (FOR DEBUB)</label>
            <input class="input is-medium" type="text" v-model="idToken" placeholder="ID Token" disabled>
          </p>
          <p class="control">
            <label class="label">Access Token (FOR DEBUB)</label>
            <input class="input is-medium" type="text" v-model="accessToken" placeholder="Access Token" disabled>
          </p>
          <p class="control">
            <label class="label">Admin Access Token (FOR DEBUB)</label>
            <input class="input is-medium" type="text" v-model="adminToken" placeholder="Admin Access Token" disabled>
          </p>
          <p class="control">
            <label class="label">Logout Endpoint (FOR DEBUB)</label>
            <input class="input is-medium" type="text" :value="logoutUrl" placeholder="Logout Endpoint" disabled>
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
export default {

  data () {
    return {
      tableStorageConnectionStr: process.env.AZURE_STORAGE_CONNECTION_STRING,
      searchEndpoint: process.env.AZURE_FUNCTIONS_ENDPOINT,
      searchKey: process.env.AZURE_FUNCTIONS_API_KEY,
      authMeUrl: '/.auth/me',
      logoutUrl: '/.auth/logout?post_logout_redirect_uri=' + encodeURIComponent(process.env.LOGOUT_REDIRECT_URL)
    }
  },

  computed: {
    name: function () { return this.$store.state.authme.username },
    email: function () { return this.$store.state.authme.email },
    idToken: function () { return this.$store.state.authme.idToken },
    accessToken: function () { return this.$store.state.authme.accessToken },
    adminToken: function () { return this.$store.state.authme.adminToken }
  },

  mounted () {
    this.$store.dispatch('authme/reloadAccount')
  }
}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
