'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AZURE_STORAGE_CONNECTION_STRING: '"UseDevelopmentStorage=true;"',
  AZURE_FUNCTIONS_ENDPOINT: '"http://localhost:7071"',
  AZURE_FUNCTIONS_API_KEY: '"code=XXXXXXXXXXXXXXXXXXXX"',
  LOGOUT_REDIRECT_URL: '"https://localhost/logout_page"'
})
