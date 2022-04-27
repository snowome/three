const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssLoader = require('./loader.css.js');

module.exports = function (env) {
    return cssLoader(env).concat([
        {
            loader: 'less-loader',
            options: {
                sourceMap: env === 'development'
            }
        }
    ]);
}
