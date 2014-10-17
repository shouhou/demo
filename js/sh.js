/*
 * sh
 * @authors Shouhou (you@example.org)
 * @date    2014-10-09 10:01:39
 * @version 1.0
 */
(function() {
    var Sh = function() {
        var shUl = $(".pics ul"),
            pics = $(".pics"),
            lis = shUl.children('li'),
            oPrev = $(".container .prev"),
            oNext = $(".container .next"),
            liWidth = lis.width(),
            shNum = Math.ceil((pics.width() / liWidth)),
            hiNum = lis.length - shNum,
            num = 0; //the index
        shUl.width(liWidth * lis.length); //set the ul width

        var fn = {
            print: function(target, str, speed) {
                var count = 0;
                var timer = setInterval(function() {
                    target.text(str.substring(0, count));
                    count++;
                    if (count === str.length) {
                        clearInterval(timer);
                    }
                }, 100);
            },
            popup: function() {
                var cWidth = document.documentElement.clientWidth;
                var cHeight = document.documentElement.clientHeight;
                var cWidth = window.innerWidth;
                var cHeight = window.innerHeight;

                var pWidth = $("#popup").width();
                var pHeight = $("#popup").height();
                var popX = Math.abs((cWidth - pWidth) / 2);
                var popY = Math.abs((cHeight - pHeight) / 2);
                $("#shadow").css('width', cWidth).css('height', cHeight).show();
                $("#popup").css('top', popY).css('left', popX).show();
            },
            move: function(obj, offsetLeft) {
                clearInterval(obj.timer);
                obj.timer = setInterval(function() {
                    var speed = (offsetLeft - obj.position().left) / 10; //important speed cann't put out of the interval
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (obj.position().left === offsetLeft) {
                        clearInterval(obj.timer);
                    } else {
                        obj.css('left', obj.position().left + speed + 'px');
                    }
                }, 30);
            },
            prev: function() {
                if (num <= hiNum && num > 0) {
                    oNext.attr('class', 'next');
                    num--;
                    Sh.move(shUl, -liWidth * num);
                }
                if (num == 0) {
                    oPrev.attr('class', 'prev onbtn');
                }
            },
            next: function() {
                if (num < hiNum && num >= 0) {
                    oPrev.attr('class', 'prev');
                    num++;
                    Sh.move(shUl, -liWidth * num);
                }
                if (num == hiNum) {
                    oNext.attr('class', 'next onbtn');
                }
            },
            lazyload: function() {
            }
        };
        return fn;
    }(); //Sh isn't a function, is a return json
    window.Sh = Sh;
})();

var divs = document.getElementById("divs");
var left = divs.style.left,
    left2 = divs.offsetLeft;
console.log(left);
console.log(left2);

/*$("#divs").mouseenter(function(e) {
    $(document).bind('keydown', function(e) {
        var currKey = e.keyCode || e.which || e.charCode;
        if (currKey == 37) {
            Sh.prev();
        }
        if (currKey == 39) {
            Sh.next();
        }
    });
});
$("#divs").mouseleave(function(e) {
    $(document).unbind('keydown');
});
$("#divs").bind('mousewheel', function(event, delta) {//error need jquery mousewheel
    var dir = delta > 0 ? 'Up' : 'Down';
    if (dir == 'Up') {
        Sh.prev();
    }
    if (dir == 'Down') {
        Sh.next();
    }
});
$("p.prev").click(function() {
    Sh.prev();
})
$("p.next").click(function() {
    Sh.next();
})*/

/*$("#btn").click(function(event) {
    Sh.popup();
});
$(window).resize(function(event) {
    Sh.popup();
});*/

/*var str = $("#word p").text();
Sh.print(target, str, 100);*/
