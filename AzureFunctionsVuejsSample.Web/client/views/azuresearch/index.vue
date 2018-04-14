<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Indexers</h1>
        <div class="columns is-multiline is-mobile">
          <div class="column is-half is-offset-one-quarter">
            <button class="button is-primary has-text-centered"
              :class="{'is-loading': this.isRunning}"
              @click="notImpl">
              <span>hackfest-kb-ds-indexerを実行します</span>
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Tooltip from 'vue-bulma-tooltip'
import AzureSearch from 'azure-search'
import Message from 'vue-bulma-message'

const MessageComponent = Vue.extend(Message)
const openMessage = (propsData) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}

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
      return new Promise((resolve, reject) => {
        var client = AzureSearch({
          url: process.env.AZURE_FUNCTIONS_ENDPOINT,
          key: process.env.AZURE_FUNCTIONS_API_KEY
        })
        console.log(client)
        client.runIndexer(indexer, function (err) {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            console.log('done!')
            resolve('done!')
          }
        })
      })
      .then((data) => {
        this.isRunning = false
      })
      .catch((err) => {
        console.log(err)
        this.isRunning = false
      })
    },

    notImpl (params) {
      openMessage({
        title: '実装中',
        message: '申し訳ありません！本機能はまだ実装されておりません',
        type: 'warning'
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
