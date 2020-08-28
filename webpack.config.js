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
    // .rule('css-loader')
      .use('css-loader')
      .loader('css-loader')
      .options({})
      .end()
    // .rule('postcss-loader')
      // .test(/\.postcss$/)
      // .use('postcss-loader')
      // .loader('postcss-loader')
      // .options({           // 如果没有options这个选项将会报错 No PostCSS Config found
      //         plugins: (loader) => [
      //             require('postcss-import')({root: loader.resourcePath}),
      //             require('autoprefixer')(), //CSS浏览器兼容
      //             require('cssnano')()  //压缩css
      //         ]
      //     }
      // )
      // .end()
    // .rule('less')
      // .test(/\.less$/)
      // .use('less-loader')
      // .loader('less-loader')
      // .end()


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