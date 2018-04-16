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
            <label class="label">JWT Token (FOR DEBUB)</label>
            <input class="input is-medium" type="text" v-model="jwtToken" placeholder="JWT Token" readonly>
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
      tableStorageConnectionStr: process.env.AZURE_STORAGE_CONNECTION_STRING,
      searchEndpoint: process.env.AZURE_FUNCTIONS_ENDPOINT,
      searchKey: process.env.AZURE_FUNCTIONS_API_KEY,
      authMeUrl: '/.auth/me',
      name: this.$store.state.authme.username,
      email: this.$store.state.authme.email,
      jwtToken: this.$store.state.authme.jwtToken,
      logoutUrl: '/.auth/logout?post_logout_redirect_uri=' + encodeURIComponent(process.env.LOGOUT_REDIRECT_URL)
    }
  },

  mounted () {
    this.$store.dispatch('authme/reloadAccount').catch((e) => {
      console.log(e)
    })
  }
}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
