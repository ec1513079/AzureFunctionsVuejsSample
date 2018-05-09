import Message from 'vue-bulma-message'

const MessageNotificationPlugin = {

  install (Vue, options = {}) {
    const MessageComponent = Vue.extend(Message)
    const OpenMessage = (propsData) => {
      return new MessageComponent({
        el: document.createElement('div'),
        propsData
      })
    }

    Vue.prototype.$message = {

      notice (title, message) {
        OpenMessage({
          title: title,
          message: message,
          type: 'primary'
        })
      },

      info (title, message) {
        OpenMessage({
          title: title,
          message: message,
          type: 'success'
        })
      },

      warning (title, message) {
        OpenMessage({
          title: title,
          message: message,
          type: 'warning',
          duration: 0,
          showCloseButton: true
        })
      },

      error (title, message) {
        OpenMessage({
          title: title,
          message: message,
          type: 'danger',
          duration: 0,
          showCloseButton: true
        })
      }
    }
  }
}

export default MessageNotificationPlugin
