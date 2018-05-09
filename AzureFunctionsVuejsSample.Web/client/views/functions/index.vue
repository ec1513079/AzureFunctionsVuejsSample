<template>
  <div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Sample API 一覧</h1>
        <div class="columns is-multiline is-mobile">
          <div class="column is-half is-offset-one-quarter">
            <button class="button is-primary has-text-centered"
              :class="{'is-loading': this.apiStatus.running}"
              @click="execApi('sample-http-get')">
              <span>sample-http-getを実行</span>
            </button>
          </div>
        </div>
        <p class="control"
          :class="{'is-loading': this.apiStatus.running}">
          <textarea class="textarea"
            :class="{'is-danger': this.apiStatus.hasError}"
            :style="{'background-color': this.apiStatus.hasError ? 'pink' : 'unset'}"
            placeholder="Response Result"
            v-model="apiStatus.response"></textarea>
        </p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Admin Sample API 一覧</h1>
        <div class="columns is-multiline is-mobile">
          <div class="column is-half is-offset-one-quarter">
            <button class="button is-primary has-text-centered"
              :class="{'is-loading': this.adminApiStatus.running}"
              @click="execAdminApi('sample-http-get-admin')">
              <span>sample-http-get-adminを実行</span>
            </button>
          </div>
        </div>
        <p class="control"
          :class="{'is-loading': this.adminApiStatus.running}">
          <textarea class="textarea"
            :class="{'is-danger': this.adminApiStatus.hasError}"
            :style="{'background-color': this.adminApiStatus.hasError ? 'pink' : 'unset'}"
            placeholder="Response Result"
            v-model="adminApiStatus.response"></textarea>
        </p>
      </article>
    </div>
  </div>
</template>

<script>
import Tooltip from 'vue-bulma-tooltip'
import UrlJoin from 'url-join'

export default {
  components: {
    Tooltip
  },

  data () {
    return {
      pkginfo: this.$store.state.pkg,
      apiStatus: {
        response: null,
        running: false,
        hasError: false
      },
      adminApiStatus: {
        response: null,
        running: false,
        hasError: false
      }
    }
  },

  methods: {
    execApi (apiName) {
      this.apiStatus = {
        response: null,
        running: true,
        hasError: false
      }

      this.$http({
        url: UrlJoin(
          process.env.AZURE_FUNCTIONS_API_ENDPOINT,
          'aa' + apiName,
          '?code=' + process.env.AZURE_FUNCTIONS_API_KEY),
        headers: { Authorization: 'Bearer ' + this.$store.state.authme.accessToken }
      }).then((data) => {
        console.log(data)
        this.apiStatus = {
          response: JSON.stringify(data, null, 2),
          running: false,
          hasError: false
        }
        this.$message.info(apiName + ' 実行成功', 'API "' + apiName + '" が正常に実行されました。')
      }).catch((error) => {
        console.log(error)
        this.apiStatus = {
          response: JSON.stringify(error, null, 2),
          running: false,
          hasError: true
        }
        this.$message.error(apiName + ' 実行失敗', 'API "' + apiName + '" の実行に失敗しました。')
      })
    },

    execAdminApi (apiName) {
      this.adminApiStatus = {
        response: null,
        running: true,
        hasError: false
      }

      this.$http({
        url: UrlJoin(
          process.env.AZURE_FUNCTIONS_ADMIN_API_ENDPOINT,
          apiName,
          '?code=' + process.env.AZURE_FUNCTIONS_ADMIN_API_KEY),
        headers: { Authorization: 'Bearer ' + this.$store.state.authme.accessToken }
      }).then((data) => {
        console.log(data)
        this.adminApiStatus = {
          response: JSON.stringify(data, null, 2),
          running: false,
          hasError: false
        }
        this.$message.info(apiName + ' 実行成功', 'API "' + apiName + '" が正常に実行されました。')
      }).catch((error) => {
        console.log(error)
        this.adminApiStatus = {
          response: JSON.stringify(error, null, 2),
          running: false,
          hasError: true
        }
        this.$message.error(apiName + ' 実行失敗', 'API "' + apiName + '" の実行に失敗しました。')
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
