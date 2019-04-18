const webpack = require('webpack')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
const { generateWebpackConfig } = require('./utils')

const production = process.argv[2] === 'production'
const config = generateWebpackConfig(production)

if (production) {
  let spinner = new Spinner('building: ')
  spinner.start() 

  webpack(config, (err, stats) => {

    if (err || stats.hasErrors()) {
      console.log(chalk.red('× Build failed with errors.\n'))
      process.exit()
    }

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    spinner.stop()

    console.log(chalk.cyan('√ Build complete.\n'))
    console.log(
      chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
          "  Opening index.html over file:// won't work.\n"
      )
    )
  })
} else {
  module.exports = config
}
