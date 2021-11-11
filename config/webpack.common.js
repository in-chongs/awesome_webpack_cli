const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// 设置 常量
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/
const imageInlineSizeLimit = 4 * 1024

module.exports = function (option) {
  console.log('option===>', option)
  console.log('paths.appSrc===>', paths.appSrc)
  const isEnvProduction = option.mode === 'production'
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
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          oneOf: [
            {
              test: cssRegex,
              exclude: cssModuleRegex,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1, // 0 => 无 loader(默认); 1 => postcss-loader; 2 => postcss-loader, sass-loader
                  },
                },
                'postcss-loader',
              ],
            },
            {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: [
                'style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1, // 查询参数 importLoaders，用于配置「css-loader 作用于 @import 的资源之前」有多少个 loader
                  },
                },
                'postcss-loader',
                'sass-loader',
              ],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: imageInlineSizeLimit, // 4kb
                },
              },
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2?)$/,
              type: 'asset/resource',
            },
          ],
        },
      ],
    },
    resolve: {
      //使用第三模块 第一反应去 根目录下的 node_modules 寻找
      modules: [paths.appNodeModules],
      //在import的时候不加文件扩展名,会依次遍历extensions 添加扩展名进行匹配
      extensions: ['.js', '.jsx', '.css', '*'],
      mainFields: ['browser', 'jsnext:main', 'main'],
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
      new webpack.DefinePlugin({
        NODE_ENV: isEnvProduction && JSON.stringify('production'), // 设置全局
      }),
      ...option.plugins,
    ],
    stats: option.stats, //打包日志错误和新的编译时输出
  }
}
