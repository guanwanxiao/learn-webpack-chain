const chalk = require('chalk')
const config = require('./base')
const webpack = require('webpack')
webpack(config.toConfig(),(err,stats) => {
  if (stats.hasErrors()) {
    console.log(chalk.red('构建失败\n'))
    // 返回描述编译信息 ，查看错误信息
    console.log(stats.toString())
    // 显示 stats 结构
    // console.log(stats.toJson())
    process.exit(1)
  }

  console.log(chalk.cyan('build完成\n'))
})