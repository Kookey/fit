var webpack = require('webpack')
var path = require('path')
var resolve = require('./resolve')
var externals = require('./externals')

var config = {
    devtool: 'eval-source-map',
    watch: true,

    entry: [
        'webpack-dev-server/client?http://localhost:8090',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],

    externals: externals,

    output: {
        path: __dirname + '/output',
        publicPath: '/output/',
        filename: 'index.js'
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: [/node_modules/, /demo/],
                loaders: ['react-hot-loader', 'babel?presets[]=react,presets[]=es2015', 'html-path-loader']
            }, {
                test: /\.js?$/,
                include: [/demo/],
                loaders: ['html-path-loader']
            }, {
                test: /\.(scss|css)/,
                exclude: [/node_modules/, /lib\/pc\/style/],
                loaders: ['style', 'css', 'autoprefixer', 'sass', 'css-path-loader']
            }, {
                test: /\.(scss|css)/,
                include: [/node_modules/, /lib\/pc\/style/],
                loaders: ['style', 'css', 'autoprefixer', 'sass']
            }, {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loaders: ['url?limit=3000&name=img/[hash:8].[name].[ext]']
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: ['url?limit=3000&name=font/[hash:8].[name].[ext]']
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.md$/,
                loader: 'text-loader'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],

    resolve: resolve
}

module.exports = config