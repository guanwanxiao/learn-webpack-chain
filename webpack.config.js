const Config = require('webpack-chain')
const path = require('path')
const resolve = file => path.resolve(__dirname, file);
const config = new Config()
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const CopyPlugin = require('./plugin/myCopy')
config.mode('production')
// 修改 entry 配置
config.entry('index')
      .add(resolve('./src/index.js'))
      .end()
      // 修改 output 配置
      .output
        .path(path.resolve(__dirname,'./dist'))
        .filename('[name].[hash].js');
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
config.plugin('namedChunksPlugin').use(webpack.NamedChunksPlugin)

config.plugin('CopyPlugin').use(CopyPlugin,[{ from:'dist',to:'dist2' }])
// config.plugin('webpack-bundle-analyzer')
//         .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

config.optimization.splitChunks({
          chunks: "all",
          cacheGroups: {
            vendors: {
              name: `chunk-vendors`,
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: "initial",
              // reuseExistingChunk: true
            },
            // common: {
            //   name: `chunk-common`,
            //   test: require.resolve('./src/treeShaking.js'),
            //   minChunks: 2,
            //   priority: 5,
            //   reuseExistingChunk: true
            // }
          }
        });

config.optimization.runtimeChunk(true)
// console.log('config.optimization',config.optimization)
webpack(config.toConfig(),(err,stats) => {
  // console.log(config.toString())
  if (stats.hasErrors()) {
    // 返回描述编译信息 ，查看错误信息
    process.exit(1)
  }
  const output = stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false 
  })
  process.stdout.write(output)

  console.log('build完成\n')
})
