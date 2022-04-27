module.exports = (env) => {
    return [
        {
            loader: 'html-loader',
            options: {
                attrs: ['img:src', 'img:data-src']
            }
        }
    ]
}
