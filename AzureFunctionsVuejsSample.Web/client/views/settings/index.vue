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
            <label class="label">Logout Endpoint</label>
            <input class="input is-medium" type="text" :value="logoutUrl" placeholder="Azure Functions Endpoint" readonly>
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
      logoutUrl: '/.auth/logout?post_logout_redirect_uri=' + encodeURIComponent(process.env.LOGOUT_REDIRECT_URL)
    }
  }

}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
