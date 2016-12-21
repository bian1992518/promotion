/**
 * Created by bianlongting .
 * Date 16/12/20 14-58
 * Email 1137060420@qq.com
 * Description 测试环境
 */


var path = require("path");
var fs = require("fs");

function changeTestConfig (  ) {
    fs.readFile(path.join(__dirname,'../conf','testConfig.js'),'utf-8',function ( err,buf ) {
        console.log(buf);
        fs.writeFile(path.join(__dirname,'../conf','config.js'),buf,'utf-8',function ( err ) {
            console.log("success");
        })
    })
}

changeTestConfig();
