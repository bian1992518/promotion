/**
 * Created by bianlongting on  16/12/15.
 * Email 1137060420@qq.com
 */

require("../../css/index.css");
require("../../css/style.css");

var md5 = require('md5');

var util = require("../util");
var api = require("../api");

var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

/**
 * 领取补漆优惠
 */
$(".btn-reveice").on("click",function () {
    var cqVal = $(".cq-num").val();
    var mask = $(".mask");
    var success = $("#cq .success");
    _hmt.push(['_trackEvent', '领取补漆', 'click']);
    if (!reg.test(cqVal)){
        alert("手机号格式不正确");
        return false;
    }else{
        var data = {
            phone : cqVal
        };
        
        util.httpRequest(api.test,"POST",data,function ( data ) {
            if(data.flag == 1){
                mask.css("display","block");
                success.css("display","block");
            }else{
                alert(data.msg);
            }
        })
    };
    mask.on("click",function () {
        mask.css("display","none");
        success.css("display","none");
    })
});


var range = $(".price-range span");

/**
 * 选择车价区间
 */
var butBuy = $(".btn-buy");
var propertyId = "0";
range.on("click",function (  ) {
    var that = $(this);
    $(this).addClass("active")
            .siblings().removeClass("active");
    var index = that.index();
    propertyId = index;
    switch (index){
        case 0 :
            butBuy.html("充值200元 (其中158元购买补漆)");
            break;
        case 1 :
            butBuy.html("充值300元 (其中258元购买补漆)");
            break;
        case 2 :
            butBuy.html("充值400元 (其中358元购买补漆)");
            break;
    }
});


/**
 * 选择城市区域
 */
var cityStationName = "";
var city = $(".select-area .city");
$(".provice").on("change",function () {
    var that = $(this);
    cityStationName = that.children("option:selected").text();
    var data = {
        cityStationId : that.val(),
        type : 1
    }
    util.httpRequest(api.getCity,"POST",data,function ( data ,status ) {
        var html = "";
        if (data.flag == 1){
            var data = data.data;
            for (var i = 0 ; i < data.length;i++){
                html += "<option value='" + data[i].regionId + "'>" + data[i].name + "</option>"
            };
        }else{
            html = "<option value=''>选择地区</option>"
            alert(data.msg);
        }
        city.html(html);
    })
});

var pathname = window.location.pathname;

if (pathname == "/cq/buy"){         //判断是否是购买页
    
    /**
     * 获取车型库
     */
    var token = util.getParam("Token") || (window.lotusRoot ? window.lotusRoot.getToken() : "");
    
    /**
     * 判断用户是否登录   token不存在的话提示用户登录
     */
    
    if(!token) {
        var isLogin = window.confirm("用户未登录,请先登录");
        if (isLogin == true){
            window.location.href = "cgj://login"
        }else{
            history.back();
        }
    }else{
        var isApp = window.lotusRoot ?  window.lotusRoot.isApp() : "";
        var carType =  $(".car-type");
        (function getUrlParam(token) {
            var data = {
                Token : token
            }
            util.httpRequest(api.getCarList,"POST",data,function ( data ) {
                if (data.flag == 1){
                    var html = "";
                    var cars = data.data.cars;
                    for (var i =0 ;i < cars.length ; i ++){
                        html += "<option value='" + cars[i].CarModel + "' " +
                            "data-plateNumber = '" + cars[i].PlateNumber + "' " +
                            "data-carRepoId =' " + cars[i].RepoID +  " '>" +
                            cars[i].CarInfo.CarModelName +
                            "</option>"
                    };
                    carType.append(html);
                    order();
                }else{
                    alert(data.msg);
                }
            })
        })(token);
    }
    
    /**
     * 下单
     */
    
    function order () {
        butBuy.on("click",function () {
            var carData = carType.find("option:selected").data();
            var data = {
                Token : token,
                productCode : propertyId,
                cityStationName : cityStationName,
                district : city.find("option:selected").text(),
                carRepoId : carData.carrepoid,
                carModel : carType.val(),
                plateNumber : carData.platenumber,
            };
            var sign = util.objSortKeys(data);
            var Signature = "sign: ";
            for(var i in sign){
                Signature += i + sign[i]
            }
            Signature = Signature.split(" ").join("");
            data.Signature  = md5(Signature)
            
            if (city.val() == ""){
                alert("请选择城市");
                return false;
            }else if (!data.carRepoId){
                alert("请选择车型");
                return false;
            }
            util.httpRequest(api.promotion,"POST",data,function ( data ) {
                var data = JSON.parse(data);
                if(data.code == 200){
                    var redirectURL = data.data.redirectURL;
                    if (isApp){  //true  android
                        var arr = redirectURL.split(":");
                        var str = decodeURI(arr.pop());
                        arr.push(str);
                        redirectURL = arr.join(":");
                    }
                    window.location.href= redirectURL;
                }else{
                    alert(data.msg);
                }
            })
            
        })
    }
}
