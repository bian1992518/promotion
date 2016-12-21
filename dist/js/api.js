/**
 * Created by bianlongting on  16/12/16.
 * Email 1137060420@qq.com
 * Description 接口地址
 */

var url = require("../../conf/config");

//var url = "http://192.168.1.125:5000/";

var api = {
    test : url + "users",
    getCity : url.cmy + "index/region",         //获取城市下的区域
    getCarList : url.cmy + "car/my-car-list",   //获取车型库列表
    promotion : url.promotion
}


module.exports = api;
