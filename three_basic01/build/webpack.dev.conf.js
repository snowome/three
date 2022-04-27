const Webpack = require('webpack');
const Path = require('path');

const proxy = require('./proxy.js');
const historyApiFallback = require('./historyApiFallback.js');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',     // JS的source-map 1、cheap-module-source-map 开发  2、source-map 线上
    devServer: {
        contentBase: 'dist',
        clientLogLevel: 'warning',
        port: 8080,
        open: false,
        overlay: true,                  // 在网页上也显示报错信息
        hot: true,                      // 模块热更新。使用热加载插件 HotModuleReplacementPlugin
        hotOnly: false,                 // 在生成失败的情况下，启用热模块替换（请参阅devServer.hot），而不刷新页面作为回退。
        watchOptions: {
            ignored: /node_modules/     // 观察许多文件系统会导致大量的CPU或内存使用量。可以排除一个巨大的文件夹。
        },
        proxy: proxy,
        // historyApiFallback: true,       // 单页应用时防止路径404
        historyApiFallback: historyApiFallback
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),   // 模块热更新
    ]
}
