<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">新格納システム API テスト</h1>
        <div class="columns is-multiline is-mobile">
          <div class="column is-half is-offset-one-quarter">
            <button class="button is-primary has-text-centered"
              :class="{'is-loading': this.isRunning}"
              @click="runStockApi('T_Toti')">
              <span>/api/v1.0/T_Totiを実行します</span>
            </button>
          </div>
          <div>
            <p class="control">
              <input class="input" v-model="apiName" type="text" placeholder="API Name" @change="queryChange()">
            </p>
            <p class="control">
              <input class="input" v-model="selector" type="text" placeholder="Selector" @change="queryChange()">
            </p>
            <p class="control">
              <input class="input" v-model="query" type="text" placeholder="Query" @change="queryChange()">
            </p>
          </div>
          <div>
            <vue-good-table
              :columns="columns"
              :rows="rows"
              :search-options="{
                enabled: true,
              }"
              :pagination-options="{
                enabled: true,
                perPage: 10,
              }"
              @on-row-click="rowSelected"
              styleClass="table vgt-table">
            </vue-good-table>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Tooltip from 'vue-bulma-tooltip'
import Message from 'vue-bulma-message'
import Axios from 'axios'
import JsonPath from 'jsonpath'

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
      isRunning: false,
      apiName: '',
      selector: '',
      query: '',
      columns: [
        {
          label: '県コード',
          field: 'intKenCD',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: '農委コード',
          field: 'intNouiCD',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: '地番',
          field: 'nvcTiban',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'メモ',
          field: 'nvcMemo',
          filterOptions: {
            enabled: true
          }
        },
      ],
      rows: []
    }
  },

  methods: {
    runStockApi (apiName) {
      console.log('runStockApi')
      var apiUrl = 'http://localhost:50258/api/v1.0/' + this.apiName + '$filter=' + this.query
      Axios.get(apiUrl)
      .then((res) => {
        console.log(res)
        this.rows = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },

    rowSelected(row) {
        console.log(row)
    },

    queryChange(apiName) {
      console.log('queryChange')
      var apiUrl = 'http://localhost:50258/api/v1.0/' + this.apiName + '?$filter=' + this.query
      Axios.get(apiUrl)
      .then((res) => {
        console.log(res)
        this.rows = res.data
      })
      .catch((err) => {
        console.log(err)
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
