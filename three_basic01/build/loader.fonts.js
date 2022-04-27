module.exports = (env) => {
    return env === 'development'
        ? [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'static/fonts/',
            }
        }]
        : [{
            loader: 'url-loader',
            options: {
                name: '[name].[ext]',
                limit: 2048,
                publicPath: '../fonts/',
                outputPath: 'static/',
                useRelativePath: true
            }
        }];
}
