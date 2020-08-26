const Config = require('webpack-chain')
const path = require('path')
const resolve = file => path.resolve(__dirname, file);
const config = new Config()
const htmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
config.mode('development')
// 修改 entry 配置
config.entry('index')
      .add(resolve('src/index.js'))
      .end()
      // 修改 output 配置
      .output
        .path(resolve('dist'))
        .filename('[name].bundle.js');
config.module
  .rule('compile')
    .test(/\.js$/)
    .include
      .add(resolve('src'))
      .add(resolve('test'))
      .end()
    .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          ['@babel/preset-env', { modules: false }]
        ]
      });
config.module
    .rule('extract-css-loader')
      .test(/\.(le|c)ss$/)
      .use('extract-css-loader')
      .loader(require('mini-css-extract-plugin').loader)
      .options({
        publicPath: './'
      })
      .end()
    .rule('css-loader')
      .use('css-loader')
      .loader('css-loader')
      .options({});


config.plugin('html').use(htmlPlugin,[{}])
config.plugin('html').tap(args => {
  args[0].title = '这里是标题'
  args[0].template = resolve('public/index.html')
  return args
})

config.plugin('mini').use(MiniCssExtractPlugin)
// config.plugin('html').use(htmlPlugin,[
//   {
//     template: resolve('public/index.html')
//   }
// ])


module.exports = config.toConfig()