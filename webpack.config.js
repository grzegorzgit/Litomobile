const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'litomobile.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,    // puts css in a file
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {                               // autoprefixer
                        loader: 'postcss-loader',
                        options: {
                          plugins: () => [autoprefixer()]
                        }
                    },
                    "sass-loader"]                  // css preprocessor
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./demo/index.html",
            filename: "index.html", 
            inject: false
        }),
        new MiniCssExtractPlugin({
            filename: "litomobile.css"
        }),
        new WriteFilePlugin()  // Writes files on dev mode so there is no need of separate .css and .js files import in .html file when dev mode.
    ],
    optimization: {
        minimizer: [
          new OptimizeCssAssetsPlugin(),        // minifies css
          new TerserPlugin({ sourceMap: true }) // minifies js
        ],
      },
};