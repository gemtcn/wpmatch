const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const postcssPresetEnv = require('postcss-preset-env');

const devMode = false;

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: [
    './js/main.js',
    './scss/style.scss'
  ],

  output: {
    filename: 'js/main.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'mylib',
    libraryTarget: 'var',
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: devMode
                ? () => []
                : () => [
                  postcssPresetEnv({
                    browsers: ['>1%']
                  }),
                  require('cssnano')()
                ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../images',
              emitFile: false
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? './css/style.css' : './css/style.min.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: "./images", to: "images" },
      ],
    })
  ]
};