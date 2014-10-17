function Flow(opts) {
	this.obj = document.getElementById(opts.ele);
	this.load = document.getElementById(opts.load);

	if (!this.obj) {
		return false;
	} else {
		this.init();
	}
}

Flow.prototype.init = function() {
	for (var i = 0; i < 5; i++) {
		var oUl = document.createElement('ul');
		this.obj.appendChild(oUl);
	}

	this.aUl = this.obj.children;
	this.iPage = 1;
	this.bSign = true;

	this.getPage(1);

	this.resize();
};

Flow.prototype.getPage = function(n) {
	var _this = this;

	this.ajax({
		url : 'http://pingfan1990.sinaapp.com/javacript/wall/jsonpdata.php?name=pingfan',
		type : 'jsonp',
		data : {
			page : n
		},
		cbName : 'callback',
		success : function(json) {
			_this.bSign = true;
			_this.load.style.display = 'none';

			if (json.length == 0) {
				alert('已经到最后一页了！');
				return;
			} else {
				for (var i = 0; i < json.length; i++) {
					var oImg = new Image();

					(function(index) {
						var oLi = document.createElement('li');

						oLi.innerHTML = '<img src="http://pingfan1990.sinaapp.com/javacript/wall/' + json[index].image + '" alt="' + json[index].alt + '"><p>' + json[index].title + '</p>';

						oLi.children[0].style.height = 200 * _this.height / _this.width + 'px';

						var arr = [];

						for (var j = 0; j < _this.aUl.length; j++) {
							arr[j] = _this.aUl[j];
						}

						arr.sort(function(ul1, ul2) {
							return ul1.offsetHeight - ul2.offsetHeight;
						});

						arr[0].appendChild(oLi);
					})(i);

					oImg.src = 'http://pingfan1990.sinaapp.com/javacript/wall/' + json[i].image;
				}
			}
		}
	});
};

Flow.prototype.resize = function() {
	var _this = this;

	window.onscroll = window.onresize = function() {
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;

		if (scrollT == document.body.scrollHeight - document.documentElement.clientHeight) {
			if (_this.bSign == false)
				return;

			_this.bSign = false;

			_this.iPage++;

			_this.getPage(_this.iPage);
		}
	};
};

Flow.prototype.ajax = function(json) {
	var timer = null;

	json = json || {};

	if (!json.url) {
		alert('用法不符合规范，地址必须写！');
		return;
	}

	json.type = json.type || 'get';
	json.data = json.data || {};
	json.time = json.time || 5;
	json.cbName = json.cbName || 'cb';

	if (window.XMLHttpRequest) {
		var oAjax = new XMLHttpRequest();
	} else {
		var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
	}

	switch(json.type.toLowerCase()) {
		case 'get':
			oAjax.open('GET', json.url + '?' + json_url(json.data), true);

			oAjax.send();

			oAjax.onreadystatechange = ajax_fn;
			break;
		case 'post':
			oAjax.open('POST', json.url, true);

			oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

			oAjax.send(json_url(json.data));

			oAjax.onreadystatechange = ajax_fn;
			break;
		case 'jsonp':
			var fnName = 'my_jsonp' + Math.random();
			fnName = fnName.replace('.', '');
			window[fnName] = function(json_data) {
				clearTimeout(timer);
				json.success && json.success(json_data);

				oHead.removeChild(oS);
			};
			json.data[json.cbName] = fnName;

			var oS = document.createElement('script');
			oS.src = json.url + '?' + this.jsonUrl(json.data);
			var oHead = document.getElementsByTagName('head')[0];
			oHead.appendChild(oS);
			break;
	}

	json.loadingFn && json.loadingFn();

	function ajax_fn() {
		if (oAjax.readyState == 4) {
			if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
				clearTimeout(timer);
				json.success && json.success(oAjax.responseText);
			} else {
				clearTimeout(timer);
				json.error && json.error(oAjax.status);
			}
		}
	}

	timer = setTimeout(function() {
		alert('网络超时');
		oAjax.onreadystatechange = null;
	}, json.time * 1000);
};

Flow.prototype.jsonUrl = function(json) {
	json.t = Math.random();

	var arr = [];

	for (var name in json) {
		arr.push(name + '=' + json[name]);
	}

	return arr.join('&');
};

function flow(opts) {
	return new Flow(opts);
}

// window.onload = function() {
// 	flow({
// 		ele : 'box',
// 		load : 'loading'
// 	});
// }; 

window.onload=flow({ele : 'box', load : 'loading'});