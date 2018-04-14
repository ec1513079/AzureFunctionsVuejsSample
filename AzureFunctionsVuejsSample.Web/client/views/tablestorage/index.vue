<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="control">
            <button class="button is-primary" :class="{'is-loading': this.$store.state.faq.isLoading}" @click="loadData">
                <span class="icon">
                  <i class="fa fa-spinner"></i>
                </span>
                <span>Reload</span>
            </button>
            <button class="button is-info" :class="{'is-loading': this.$store.state.faq.isLoading}" @click="createData">
              <span class=icon>
                <i class="fa fa-plus"></i>
              </span>
              <span>Create</span>
            </button>
          </div>
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
          <div class="control">
            <button class="button is-primary" :class="{'is-loading': this.$store.state.faq.isLoading}" @click="loadData">
                <span class="icon">
                  <i class="fa fa-spinner"></i>
                </span>
                <span>Reload</span>
            </button>
            <button class="button is-info" :class="{'is-loading': this.$store.state.faq.isLoading}" @click="createData">
              <span class=icon>
                <i class="fa fa-plus"></i>
              </span>
              <span>Create</span>
            </button>
          </div>
        </article>
      </div>
    </div>
    <faq-modal :visible="showModal" :isInsertMode="isInsert" :entity="modalEntiry" @close="closeModal"></faq-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import Message from 'vue-bulma-message'
import truncate from 'truncate'
import FaqModal from './FaqModal'

const MessageComponent = Vue.extend(Message)
const openMessage = (propsData) => {
  return new MessageComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  components: {
    FaqModal,
    Message
  },

  methods: {
    loadData () {
      this.$store.dispatch('faq/reloadEntities').catch((e) => {
        console.log(e)
        openMessage({
          title: 'FAQ取得エラー',
          message: e.message || e,
          type: 'danger',
          duration: 0,
          showCloseButton: true
        })
      })
    },

    createData () {
      this.showModal = true
      this.isInsert = true
      this.modalEntiry = {}
    },

    rowSelected (params) {
      this.showModal = true
      this.isInsert = false
      this.modalEntiry = params.row
    },

    closeModal () {
      this.showModal = false
    }
  },

  data () {
    return {
      showModal: false,
      isInsert: true,
      modalEntiry: Object,
      columns: [
        {
          label: 'タイトル',
          field: 'Title',
          filterOptions: {
            enabled: true
          },
          formatFn: (value) => truncate(value, 10)
        },
        {
          label: '質問',
          field: 'Question',
          filterOptions: {
            enabled: true
          },
          formatFn: (value) => truncate(value, 10)
        },
        {
          label: '回答',
          field: 'Answer',
          filterOptions: {
            enabled: true
          },
          formatFn: (value) => truncate(value, 20)
        },
        {
          label: '検索用キーワード',
          field: 'Keywords',
          filterOptions: {
            enabled: true
          },
          formatFn: (value) => truncate(value, 10)
        },
        {
          label: '分類名',
          field: 'Category',
          filterOptions: {
            enabled: true
          },
          formatFn: (value) => truncate(value, 10)
        },
        {
          label: '備考',
          field: 'Remark',
          formatFn: (value) => truncate(value, 10)
        }
      ],
      rows: this.$store.state.faq.entities
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
