const { default: ESLintWebpackPlugin } = require('eslint-webpack-plugin')
const paths = require('./paths')

module.exports = require('./webpack.common')({
  mode: 'development',
  plugins: [
    new ESLintWebpackPlugin({
      fix: true,
      extensions: ['js', 'jsx'],
      context: paths.appSrc, // 文件根目录
      exclude: '/node_modules', // 指定要排除的文件目录
      cache: true, //缓存
    }),
  ],
  stats: 'errors-only', //只在发生错误或有新的编译时输出
})
