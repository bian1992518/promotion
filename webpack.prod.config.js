/**
 * Created by bianlongting on  16/12/15.
 * Email 1137060420@qq.com
 */
const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry : {
        "cq" : "./dist/js/module/cq.js"
    },
    output : {
        path : path.join(__dirname,'public'),
        filename : "js/module/[name].bundle.js",
        publicPath : ""
    },
    module : {
        loaders : [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css?-url") },
        ]
    },
    plugins : [
        new webpack.BannerPlugin('create by CMY bianlongting(1137060420@qq.com)'),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.UglifyJsPlugin({
            compress : {
                warnings : false
            },
            output : {
                comments : false
            }
        }),
    ]
}
