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
              option: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          ],
        },
      ],
    },
    devServer: {},
    Plugin: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      ...option.Plugin,
    ],
    stats: options.stats, //打包日志错误和新的编译时输出
  }
}
