/**
 * 自定义javascript常用基础库 author zhang_jhai 创建时间 2010/04/10 最后修改时间 2010/05/03
 * version 2.0
 */
// Base库基础类
BaseJs = function() {

	// 判断浏览器类型
	userAgent = navigator.userAgent.toLowerCase();

	check = function(r) {
		return r.test(userAgent);
	};

	isOpera = check(/opera/);

	isIE = !isOpera && check(/msie/);

	isIE7 = isIE && check(/msie 7/);

	isIE8 = isIE && check(/msie 8/);

	isIE6 = isIE && !isIE7 && !isIE8;


	var base = {

		isIE : isIE,
		// 动态添加事件
		addEvent : function(oTarget, sEventType, funName, scope) {
			function fun(e) {
				funName.call(scope, e);
			}

			if (oTarget.addEventListener) {
				oTarget.addEventListener(sEventType.substring(2, sEventType.length), fun, false);
			} else if (oTarget.attachEvent) {
				oTarget.attachEvent(sEventType, fun);
			} else {
				oTarget[sEventType] = fun;
			}
		},
		// 删除事件
		removeEvent : function(oTarget, sEventType, funName, scope) {
			function fun(e) {
				funName.call(scope, e);
			}

			if (oTarget.removeEventListener) {
				oTarget.removeEventListener(sEventType.substring(1, sEventType.length), fun, false);
			} else if (oTarget.detachEvent) {
				oTarget.detachEvent(sEventType, fun);
			} else {
				oTarget[sEventType] = null;
			}
		},

		// 阻止事件冒泡行为
		stopBubble : function(ev) {
			// 如果传入了事件参数，则说明不是ie浏览器
			if (ev && ev.stopPropagation) {
				ev.stopPropagaton();
			} else {
				window.event.cancelBubble = true;
			}
		},
		// 阻止事件默认浏览器行为
		stopDefault : function(ev) {
			// w3c标准
			if (ev && ev.preventDefault) {
				ev.preventDefault();
			}
			// ie
			window.event.returnValue = false;
			return false;
		},
		// 获取和设置元素值
		attr : function(el, name, value) {
			// 检查name是否正确
			if (!name || name.constructor != String)
				return '';
			name = {
			'for' : 'htmlFor',
			'class' : 'className'
			}[name] || name;

			if ( typeof value != 'undefined') {
				el[name] = value;
				if (el.setAttribute) {
					el.setAttribute(name, value);
				}
			}
			return el[name] || el.getAttribute(name) || '';
		},
		// 加载js文件
		loadScript : function(file) {
			var new_element;
			new_element = document.createElement("script");
			new_element.setAttribute("type", "text/javascript");
			new_element.setAttribute("src", file);
			document.appendChild(new_element);
		},
		// 获取元素内的文本内容
		text : function(E) {
			var t = "";
			// 如果传入的是元素，则继续遍历它的子元素
			E = E.childNodes || E;

			for (var j = 0; j < E.length; j++) {
				// 如果不是元素，追加其文本值
				// 否则，递归遍历它所有子节点
				t += E[j].nodeType != 1 ? E[j].nodeValue : BaseJs.text(E[j].childNodes);
			}
			return t;
		},
		// 清空元素内文本内容
		empty : function(E) {
			E = E.childNodes || E;

			for (var j = 0; j < E.length; j++) {
				// 如果是元素循环调用
				if (E[j].nodeType == 1) {
					BaseJs.empty(E[j]);
				} else {
					if (E[j].nodeValue) {
						E[j].nodeValue = "";
					}
				};
			};

		},
		apply : function(o, c, defaults) {
			if (defaults) {
				BaseJs.apply(o, defaults);
			}
			if (o && c && typeof c == 'object') {
				for (var p in c) {
					o[p] = c[p];
				}
			}
			return o;
		},
		// 通过类的值查找元素
		hasClass : function(name, type) {
			// name 类名
			// type 元素类型
			var r = [];
			var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
			var E = document.getElementsByTagName(type || "*");
			for ( i = 0; i < E.length; i++) {
				if (re.test(E[i])) {
					r.push(E[i]);
				}
			}
			return r;
		},
		// 根据id或name返回对象
		$ : function(id) {

			el = document.getElementById(id) || document.all[id];
			return el;
		},
		// 根据名称查找对象
		getByName : function(name, scope) {
			scope = BaseJs.isEmpty(scope) ? document : scope;
			el = scope.getElementsByName(name);
			return el;
		},
		// 根据标签查找对象
		getByTagName : function(name, scope) {
			el = scope == undefined ? document.getElementsByTagName(name) : scope.getElementsByTagName(name);
			return el;
		},
		// 遍历对象
		foreach : function(array, fn, scope) {

			if (BaseJs.isEmpty(array, true)) {
				return;
			}
			if (BaseJs.isPrimitive(array)) {
				array = [array];
			}
			for (var i = 0, len = array.length; i < len; i++) {
				if (fn.call(scope || array[i], array[i], i, array) === false) {
					return i;
				};
			}
		},
		isContain : function(ob, array) {
			is = false;
			BaseJs.foreach(array, function(o) {
				if (o == ob)
					is = true;
			}, this);
			return is;
		},
		// 判断对象是否为空
		isEmpty : function(v, allowBlank) {
			return v === null || v === undefined || ((BaseJs.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
		},
		// 判断对象是否为数组
		isArray : function(v) {
			return v.constructor == Array;
		},
		isObject : function(v) {
			return v && typeof v == "object";
		},
		isPrimitive : function(v) {
			return BaseJs.isString(v) || BaseJs.isNumber(v) || BaseJs.isBoolean(v);
		},

		isFunction : function(v) {
			return v.constructor == Function;
		},

		isNumber : function(v) {
			return typeof v === 'number' && isFinite(v);
		},

		isString : function(v) {
			return typeof v === 'string';
		},

		isBoolean : function(v) {
			return typeof v === 'boolean';
		},

		isDefined : function(v) {
			return typeof v !== 'undefined';
		},
		// 为对象绑定方法
		bindMethod : function(obj, name, fun) {
			obj.prototype[name] = fun;
			return obj;

		},
		// 延迟
		delay : function(numberMillis) {
			var now = new Date();
			var exitTime = now.getTime() + numberMillis;
			while (true) {
				now = new Date();
				if (now.getTime() > exitTime)
					return;
			}
		},
		// 生随机数 num个数
		random : function(num, min, max) {

			var array = new Array();
			function getArray(count, maxs, mins) {
				while (array.length < count) {
					var temp = getRandom(maxs, mins);
					if (!serch(array, temp)) {
						array.push(temp);
					}
				}
				return array;
			};
			function getRandom(maxs, mins) {// 随机生成maxs到mins之间的数
				return Math.round(Math.random() * (maxs - mins)) + mins;
			};
			function serch(array, num) {// array是否重复的数
				for (var i = 0; i < array.length; i++) {
					if (array[i] == num) {
						return true;
					}
				}
				return false;
			};

			return getArray(num, max, min);
		},
		getBrowse : function() {
			var OsObject = "";
			if (navigator.userAgent.indexOf("MSIE") > 0) {
				return "MSIE";
				// IE浏览器
			}
			if ( isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
				return "Firefox";
				// Firefox浏览器
			}
			if ( isSafari = navigator.userAgent.indexOf("Safari") > 0) {
				return "Safari";
				// Safan浏览器
			}
			if ( isCamino = navigator.userAgent.indexOf("Camino") > 0) {
				return "Camino";
				// Camino浏览器
			}
			if ( isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
				return "Gecko";
				// Gecko浏览器
			}
		}
	};
	return base;
}();

// 创建BaseJs.Utils空间
BaseJs.Utils = {};
// 元素控制类
BaseJs.Utils.element = function() {
	pub = {

		// 注入html结点
		htmlUtil : function() {
			// 检测传入对象
			function checkEl(el) {
				var r = [];
				// 不是数组时，转为数组
				if (el.constructor != Array) {
					el = [el];
				};
				// 循环对象
				for (var i = 0; i < el.length; i++) {
					// 是字符串时 转成对象
					if (el[i].constructor == String) {
						var div = document.createElement("div");
						div.innerHTML = el[i];
						for (var j = 0; j < div.childNodes.length; j++) {
							r[r.length] = div.childNodes[j];
						}
						// 是数组时
					} else if (el[i].length) {
						for (var j = 0; j < el[i].length; j++) {
							r[r.length] = el[i][j];
						}
					} else {
						r[r.length] = el[i];
					}
				}
				return r;
			}

			return {
				before : function(parent, before, el) {
					// 检测是否传入了parent
					if (el == null) {
						el = before;
						before = parent;
						parent = before.parentNode;
					}
					// 得到检查后的对象
					var els = checkEl(el);
					// 向后遍历数组，向前插入元素
					for (var i = els.length - 1; i >= 0; i--) {
						parent.insertBefore(els[i], before);
						before = els[i];
					}
					return els;
				},
				append : function(parent, el) {
					var els = checkEl(el);
					for (var i = 0; i < els.length; i++) {
						parent.appendChild(els[i]);
					}
					return els;
				}
			};
		}(),

		// 查找当前元素的上一个兄弟元素
		prev : function(el) {
			do {
				el = el.previousSibling;
			} while (el && el.nodeType != 1);
			return el;
		},
		parent : function(el) {
			do {
				el = el.parentNode;
			} while (el && el.nodeType != 1);
			return el;
		},
		// 得到当前元素的下一个兄弟结点
		next : function(el) {
			do {
				el = el.nextSibling;
			} while (el && el.nodeType != 1);
			return el;
		},
		// 查找元素第一个子元素
		first : function(el) {

			el = el.firstChild;
			return el && el.nodeType != 1 ? BaseJs.element.next(el) : el;
		},
		// 得到最后一个元素
		last : function(el) {
			el = el.lastChild;
			return el && el.nodeType != 1 ? BaseJs.element.prev(el) : el;
		},
		// 元素触发某一事件
		fireEvent : function(element, event) {
			// ie浏览器
			if (document.createEventObject) {
				var evt = document.createEventObject();
				return element.fireEvent('on' + event, evt);
				// 火狐其其它浏览器
			} else {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent(event, true, true);
				return !element.dispatchEvent(evt);
			}
		},
		// 获取元素的样式值。
		getStyle : function(elem, name) {

			if (elem.style[name]) {

				return elem.style[name];

			} else if (elem.currentStyle) {

				return elem.currentStyle[name];

			} else if (document.defaultView && document.defaultView.getComputedStyle) {

				name = name.replace(/([A-Z])/g, "-$1");

				name = name.toLowerCase();

				var s = document.defaultView.getComputedStyle(elem, "");

				return s && s.getPropertyValue(name);

			} else {

				return null;

			}

		},

		// 获取元素相对于这个页面的x和y坐标。

		getPageX : function(elem) {

			return elem.offsetParent ? (elem.offsetLeft + pageX(elem.offsetParent)) : elem.offsetLeft;

		},

		getPageY : function(elem) {

			return elem.offsetParent ? (elem.offsetTop + pageY(elem.offsetParent)) : elem.offsetTop;

		},
		// 获取元素相对于父元素的x和y坐标。

		parentX : function(elem) {

			return elem.parentNode == elem.offsetParent ? elem.offsetLeft : pageX(elem) - pageX(elem.parentNode);

		},

		parentY : function(elem) {

			return elem.parentNode == elem.offsetParent ? elem.offsetTop : pageY(elem) - pageY(elem.parentNode);

		},

		// 获取使用css定位的元素的x和y坐标。

		posX : function(elem) {

			return parseInt(getStyle(elem, "left"));

		},

		posY : function(elem) {

			return parseInt(getStyle(elem, "top"));

		},

		// 设置元素位置。

		setX : function setX(elem, pos) {

			elem.style.left = pos;

		},

		setY : function(elem, pos) {

			elem.style.top = pos;

		},

		// 增加元素X和y坐标。

		addX : function(elem, pos) {

			set(elem, (posX(elem) + pos));

		},

		addY : function(elem, pos) {

			set(elem, (posY(elem) + pos));

		},

		// 获取元素使用css控制大小的高度和宽度

		getHeight : function getHeight(elem) {

			return parseInt(getStyle(elem, "height"));

		},

		getWidth : function getWidth(elem) {

			return parseInt(getStyle(elem, "width"));

		},

		// 获取元素可能，完整的高度和宽度

		getFullHeight : function getFullHeight(elem) {

			if (getStyle(elem, "display") != "none") {

				return getHeight(elem) || elem.offsetHeight;

			} else {

				var old = resetCss(elem, {
					display : "block",
					visibility : "hidden",
					position : "absolute"
				});

				var h = elem.clientHeight || getHeight(elem);

				restoreCss(elem, old);

				return h;

			}

		},

		getFullWidth : function(elem) {

			if (getStyle(elem, "display") != "none") {

				return getWidth(elem) || elem.offsetWidth;

			} else {

				var old = resetCss(elem, {
					display : "block",
					visibility : "hidden",
					position : "absolute"
				});

				var w = elem.clientWidth || getWidth(elem);

				restoreCss(elem, old);

				return w;

			}

		},

		// 设置css，并保存旧的css
		resetCss : function(elem, prop) {

			var old = {};
			if (!elem.style)
				return null;
			for (var i in prop) {

				old[i] = elem.style[i];

				elem.style[i] = prop[i];

			}

			return old;

		},

		restoreCss : function(elem, prop) {

			for (var i in prop) {

				elem.style[i] = prop[i];

			}

		},

		// 显示和隐藏

		show : function(elem) {

			elem.style.display = elem.$oldDisplay || " ";

		},

		hide : function(elem) {

			var curDisplay = getStyle(elem, "display");

			if (curDisplay != "none") {

				elem.$oldDisplay = curDisplay;

				elem.style.display = "none";

			}

		},

		// 设置透明度

		setOpacity : function(elem, num) {

			if (elem.filters) {

				elem.style.filter = "alpha(opacity=" + num + ")";

			} else {

				elem.style.opacity = num / 100;

			}

		},

		// 滑动

		slideDown : function(elem) {

			var h = getFullHeight(elem);

			elem.style.height = "0px";

			show(elem);

			for (var i = 0; i <= 100; i += 5) {

				new function() {

				var pos = i;

				setTimeout(function() {
				elem.style.height = (pos / 100 * h) + "px";
				}, (pos * 10));

				};

			}

		},

		// 渐变

		fadeIn : function(elem) {

			show(elem);

			setOpacity(elem, 0);

			for (var i = 0; i <= 100; i += 5) {

				new function() {

				var pos = i;

				setTimeout(function() {
				setOpacity(elem, pos);
				}, (pos + 1) * 10);

				};

			}

		},

		// 获取鼠标光标相对于整个页面的位置。

		getX : function(e) {

			e = e || window.event;

			return e.pageX || e.clientX + document.body.scrollLeft;

		},

		getY : function(e) {

			e = e || window.event;

			return e.pageY || e.clientY + document.body.scrollTop;

		},

		// 获取鼠标光标相对于当前元素的位置。

		getElementX : function(e) {

			return (e && e.layerX) || window.event.offsetX;

		},

		getElementY : function(e) {

			return (e && e.layerY) || window.event.offsetY;

		},

		// 获取页面的高度和宽度

		getPageHeight : function() {

			var de = document.documentElement;

			return document.body.scrollHeight || (de && de.scrollHeight);

		},

		getPageWidth : function() {

			var de = document.documentElement;

			return document.body.scrollWidth || (de && de.scrollWidth);

		},

		// 获取滚动条的位置。

		scrollX : function() {

			var de = document.documentElement;

			return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;

		},

		scrollY : function() {

			var de = document.documentElement;

			return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;

		},

		// 获取视口的高度和宽度。

		windowHeight : function() {

			var de = document.documentElement;

			return self.innerHeight || (de && de.offsetHeight) || document.body.offsetHeight;

		},

		windowWidth : function() {

			var de = document.documentElement;

			return self.innerWidth || (de && de.offsetWidth) || document.body.offsetWidth;

		}
	};
	return pub;
}();
// 拖动类
BaseJs.Drag = function(id) {
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.down = false;
	this.moveObj = BaseJs.$(id);
	this.tmp = {};
	BaseJs.addEvent(this.moveObj, "onmousedown", function(e) {
		e = e || window.event;
		this.tmp = e.srcElement || e.target;
		// 设置属于当前对象的鼠标捕捉
		this.moveObj.setCapture();
		// 获取对象的z轴坐标值
		this.z = this.moveObj.style.zIndex;
		// 设置对象的z轴坐标值为300，确保当前层显示在最前面
		this.moveObj.style.zIndex = 3000;
		// 获取鼠标指针位置相对于触发事件的对象的X坐标
		this.x = event.offsetX;
		// 获取鼠标指针位置相对于触发事件的对象的Y坐标
		this.y = event.offsetY;
		// 布尔值，判断鼠标是否已按下，true为按下，false为未按下
		this.down = true;
	}, this);

	BaseJs.addEvent(this.moveObj, "onmousemove", function(e) {
		e = e || window.event;
		objs = e.srcElement || e.target;
		// 事件触发对象
		// 判断鼠标已被按下且onmouseover和onmousedown事件发生在同一对象上
		if (this.down && objs == this.tmp) {
			with (this.moveObj.style) {
				/* 设置对象的X坐标值为文档在X轴方向上的滚动距离加上当前鼠标指针相当于文档对象的X坐标值减鼠标按下时指针位置相对于触发事件的对象的X坐标 */
				posLeft = document.body.scrollLeft + event.x - this.x;
				/* 设置对象的Y坐标值为文档在Y轴方向上的滚动距离加上当前鼠标指针相当于文档对象的Y坐标值减鼠标按下时指针位置相对于触发事件的对象的Y坐标 */
				posTop = document.body.scrollTop + event.y - this.y;
			}
		}

	}, this);

	BaseJs.addEvent(this.moveObj, "onmouseup", function() {
		this.down = false;
		this.moveObj.style.zIndex = this.z;
		// 还原对象的Z轴坐标值
		this.moveObj.releaseCapture();
		// 释放当前对象的鼠标捕捉
	}, this);

};

// BaseJs ajax库
BaseJs.Ajax = function() {

	// 创建xmlhttprequest对象
	createXmlHttpRequest = function() {
		if ( typeof XMLHttpRequest == "undefined") {
			return new ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHttp" : "Msxml2.XMLHttp");
		} else {

			return new XMLHttpRequest();
		}

	};
	// 判断响应是否已完成
	function isSuccess(xml) {
		try {
			return !xml.status && location.protocol == "file" || (xml.status >= 200 && xml.status < 300) || xml.status == 304;
		} catch (e) {
			return false;
		}

	}

	// 处理数据
	function handlerData(xml, type) {
		var contentType = xml.getResponseHeader("content-type");

		var data = !type && contentType && contentType.indexOf("xml") > 0;

		data = type == "xml" || data ? xml.responseXML : xml.responseText;

		if (type == "script") {

			eval.call(window, data);

		}
		return data;
	}

	return {
		// 序列化参数
		serialize : function(ob) {
			var s = [];
			var en = encodeURIComponent;

			// 是表单时
			if (ob.elements) {
				var els = ob.elements;
				for (var i = 0; i < els.length; i++) {
					s.push(els[i].name + "=" + en(en(els[i].value)));
				}

			}
			// 键值对
			else {
				for (var o in ob) {
					s.push(o + "=" + en(en(ob[o])));
				}
			}
			return s.join("&");

		},

		open : function(op, scope) {

			// 默认配置
			defaultop = {
				// 请求url
				url : op.url || '',
				// 是否异步传输
				isATM : op.isATM,
				// 请求类型
				type : op.type || 'POST',
				// 是否缓存
				cache : op.cache || true,
				// 是否是表单请求
				isForm : op.isFrom || false,
				// 表单对象
				form : op.form || {},
				// 发送参数
				params : op.params || {},
				// 超时设置
				timeout : op.timeout || 30000,
				// 成功回调
				success : op.success ||
				function() {
				},
				// 失败回调
				failure : op.failure ||
				function() {
				},
				// 请求结束
				finish : op.finish ||
				function() {
				}

			};

			// 创建一个新的对象
			xmlHttpRequest = createXmlHttpRequest();

			// 打开请求
			if (BaseJs.isEmpty(defaultop.isATM))
				defaultop.isATM = true;
			// 序列化url参数
			var en = encodeURIComponent;
			paraArray = [];
			url = defaultop.url;
			url = url.split("?");
			if (url.length != 1) {
				paras = url[1].split("&");
				for (var i = 0; i < paras.length; i++) {
					pa = paras[i].split("=");
					if (pa.length == 2) {
						paraArray.push(pa[0] + "=" + en(en(pa[1].trim())));
					}
				}
				paras = paraArray.join("&");
				encodeUrl = url[0] + "?" + paras;
				if (!defaultop.cache) {
					encodeUrl = encodeUrl + "&cache=" + BaseJs.random(1, 10000, 20000)[0];
				}
			} else {
				encodeUrl = url;
			}

			xmlHttpRequest.open(defaultop.type, encodeUrl, defaultop.isATM);

			var timeOutSession = defaultop.timeout;
			// 记录是否成功完成
			var requestDone = false;

			setTimeout(function() {
				requestDone = true;

			}, timeOutSession);

			// 设置content-type属性
			xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
			// 序列化参数
			var pa = "&" + BaseJs.Ajax.serialize(defaultop.params) + "&" + (defaultop.isForm ? BaseJs.Ajax.serialize(defaultop.form) : "");
			xmlHttpRequest.send(pa);

			if (defaultop.isATM) {
				xmlHttpRequest.onreadystatechange = stateChange;
			} else {
				stateChange();
			}
			function stateChange() {
				btype = BaseJs.getBrowse();
				if ((xmlHttpRequest.readyState == 4 || btype == "Firefox") && !requestDone) {

					if (isSuccess(xmlHttpRequest)) {
						defaultop.success(handlerData(xmlHttpRequest, defaultop.type), xmlHttpRequest, defaultop, scope);
					} else {

						defaultop.failure(xmlHttpRequest, defaultop, scope);
					}

					defaultop.finish();

					xmlHttpRequest = null;
				}

			};

		}
	};

}();

// json处理
BaseJs.Utils.JSON = new (function() {

var useHasOwn = !!{}.hasOwnProperty,

pad = function(n) {
return n < 10 ? "0" + n : n;
},
// 编码
doDecode = function(json) {
return eval("(" + json + ')');
},
// 解码
doEncode = function(o) {

if (typeof o == "undefined" || o === null) {
return "null";
} else if (BaseJs.isArray(o)) {
return encodeArray(o);
} else if (Object.prototype.toString.apply(o) === '[object Date]') {
return BaseJs.Utils.JSON.encodeDate(o);
} else if (typeof o == "string") {
return encodeString(o);
} else if (typeof o == "number") {
return isFinite(o) ? String(o) : "null";
} else if (typeof o == "boolean") {
return String(o);
} else {
var a = ["{"], b, i, v;
for (i in o) {
if (!useHasOwn || o.hasOwnProperty(i)) {
v = o[i];
switch (typeof v) {
case "undefined" :
case "function" :
case "unknown" :
break;
default :
if (b) {
a.push(',');
}
a.push(doEncode(i), ":", v === null
? "null"
: doEncode(v));
b = true;
}
}
}
a.push("}");
return a.join("");
}
}, m = {
"\b" : '\\b',
"\t" : '\\t',
"\n" : '\\n',
"\f" : '\\f',
"\r" : '\\r',
'"' : '\\"',
"\\" : '\\\\'
}, encodeString = function(s) {
if (/["\\\x00-\x1f]/.test(s)) {
return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
var c = m[b];
if (c) {
return c;
}
c = b.charCodeAt();
return "\\u00" + Math.floor(c / 16).toString(16)
+ (c % 16).toString(16);
}) + '"';
}
return '"' + s + '"';
}, encodeArray = function(o) {
var a = ["["], b, i, l = o.length, v;
for (i = 0; i < l; i += 1) {
v = o[i];
switch (typeof v) {
case "undefined" :
case "function" :
case "unknown" :
break;
default :
if (b) {
a.push(',');
}
a.push(v === null ? "null" : BaseJs.Utils.JSON.encode(v));
b = true;
}
}
a.push("]");
return a.join("");
};

this.encodeDate = function(o) {
return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-"
+ pad(o.getDate()) + "T" + pad(o.getHours()) + ":"
+ pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"';
};
this.encode = function() {
return function(o) {
return doEncode(o);
};
}();
this.decode = function() {
var dc;
return function(json) {
return doDecode(json);
};
}();

})();

// 检验工具
BaseJs.Utils.validate = function() {

};
// 格式化
BaseJs.Utils.format = function() {
	return {
		date : function(v, newformat, oldformat) {
			if (!v) {
				return "";
			}
			if (v.constructor == Date) {
				return v.dateFormat(newformat || "yyyy-MM-dd");
			} else if (v.constructor == String) {
				if (oldformat) {
					v = v.toDate(oldformat);
				} else {
					v = v.simpleToDate();
				}
				return v.dateFormat(newformat || "yyyy-MM-dd");
			}
		}
	};
}();

// 为Date类型添加方法
BaseJs.apply(Date.prototype, {
	// 根据指定格式，格式化日期
	dateFormat : function(format) {
		var o = {
			"M+" : this.getMonth() + 1, // 月
			"d+" : this.getDate(), // 天
			"h+" : this.getHours(), // 小时
			"m+" : this.getMinutes(), // 分
			"s+" : this.getSeconds(), // 秒
			"q+" : Math.floor((this.getMonth() + 3) / 3), // 分秒
			"S" : this.getMilliseconds()
			// 毫秒
		};
		if (/(y+)/.test(format))
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	}
});

// 为String类型添加方法
BaseJs.apply(String.prototype, {
	// 将字符串解析为日期型(简单型)无需写原始格式
	simpleToDate : function() {
		style = 'yyyy-MM-dd hh:mm:ss';
		var compare = {
			'y+' : 'y',
			'M+' : 'M',
			'd+' : 'd',
			'h+' : 'h',
			'm+' : 'm',
			's+' : 's'
		};
		var result = {
			'y' : '',
			'M' : '',
			'd' : '',
			'h' : '00',
			'm' : '00',
			's' : '00'
		};
		var tmp = style;
		for (var k in compare) {
			if (new RegExp('(' + k + ')').test(style)) {
				result[compare[k]] = this.substring(tmp.indexOf(RegExp.$1), tmp.indexOf(RegExp.$1) + RegExp.$1.length);
			}
		}
		return new Date(result['y'], result['M'] - 1, result['d'], result['h'], result['m'], result['s']);
	},
	// 将字符串解析为日期型
	toDate : function(format) {
		if (!format) {
			alert("toDate方法缺少原始字符串日期格式参数format!");
			return;
		}
		pattern = format.replace(/(yyyy)/g, "([0-9]{4})").replace(/(yy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, "([0-9]{2})").replace(/[Mdhms]/g, "([0-9]{1,2})");
		// 获取子表达式的索引
		getIndex = function(expr1, expr2) {
			var index = format.indexOf(expr1);
			if (index == -1)
				index = format.indexOf(expr2);
			return index;
		};
		var today = new Date();
		var returnDate;
		if (new RegExp(pattern).test(this)) {
			var yPos = getIndex("yyyy", "yy");
			var mPos = getIndex("MM", "M");
			var dPos = getIndex("dd", "d");
			var hPos = getIndex("hh", "h");
			var miPos = getIndex("mm", "m");
			var sPos = getIndex("ss", "s");
			var data = {
				y : 0,
				m : 0,
				d : 0,
				h : 0,
				mi : 0,
				s : 0
			};
			// 对索引进行排序
			var pos = new Array(yPos + ",y", mPos + ",m", dPos + ",d", hPos + ",h", miPos + ",mi", sPos + ",s").sort(function(a, b) {
				a = parseInt(a.split(",")[0]);
				b = parseInt(b.split(",")[0]);
				return a > b;
			});
			// 删除索引为-1的数组
			var tmpIndex = 0;
			var newPos = new Array();
			for (var i = 0; i < pos.length; i++) {
				if (parseInt(pos[i].split(",")[0]) != -1) {
					newPos[tmpIndex] = pos[i];
					tmpIndex++;
				}
			}
			// 与当前文本进行匹配
			var m = this.match(pattern);
			for (var i = 1; i < m.length; i++) {
				if (i == 0)
					return;
				var flag = newPos[i - 1].split(',')[1];
				data[flag] = m[i];
			};
			data.y = data.y || today.getFullYear();
			data.d = data.d || today.getDate();
			// 月不需要处理，因为月的0月是1月
			// 如果年是yy格式，则加上20
			if (data.y.toString().length == 2)
				data.y = parseInt('20' + data.y);
			data.m -= 1;
			returnDate = new Date(data.y, data.m, data.d, data.h, data.mi, data.s);
		}
		returnDate = returnDate || today;
		return returnDate;
	},
	// 去空格
	trim : function(str) {
		str = this != window ? this : str;
		return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
	}
});

BaseJs.encode = BaseJs.Utils.JSON.encode;
BaseJs.decode = BaseJs.Utils.JSON.decode;
BaseJs.element = BaseJs.Utils.element;

BaseJs.EditTable = function(op) {
	op = {
		// 激活方法
		active : op.active || "ondblclick",
		table : op.table || {},
		// 从第几行第几列开始可编辑
		start : op.start || [2, 1],
		// 到哪一行哪一列结束编辑
		end : op.end || [],
		// 表头对象
		column : op.column || [], //
		// 新增按钮
		add : op.addAction || {},
		// 保存按钮
		save : op.saveOrUpdateAction || {},
		// 删除按钮
		del : op.delAction || {},
		// id名
		primaryKey : op.primaryKey,
		// 合并的列数
		mergeColumn : op.mergeColumn || []

	};

	// 修改后的记录集合
	modified = [];
	// 添加新记录
	if (op.add.button)
		op.add.button.onclick = function(e) {

			var tr = op.table.insertRow(1);

			function getfont(td, v) {
				var font = document.createElement("font");
				BaseJs.element.resetCss(td, {
					color : 'red'
				});
				var textNode = document.createTextNode(v);
				font.appendChild(textNode);
				return font;
			};
			newdefault = {};
			newdefault["newKey"] = BaseJs.random(1, 1, 9999999)[0];

			for (var i = 0; i < op.column.length; i++) {
				td = tr.insertCell(i);

				tr.newid = newdefault["newKey"];
				BaseJs.attr(td, "align", "center");
				if (op.column[i].defaultValue) {
					de = op.column[i].defaultValue;
					newdefault[op.column[i].name] = de;
					font = getfont(td, de);
					td.appendChild(font);
				} else {
					font = getfont(td, "请修改数据");
					newdefault[op.column[i].name] = "请修改数据";
					td.appendChild(font);
				}

			}
			op.start = [2, 1];
			op.end = [2, op.column.length];
			modified.push(newdefault);

			BaseJs.EditTable.prototype.init(op);
			if (op.add.callback)
				op.add.callback.call(this, tr);

		};

	// 删除一条记录
	if (op.del.button)
		op.del.button.onclick = function(e) {
			is = confirm("确认删除选择的记录吗？");
			if (op.del.beforeCallback) {
				if (!op.del.beforeCallback.call(this)) {
					return;
				};
			}
			delurl = (op.del.url.constructor == Function ? op.del.url(op.del.button) : op.del.url);
			if (!delurl) {
				return;
			}
			if (is) {
				BaseJs.Ajax.open({
					url : delurl,
					success : function(data) {
						alert(data);
						if (op.del.afterCallback)
							op.del.afterCallback.call(this);
					},
					failure : function(data) {
						alert(data);
					}
				});
			}

		};

	// 保存修改
	if (op.save.button)
		op.save.button.onclick = function(e) {
			is = confirm("是否确认保存当前修改？");
			if (op.save.beforeCallback) {
				if (!op.save.beforeCallback.call(this, modified)) {
					return;
				};
			}
			if (!is) {
				return;
			}
			modifiedData = BaseJs.encode(modified);
			saveurl = (op.save.url.constructor == Function ? op.save.url() : op.save.url);
			if (!saveurl)
				return;
			BaseJs.Ajax.open({
				url : saveurl,
				params : {
					data : modifiedData
				},
				success : function(data, xml, opu, scope) {
					// alert("data:" + xml.responseText);
					BaseJs.foreach(modified, function(d) {
						// 查找行去掉标记颜色
						key = op.primaryKey;
						id = BaseJs.isEmpty(d[key]) ? d["newKey"] : d[key];
						BaseJs.foreach(op.table.rows, function(row) {
							index = (BaseJs.isEmpty(row.id) ? row.newid : row.id);
							if (id == index) {
								BaseJs.foreach(row.cells, function(cell) {
									BaseJs.element.resetCss(cell, {
										color : 'black'
									});
								}, this);

							}
						}, this);
					}, scope);

					alert(data);
					(function() {
						modified = [];
					}).call(scope);

					if (op.save.afterCallback)
						op.save.afterCallback.call(this, modifiedData);

				},
				failuer : function(data, xml, op, scope) {
					alert(data);
				}
			}, this);

		};
	// 初始化表格
	this.init.call(this, op);

	// 合并列
	table = op.table;
	merge = op.mergeColumn;
	if (merge.length != 0)
		this.merge(table, merge);

	// 其它操作
};

BaseJs.EditTable.prototype = function() {

	return {
		// 计算开始结束序列号
		getStartEnd : function(op, length, tds) {
			var start = length * (op.start[0] - 1);
			if (op.end.length == 0) {
				nop = [0, length];
				end = tds.length;
			} else if (op.end.length == 1) {
				nop = [0, op.end[0]];
				end = tds.length;
			} else if (op.end.length == 2) {
				nop = [op.end[0], op.end[1]];
				end = length * (op.end[0]);
			}
			return [start, end, nop];
		},
		// 合并表格 merge=要合并的列数数组,如[0,1]第一列和第二列执行合并操作
		merge : function(table, merge) {
			for ( i = 0; i < table.rows.length; i++) {
				for ( c = 0; c < table.rows[i].cells.length; c++) {
					if (BaseJs.isContain(c, merge)) {
						for ( j = i + 1; j < table.rows.length; j++) {
							var cell1 = table.rows[i].cells[c].innerHTML;
							var cell2 = table.rows[j].cells[c].innerHTML;
							if (cell1 == cell2) {
								table.rows[j].cells[c].style.display = 'none';
								table.rows[i].cells[c].rowSpan++;
							} else
								break;
						}
					}
				}
			}
		},
		init : function(op) {

			var tds = BaseJs.getByTagName("td", op.table);

			var length = op.column.length;

			var se = this.getStartEnd(op, length, tds);

		    console.log(se);

			for (var i = se[0]; i < se[1]; i++) {

				var cols = (i % length) + 1;

				if (op.start[1] && se[2][1] && (cols < op.start[1] || cols > se[2][1])) {

					continue;
				}

				(function() {
					var td = tds[i];
					var seq = i;
					// 设置当前td序列号
					var column = op.column;

					tdEvent = function(e) {
						// 得到目标对象
						var target = (BaseJs.isIE ? e.srcElement : e.target);
						// 计算当前td所处editorType值
						var s = (seq) % length;

						edittype = column[s].editorType;

						// 得到原来的内容
						var oldText = BaseJs.text(target);
						// 清空原内容
						BaseJs.empty(target);
						// 设置默认类型为text
						edittype = BaseJs.isEmpty(edittype) ? "text" : edittype;
						this.html = "";
						this.isLoad = true;
						if (edittype == "text") {
							this.html = "<input type='text' name='editText' id=seq value=" + oldText + ">";
							this.isLoad = true;
						} else if (edittype == "textarea") {
							cols = columns[s].cols ? columns[s].cols : 30;
							rows = columns[s].rows ? columns[s].rows : 3;
							this.html = "<textarea name='editText' id=seq value=" + oldText + " cols=" + cols + " rows=" + rows + "></textarea>";
							this.isLoad = true;
						} else if (edittype == "date") {
							// 格式化日期
							var format = column[s].format;
							format = ( format ? format : "yyyy-MM-dd");
							this.html = "<input type='text' name='editText' id=seq value=" + oldText + "  onclick=getDateString(this,oCalendarChs,'" + format + "')>";
							this.isLoad = true;
						} else if (edittype == "select") {
							var me = this;
							dataUrl = column[s].dataUrl.constructor == Function ? column[s].dataUrl(target) : column[s].dataUrl;

							if (column[s].data) {
								data = BaseJs.decode(column[s].data);
								me.html = "<select name='editText'>";
								for (var i = 0; i < data.length; i++) {
									me.html += "<option value=" + data[i].value + " display=" + data[i].display + ">" + data[i].display + "</option>";
								}
								me.html += "</select>";
							} else {
								// 加载远程数据
								BaseJs.Ajax.open({
									url : dataUrl,
									success : function(data, res, op, me) {
										data = BaseJs.decode(data);
										me.html = "<select name='editText'>";
										for (var i = 0; i < data.length; i++) {
											me.html += "<option value=" + data[i].value + " display=" + data[i].display + ">" + data[i].display + "</option>";
										}
										me.html += "</select>";
									},
									failure : function(data, res) {
										alert(data);
										me.isLoad = false;

									},
									isATM : false

								}, this);
							}
						}
						if (!this.isLoad) {
							alert("加载数据有错，有稍后再试!");
							return;
						}

						// 注入html
						var newObj = BaseJs.element.htmlUtil.append(target, this.html);

						newObj = newObj.length ? newObj[0] : newObj;

						BaseJs.element.resetCss(newObj, {
							color : 'green'
						});

						newObj.focus();
						newObj.click();

						var action = (edittype == "date" ? "onchange" : "onblur");

						(function() {
							curcolumn = column[s];
							BaseJs.addEvent(newObj, action, function(e) {
								var target = (BaseJs.isIE ? e.srcElement : e.target);
								// 得到对象
								var s = target;
								// 得到新值
								var newText = s.value;
								if (s.tagName.toLowerCase() == "select") {
									BaseJs.foreach(s.options, function(op) {
										if (op.selected) {
											newText = {
												display : op.display,
												value : op.value
											};
										}
									});
								}

								// 检验所输入
								if (curcolumn.validate) {
									var is = curcolumn.validate(newText, s);
									if (!is) {
										s.focus();
										return;
									};
								};

								var parent = s.parentNode;
								parents = parent;
								do {
									parents = parents.parentNode;
									if (parents.tagName) {
										tag = parents.tagName;
									} else {
										tag = "";
									}
								} while (tag.toLowerCase() != "tr");

								// 保存修改

								var name = curcolumn.name;
								// 得到当前字段名
								var obj = {};

								if (parents.newid) {
									obj['newKey'] = parents.newid;
									mod('newKey');
								} else if (parents.id) {
									obj[op.primaryKey] = parents.id;
									// // 保存关键id
									mod(op.primaryKey);
								}

								function mod(key) {
									obj[name] = newText.value ? newText.value : newText;
									// 保存修改的字段
									iscon = false;
									// 是否已保存该记录
									index = 0;
									// 如何已修改的集合里有当前记录，保存其在modified中的索引号
									for (var i = 0; i < modified.length; i++) {
										mod = modified[i];
										if (mod[key] == obj[key]) {
											iscon = true;
											index = i;
										};
									}
									if (!iscon) {
										modified.push(obj);
									} else {
										modified[index][name] = newText.value ? newText.value : newText;
									}
								}

								// 删除编辑框
								parent.removeChild(s);
								// 创建文本
								var font = document.createElement("font");

								color = (oldText == newText ? "" : "red");

								BaseJs.element.resetCss(parent, {
									color : color
								});
								var textNode = document.createTextNode(newText.value ? newText.display : newText);

								font.appendChild(textNode);
								// 插入文本
								parent.appendChild(font);
								// 待解决问题
								// 9 表格修饰
							});

						})();
					};

					BaseJs.addEvent(td, op.active, tdEvent, this);

				})();

			}
		}
	};

}();
