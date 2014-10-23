function drag(elem) {
    this.elem = elem;
    this.innit();
    this.move();
}
drag.prototype = {
    innit: function() {
        var parent = this.elem.parentNode,
            list = parent.children,
            pos = [];
        parent.style.position = 'relative';
        for (var i = list.length; i--;) {
            pos[i] = {
                'left': list[i].offsetLeft,
                'top': list[i].offsetTop
            };
            list[i].style.left = list[i].offsetLeft + 'px';
            list[i].style.top = list[i].offsetTop + 'px';
            list[i].style.position = 'absolute';
        };
        this.pos = pos;
        this.elems = list; //存储元素列表
    },
    stopPrevent: function(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.returnValue = false;
            e.cancelBubble = true;
        }
    },
    /*
            检测碰撞
            @cause 主动元素(就是被拖动的那个)
            @passive 被动元素(被撞的那个)
            */
    collision: function(cause, passive) {
        var ct = cause.offsetTop,
            cl = cause.offsetLeft,
            cb = ct + cause.offsetHeight,
            cr = cl + cause.offsetWidth;
        var pt = passive.offsetTop,
            pl = passive.offsetLeft,
            l =
            pb = pt + passive.offsetHeight,
            pr = pl + passive.offsetWidth;
        /*
                @碰撞原理
                主动元素 A 被动元素 B
                A.top < B.bottom &&
                A.left < B.right &&
                A.right > B.left &&
                A.bottom > B.top
                当这些条件全部成立时，两个元素就碰撞了
                */
        if (ct < pb && cl < pr && cb > pt && cr > pl) {
            return true;
        }
        return false;
    },
    /*
            测量距离
            @orgin 比较元素
            @list  被比较元素列表
            */
    meter: function(orgin, list) {
        var ol = orgin.offsetLeft,
            ot = orgin.offsetTop,
            min_l = 99999999,
            min_t = 99999999,
            _l = 0,
            _t = 0,
            result = null;
        for (var i in list) {
            _l = Math.abs(ol - list[i].offsetLeft);
            _t = Math.abs(ot - list[i].offsetTop);
            //console.log(_l+"  "+_t);
            if (_l < min_l || _t < min_t) {
                //console.log("if "+_l+"  "+_t);
                min_l = _l;
                min_t = _t;
                result = list[i];
            }
        }
        return result;
    },
    /*
            @获取元素在列表中所在的位置
            */
    curIndex: function(obj, list) {
        var list = list || []; //为了防止list为空报错
        for (var i = 0, len = list.length; i < len; i++) {
            if (obj == list[i]) {
                return i;
            }
        }
        return false;
    },
    getStyle: function(obj, prop) {
        if (obj.currentStyle) {
            //IE支持 currentStyle
            return obj.currentStyle[prop];
        } else {
            //chrome firefox 支持 getComputedStyle
            return getComputedStyle(obj, null)[prop];
        }
    },
    startMove: function(obj, style) {
        var getStyle = this.getStyle;
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            obj.style.zIndex = 99;
            var bStop = true;
            for (var prop in style) {
                //1取当前样式
                var cur = parseInt(getStyle(obj, prop));
                //2算速度
                var speed = (style[prop] - cur) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                //timer end
                if (cur != style[prop]) {
                    bStop = false;
                }
                obj.style[prop] = cur + speed + 'px';
            }
            if (bStop) {
                clearInterval(obj.timer);
                obj.style.zIndex = "";
            }
        }, 30)
    },
    move: function(e) {
        var element = this.elem,
            lists = this.elems,
            that = this,
            result = null,
            startMove = this.startMove;
        stopPrevent = this.stopPrevent,
            curIndex = this.curIndex,
            pos = this.pos;
        collision = this.collision,
            meter = this.meter;
        element.onmousedown = function(e) {
            e = e || window.event;
            var mousex = e.x || e.pageX,
                mousey = e.y || e.pageY,
                moveIndex = curIndex(element, lists),
                style = pos[moveIndex]; //

            element.style.zIndex = 99;
            stopPrevent(e);

            document.onmousemove = function(e) {
                e = e || window.event;
                var movex = e.x || e.pageX,
                    movey = e.y || e.pageY;
                stopPrevent(e);
                element.style.left = (movex - mousex + style['left']) + 'px';
                element.style.top = (movey - mousey + style['top']) + 'px';
                var zeroList = []; //存储撞到了几个元素
                for (var j = lists.length; j--;) lists[j].style.border = ''; //去除元素列表中所有的边框
                for (var i = lists.length; i--;) {
                    if (lists[i] != element) {
                        if (collision(element, lists[i])) {
                            zeroList.push(lists[i]);
                        }
                    }
                };
                result = meter(element, zeroList);
            };
            document.onmouseup = function(e) {
                document.onmouseup = null,
                    document.onmousemove = null;
                if (result) {
                    //如果碰到元素，则交换位置
                    var activeIndex = curIndex(result, lists);
                    startMove.call(that, element, pos[activeIndex]);
                    startMove.call(that, result, style);
                    //交换存储定位信息
                    var zeroData = pos[activeIndex];
                    pos[activeIndex] = pos[moveIndex];
                    pos[moveIndex] = zeroData;
                } else {
                    //如果没有撞到任何元素，则返回原点
                    //因为函数在document.onmouseup 中执行，所以会导致this在执行startMove变成window,而不是drag,所以使用了call方法,指定了执行环境。
                    startMove.call(that, element, style);
                }
                element.style.zIndex = "";
                stopPrevent(e);
            };
        }
    }
}

for (var i = $('wraper').children.length; i--;) {
    new drag($('wraper').children[i]);
}

function $(id) {
    return id ? document.getElementById(id) : null;
} < /script>
