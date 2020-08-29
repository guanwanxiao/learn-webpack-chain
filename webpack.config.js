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
    // 针对使用多个 loaders 起一个总的名字
    .rule('extract-css-loader')
      .test(/\.(le|c|postc)ss$/)
      .use('extract-css-loader')
        .loader(require('mini-css-extract-plugin').loader)
        .options({
          publicPath: './'
        })
        .end()
      .use('css-loader')
        .loader('css-loader')
        .options({})
        .end()
      .use('postcss-loader')
        .loader('postcss-loader')
        .options({
          plugins: function() {
            return [
              require('autoprefixer')({
                overrideBrowserslist: ['>0.25%', 'not dead']
              })
            ]
          }
        })
        .end()
      .use('less-loader')
        .loader('less-loader')
        .end()
      .use('postcss')
        .loader('postcss-loader')
        .options({
          plugins: loader => [
            require("stylelint")({
              /* your options */
            }),
            require("postcss-reporter")({ clearReportedMessages: true })          
          ]
        })
      


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