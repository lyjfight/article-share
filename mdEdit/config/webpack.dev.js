module.exports = {
  // target: 'web',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: 'only',
    host: '0.0.0.0',
    compress: true,
    proxy: {  // 解决跨域，设置代理服务器
      '/lyj': {
        target: 'http://localhost:3000',
        changeOrigin: true,  // 它表示是否更新代理后请求的headers中host地址, 防止有些服务器的host校验，比如 localhost:8080的请求是从8080请求过来的，但是通过代理后变成从3000请求过来，通过配置此属性让代理后header中的host还是8080
        pathRewrite: {  // 重写路径
          '^/lyj': ''
        },
        secure: false  // 可以转发到https服务器上
      }
    },
    historyApiFallback: true
  },
  plugins: []
}