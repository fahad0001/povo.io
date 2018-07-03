var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_URL: '"http://localhost:3000/api/v1"',
  SERVER_URL: '"http://localhost:3000/"'
})
