const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')
const { resolve, getEntry } = require('./utils')

const { merge: webpackMerge } = require('webpack-merge')
const devConfig = require('./webpack.dev')
const proConfig = require('./webpack.pro')

const commonConfig = (isProduction) => {
  const entrys = getEntry(`${resolve('./src/md')}/**/index.js`)
  const config = {
    context: resolve(''),
    entry: entrys,
    // entry: resolve('src/md/sourceMap/index.js'),
    output: {
      path: resolve('build'),
      filename: '[name].[chunkhash:6].bundle.js',
      clean: true,
      chunkFilename: '[name].chunk.[contenthash:6].js'
      // publicPath: '/file'
    },
    resolve: {
      extensions: ['.js', '.json', '.wasm', '.vue', '.jsx'],  // 自动添加后缀名
      mainFiles: ['index'],  // 当文件目录时，会找目录内的index文件
      alias: {  // 设置路径别名
        '@': resolve('src'),
        'pages': resolve('src/pages')
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1  // css中引入css不会从postcss-loader开始而是从css-loader转换开始，因此该配置保证loader向上一层开始转换
              }
            },
            'postcss-loader'
          ],
          sideEffects: true 
        },
        {
          test: /\.png|jpe?g|bmp|svg/i,
          type: 'asset',
          generator: {
            filename: 'img/[name].[hash:8][ext]'
          },
          parser: {
            dataUrlCondition: {
              maxSize: 100 * 1024
            }
          }
        },
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: [
            'babel-loader', 
          ]
        },
        {
          test: /\.md$/,
          use: 'mkdown-loader'
        }
      ]
    },
    resolveLoader: {
      modules: [
        'node_modules', './loaders'
      ]
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   title: '测试title',
      //   template: './public/index.html'
      // }),
      new DefinePlugin({
        BASE_URL: "'./'"
      }),
    ]
  }
  for(const pathname in entrys) {
    var conf = {
      title: '测试页',
      filename: pathname + '.html',
      template: './public/index.html',
      inject: true
    }
    // 指定页面输出特定打包结果
    conf.chunks = [pathname]
    console.log(conf)
    config.plugins.push(new HtmlWebpackPlugin(conf))
  }
  return config
} 

module.exports = (env) => {
  console.log(env)
  process.env.NODE_ENV = env.production ? 'production' : 'development'
  const mergeConfig = env.production ? proConfig : devConfig
  return webpackMerge(commonConfig(process.env.NODE_ENV === 'production'), mergeConfig)
}