'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AZURE_STORAGE_CONNECTION_STRING: '""',
  AZURE_SEARCH_ENDPOINT: '""',
  AZURE_SEARCH_KEY: '""'
})
