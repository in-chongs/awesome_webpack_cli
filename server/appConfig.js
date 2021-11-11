module.exports = {
  deployUrl: '127.0.0.0:8080', //本地代码推送到指定服务器
  proxyUrlMap: {
    '/api': 'location:3000', //代理的接口
    '/api2': 'location:4000', //代理的接口
  },
  port: 8801, //端口号
  host: 'localhost', //主机号
}
