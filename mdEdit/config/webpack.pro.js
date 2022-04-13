const TerserPlugin = require('terser-webpack-plugin')  // 压缩js代码插件 webpack5自带
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')  // 压缩打包文件插件
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin') // 辅助将一些chunk出来的模块，内联到html中（会删除runtime-chunk）

module.exports = {
  // target: 'browserslist',
  mode: 'production',
  // devtool: 'source-map',
  // externals: {
  //   lodash: '_',
  //   dayjs: 'dayjs'
  // },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({   // 默认不需要去配置, 压缩js
        parallel: true,   // 使用cpu多核来构建
        extractComments: false,  // 打包后的 LICENSE.txt 注释文件去吃
        terserOptions: {
          compress: {
            arguments: true,
            dead_code: true,
          }, // 设置压缩相关的选项；
          mangle: true, // 设置丑化相关的选项，可以直接设置为true；
          toplevel: true, // 底层变量是否进行转换；
          keep_classnames: false, // 保留类的名称；
          keep_fnames: false, // 保留函数的名称；
        }
      }),
      new CssMinimizerWebpackPlugin({
        parallel: true
      })
    ],
    // chunkIds: 'named',
    splitChunks: {
      // async异步导入
      // initoal同步导入
      // all 异步/同步
      chunks: 'all',
      minSize: 20000,  // 最小尺寸，拆分出来的一个包的大小最小为minSize 默认 20kb
      maxSize: 20000,  // 将大于maxSize的包，拆成不小于minSize的包 默认 0， 一般会设置和minSize一样
      minChunks: 1,    // 引入的包，至少被导入几次 默认 1次
      cacheGroups: {   // 缓存分组
        vendor: {  // 第三方打包到vendor
          test: /[\\/]node_modules[\\/]/,  // 匹配node_modules
          filename: 'js/[id]_vendors.js',  // 与name属性区别是 filename可用占位符, name固定名称
          // name: 'js/check_vendors.js',  
          priority: -10  // 当所有打包条件都满足时，按priority优先级来打包，大的先打包
        },
        default: {  // 默认打包，当其他条件不满足
          minChunks: 2,
          filename: 'js/[id]_common.js',  // 一般是多入口会打包common.js
          priority: -20
        }
      }
    },
    // runtimeChunk: {
    //   name: 'runtime-chunk'
    // }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:6].css',
      chunkFilename: '[name].chunk.[contenthash:6].css',
    }),
    new CompressionWebpackPlugin({  // live server
      threshold: 0,
      test: /\.(css|js)$/i,
      minRatio: 0.8,
      algorithm: 'gzip'
    }),
    // new ScriptExtHtmlWebpackPlugin({
    //   inline: /runtime.*\.js(.gz)?$/  //正则匹配runtime文件名
    // })
  ]
}