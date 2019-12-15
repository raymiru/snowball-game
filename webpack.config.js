const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, './src/app.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: 'dist',
    hot: true
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'static', to: 'static'}
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      showErrors: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
