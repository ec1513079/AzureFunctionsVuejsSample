<template>
  <modal :visible="visible" @close="close">
    <header class="modal-card-head">
        <div class="container">
          <div class="level">
            <div class="level-left">
              <p class="modal-card-title">{{ entity.Title }}</p>
            </div>
            <div class="level-right">
              <a class="button is-link level-item" @click="close">
                <span class="icon">
                  <i class="fa fa-close"></i>
                </span>
                <span>Close</span>
              </a>
            </div>
          </div>
      </div>
    </header>
    <section class="modal-card-body">
      <div class="block">
        <label class="label">Timestamp</label>
        <p class="control">
          <input class="input" type="text" v-model="entity.Timestamp" readonly>
        </p>
        <label class="label">PartitionKey</label>
        <p class="control">
          <input class="input" type="text" v-model="entity.PartitionKey" readonly>
        </p>
        <label class="label">TalkId</label>
        <p class="control">
          <input class="input" type="text" v-model="entity.TalkId" readonly>
        </p>
        <label class="label">UserQuestion</label>
        <p class="control">
          <textarea class="textarea" v-model="entity.UserQuestion" readonly></textarea>
        </p>
        <label class="label">ReplayQuestion</label>
        <p class="control">
          <textarea class="textarea" v-model="entity.ReplayQuestion" readonly></textarea>
        </p>
        <label class="label">ReplayAnswer</label>
        <p class="control">
          <textarea class="textarea" v-model="entity.ReplayAnswer" readonly></textarea>
        </p>
        <label class="label">IsResolution</label>
        <p class="control">
          <input class="input" type="text" v-model="entity.IsResolution" readonly>
        </p>
        <label class="label">Score</label>
        <p class="control">
          <input class="input" type="text" v-model="entity.Score" readonly>
        </p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <div class="container">
        <div class="level">
          <div class="level-left">
          </div>
          <div class="level-right">
            <a class="button is-link level-item" @click="close">
              <span class="icon">
                <i class="fa fa-close"></i>
              </span>
              <span>Close</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </modal>
</template>

<script>
import { Modal } from 'vue-bulma-modal'

export default {
  components: {
    Modal
  },

  props: {
    visible: Boolean,
    entity: null
  },

  methods: {
    close () {
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

  .input[readonly="readonly"], .textarea[readonly="readonly"] {
    background-color: whitesmoke
  }
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
