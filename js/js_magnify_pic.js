var imgbox = $('imgbox').getElementsByTagName('img'), mask = $('mask'), close = $('close'), imgcontainer = $('imgcontainer');

//封装闭包
(function(window, undefined) {
	function Imgbox() {
	};
	Imgbox.prototype = {
		//显示图片效果
		showBox : function(element) {
			var src = element.src;
			mask.style.display = 'block', close.style.display = 'block', imgcontainer.src = src, imgcontainer.style.width = '500px', imgcontainer.style.marginLeft = '-250px', imgcontainer.style.display = 'block', height = element.clientHeight, width = element.clientWidth;
			//通过图片比例计算宽高
			var containHeight = 500 * (height / width);
			margintop = -containHeight / 2;
			//alert(imgcontainer.clientHeight);
			imgcontainer.style.marginTop = margintop + 'px';
		},
		//隐藏效果
		hideBox : function(element) {
			var src = element.src;
			mask.style.display = 'none', close.style.display = 'none', imgcontainer.style.display = 'none';
		},
		//中心点放大
		scale : function scale(element) {
			var width = element.clientWidth, marginleft = element.style.marginLeft, margintop = element.style.marginTop;
			width = width + 10, percentage = element.clientWidth / element.clientHeight, marginleft = parseInt(marginleft) - 5, margintop = parseInt(margintop) - 5 / percentage;
			element.style.width = width + 'px', element.style.marginLeft = marginleft + 'px', element.style.marginTop = margintop + 'px';

		},
		jscale : function(element) {
			var width = element.clientWidth, marginleft = element.style.marginLeft, margintop = element.style.marginTop, percentage = element.clientWidth / element.clientHeight;
			if (width > 300) {
				width = width - 10;
				marginleft = parseInt(marginleft) + 5, margintop = parseInt(margintop) + 5 / percentage;
				element.style.width = width + 'px', element.style.marginLeft = marginleft + 'px', element.style.marginTop = margintop + 'px';
			}
		}
	}
	var Imgbox = new Imgbox();
	window.Imgbox = Imgbox；

})(window)；

function imgBox(elem, close, imgcontainer) {
	var elem = elem || [];
	//点击显示
	for (var i = elem.length; i--; ) {
		if (document.addEventListener) {
			elem[i].addEventListener('click', function() {
				Imgbox.showBox(this);
			}, false);
		} else {
			elem[i].attachEvent('onclick', function(event) {
				//由于无法传值变量i则通过event.srcElement
				var event = event || window.event;
				Imgbox.showBox.call(elem[i], window.event.srcElement);
			}, false);
		}
	}
	//点击隐藏
	if (document.addEventListener) {
		close.addEventListener('click', function() {
			Imgbox.hideBox(this);
		}, false);
	} else {
		close.attachEvent('onclick', function(event) {
			Imgbox.hideBox.call(close, window.event.srcElement);
		}, false);
	};
	mouseWheel(document, function(event) {
		var e = event || window.event;
		var detail = e.detail || parseInt(-e.wheelDelta / 40);
		switch (detail) {
			case 3:
				//console.log('向下滑');
				Imgbox.jscale(imgcontainer);
				break;
			case -3:
				//console.log('像上滑');
				Imgbox.scale(imgcontainer);
				break;
		}
	});

}

imgBox(imgbox, close, imgcontainer);

function mouseWheel(ele, fun) {
	(/firefox/i).test(navigator.userAgent) ? ele.addEventListener("DOMMouseScroll", fun, false) : ele.onmousewheel = fun;
}

function $(id) {
	return (!id) ? null : document.getElementById(id);
}
