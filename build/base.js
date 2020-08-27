const Config = require('webpack-chain')
const path = require('path')
const resolve = file => path.resolve(__dirname, file);
const config = new Config()
const htmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


config.mode(process.env.NODE_ENV)
// 修改 entry 配置
config.entry('index')
      .add(resolve('../src/index.js'))
      .end()
      // 修改 output 配置
      .output
        .path(resolve('../dist'))
        .filename('[name].bundle.js');

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


config.plugin('html').use(htmlPlugin,[{
  title:'标题党',
  template: resolve('../public/index.html')
}])

config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin)



module.exports = config