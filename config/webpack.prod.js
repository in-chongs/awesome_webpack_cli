const { CleanWebpackPlugin } = require('clean-webpack-plugin') //打包前清空build目录文件
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 打包进度条美化
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const chalk = require('chalk')

module.exports = require('./webpack.common')({
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({
      format:
        `${chalk.green.bold('build[:bar]')} ` +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
      clear: false,
      width: 60,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', //输出的 CSS 文件的名称
      chunkFilename: 'css/[name].[contenthash:8].chunk.css', // 非入口的 css chunk 文件名称
      ignoreOrder: true, // 忽略有关顺序冲突的警告
    }),
  ],
  stats: 'normal', //标准输出
})
