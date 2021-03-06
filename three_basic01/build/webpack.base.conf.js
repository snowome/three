const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const Path = require('path');
const Merge = require('webpack-merge');

const developmentConfig = require('./webpack.dev.conf.js');
const productionConfig = require('./webpack.prod.conf.js');

const scriptLoader = require('./loader.script.js');
const cssLoader = require('./loader.css.js');
const lessLoader = require('./loader.less.js');
const imagesLoader = require('./loader.images.js');
const htmlLoader = require('./loader.html.js');
const fontsLoader = require('./loader.fonts.js');

const resolvePath = relativePath => Path.resolve(process.cwd(), relativePath);

const generateConfig = (env) => {
    return {
        entry: {
            '01': './src/page/01/01.js',
            '02': './src/page/02/02.js',
            '03': './src/page/03/03.js',
            '04': './src/page/04/04.js',
            '05': './src/page/05/05.js',
            '06': './src/page/06/06.js',
            '07': './src/page/07/07.js',
            '08': './src/page/08/08.js',
            '09': './src/page/09/09.js',
            '10': './src/page/10/10.js',
        },
        output: {
            path: Path.resolve(__dirname, '../dist'),
            filename: 'static/js/[name].js',
            publicPath: env === 'development' ? '/' : './'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [
                        Path.resolve(__dirname, 'node_modules'),
                        // Path.resolve(__dirname, 'src/lib'),
                    ],
                    use: scriptLoader(env),
                },
                {
                    test: /\.css$/,
                    use: cssLoader(env)
                },
                {
                    test: /\.less$/,
                    use: lessLoader(env)
                },
                {
                    test: /\.html$/,
                    use: htmlLoader(env)
                },
                {
                    test: /\.(png|jpe?g|gif|svg|hdr)$/,
                    use: imagesLoader(env)
                },
                {
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: fontsLoader(env)
                }
            ]
        },
        resolve: {
            alias: {
                '@': resolvePath('src'),
            }
        },
        plugins: [
            new Webpack.ProvidePlugin({
                $: 'jquery'
            }),
            new HtmlWebpackPlugin(getHtmlConfig('01', '01', env)),
            new HtmlWebpackPlugin(getHtmlConfig('02', '02', env)),
            new HtmlWebpackPlugin(getHtmlConfig('03', '03', env)),
            new HtmlWebpackPlugin(getHtmlConfig('04', '04', env)),
            new HtmlWebpackPlugin(getHtmlConfig('05', '05', env)),
            new HtmlWebpackPlugin(getHtmlConfig('06', '06', env)),
            new HtmlWebpackPlugin(getHtmlConfig('07', '07', env)),
            new HtmlWebpackPlugin(getHtmlConfig('08', '08', env)),
            new HtmlWebpackPlugin(getHtmlConfig('09', '09', env)),
            new HtmlWebpackPlugin(getHtmlConfig('10', '10', env)),
        ]
    }
}
module.exports = (env) => {
    let config = env === 'production' ? productionConfig : developmentConfig;
    return Merge(generateConfig(env), config)
}

function getHtmlConfig(name, title, env = 'production') {
    return {
        filename: `${name}.html`,
        template: Path.resolve(__dirname, `../src/page/${name}/${name}.ejs`),
        minify: {
            collapseWhitespace: env === 'production' ? true : false
        },
        title: title,
        chunks: ['manifest', 'vendor', name],
        hash: true,
        favicon: './favicon.ico'
    }
}
