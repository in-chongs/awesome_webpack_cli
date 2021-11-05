const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = function (option) {
  return {
    mode: option.mode,
    entry: paths.appSrc,
    output: {
      path: paths.appBuild,
      filename: '[name].bundle.js',
      publicPath: '/',
    },
    cache: {
      //使用持久化缓存
      type: 'filesystem', //memory:使用内容缓存 filesystem:使用文件缓存
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.js$/, //处理js文件
          exclude: /node_modules/, //处理路径除了node_modules内的js文件
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      //使用第三模块 第一反应去 根目录下的 node_modules 寻找
      modules: [paths.appNodeModules],
      //在import的时候不加文件扩展名,会依次遍历extensions 添加扩展名进行匹配
      extensions: ['.js', '.jsx', '.css'],
      //创建别名,在import或require的别名,来确保模块引入变得更简单
      alias: {
        '@src': paths.appSrc,
        '@public': paths.appPublic,
      },
    },
    devServer: {
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      ...option.plugins,
    ],
    stats: option.stats, //打包日志错误和新的编译时输出
  }
}
