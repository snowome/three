const Path = require('path');

module.exports = (env) => {
    return env === 'development'
        ? [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'static/images/',
            }
        }]
        : [{
            loader: 'url-loader',
            options: {
                name: '[name].[ext]',
                limit: 2048,
                // publicPath: '',
                outputPath: 'static/images/',
                // useRelativePath: true
            }
        }];
}
