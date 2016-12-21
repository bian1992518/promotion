/**
 * Created by bianlongting on  16/12/16.
 * Email 1137060420@qq.com
 * Description : 公共函数
 */


var util = {
    /**
     * ajax
     * @param url       接口地址
     * @param method    请求类型
     * @param data      数据
     * @param callback  回调
     */
    httpRequest : function (url,method,data,callback) {
        $.ajax({
            url : url,
            type : method,
            data : data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            success : callback
        })
    },
    /**
     * 获取url参数
     * @param 参数名
     * @returns {null}
     */
    getParam : function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    /**
     * 对象按照键值排序
     * @param 排序对象
     * @returns {{}}
     */
    objSortKeys : function ( obj ) {
        var arr = [];
        for(var i in obj){
            arr.push(i)
        }
        arr = arr.sort();
        var newObj = {};
        for(var i = 0 ; i < arr.length;i ++){
            newObj[arr[i]] = obj[arr[i]]
        }
        return newObj;
    }
    
}




module.exports = util;
