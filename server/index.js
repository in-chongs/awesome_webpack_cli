const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
// webpack开发 配置文件
const WebpackConfig = require('../config/webpack.dev')
//自定义日志输出
const logger = require('./logger')
//服务配置
const appConfig = require('./appConfig')
//监听的端口号
const { port, host } = appConfig
//编译器
const compiler = Webpack(WebpackConfig)
//devServer 参数
const devServerOptions = Object.assign({}, WebpackConfig.devServer, {
  open: true, //自动打开浏览器
  hot: true, //热更新
  compress: true, //gzip 压缩
  stats: 'minimal',
})
const server = new WebpackDevServer(compiler, devServerOptions)

server.listen(port, host, async (err) => {
  if (err) {
    return logger.error(err.message)
  }
  logger.appStarted(port, 'localhost')
})
