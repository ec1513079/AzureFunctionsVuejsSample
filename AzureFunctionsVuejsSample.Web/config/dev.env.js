'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AZURE_FUNCTIONS_API_ENDPOINT: '"http://localhost:7071/api"',
  AZURE_FUNCTIONS_API_KEY: '"XXXXXXXXXXXXXXXXXXXX"',
  AZURE_FUNCTIONS_ADMIN_API_ENDPOINT: '"http://localhost:7072/api"',
  AZURE_FUNCTIONS_ADMIN_API_KEY: '"XXXXXXXXXXXXXXXXXXXX"',
  LOGOUT_REDIRECT_URL: '"https://localhost/logout_page"'
})
