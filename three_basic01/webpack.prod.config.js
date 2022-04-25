let HTMLWebpackPlugin = require('html-webpack-plugin')
let path = require('path')

module.exports = {
    mode: 'production',

    entry: {
        'app': './src/index'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            filename: '01.html',
            inject: true,
            template: path.resolve(__dirname, '01.html')
        })
    ],

    optimization: {
        minimizer: [
            // new UglifyJs({
            //     uglifyOptions: {
            //         keep_classnames: true,
            //         keep_fnames: true,

            //         ecma: 6,
            //         cache: true,
            //         parallel: true
            //     }
            // })
        ],

        runtimeChunk: true,

        splitChunks: {
            name: true,
            minSize: 0,
            cacheGroups: {
                preact: {
                    test: /preact/,
                    chunks: 'initial'
                },
                lodash: {
                    test: /lodash/,
                    chunks: 'all'
                }
            }
        }
    }
}
