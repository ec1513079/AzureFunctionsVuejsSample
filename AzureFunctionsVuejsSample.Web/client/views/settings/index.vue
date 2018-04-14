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
          <h1 class="title">Azure Search Settings</h1>
          <div class="block">
            <p class="control">
              <label class="label">Service Name</label>
              <input class="input is-medium" type="text" :value="searchEndpoint" placeholder="Azure Search Service Name" readonly>
            </p>
            <p class="control">
              <label class="label">Service API Key</label>
              <input class="input is-medium" type="text" :value="searchKey" placeholder="Azure Search Service API Key" readonly>
            </p>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">Account Settings</h1>
          <a class="button is-primary" href="/.auth/logout">
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
      searchEndpoint: process.env.AZURE_SEARCH_ENDPOINT,
      searchKey: process.env.AZURE_SEARCH_KEY
    }
  }

}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}
</style>
