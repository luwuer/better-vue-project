const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  // mode: 'product',
  devServer: {
    open: true,
    compress: true,
    port: 8081,
    hot: true,
    hotOnly: true // HMR 构建失败时也不刷新页面
  },
  entry: {
    app: ['./src/main.js']
  },
  output: {
    // publicPath: '/',
    filename: '[name]_[hash:5].js',
    path: resolve('dist')
  },
  resolve: {
    alias: {
      '@': resolve('src')
    },
    modules: ['node_modules']
  },
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
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../static')
        ],
        options: { // options 内容可以拿出来放在 .babelrc
          presets: [ // 方式一 需在入口文件import '@babel/polyfill'
            [
              '@babel/preset-env',
              {
                targets: {
                  edge: '17',
                  firefox: '60',
                  chrome: '67',
                  safari: '11.1'
                },
                useBuiltIns: 'usage' // @babel/polyfill 只填充用到的语法
              }
            ]
          ],
          plugins: [ // 方式二
            '@babel/plugin-transform-runtime', // 闭包形式解释es6+语法，不会污染全局环境
            '@babel/plugin-syntax-dynamic-import'
          ]
        }
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          },
          'stylus-loader',
          'postcss-loader'
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
            name: '[name]_[hash:5].[ext]',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist'], {
      // 必须设置，否则会找不到dist
      root: resolve('')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('index.html')
    }),
    new CopyWebpackPlugin([
      // 默认输出 output.path
      {
        from: 'static/',
        to: 'static/'
      },
      {
        from: 'yarn.lock'
      }
    ]),
    new webpack.BannerPlugin({
      banner: `@auther 莫得盐\n@version ${
        require('../package.json').version
      }\n@info hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]`
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
