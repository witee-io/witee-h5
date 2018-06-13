(function(window) {

    //插件
    var auiToast = function() {
        // this.create();
    };
    var isShow = false;
    auiToast.prototype = {
        create: function(params,callback) {
            var self = this;
            var toastHtml = '';
            switch (params.type) {
                case "success":
                    var iconHtml = '<i class="aui-iconfont aui-icon-correct"></i>';
                    break;
                case "fail":
                    var iconHtml = '<i class="aui-iconfont aui-icon-close"></i>';
                    break;
                case "custom":
                    var iconHtml = params.html;
                    break;
                case "loading":
                    var iconHtml = '<div class="aui-toast-loading"></div>';
                    break;
            }

            var titleHtml = params.title ? '<div class="aui-toast-content">'+params.title+'</div>' : '';
            toastHtml = '<div class="showProgress"><div class="aui-toast">'+iconHtml+titleHtml+'</div></div>';
            if(document.querySelector(".aui-toast"))return;
            document.body.insertAdjacentHTML('beforeend', toastHtml);
            var duration = params.duration ? params.duration : "2000";
            self.show();
            if(params.type == 'loading'){
                if(callback){
                    callback({
                        status: "success"
                    });
                };
            }else{
                setTimeout(function(){
                    self.hide();
                }, duration)
            }
        },
        show: function(){
            var self = this;
            document.querySelector(".aui-toast").style.display = "block";
            document.querySelector(".aui-toast").style.marginTop =  "-"+Math.round(document.querySelector(".aui-toast").offsetHeight/2)+"px";
            if(document.querySelector(".aui-toast"))return;
        },
        hide: function(){
            var self = this;

            document.querySelector(".showProgress").parentNode.removeChild(document.querySelector(".showProgress"));

        },
        remove: function(){
            if(document.querySelector(".aui-dialog"))document.querySelector(".aui-dialog").parentNode.removeChild(document.querySelector(".aui-dialog"));
            if(document.querySelector(".aui-mask")){
                document.querySelector(".aui-mask").classList.remove("aui-mask-out");
            }
            return true;
        },
        success: function(params,callback){
            var self = this;
            params.type = "success";
            return self.create(params,callback);
        },
        fail: function(params,callback){
            var self = this;
            params.type = "fail";
            return self.create(params,callback);
        },
        custom:function(params,callback){
            var self = this;
            params.type = "custom";
            return self.create(params,callback);
        },
        loading:function(params,callback){
            var self = this;
            params.type = "loading";
            return self.create(params,callback);
        }
    };
    window.auiToast = auiToast;
    //插件
    var u = {
        DEFAULT_CONFIG:{
            openWin_CONFIG: {
                bounces: false,
                bgColor: "rgba(0,0,0,0)",
                scrollToTop: true,
                vScrollBarEnabled: false,
                hScrollBarEnabled: false,
                slidBackEnabled:false,
                delay: 0,
                reload: false,
                allowEdit: false,
                softInputMode: "auto",
                useWKWebView: false,
                animation:{
    				type:"movein",                //动画类型（详见动画类型常量）
    				subType:"from_right",       //动画子类型（详见动画子类型常量）
    				duration:200               //动画过渡时间，默认300毫秒
    			},
            },
            closeWin_CONFIG: {},
            ajax_CONFIG: {
                method: "get",
                cache: false,
                timeout: 3000,
                dataType: "json",
                charset: "utf-8",
                report: false,
                returnAll: false
            },
            showProgress_CONFIG: {
                style: 'default',
                animationType: 'zoom',
                title: '加载中',
                text: '请稍后...',
                modal: true
            },
        }
    };
    u.isWebView = function() {
      var host = window.location.host;
      var path = window.location.href;
      if (host == "" && ((path.toLowerCase().indexOf('file:///storage') > -1)) || ((path.toLowerCase().indexOf('file:///mnt/') > -1)) || ((path.toLowerCase().indexOf('file:///android_asset') > -1)) || ((path.toLowerCase().indexOf('file:///data') > -1)) || (path.toLowerCase().indexOf('file:///var/') > -1) || (path.toLowerCase().indexOf('contents:///') > -1) || (path.toLowerCase().indexOf('file:///private/') > -1)) {
          return true;
      }
      else {
          return false;
      }
    }
    u.isAPICloud = function() {

        if (typeof api !== 'undefined' && typeof api.openWin !== 'undefined' && u.isWebView()) {
            return true;
        }
        else {
            return false;
        }
    }
    u.isElement = function(obj){
        return !!(obj && obj.nodeType == 1);
    };
    u.dom = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelector){
                return document.querySelector(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelector){
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelectorAll){
                return document.querySelectorAll(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelectorAll){
                return el.querySelectorAll(selector);
            }
        }
    };
    u.hasCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if(el.className.indexOf(cls) > -1){
            return true;
        }else{
            return false;
        }
    };
    u.addCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.add(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls +' '+ cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.remove(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.prepend = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.attr = function(el, name, value){
        if(!u.isElement(el)){
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length == 2){
            return el.getAttribute(name);
        }else if(arguments.length == 3){
            el.setAttribute(name, value);
            return el;
        }
    };
    u.fixIos7Bar = function(el,bottomel){
        if(!u.isElement(el)){
            console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
            return;
        }
        var strDM = api.systemType;
        if (strDM == 'ios') {
            var strSV = api.systemVersion;
            var numSV = parseInt(strSV,10);
            var fullScreen = api.fullScreen;
            var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
            if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                el.style.paddingTop = api.safeArea.top+'px';
                if(bottomel){
                    bottomel.style.paddingBottom = api.safeArea.bottom + 'px';
                }

            }
        }
    };
    u.fixStatusBar = function(el,bottomel){
        if(!u.isElement(el)){
            console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
            return;
        }
        var sysType = api.systemType;
        if(sysType == 'ios'){
            u.fixIos7Bar(el,bottomel);
        }else if(sysType == 'android'){
            var ver = api.systemVersion;
            ver = parseFloat(ver);
            if(ver >= 4.4){
                el.style.paddingTop = '25px';
            }
        }
    };
    u.offset = function(el){
        if(!u.isElement(el)){
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.ready =function (name,bounces,state) {
        var path = location.pathname.split("/");
        var winName = path[path.length-1].split(".html")[0];



        // if(!state) {
        //     var userinfo = u.gdata("userinfo");
        //
        //     if(!userinfo.nurseid){
        //         return u.openwin('login','/html');
        //     }
        // }
        if(u.isWebView()){
            apiready = function() {
                if(name){
                    api.parseTapmode();
                    var header = u.dom('header');
                    var footer = u.dom('footer');
                    //沉浸式
                    if (api.statusBarAppearance) {
        				h.fixStatusBar(header);
        				api.setStatusBarStyle({
        					style : 'light'
        				});
        				h.attr(header, "style", "padding-top:25px;");
        			}

                    var headerPos = u.offset(header).h;
                    var footerPos = footer?u.offset(footer).h:0;
                    api.openFrame({
                        name : name,
                        url : name+".html",
                        rect : {
                            x : 0,
                            y : headerPos,
                            w : 'auto',
                            h : api.winHeight - headerPos - footerPos,
                        },
                        pageParam : api.pageParam,
                        bounces : bounces || false,
                        hScrollBarEnabled : false,
                        bgColor : 'rgba(0,0,0,0)',
                    });

                    api.addEventListener({
                        name: 'keyback'
                    }, function(ret, err) {
                        u.closeWin();
                    });
                }
                vm.init();
            };
        } else {
            window.onload = function () {

                vm.init();
            }
        }
    }

    u.isTargetType = function (obj, typeString) {
        return typeof obj === typeString;
    }

    u.isObject = function (obj) {
        var that = this;
        return (that.isTargetType(obj, "object") && obj != null && obj != undefined);
    }

    u.cloneObj = function (oldObj) {
        var that = this;

        if (that.isObject(oldObj) == false) {
            return oldObj;
        }
        var newObj = new Object();
        for (var i in oldObj) {
            newObj[i] = that.cloneObj(oldObj[i]);
        }
        return newObj;
    }

    u.extendObj = function () {
        var that = this;

        var args = arguments;
        if (args.length < 2) {
            return;
        }
        var temp = that.cloneObj(args[0]);
        //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    }

    u.openwin = function(winName, winUrl, winPageParam, options){

        var that = this;
        var o = {};
        o.name = winName;
        o.url = winUrl;
        o.pageParam = u.isObject(winPageParam) ? winPageParam : {};

        options = options || {};
        var opt = that.extendObj(u.DEFAULT_CONFIG.openWin_CONFIG, o, options);

        if (that.isAPICloud()) {
            opt.url = api.wgtRootDir + opt.url + '/' +opt.name+'.html';
            if(winPageParam.bgimg){
                opt.bgColor = winPageParam.bgimg;
            }

            api.openWin(opt);
        } else {
            var urloption = "?";
            for(i in winPageParam){
                urloption += i+"="+winPageParam[i]+"&"
            }
            urloption = urloption.slice(0,-1);
            winUrl = winUrl+'/'+winName+".html" + urloption;
            if (parent && parent.window) {
                parent.window.location = winUrl;
            }
            else {
                window.location = winUrl;
            }

        }

    }

    u.closeWin =  function (winName, options) {
        var that = this;
        var o = {};
        if (winName) {
            o.name = winName;
        }

        options = options || {};
        var opt = that.extendObj(u.DEFAULT_CONFIG.closeWin_CONFIG, o, options);
        if (that.isAPICloud()) {
            api.closeWin(opt);
        }
        else {
            if (navigator.userAgent.indexOf('Firefox') >= 0 ||
                navigator.userAgent.indexOf('Opera') >= 0 ||
                navigator.userAgent.indexOf('Safari') >= 0 ||
                navigator.userAgent.indexOf('Chrome') >= 0 ||
                navigator.userAgent.indexOf('WebKit') >= 0){
                console.log(window.history)
                if(window.history.length > 1){
                    window.history.go( -1 );
                }else{
                    that.openwin('club_index','/html',{id:$config.config.config.id})
                }
            }else{ //未知的浏览器
               window.history.go( -1 );
            }
        }
    }

    u.winWidth = function () {
        if (u.isAPICloud()) {
            return api.winWidth;
        }
        else {
            return window.screen.width;
        }
    }

    u.pageParam = function () {
        if (u.isAPICloud()) {
            return api.pageParam;
        } else {
            var option =  window.location.search;

            option = option.replace("?","");
            optionarry = option.split("&");
            var json = {};
            for(i in optionarry){
                var optionarry_ = optionarry[i].split("=");
                json[optionarry_[0]] = decodeURI(optionarry_[1]);
            }
            return json;

        }
    }

    u.ajax =  function (callback, url, method, data, dataType, options) {

        var that = this;
        var urls = url;
        var o = {};
        if(data.url){
            o.url = data.url;
        } else {
            o.url = $config.config.url() + url;
        }
        o.method = method ? method : "get";
        o.dataType = dataType ? dataType : "json";
        if (that.isObject(data) && o.method == "post") {
            o.data = data;
        }

        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth()+1;
        var date = myDate.getDate();

        // var tokens = that.hex_md5($config.config.md5.md5_brfore+year+(month>=10?month:'0'+month)+(date>=10?date:"0"+date)+$config.config.md5.md5_after);
        //
        // o.data.token = tokens;

        if (!that.isAPICloud()) {
            o.async =  true;
        }
        options = options || {};
        var opt = that.extendObj(that.DEFAULT_CONFIG.ajax_CONFIG, o, options);
        if (that.isAPICloud()) {
            alert(o.method)
            if(o.method == 'post'){
                if(opt.data.files){
                    opt.data = {values:opt.data,files:opt.data.files};
                } else {
                    opt.data = {values:opt.data};
                }
            }

            api.ajax(opt, function (ret, err) {
                if($config.config.config.isdevelopment){
                    console.log("");
                    console.log("*******方法名：Action => "+url+"*******开始*************");
                    console.log("");
                    console.log(o.url);
                    console.log("data => "+JSON.stringify(o.data));
                    console.log("callback => "+JSON.stringify(ret));
                    console.log("err => "+JSON.stringify(err));
                    console.log("");
                    console.log("*******方法结束************");
                }
                callback(ret, err);

            });
        } else {
            var xmlHttp = null;
            if (XMLHttpRequest) {
                xmlHttp = new XMLHttpRequest();
            }
            else {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            var params = [];

            for (var key in opt.data){
                params.push(key + '=' + opt.data[key]);
            }

            var postData = params.join('&');
            if (opt.method.toUpperCase() === 'POST') {
                postData = postData.replace(/\+/g, "%2B");
                xmlHttp.open(opt.method, opt.url, opt.async);
                xmlHttp.withCredentials = true;
                xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                xmlHttp.send(postData);
            }
            else if (opt.method.toUpperCase() === 'GET') {
                xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
                xmlHttp.send(null);

            }

            xmlHttp.onreadystatechange = function () {

                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    if($config.config.config.isdevelopment){
                        console.log("*******方法名：Action => "+url+"*******开始*************");
                        console.log(o.url);
                        console.log(o.data)
                        console.log(JSON.parse(xmlHttp.responseText));
                        console.log("*******方法结束************");
                    }

                    var data = JSON.parse(xmlHttp.responseText);

                    if(data.msg == "尚未登录!"+url){
                        console.log(2222);
                        that.openwin('login','/html');
                        callback(data);
                        return;
                    }
                    callback(data);
                }
            };

        }
    };
    u.toasttips = function(type,msg,call){
        var that = this;
        if(typeof(auiToast) != 'undefined'){
            var toast = new auiToast();
            switch(type){
                case 0:
                    toast.success({
                        title:msg,
                        duration:2000
                    });
                    break;
                case 1:
                    toast.fail({
                        title:msg,
                        duration:2000
                    });
                    break;
                case 2:
                    toast.loading({
                        title:msg,
                        duration:2000
                    },function(ret){
                        //call();
                    });
                    break;
                case 3:
                    toast.hide();
                    break;
                case 4:
                    toast.custom({
                        title:msg,
                        html:call,
                        duration:2000
                    });
                    break;
            }

            return toast;
        } else {
            console.warn('未引入aui-toast.js');
        }

    }
    u.showProgress = function (title, text, isModal, options) {
        var that = this;
        var o = {};
        o.modal =  true;
        if (title) {
            o.title = title;
        }
        if (text) {
            o.text = text;
        }

        options = options || {};
        var opt = that.extendObj(that.DEFAULT_CONFIG.showProgress_CONFIG, o, options);
        if (that.isAPICloud()) {
            api.showProgress(opt);
        } else {
            var Progress = that.toasttips(2,title);
            that.dom("body").style = 'overflow:hidden';
            return Progress;
        }
    }

    u.hideProgress =  function (opt) {
        var that = this;
        if (that.isAPICloud()) {
            api.hideProgress();
        } else {
            opt.hide();
            that.dom("body").style = '';
        }
    }
    u.uzStorage = function () {
        var ls = window.localStorage;
        // if ((/android/gi).test(navigator.appVersion)) {
        //     ls = os.localStorage();
        // }
        return ls;
    }
    u.setStorage =  function (key, value) {
        var that = this;
        if (arguments.length === 2) {
            var v = value;
            if (that.isObject(v)) {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
            var ls = that.uzStorage();
            if (ls) {
                ls.setItem(key, v);
            }
        }
    }
    u.getStorage = function (key) {
        var that = this;

        var ls = that.uzStorage();
        if (ls) {
            var v = ls.getItem(key);
            if (!v) {
                return;
            }
            if (v.indexOf('obj-') === 0) {
                v = v.slice(4);
                return JSON.parse(v);
            } else if (v.indexOf('str-') === 0) {
                return v.slice(4);
            }
        }
    }
    u.rmStorage = function (key) {
        var that = this;

        var ls = that.uzStorage();
        if (ls && key) {
            ls.removeItem(key);
        }
    }
    u.clearStorage = function () {
        var that = this;

        var ls = that.uzStorage();
        if (ls) {
            ls.clear();
        }
    }
    u.sdata = function(key, data) {
        var that = this;
        console.log(data);
        that.setStorage(key, JSON.stringify(data));
    }
    u.gdata = function(key) {
        var that = this;
        return JSON.parse(that.getStorage(key) || "{}");
    }

    u.exitApp = function(){
  		api.addEventListener({
  			name: 'keyback'
  		}, function(ret, err){

  			api.toast({
  				msg: '再按一次返回键退出'+api.appName,
  				duration:2000,
  				location: 'bottom'
  			});

  			api.addEventListener({
  				name: 'keyback'
  			}, function(ret, err){
  				api.closeWidget({
  					id: api.appId,     //这里改成自己的应用ID
  					retData: {name:'closeWidget'},
  					silent:true
  				});
  			});

  			setTimeout(function(){
  				u.exitApp();
  			},3000)
  		});
  	}
    u.push_up = function(path,callback) {
		api.addEventListener({
			name : 'scrolltobottom',
			extra : {
				threshold : 0 //设置距离底部多少距离时触发，默认值为0，数字类型
			}
		}, function(ret, err) {
            if(u.dom("#pushup_trip"))
			{
    			if(!u.hasCls(u.dom("#pushup_trip"),"over"))
    			{

    				var html = '<img class="" src="'+path+'image/loading_more.gif">';
    				h.dom(".pushup_trip").innerHTML = html;
    				setTimeout(function(){
    					callback();
    				},500);
    			}
            }
		});
	};
	u.push_up_over = function(data) {
		var pushup_trip = h.dom("#pushup_trip");
    	if(pushup_trip){
            pushup_trip.parentNode.removeChild(pushup_trip);
    	}
	};
    u.push_down = function(callback,text) {
		api.setRefreshHeaderInfo({
			visible : true,
			loadingImg : 'widget://image/refresh.png',
			bgColor : 'rgba(247,247,247,1)',
			textColor: '#999',
			textDown : '下拉'+(text||'刷新')+'...',
			textUp : '松开'+(text||'刷新')+'...',
			showTime : true
		}, function(ret, err) {
			callback();
		});
	};
	u.push_down_over = function() {
		api.refreshHeaderLoadDone();
	};
    u.contains = function(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }
    u.convertImgToBase64 =  function(url, callback, outputFormat){
	    var canvas = document.createElement('CANVAS'),
	        ctx = canvas.getContext('2d'),
	        img = new Image;
	    img.crossOrigin = 'Anonymous';
	    img.onload = function(){
	        canvas.height = img.height;
	        canvas.width = img.width;
	        ctx.drawImage(img,0,0);

	        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	        callback.call(this, dataURL);
	        canvas = null;
	    };
	    img.src = url;
	}
    //通过系统相册或拍照获取图片和视频
	u.getpicture = function(type,mediaValue,callback,state){

		api.getPicture({
			sourceType :type,
			encodingType : 'jpg',
			mediaValue : mediaValue,
			destinationType : 'base64',
            quality:10,
		},function(ret, err)
		{

			if(ret){
				if(ret.data){
					if(state){
						if(type == "library"){
							u.convertImgToBase64(ret.data, function(path){
							    // Base64DataURL
								var datapath = path.split(",");
								var imgtype = datapath[0].split("data:image/")[1].split(";base64")[0];
								callback(path,imgtype,datapath[1]);
							});
						} else {
							var path = ret.base64Data;
							var datapath = path.split(",");
							var imgtype = datapath[0].split("data:image/")[1].split(";base64")[0];
							callback(path,imgtype,datapath[1]);
						}
					}
				} else {
					api.hideProgress();
				}

			} else {
				api.hideProgress();
			}
		})
	}
    u.imguploadr = function(callback){
        api.actionSheet({
			cancelTitle : '关闭',
			buttons : ['拍照', '从相册']
		}, function(ret, err){
			if(ret){
				if(ret.buttonIndex<3){
					var type = ret.buttonIndex == 1?"camera":"library";
					// api.showProgress({
					// 	style: 'default',
					// 	animationType: 'fade',
					// 	title: '图片上传中...',
					// 	modal: true
					// });

					u.getpicture(type,"pic",function(bdpath,imgtype,uploader){
                        callback(bdpath,imgtype,uploader)
					},true);
				}
			}
	   });
    }
    //	乘法
	u.mul = function(a, b) {
	    var c = 0,
	        d = a.toString(),
	        e = b.toString();
	    try {
	        c += d.split(".")[1].length;
	    } catch (f) {}
	    try {
	        c += e.split(".")[1].length;
	    } catch (f) {}
	    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
	}
//	除法
	u.div = function(a, b) {
	    var c, d, e = 0,
	        f = 0;
	    try {
	        e = a.toString().split(".")[1].length;
	    } catch (g) {}
	    try {
	        f = b.toString().split(".")[1].length;
	    } catch (g) {}
	    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), u.mul(c / d, Math.pow(10, f - e));
	}
//	加法
	u.add = function(a, b) {
	    var c, d, e;
	    try {
	        c = a.toString().split(".")[1].length;
	    } catch (f) {
	        c = 0;
	    }
	    try {
	        d = b.toString().split(".")[1].length;
	    } catch (f) {
	        d = 0;
	    }
	    return e = Math.pow(10, Math.max(c, d)), (u.mul(a, e) + u.mul(b, e)) / e;
	}
//	减法
	u.sub = function(a, b) {
	    var c, d, e;
	    try {
	        c = a.toString().split(".")[1].length;
	    } catch (f) {
	        c = 0;
	    }
	    try {
	        d = b.toString().split(".")[1].length;
	    } catch (f) {
	        d = 0;
	    }
	    return e = Math.pow(10, Math.max(c, d)), (u.mul(a, e) - u.mul(b, e)) / e;
	}
	u.isPriceNumber = function(_keyword){
	    if(_keyword == "0" || _keyword == "0." || _keyword == "0.0" || _keyword == "0.00"){
	        _keyword = "0"; return true;
	    }else{
	        var index = _keyword.indexOf("0");
	        var length = _keyword.length;
	        if(index == 0 && length>1){/*0开头的数字串*/
	            var reg = /^[0]{1}[.]{1}[0-9]{1,2}$/;
	            if(!reg.test(_keyword)){
	                return false;
	            }else{
	                return true;
	            }
	        }else{/*非0开头的数字*/
	            var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/;
	            if(!reg.test(_keyword)){
	                return false;
	            }else{
	                return true;
	            }
	        }
	        return false;
	    }
	}
    u.SHA1 = function(msg) {

        function rotate_left(n, s) {
                var t4 = (n << s ) | (n >>> (32 - s));
                return t4;
        };

        function lsb_hex(val) {
                var str = "";
                var i;
                var vh;
                var vl;

                for ( i = 0; i <= 6; i += 2) {
                        vh = (val >>> (i * 4 + 4)) & 0x0f;
                        vl = (val >>> (i * 4)) & 0x0f;
                        str += vh.toString(16) + vl.toString(16);
                }
                return str;
        };

        function cvt_hex(val) {
                var str = "";
                var i;
                var v;

                for ( i = 7; i >= 0; i--) {
                        v = (val >>> (i * 4)) & 0x0f;
                        str += v.toString(16);
                }
                return str;
        };

        function Utf8Encode(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {
                                utftext += String.fromCharCode(c);
                        } else if ((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                        } else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }

                }

                return utftext;
        };

        var blockstart;
        var i, j;
        var W = new Array(80);
        var H0 = 0x67452301;
        var H1 = 0xEFCDAB89;
        var H2 = 0x98BADCFE;
        var H3 = 0x10325476;
        var H4 = 0xC3D2E1F0;
        var A, B, C, D, E;
        var temp;

        msg = Utf8Encode(msg);

        var msg_len = msg.length;

        var word_array = new Array();
        for ( i = 0; i < msg_len - 3; i += 4) {
                j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
                word_array.push(j);
        }

        switch (msg_len % 4) {
                case 0:
                        i = 0x080000000;
                        break;
                case 1:
                        i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
                        break;

                case 2:
                        i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
                        break;

                case 3:
                        i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
                        break;
        }

        word_array.push(i);

        while ((word_array.length % 16) != 14)
        word_array.push(0);

        word_array.push(msg_len >>> 29);
        word_array.push((msg_len << 3) & 0x0ffffffff);

        for ( blockstart = 0; blockstart < word_array.length; blockstart += 16) {

                for ( i = 0; i < 16; i++)
                        W[i] = word_array[blockstart + i];
                for ( i = 16; i <= 79; i++)
                        W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

                A = H0;
                B = H1;
                C = H2;
                D = H3;
                E = H4;

                for ( i = 0; i <= 19; i++) {
                        temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp;
                }

                for ( i = 20; i <= 39; i++) {
                        temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp;
                }

                for ( i = 40; i <= 59; i++) {
                        temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp;
                }

                for ( i = 60; i <= 79; i++) {
                        temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                        E = D;
                        D = C;
                        C = rotate_left(B, 30);
                        B = A;
                        A = temp;
                }

                H0 = (H0 + A) & 0x0ffffffff;
                H1 = (H1 + B) & 0x0ffffffff;
                H2 = (H2 + C) & 0x0ffffffff;
                H3 = (H3 + D) & 0x0ffffffff;
                H4 = (H4 + E) & 0x0ffffffff;

        }

        var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

        return temp.toLowerCase();

    }
    u.getImgsPaths = function(sourcePathOfChatBox, callback){
        var jsonPath = "widget://image/emotion/emotion.json";//表情的JSON数组
        api.readFile({
                path: jsonPath
        },function(ret,err){
            if(ret.status){
                var emotionArray = JSON.parse(ret.data);
                var emotion = {};
                for(var idx in emotionArray){
                        var emotionItem = emotionArray[idx];
                        var emotionText = emotionItem["text"];
                        var emotionUrl = "../../image/emotion/"+emotionItem["name"]+".png";
                        emotion[emotionText] = emotionUrl;
                }
                /*把emotion对象 回调出去*/
                if("function" === typeof(callback)){
                    callback(emotion);
                }
            }
        });
    }
    u.transTexts = function(content,emotionData, imgWidth, imgHeight){
        var imgWidth = imgWidth || 30;
        var imgHeight = imgHeight || 30;
        var regx = /\[(.*?)\]/gm;
        var textTransed = content.replace(regx,function(match){
            var imgSrc = emotionData[match];
            if(!imgSrc){
                //说明不对应任何表情，直接返回
                return match;
            }

            var img = "</span><span><img src="+imgSrc+" width="+imgWidth+" height="+imgHeight+"></span><span>";
            return img;
        });
        return '<span>'+textTransed+'</span>';
    }
    window.h = u;
})(window);
