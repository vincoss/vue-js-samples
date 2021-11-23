// vue.config.js
module.exports = {
    transpileDependencies: ['vuetify'],
    configureWebpack: config =>
    {
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
        } else {
            // mutate for development...
        }
    },
    outputDir: '../hello-there/ClientApp/dist',
    publicPath: ''
}