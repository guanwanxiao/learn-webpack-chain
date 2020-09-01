const Config = require('webpack-chain')
const path = require('path')
const resolve = file => path.resolve(__dirname, file);
const config = new Config()
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

config.mode('production')
// 修改 entry 配置
config.entry('index')
      .add(resolve('./src/index.js'))
      .end()
      // 修改 output 配置
      .output
        .path(resolve('../dist'))
        .filename('[name].bundle.js');
config.module
      .rule('babel-loader')
      .test(/\.js$/)
        .use('babel-loader')
          .loader('babel-loader')
config.module
      .rule('css-loader')
      .test(/\.css$/)
        .use('style-loader')
          .loader('style-loader')
          .end()
        .use('css-loader')
          .loader('css-loader')
          .end()
        .use('postcss-loader')
          .loader('postcss-loader')
          .options({
            plugins: function() {
              // 可以添加多个插件
              return [
                require('autoprefixer')({
                  overrideBrowserslist: ['>0.25%', 'not dead']
                })
              ]
            }
          })
config.module
        .rule('url-loader')
        .test(/\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit:10000
        })
config.module
        .rule('vue-loader')
            .test(/\.vue$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()

config.module
        .rule('url-loader')
        .test(/\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit:10000
        })
config.module
        .rule('vue-loader')
            .test(/\.vue$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
config.plugin('VueLoaderPlugin').use(VueLoaderPlugin)
config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

  webpack(config.toConfig(),(err,stats) => {
    console.log(config.toString())
    if (stats.hasErrors()) {
      // 返回描述编译信息 ，查看错误信息
      console.log(stats.toString())
      process.exit(1)
    }
  
    console.log('build完成\n')
  })
