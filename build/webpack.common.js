const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {
  resolve,
  generateDllReferences,
  generateAddAssests,
  entries,
  htmlPlugins
} = require('./utils')

module.exports = {
  context: resolve(''),
  entry: entries(),
  output: {
    // publicPath: '/',
    filename: '[name].[hash:5].js',
    chunkFilename: '[name].[hash:5].chunk.js',
    path: resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src'),
      '@pa': resolve('src/pages/pa'),
      '@pb': resolve('src/pages/pb'),
      static: resolve('static')
    },
    modules: ['node_modules']
  },
  performance: false,
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            prettify: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        options: {
          // presets: [
          //   [
          //     '@babel/preset-env',
          //     {
          //       modules: false,
          //       useBuiltIns: 'usage',
          //       targets: {
          //         chrome: '58'
          //       },
          //       corejs: 2
          //     }
          //   ]
          // ],
          // plugins: [
          //   '@babel/plugin-syntax-dynamic-import',
          //   '@babel/plugin-transform-runtime'
          // ],
          cacheDirectory: true,
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                absoluteRuntime: false,
                corejs: 2,
                helpers: true,
                regenerator: true,
                useESModules: false
              }
            ],
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      },
      {
        test: /\.styl(us)?$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : {
              loader: resolve(
                'node_modules/mini-css-extract-plugin/dist/loader.js'
              ),
              options: {
                publicPath: '../'
              }
            },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          },
          'postcss-loader',
          {
            loader: 'stylus-loader',
            options: {
              preferPathResolver: 'webpack'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:5].[ext]',
            outputPath: 'img/',
            limit: 4096
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: '[name]_[hash:5].[ext]',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    ...htmlPlugins(),
    ...generateDllReferences(),
    ...generateAddAssests()
  ]
}
