const HtmlPlugin = require('html-webpack-plugin')
module.exports = {
  entry:'./fn.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'handlebars-loader', // handlebars loader expects raw resource string
        'extract-loader',
    'css-loader' ]
      }
    ]
  },
  plugins:[
    new HtmlPlugin({
      template:require.resolve('./public/index.html'),
      title:'这里是标题党'
    })
  ]
}