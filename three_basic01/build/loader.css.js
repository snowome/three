const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    return [
        env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',       // 告诉require进来的插件是给postcss用的
                sourceMap: env === 'development',
                plugins: [
                    require('postcss-cssnext')()                // 使用未来的css，已经包含了autoprefixer
                ]
            }
        },
    ]
}
