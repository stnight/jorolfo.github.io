var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/ts/index.ts',
    },
    output: {
        filename: 'js/[name].js',
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json', '.webpack.js', '.web.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
            },
            {
                test: /\.pug$/,
                loaders: ['html-loader', 'pug-html-loader'],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                    'css-loader',
                    'sass-loader',
                    ],
                }),
            },
            { test: /\.json$/, loader: 'json-loader' },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/',
                    },
                  },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: false,
            template: './src/index.pug',
        }),
        new HtmlWebpackPugPlugin({
            adjustIndent: true,
        }),
        new ExtractTextPlugin('css/mystyles.css'),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};
