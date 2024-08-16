const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')

module.exports = {
  entry: {
    main: './src/index.js',
    styles: '/src/main.css'
  },
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/static/dist/',
    path: path.resolve(__dirname, '..','app', 'static', 'dist'),
    clean: true
  },
  module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader'
                }
            ]
        }
    ]
  },
  plugins: [
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    }),
    new RemoveEmptyScriptsPlugin()
  ]
};