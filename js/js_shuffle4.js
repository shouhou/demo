var oDiv1 = document.getElementById('divs');
var oDiv2 = oDiv1.getElementsByTagName('div')[0];

var oPrev = oDiv1.getElementsByTagName('p')[0];
var oNext = oDiv1.getElementsByTagName('p')[1];

var oUl = oDiv1.getElementsByTagName('ul')[0];
var oLi = oUl.getElementsByTagName('li');

var oLiwidth = parseInt(getBystyle(oLi[0], 'width'));
var num = 0;
var onnum = Math.ceil(parseInt(getBystyle(oDiv2, 'width')) / oLiwidth);
var iTar = oLi.length - onnum;

function getBystyle(obj, name) {
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj,false)[name];
	}
}

oUl.style.width = oLiwidth * oLi.length + 'px';

function move(obj, iTarget) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var speed = (iTarget - obj.offsetLeft) / 10;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if (obj.offsetLeft == iTarget) {
			clearInterval(obj.timer);
		} else {
			obj.style.left = obj.offsetLeft + speed + 'px';
		}
	}, 30);
}

function Next() {
	if (num < iTar && num >= 0) {
		oPrev.className = 'prev';
		num++;
		move(oUl, -num * oLiwidth);
	}
	oNext.className = (num == iTar) ? 'next onbtn' : 'next';
}

function Prev() {
	if (num <= iTar && num > 0) {
		oNext.className = 'next';
		num--;
		move(oUl, -num * oLiwidth);
	}
	oPrev.className = (num == 0) ? 'prev onbtn' : 'prev';
}

oNext.onclick = function() {
	Next();
};
oPrev.onclick = function() {
	Prev();
};
//鼠标滚轮事件
var scrollFunc = function(e) {
	var direct = 0;
	e = e || window.event;
	if (e.wheelDelta) {//IE/Opera/Chrome
		e.wheelDelta < 0 ? Next() : Prev();
	} else if (e.detail) {//Firefox
		e.detail < 0 ? Prev() : Next();
	}
};

/*注册事件*/
if (oDiv1.addEventListener) {//火狐
	oDiv1.addEventListener('DOMMouseScroll', scrollFunc, false);
}//W3C
oDiv1.onmousewheel = scrollFunc;

//IE/Opera/Chrome
oDiv1.onmouseover = function() {
	document.onkeydown = function(e) {
		var e = e || event;
		var currKey = e.keyCode || e.which || e.charCode;
		if (currKey == 39) {
			Next();
		} else if (currKey == 37) {
			Prev();
		}
	};
};
oDiv1.onmouseout = function() {
	document.onkeydown = function(e) {
		var e = e || event;
		var currKey = e.keyCode || e.which || e.charCode;
		if (currKey == 39 || currKey == 37) {
			currKey.returnValue == false;
		}
	};
}; 


Next();
Prev();
Next();
Next();