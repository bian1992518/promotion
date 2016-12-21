/**
 * Created by bianlongting on  16/12/15.
 * Email 1137060420@qq.com
 */

<!-- 百度统计 -->
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?674713459a1143b91a9a587335a87db3";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();


function Base(){
    this.width = 750;
    this.fontSize = 100;
    this.renderDOM();
}

Base.prototype.renderDOM = function(){
    var _self = this;
    _self.width = this.width;//设置默认最大宽度
    _self.fontSize = this.fontSize;//默认字体大小
    _self.widthProportion = function(){var p = (document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth)/_self.width;
        return p>1?1:p;
    };
    _self.changePage = function(){
        document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px !important");
    }
    _self.changePage();
    window.addEventListener('resize',function(){_self.changePage();},false);
};

var a = new Base();
a.renderDOM();
