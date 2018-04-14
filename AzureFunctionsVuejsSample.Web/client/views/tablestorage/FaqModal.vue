<template>
  <modal :visible="visible" @close="close">
    <header class="modal-card-head">
        <div class="container">
          <div class="level">
            <div class="level-left">
              <p class="modal-card-title">{{ entity.Title }}</p>
            </div>
            <div class="level-right">
              <a class="button is-danger level-item" v-if="!this.isInsertMode" :class="{'is-loading': this.$store.state.faq.isLoading}" @click="deleteClick">
                <span>Delete</span>
                <span class="icon">
                  <i class="fa fa-times"></i>
                </span>
              </a>
              <a class="button is-primary level-item" :class="{'is-loading': this.$store.state.faq.isLoading}" @click="upsertClick">
                <span class="icon">
                  <i class="fa fa-check"></i>
                </span>
                <span v-if="this.isInsertMode">Insert</span>
                <span v-else>Update</span>
              </a>
            </div>
          </div>
      </div>
    </header>
    <section class="modal-card-body">
      <div class="block">
        <label class="label">キー</label>
        <p class="control">
          <input class="input" type="text" v-model="entity.RowKey" disabled>
        </p>
        <label class="label">タイトル</label>
        <p class="control">
          <input class="input" type="text" v-model="entity.Title">
        </p>
        <label class="label">質問</label>
        <p class="control">
          <textarea class="textarea" v-model="entity.Question"></textarea>
        </p>
        <label class="label">回答</label>
        <p class="control">
          <textarea class="textarea" v-model="entity.Answer"></textarea>
        </p>
        <label class="label">キーワード</label>
        <p class="control">
          <input class="input" type="text" v-model="entity.Keywords">
        </p>
        <label class="label">カテゴリ</label>
        <p class="control">
          <input class="input" type="text" v-model="entity.Category">
        </p>
        <label class="label">備考</label>
        <p class="control">
          <textarea class="textarea" v-model="entity.Remark"></textarea>
        </p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <div class="container">
        <div class="level">
          <div class="level-left">
          </div>
          <div class="level-right">
            <a class="button is-danger level-item" v-if="!this.isInsertMode" :class="{'is-loading': this.$store.state.faq.isLoading}" @click="deleteClick">
              <span>Delete</span>
              <span class="icon">
                <i class="fa fa-times"></i>
              </span>
            </a>
            <a class="button is-primary level-item" :class="{'is-loading': this.$store.state.faq.isLoading}" @click="upsertClick">
              <span class="icon">
                <i class="fa fa-check"></i>
              </span>
              <span v-if="this.isInsertMode">Insert</span>
              <span v-else>Update</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </modal>
</template>

<script>
import { Modal } from 'vue-bulma-modal'
import Vue from 'vue'
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
    Modal,
    Message
  },

  props: {
    visible: Boolean,
    isInsertMode: Boolean,
    entity: null
  },

  methods: {
    close () {
      this.$emit('close')
    },

    upsertClick () {
      console.log(this.entity)
      this.$store
      .dispatch('faq/upsertEntity', this.entity)
      .then(() => {
        openMessage({
          title: 'FAQ作成/更新',
          message: 'FAQを作成/更新しました',
          type: 'success'
        })
      })
      .catch((e) => {
        console.log(e)
        openMessage({
          title: 'FAQ作成/更新エラー',
          message: e.message || e,
          type: 'danger',
          duration: 0,
          showCloseButton: true
        })
      })
      this.$emit('close')
    },

    deleteClick () {
      console.log(this.entity)
      this.$store.dispatch('faq/softDeleteEntity', this.entity)
      .then(() => {
        openMessage({
          title: 'FAQ削除',
          message: 'FAQを削除しました',
          type: 'success'
        })
      })
      .catch((e) => {
        console.log(e)
        openMessage({
          title: 'FAQ削除エラー',
          message: e.message || e,
          type: 'danger',
          duration: 0,
          showCloseButton: true
        })
      })
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal-card-head, .modal-card-foot {
  .container {
    width: 100%
  }

  .modal-card-title {
    max-width: 550px
  }
}

.modal-container {
  -ms-overflow-style:none;
  
  ::-webkit-scrollbar{
    display:none;
  }
}

.modal-content, .modal-card {
    width: 800px;
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
