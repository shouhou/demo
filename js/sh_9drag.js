/**
 * Sh_9drag
 * @authors shouhou (shouhouml@gmail.com)
 * @date    2014-10-13 09:22:25
 * @version 1.0
 */
(function() {
    function Drag(el) {
        this.el = el;
        this.init();
        this.move();
    }
    Drag.prototype = {
        init: function() {
            var parent = this.el.parent(),
                list = parent.children(),
                pos = [];
            parent.css('position', 'relative');
            for (var i = list.length; i--;) { //important! must be reverse
                $(list[i]).text(i);
                var left = $(list[i]).position().left;
                var top = $(list[i]).position().top;
                pos[i] = {
                    'left': left,
                    'top': top
                }
                $(list[i]).css({
                    left: left,
                    top: top,
                    position: 'absolute'
                });
            };
            this.pos = pos;
            this.eles = list;
        },
        collision: function(cause, passsive) {
            /*@碰撞原理
            主动元素 A 被动元素 B
            A.top < B.bottom &&
            A.left < B.right &&
            A.right > B.left &&
            A.bottom > B.top
            当这些条件全部成立时，两个元素就碰撞了
            */
            var ct = $(cause).position().top,
                cb = $(cause).height() + ct,
                cl = $(cause).position().left,
                cr = $(cause).width() + cl;
            var pt = $(passsive).position().top,
                pb = $(passsive).height() + pt,
                pl = $(passsive).position().left,
                pr = $(passsive).width() + pl;
            if (ct < pb && cl < pr && cr > pl && cb > pt) {
                return true;
            }
            return false;
        },
        meter: function(el, list) {
            var left = $(el).position().left,
                top = $(el).position().top;
            var tDif, lDif, sum = Math.MAX_VALUE;
            var result = null;
            $.each(list, function(index, val) {
                var tDif = Math.abs(top - val.top),
                    lDif = Math.abs(left - val.left);
                /*if (tDif > Math.abs(top - val.top) || lDif > Math.abs(left - val.left)) {
                    tDif = Math.abs(top - val.top);
                    lDif = Math.abs(left - val.left);*/
                if (sum > (tDif + lDif)) {
                    sum = tDif + lDif;
                } else {
                    result = val;
                }
            });
            return result;
        },
        curIndex: function(el) {
            var result = -1;
            $.each(this.eles, function(index, val) {
                if (el == val) {
                    result = index;
                }
            });
            return result;
        },
        /**
         * Move Function
         * @param   el   Jquery Element
         * @param   style Target Position
         */
        doMove: function(el, style) {
            var tL = style.left,
                tT = style.top;
            clearInterval(el.timer);
            el.timer = setInterval(function() {
                var sL = $(el).position().left,
                    sT = $(el).position().top;
                var tSpeed = (tT - sT) / 10,
                    lSpeed = (tL - sL) / 10;
                tSpeed = tSpeed > 0 ? Math.ceil(tSpeed) : Math.floor(tSpeed);
                lSpeed = lSpeed > 0 ? Math.ceil(lSpeed) : Math.floor(lSpeed);
                $(el).css({
                    left: sL + lSpeed,
                    top: sT + tSpeed
                });
                if (tL === sL && tT === sT) {
                    clearInterval(el.timer);
                }
            }, 30);
        },
        move: function() {
            var _this = this,
                eles = this.eles;
            var result = null;
            var doMove = this.doMove;
            $(document).mousedown(function(event) {
                _this.el = $(event.target);
                if (!_this.el.hasClass('block')) {
                    return;
                }
                _this.el.css('zIndex', '999');
                var mouseX = event.pageX,
                    mouseY = event.pageY;
                event.preventDefault();
                $(document).mousemove(function(event) {
                    var moveX = event.pageX,
                        moveY = event.pageY;
                    event.preventDefault();
                    var index = _this.curIndex(_this.el.get(0));
                    _this.el.css({
                        left: moveX - mouseX + _this.pos[index].left,
                        top: moveY - mouseY + _this.pos[index].top
                    });
                    var colList = [];
                    $.each(eles, function(index, val) {
                        if (_this.collision(_this.el.get(0), val)) {
                            if (val != _this.el.get(0)) { //
                                colList.push(val);
                            }
                        }
                    });
                    result = _this.meter(_this.el, colList);
                    colList = null;
                });
                $(document).mouseup(function(event) {
                    event.preventDefault();
                    $(document).unbind('mouseup').unbind('mousemove');
                    var sIndex = _this.curIndex(_this.el.get(0));
                    if (result) {
                        var tIndex = _this.curIndex(result);
                        if (tIndex != -1) {
                            /*doMove.call(_this, el, pos[index]);
                            doMove.call(_this, result, pos[0]);*/
                            _this.doMove(_this.el.get(0), _this.pos[tIndex]);
                            _this.doMove(result, _this.pos[sIndex]);
                            console.log("tIndex-" + tIndex + ":" + _this.pos[tIndex].left + ":" + _this.pos[tIndex].top);
                            console.log("sIndex-" + sIndex + ":" + _this.pos[sIndex].left + ":" + _this.pos[sIndex].top);
                            var _pos = _this.pos[tIndex];
                            _this.pos[tIndex] = _this.pos[sIndex];
                            _this.pos[sIndex] = _pos;
                            console.log(_this.pos);
                        }
                    } else {
                        _this.doMove(_this.el.get(0), _this.pos[sIndex]);
                    }
                    _this.el.css('zIndex', '');
                });
            });
        }
    };
    var ele = $("#wraper div:first");
    /*$.each(eles, function(index, val) {
        new Drag($(val));
    });*/
    window.Drag = new Drag(ele);
})();
