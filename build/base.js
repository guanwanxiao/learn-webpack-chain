const Config = require('webpack-chain')
const path = require('path')
const resolve = file => path.resolve(__dirname, file);
const config = new Config()
const htmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')


config.mode(process.env.NODE_ENV)
// 修改 entry 配置
config.entry('index')
      .add(resolve('../src/index.js'))
      .end()
      // 修改 output 配置
      .output
        .path(resolve('../dist'))
        .filename('[name].bundle.js');
config.resolve.extensions.merge(['.ts','.js', '.jsx', '.vue', '.json'])
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

// config.module
//       .rule('ts-loader')
//         .test(/\.js?$/)
          // .use('babel-loader')
          //   .loader('babel-loader')
          //   .options({
          //     presets: ['@babel/preset-env'],
          //     // plugins: [
          //     //   [
          //     //     '@babel/plugin-transform-runtime',
          //     //     {
          //     //       corejs: 3
          //     //     }
          //     //   ]
          //     // ]
          //   })
          //   .end()
          // .use('ts-loader')
          //   .loader('ts-loader')
          //   .options({
          //     // appendTsSuffixTo: [/\.vue$/]
          //   })
          //   .end()
config.module
        .rule('vue-loader')
            .test(/\.vue$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
config.plugin('html').use(htmlPlugin,[{
  title:'标题党',
  template: resolve('../public/index.html')
}])

config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin)
config.plugin('VueLoaderPlugin').use(VueLoaderPlugin)
config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

module.exports = config