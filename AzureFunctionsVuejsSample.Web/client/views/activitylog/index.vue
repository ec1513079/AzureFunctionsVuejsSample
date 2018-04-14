<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="control">
            <div class="level">
              <div class="level-left">
                <button class="button is-primary level-item" :class="{'is-loading': this.$store.state.activitylog.isLoading}" @click="loadData">
                  <span class="icon">
                    <i class="fa fa-spinner"></i>
                  </span>
                  <span>Reload</span>
                </button>
                <button class="button is-primary level-item" :class="{'is-loading': this.$store.state.activitylog.isLoading}" @click="notImpl">
                  <span class=icon>
                    <i class="fa fa-filter"></i>
                  </span>
                  <span>Filter</span>
                </button>
              </div>
              <div class="level-right">
                <button class="button is-primary level-item" :class="{'is-loading': this.$store.state.activitylog.isLoading}" @click="notImpl">
                  <span class=icon>
                    <i class="fa fa-download"></i>
                  </span>
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :sort-options="{
              enabled: true,
              initialSortBy: {field: 'Timestamp', type: 'desc'}
            }"
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
          <div class="control">
            <div class="level">
              <div class="level-left">
                <button class="button is-primary level-item" :class="{'is-loading': this.$store.state.activitylog.isLoading}" @click="loadData">
                  <span class="icon">
                    <i class="fa fa-spinner"></i>
                  </span>
                  <span>Reload</span>
                </button>
                <button class="button is-primary level-item" :class="{'is-loading': this.$store.state.activitylog.isLoading}" @click="notImpl">
                  <span class=icon>
                    <i class="fa fa-filter"></i>
                  </span>
                  <span>Filter</span>
                </button>
              </div>
              <div class="level-right">
                <button class="button is-primary level-item" :class="{'is-loading': this.$store.state.activitylog.isLoading}" @click="notImpl">
                  <span class=icon>
                    <i class="fa fa-download"></i>
                  </span>
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <activity-log-modal :visible="showModal" :entity="modalEntiry" @close="closeModal"></activity-log-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Message from 'vue-bulma-message'
import truncate from 'truncate'
import ActivityLogModal from './ActivityLogModal'

const MessageComponent = Vue.extend(Message)
const openMessage = (propsData) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
    ActivityLogModal,
    Message
  },

  methods: {
    loadData () {
      this.$store.dispatch('activitylog/reloadEntities').catch((e) => {
        console.log(e)
        openMessage({
          title: 'ActivityLog取得エラー',
          message: e.message || e,
          type: 'danger',
          duration: 0,
          showCloseButton: true
        })
      })
    },

    rowSelected (params) {
      this.showModal = true
      this.isInsert = false
      this.modalEntiry = params.row
    },

    closeModal () {
      this.showModal = false
    },

    notImpl (params) {
      openMessage({
        title: '実装中',
        message: '申し訳ありません！本機能はまだ実装されておりません',
        type: 'warning'
      })
    }
  },

  data () {
    return {
      showModal: false,
      modalEntiry: Object,
      columns: [
        {
          label: 'Timestamp',
          field: 'Timestamp'
        },
        {
          label: 'PartitionKey',
          field: 'PartitionKey',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'TalkId',
          field: 'TalkId',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'UserQuestion',
          field: 'UserQuestion',
          filterOptions: {
            enabled: true
          },
          formatFn: (value) => truncate(value, 10)
        },
        {
          label: 'ReplayQuestion',
          field: 'ReplayQuestion',
          filterOptions: {
            enabled: true
          },
          formatFn: (value) => truncate(value, 10)
        },
        {
          label: 'ReplayAnswer',
          field: 'ReplayAnswer',
          filterOptions: {
            enabled: true
          },
          formatFn: (value) => truncate(value, 10)
        },
        {
          label: 'IsResolution',
          field: 'IsResolution'
        },
        {
          label: 'Score',
          field: 'Score'
        }
      ],
      rows: this.$store.state.activitylog.entities
    }
  }
}
</script>

<style lang="scss">
.vgt-table {
  tbody {
    tr {
      height: 60px;
    }
  }
}

.vgt-wrap {
  margin-bottom: 10px;
}

.message.is-danger {
  span.icon {
    display:none
  }

  .message-body {
    min-width: 400px;
  }
}
</style>
