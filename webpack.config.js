const webpack = require("webpack");
const path = require("path");
//const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry : {
        "cq" : "./dist/js/module/cq.js"
    },
    output : {
        path : path.join(__dirname,'public/js/module'),
        filename : "[name].bundle.js"
    },
    debug : true,
    devtool : "source-map",
    module : {
      loaders : [
          //{test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css?-url") },
          {test: /\.css$/, loader: 'style-loader!css-loader' },
      ]
    },
    plugins : [
        new webpack.BannerPlugin('create by CMY bianlongting(1137060420@qq.com)'),
    ]
}
