module.exports = (env) => {
    return [
        {
            loader: 'babel-loader'
        }
    ].concat( env === 'production' ? [] : [])
}
