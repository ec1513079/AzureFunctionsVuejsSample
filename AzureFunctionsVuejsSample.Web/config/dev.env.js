'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AZURE_STORAGE_CONNECTION_STRING: '"UseDevelopmentStorage=true;"',
  AZURE_FUNCTIONS_ENDPOINT: '"http://localhost:7071/api/"',
  AZURE_FUNCTIONS_API_KEY: '""'
})
