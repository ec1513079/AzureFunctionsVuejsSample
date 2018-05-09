import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'API Sample',
      path: '/functions',
      meta: {
        icon: 'fa-code',
        link: 'functions/index.vue'
      },
      component: lazyLoading('functions', true)
    },
    {
      name: 'Settings',
      path: '/settings',
      meta: {
        icon: 'fa-wrench',
        link: 'settings/index.vue'
      },
      component: lazyLoading('settings', true)
    }
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
