import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'FAQ Storage',
      path: '/tablestorage',
      meta: {
        icon: 'fa-database',
        link: 'tablestorage/index.vue'
      },
      component: lazyLoading('tablestorage', true)
    },
    {
      name: 'Azure Search',
      path: '/azuresearch',
      meta: {
        icon: 'fa-search',
        link: 'azuresearch/index.vue'
      },
      component: lazyLoading('azuresearch', true)
    },
    {
      name: 'Activity Log',
      path: '/activitylog',
      meta: {
        icon: 'fa-dashboard',
        link: 'activitylog/index.vue'
      },
      component: lazyLoading('activitylog', true)
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
