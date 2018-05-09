<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Indexers</h1>
        <div class="columns is-multiline is-mobile">
          <div class="column is-half is-offset-one-quarter">
            <button class="button is-primary has-text-centered"
              :class="{'is-loading': this.isRunning}"
              @click="runIndexer('hackfest-kb-ds-indexer')">
              <span>hackfest-kb-ds-indexerを実行します</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Tooltip from 'vue-bulma-tooltip'

export default {
  components: {
    Tooltip
  },

  data () {
    return {
      pkginfo: this.$store.state.pkg,
      isRunning: false
    }
  },

  methods: {
    runIndexer (indexer) {
      var apiUrl = process.env.AZURE_FUNCTIONS_ENDPOINT + '/api/AzureSearchIndexerRun' + '?indexer=' + indexer + '&' + process.env.AZURE_FUNCTIONS_API_KEY
      this.$http({
        url: apiUrl,
        headers: { Authorization: 'Bearer ' + this.$store.state.authme.accessToken }
      }).then((data) => {
        console.log(data)
        this.isRunning = false
        this.$message.info('実行をリクエストしました', JSON.stringify(data))
      }).catch((error) => {
        console.log(error)
        this.isRunning = false
        this.$message.error('実行に失敗しました', JSON.stringify(error))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.is-title {
  text-transform: capitalize;
}

.button {
  width: 100%;
}
</style>
