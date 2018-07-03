var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PORT: '4200',
  API_URL: '"http://localhost:3000/api/v1"',
  SERVER_URL: '"http://localhost:3000/"'
})
