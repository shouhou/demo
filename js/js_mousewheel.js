$(function() {
	window.NUM = 0;
	wheel(document, function(down) {
		var now = 0;
		var st = $(document).scrollTop();
		if (st <= 1000)
			now = 0;
		if (st >= 1000 && st <= 2000)
			now = 1;
		if (st >= 2000 && st <= 3000)
			now = 2;
		if (st >= 3000 && st <= 4000)
			now = 3;
		if (st >= 4000)
			now = 4;
		window.NUM++;
		if (down) {
			now++;
			if (now > 4) {
				now = 4;
				window.NUM = 0;
			}
			pos(now);
			//tab(now);
		} else {
			now--;
			if (now < 0)
				now = 0;
			if (window.NUM == 1) {
				pos(now);
				//tab(now);
			};
		}
	});
	function pos(num) {
		$("html,body").stop(true, false).animate({
			scrollTop : $("#m" + num).offset().top
		}, 1000, function() {
			window.NUM = 0;
		});
		$(".sideBar").children().eq(num).addClass("active").siblings().removeClass("active");
	};
	// function tab(num){
	//     $(".sideBar").children().eq(num).addClass("active").siblings().removeClass("active");
	// };
});

function wheel(obj, wheelFn) {
	if (window.navigator.userAgent.indexOf('Firefox') != -1) {
		obj.addEventListener('DOMMouseScroll', fn, false);
	} else {
		obj.onmousewheel = fn;
	};
	function fn(ev) {
		var oEvent = ev || event;
		var down = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;

		wheelFn && wheelFn(down);
		//在滚动的时候也能带动浏览器的滚动条
		ev && ev.preventDefault();
		return false;
	};
};
