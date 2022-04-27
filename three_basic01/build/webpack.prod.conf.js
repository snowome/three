const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PriifyCss = require('purifycss-webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Path = require('path');
const GlobAll = require('glob-all');          // 加载多路径

module.exports = {
    mode: 'production',
    optimization: {
        // minimize: true,
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,       //打开并发
              sourceMap: false      // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            name: true,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',           // 初始化的时候就需要加载进来
                    test: /[\\/]node_modules[\\/]/,
                    // test: /jquery|lodash/        // 默认打包node_modules里并且大于30KB
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',    // merge all the css chunk to one file
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin('dist', {
            root: Path.resolve(__dirname, '../'),   //根目录
            verbose: true,        　　　　　　　　　　//开启在控制台输出信息
            dry: false        　　　　　　　　　　    //启用删除文件
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css'
        }),
        /** CSS TreeShaking **/
        new PriifyCss({
            paths: GlobAll.sync([
                Path.resolve(__dirname, '../src/page/*.html'),
                Path.resolve(__dirname, '../src/page/*.ejs'),
                Path.resolve(__dirname, '../src/page/*.js'),
                Path.resolve(__dirname, '../src/view/*.html'),
                Path.resolve(__dirname, '../src/view/*.ejs'),
            ])
        }),
    ],
}
