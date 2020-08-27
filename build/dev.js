const config = require('./base')

// 开发环境搭建
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const port = 8090
const publicPath = '/'
config.devServer
  .quiet(true)
  .hot(true)
  .https(false)
  .disableHostCheck(true)
  .publicPath(publicPath)
  .clientLogLevel('none')

const compiler = webpack(config.toConfig())
// 拿到 devServer 参数
const chainDevServer = compiler.options.devServer
const server = new WebpackDevServer(compiler,Object.assign(chainDevServer,{}))
server.listen(port)

compiler.hooks.done.tap('dev', stats => {
  const empty = '    '
  const common = `App running at:
  - Local: http://127.0.0.1:${port}${publicPath}\n`
  console.log(chalk.cyan('\n' + empty + common))
})