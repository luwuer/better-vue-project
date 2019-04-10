const webpack = require('webpack')

const config = require('./prod.config')

// const compiler = webpack(config)

webpack(config, (err, stats) => {
  // console.log(err, stats)
})
