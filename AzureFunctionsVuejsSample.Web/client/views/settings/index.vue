<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">API Settings</h1>
          <div class="block">
            <p class="control">
              <label class="label">API Endpoint</label>
              <input class="input is-medium" type="text" :value="apiEndpoint" placeholder="Azure Functions Endpoint" readonly>
            </p>
            <p class="control">
              <label class="label">API Key (FOR DEBUB)</label>
              <input class="input is-medium" type="text" :value="apiKey" placeholder="Azure Functions API Key" readonly>
            </p>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Admin API Settings</h1>
          <div class="block">
            <p class="control">
              <label class="label">API Endpoint</label>
              <input class="input is-medium" type="text" :value="adminApiEndpoint" placeholder="Azure Functions Endpoint" readonly>
            </p>
            <p class="control">
              <label class="label">API Key (FOR DEBUB)</label>
              <input class="input is-medium" type="text" :value="adminApiKey" placeholder="Azure Functions API Key" readonly>
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
            <input class="input is-medium" type="text" :value="authMeUrl" placeholder="AUTH Me Endpoint" readonly>
          </p>
          <p class="control">
            <label class="label">Account</label>
          </p>
          <p class="control has-icon">
            <input class="input is-medium" type="text" v-model="name" placeholder="UserName" readonly>
            <span class="icon is-small">
              <i class="fa fa-user"></i>
            </span>
          </p>
          <p class="control has-icon">
            <input class="input is-medium" type="email" v-model="email" placeholder="Email" readonly>
            <span class="icon is-small">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
          <p class="control">
            <label class="label">ID Token (FOR DEBUB)</label>
            <input class="input is-medium" type="text" v-model="idToken" placeholder="ID Token" readonly>
          </p>
          <p class="control">
            <label class="label">Access Token (FOR DEBUB)</label>
            <input class="input is-medium" type="text" v-model="accessToken" placeholder="Access Token" readonly>
          </p>
          <p class="control">
            <label class="label">Admin Access Token (FOR DEBUB)</label>
            <input class="input is-medium" type="text" v-model="adminToken" placeholder="Admin Access Token" readonly>
          </p>
          <p class="control">
            <label class="label">Logout Endpoint (FOR DEBUB)</label>
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
export default {

  data () {
    return {
      apiEndpoint: process.env.AZURE_FUNCTIONS_API_ENDPOINT,
      apiKey: process.env.AZURE_FUNCTIONS_API_KEY,
      adminApiEndpoint: process.env.AZURE_FUNCTIONS_ADMIN_API_ENDPOINT,
      adminApiKey: process.env.AZURE_FUNCTIONS_ADMIN_API_KEY,
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

.input[type='text'][readonly], .input[type='email'][readonly] {
  background-color: whitesmoke
}
</style>
