/*! create by CMY bianlongting(1137060420@qq.com) */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by bianlongting on  16/12/15.
	 * Email 1137060420@qq.com
	 */
	
	__webpack_require__(1);
	__webpack_require__(5);
	
	var md5 = __webpack_require__(7);
	
	var util = __webpack_require__(11);
	var api = __webpack_require__(12);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.npminstall/css-loader/0.26.1/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../node_modules/.npminstall/css-loader/0.26.1/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "#cq{\n    background-image: url(\"/images/cq-bg.png\");\n}\n#cq img{\n    width:100%;\n    margin-bottom: 0.7rem;\n}\n#cq section{\n    width: 6.06rem;\n    margin: 0 auto;\n}\n#cq input{\n    width: 5.46rem;\n    border: 1px solid #b4b3b3;\n    border-radius: 5px;\n    padding: 0 0.3rem;\n    height: 0.88rem;\n    font-size: 0.35rem;\n    background: #ffffff;\n}\n#cq .btn-reveice{\n    width: 100%;\n    height: 0.9rem;\n    background-color: #eb5f00;\n    border-radius: 5px;\n    color: #ffffff;\n    font-size: 0.4rem;\n    font-weight: bold;\n    margin-top: 0.4rem;\n    margin-bottom: 0.4rem;\n}\n#cq .detail{\n    position: relative;\n    padding:0.4rem 0;\n    border-top:1px dashed #808080;\n    border-bottom:1px dashed #808080;\n    margin-bottom:0.6rem;\n}\n#cq .detail h2{\n    position: absolute;\n    top:0;\n    left:50%;\n    transform: translate(-50%);\n    top:-0.25rem;\n    font-size: 0.35rem;\n    color: #808080;\n    width:1.8rem;\n    height:0.5rem;\n    background-color: #ffffff;\n    text-align: center;\n    line-height: 0.5rem;\n}\n#cq .detail li{\n    font-size: 0.3rem;\n    color: #808080;\n    line-height: 0.5rem;\n}\n#cq .success{\n    background: url(\"/images/success.png\") no-repeat;\n    width: 6.08rem;\n    height: 7.3rem;\n    background-size:cover;\n    position: fixed;\n    left:50%;\n    top:50%;\n    -webkit-transform: translate(-50%,-50%);\n    -moz-transform: translate(-50%,-50%);\n    -ms-transform: translate(-50%,-50%);\n    -o-transform: translate(-50%,-50%);\n    transform: translate(-50%,-50%);\n    z-index: 1000;\n    display: none;\n}\n#cq .success p{\n    font-size: 0.37rem;\n    color: #666;\n    width: 4.4rem;\n    margin: 0 auto;\n    margin-top: 2.2rem;\n    line-height: 0.5rem;\n}\n.download{\n    display: block;\n    width:4.5rem;\n    height: 0.9rem;\n    text-align: center;\n    line-height: 0.9rem;\n    color: #ffffff;\n    font-size: 0.4rem;\n    border-radius: 5px;\n    background-color: #eb6100;\n    margin: 20px auto 0;\n}\n#cq .tip{\n    text-align: center;\n    font-size: 0.3rem;\n    color: #808080;\n    line-height:0.5rem;\n    margin-bottom:0.4rem;\n}\n\n.price-range{\n    display: -webkit-flex;\n    display: flex;\n    justify-content: space-between;\n}\n.price-range span{\n    width: 1.94rem;\n    height: 0.9rem;\n    background: #a6a6a7;\n    color: #ffffff;\n    font-size: 0.35rem;\n    text-align: center;\n    border-radius: 5px;\n    line-height:0.9rem;\n}\n.price-range span.active{\n    background-color: #ee5000;\n}\n.btn-buy{\n    color: #ffffff;\n    font-size: 0.35rem;\n    height:0.9rem;\n    text-align: center;\n    line-height:0.9rem;\n    border-radius: 5px;\n    background-color: #ee5000;\n    margin-bottom: 0.4rem;\n}\n.select-area{\n    padding-bottom: 0.6rem;\n}\n.select-area .area{\n    display: -webkit-flex;\n    display: flex;\n    justify-content: space-between;\n    margin-bottom: 0.4rem;\n}\n.select-area .area select,\n.car-type{\n    width:2.9rem;\n    height:0.9rem;\n    border:1px solid #a9a9a9;\n    -webkit-box-shadow: inset 1px 1px 12px #e7e1da;\n    -moz-box-shadow: inset 1px 1px 12px #e7e1da;\n    box-shadow: inset 1px 1px 12px #e7e1da;\n    font-size: 0.35rem;\n    color: #757575;\n    background: #fff;\n}\n.car-type{\n    width:100%;\n}\n.active-end{\n    width: 100%;\n    height:100%;\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/.npminstall/css-loader/0.26.1/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../node_modules/.npminstall/css-loader/0.26.1/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div,dl,dt,dd,input{margin:0;padding:0;}\nbody{font-size:12px;}\nhtml,body{max-width: 750px;margin:0 auto;color: #333;}\nimg{border:none}\nli{list-style:none}\ninput,select,textarea,button {outline:none;border:none;background:none;}\ntextarea{resize:none;}\na{text-decoration:none;color: #333;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;}\nhtml{-webkit-text-size-adjust:100%;-webkit-tap-lighlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;}\ninput{-webkit-appearance:none; }\ninput[type=\"number\"]{-moz-appearance:textfield;}\n/*清浮动*/\n.clearfix:after{content:\"\";display:none;clear:both;height:0;}\n.clearfix{zoom:1;display:table;width:100%;}\n\n.mask{\n  position: fixed;\n  left:0;\n  top:0;\n  width:100%;\n  height:100%;\n  background-color: #000000;\n  opacity: 0.7;\n  z-index: 999;\n  display: none;\n}\n", ""]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	  var crypt = __webpack_require__(8),
	      utf8 = __webpack_require__(9).utf8,
	      isBuffer = __webpack_require__(10),
	      bin = __webpack_require__(9).bin,
	
	  // The core
	  md5 = function (message, options) {
	    // Convert to byte array
	    if (message.constructor == String)
	      if (options && options.encoding === 'binary')
	        message = bin.stringToBytes(message);
	      else
	        message = utf8.stringToBytes(message);
	    else if (isBuffer(message))
	      message = Array.prototype.slice.call(message, 0);
	    else if (!Array.isArray(message))
	      message = message.toString();
	    // else, assume byte array already
	
	    var m = crypt.bytesToWords(message),
	        l = message.length * 8,
	        a =  1732584193,
	        b = -271733879,
	        c = -1732584194,
	        d =  271733878;
	
	    // Swap endian
	    for (var i = 0; i < m.length; i++) {
	      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
	             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
	    }
	
	    // Padding
	    m[l >>> 5] |= 0x80 << (l % 32);
	    m[(((l + 64) >>> 9) << 4) + 14] = l;
	
	    // Method shortcuts
	    var FF = md5._ff,
	        GG = md5._gg,
	        HH = md5._hh,
	        II = md5._ii;
	
	    for (var i = 0; i < m.length; i += 16) {
	
	      var aa = a,
	          bb = b,
	          cc = c,
	          dd = d;
	
	      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
	      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
	      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
	      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
	      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
	      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
	      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
	      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
	      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
	      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
	      c = FF(c, d, a, b, m[i+10], 17, -42063);
	      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
	      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
	      d = FF(d, a, b, c, m[i+13], 12, -40341101);
	      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
	      b = FF(b, c, d, a, m[i+15], 22,  1236535329);
	
	      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
	      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
	      c = GG(c, d, a, b, m[i+11], 14,  643717713);
	      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
	      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
	      d = GG(d, a, b, c, m[i+10],  9,  38016083);
	      c = GG(c, d, a, b, m[i+15], 14, -660478335);
	      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
	      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
	      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
	      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
	      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
	      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
	      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
	      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
	      b = GG(b, c, d, a, m[i+12], 20, -1926607734);
	
	      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
	      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
	      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
	      b = HH(b, c, d, a, m[i+14], 23, -35309556);
	      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
	      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
	      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
	      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
	      a = HH(a, b, c, d, m[i+13],  4,  681279174);
	      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
	      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
	      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
	      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
	      d = HH(d, a, b, c, m[i+12], 11, -421815835);
	      c = HH(c, d, a, b, m[i+15], 16,  530742520);
	      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);
	
	      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
	      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
	      c = II(c, d, a, b, m[i+14], 15, -1416354905);
	      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
	      a = II(a, b, c, d, m[i+12],  6,  1700485571);
	      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
	      c = II(c, d, a, b, m[i+10], 15, -1051523);
	      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
	      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
	      d = II(d, a, b, c, m[i+15], 10, -30611744);
	      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
	      b = II(b, c, d, a, m[i+13], 21,  1309151649);
	      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
	      d = II(d, a, b, c, m[i+11], 10, -1120210379);
	      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
	      b = II(b, c, d, a, m[i+ 9], 21, -343485551);
	
	      a = (a + aa) >>> 0;
	      b = (b + bb) >>> 0;
	      c = (c + cc) >>> 0;
	      d = (d + dd) >>> 0;
	    }
	
	    return crypt.endian([a, b, c, d]);
	  };
	
	  // Auxiliary functions
	  md5._ff  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._gg  = function (a, b, c, d, x, s, t) {
	    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._hh  = function (a, b, c, d, x, s, t) {
	    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	  md5._ii  = function (a, b, c, d, x, s, t) {
	    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
	    return ((n << s) | (n >>> (32 - s))) + b;
	  };
	
	  // Package private blocksize
	  md5._blocksize = 16;
	  md5._digestsize = 16;
	
	  module.exports = function (message, options) {
	    if (message === undefined || message === null)
	      throw new Error('Illegal argument ' + message);
	
	    var digestbytes = crypt.wordsToBytes(md5(message, options));
	    return options && options.asBytes ? digestbytes :
	        options && options.asString ? bin.bytesToString(digestbytes) :
	        crypt.bytesToHex(digestbytes);
	  };
	
	})();


/***/ },
/* 8 */
/***/ function(module, exports) {

	(function() {
	  var base64map
	      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
	
	  crypt = {
	    // Bit-wise rotation left
	    rotl: function(n, b) {
	      return (n << b) | (n >>> (32 - b));
	    },
	
	    // Bit-wise rotation right
	    rotr: function(n, b) {
	      return (n << (32 - b)) | (n >>> b);
	    },
	
	    // Swap big-endian to little-endian and vice versa
	    endian: function(n) {
	      // If number given, swap endian
	      if (n.constructor == Number) {
	        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
	      }
	
	      // Else, assume array and swap all items
	      for (var i = 0; i < n.length; i++)
	        n[i] = crypt.endian(n[i]);
	      return n;
	    },
	
	    // Generate an array of any length of random bytes
	    randomBytes: function(n) {
	      for (var bytes = []; n > 0; n--)
	        bytes.push(Math.floor(Math.random() * 256));
	      return bytes;
	    },
	
	    // Convert a byte array to big-endian 32-bit words
	    bytesToWords: function(bytes) {
	      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
	        words[b >>> 5] |= bytes[i] << (24 - b % 32);
	      return words;
	    },
	
	    // Convert big-endian 32-bit words to a byte array
	    wordsToBytes: function(words) {
	      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
	        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
	      return bytes;
	    },
	
	    // Convert a byte array to a hex string
	    bytesToHex: function(bytes) {
	      for (var hex = [], i = 0; i < bytes.length; i++) {
	        hex.push((bytes[i] >>> 4).toString(16));
	        hex.push((bytes[i] & 0xF).toString(16));
	      }
	      return hex.join('');
	    },
	
	    // Convert a hex string to a byte array
	    hexToBytes: function(hex) {
	      for (var bytes = [], c = 0; c < hex.length; c += 2)
	        bytes.push(parseInt(hex.substr(c, 2), 16));
	      return bytes;
	    },
	
	    // Convert a byte array to a base-64 string
	    bytesToBase64: function(bytes) {
	      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
	        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
	        for (var j = 0; j < 4; j++)
	          if (i * 8 + j * 6 <= bytes.length * 8)
	            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
	          else
	            base64.push('=');
	      }
	      return base64.join('');
	    },
	
	    // Convert a base-64 string to a byte array
	    base64ToBytes: function(base64) {
	      // Remove non-base-64 characters
	      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');
	
	      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
	          imod4 = ++i % 4) {
	        if (imod4 == 0) continue;
	        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
	            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
	            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
	      }
	      return bytes;
	    }
	  };
	
	  module.exports = crypt;
	})();


/***/ },
/* 9 */
/***/ function(module, exports) {

	var charenc = {
	  // UTF-8 encoding
	  utf8: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
	    },
	
	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
	    }
	  },
	
	  // Binary encoding
	  bin: {
	    // Convert a string to a byte array
	    stringToBytes: function(str) {
	      for (var bytes = [], i = 0; i < str.length; i++)
	        bytes.push(str.charCodeAt(i) & 0xFF);
	      return bytes;
	    },
	
	    // Convert a byte array to a string
	    bytesToString: function(bytes) {
	      for (var str = [], i = 0; i < bytes.length; i++)
	        str.push(String.fromCharCode(bytes[i]));
	      return str.join('');
	    }
	  }
	};
	
	module.exports = charenc;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}
	
	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}
	
	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by bianlongting on  16/12/16.
	 * Email 1137060420@qq.com
	 * Description 接口地址
	 */
	
	var url = __webpack_require__(13);
	
	//var url = "http://192.168.1.125:5000/";
	
	var api = {
	    test : url + "users",
	    getCity : url.cmy + "index/region",         //获取城市下的区域
	    getCarList : url.cmy + "car/my-car-list",   //获取车型库列表
	    promotion : url.promotion
	}
	
	
	module.exports = api;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * Created by bianlongting .
	 * Date 16/12/20 14-59
	 * Email 1137060420@qq.com
	 */
	
	var url = {
	    cmy : "http://testcgj.chemayi.com/wap/",
	    promotion : "http://testcgj.chemayi.com/chemayi/operating/promotion/two12/join/promotion"
	};
	
	module.exports = url;


/***/ }
/******/ ]);
//# sourceMappingURL=cq.bundle.js.map