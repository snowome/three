let webpack = require('webpack')
let HTMLWebpackPlugin = require('html-webpack-plugin')
let path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        'app': './src/js/01.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name]-[chunkhash].min.js',
        publicPath:'/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader']
            },
            {
                test:/\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                // exclude: [
                //     path.resolve(__dirname, "app/demo-files")
                // ],
                use:['babel-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    esModule: false
                }
            },
            {
                test: /\.(png|svg|gif|jpe?g)$/,
                type: 'asset',
                generator:{
                    filename:'img/[name].[hash:6][ext]'
                },
                parser:{
                    dataUrlCondition: {
                        maxSize: 30*1024
                    }
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type:'asset/resource',
                generator:{
                    filename:'font/[name].[hash:3][ext]'
                },
            }
        ]
    },

    devServer: {
        hot: true,
        port: 8080,
        hot: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: '01.html',
            inject: true,
            title: 'aaa',
            template: path.resolve(__dirname, './src/page/01.html')
        })
    ]
}
