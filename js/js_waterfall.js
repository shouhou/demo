(function(window, undefined) {

	var $$ = function(id) {
		return (!id) ? null : document.getElementById(id);
	};

	//jsonpImg构造函数
	function jsonpImg() {
		this.list = $$('watermain').children, this.maxlength = 2, this.Numb = 10, this.loading = $$('loading');
	}

	//jsonpImg原型
	jsonpImg.prototype = {
		addImg : function(obj, url) {
			var div = document.createElement('div'), img = document.createElement('img'), p = document.createElement('p'), text = document.createTextNode(obj.title);
			img.src = url + obj.image, div.className = 'imgmain';
			img.alt = obj.alt;
			p.appendChild(text), div.appendChild(img), div.appendChild(p);
			return div;
		},

		appendData : function(data) {
			var list = this.list, maxlength = this.maxlength, addImg = this.addImg, loading = this.loading;

			//参数用json，则不用new function进行序列化转换
			var json = data;
			//var json=new Function('return'+data)();
			loading.style.display = 'none';
			/*
			 for(var i=0;i<maxlength*5;){
			 list[0].appendChild(addImg(json[i],'http://pingfan1990.sinaapp.com/javacript/wall/')),
			 list[1].appendChild(addImg(json[i+1],'http://pingfan1990.sinaapp.com/javacript/wall/')),
			 list[2].appendChild(addImg(json[i+2],'http://pingfan1990.sinaapp.com/javacript/wall/')),
			 list[3].appendChild(addImg(json[i+3],'http://pingfan1990.sinaapp.com/javacript/wall/')),
			 list[4].appendChild(addImg(json[i+4],'http://pingfan1990.sinaapp.com/javacript/wall/')),
			 i=i+5;
			 }*/

			for (var i = 0, len = this.Numb; i < len; i++) {
				//获取最短的那一列
				var minIndex = this.getMinList(list);
				list[minIndex].appendChild(addImg(json[i], 'http://pingfan1990.sinaapp.com/javacript/wall/'));

			}
			if (data == false)
				loading.innerHTML = '没有数据了';

		},
		getMinList : function(list) {
			var arr = [], list = $$('watermain').children;
			for (var i = 0; i < list.length; i++) {
				arr[i] = list[i].clientHeight;
			}
			//升序排列
			arr.sort(function compare(a, b) {
				return a - b;
			});
			for (var j = 0; j < list.length; j++) {
				if (list[j].clientHeight == arr[0]) {
					return j;
				}
			}
		},
		datajsonp : function(url, callback) {
			var script = document.createElement('script');
			script.type = 'text/javascript', script.src = url + callback;
			//script.src = 'http://localhost/mob/server.php?name=pingfan&callback='+callback;
			document.getElementsByTagName('head')[0].appendChild(script);

			// 不能删除添加的script jsonp ，会引起ie7，ie8报错，无法显示数据，因此做兼容
			if ( typeof document.attachEvent == 'undefined') {
				document.getElementsByTagName('head')[0].removeChild(script);
			}
		}
	};

	window.$$ = $$;
	window.jsonpImg = jsonpImg;
})(window);


var load = new jsonpImg();

//不要用变量去转对象的方法，可能会引起this的问题
//var	appendimg=load.appendData;
window.onload = function() {
	load.datajsonp('http://pingfan1990.sinaapp.com/javacript/wall/jsonpdata.php?name=pingfan&callback=', 'load.appendData');
};
//触发事件
window.onscroll = function() {
	var scrolltop = document.documentElement.scrollTop || document.body.scrollTop, clientheight = document.documentElement.clientHeight, height = document.documentElement.scrollHeight;
	if (scrolltop + clientheight >= height) {
		load.loading.style.display = 'block';
		setTimeout(function() {
			load.datajsonp('http://pingfan1990.sinaapp.com/javacript/wall/jsonpdata.php?name=pingfan&callback=', 'load.appendData');
		}, 500);

	}
};

