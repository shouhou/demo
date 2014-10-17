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
                pos=[];
            parent.css('position', 'relative');
            for (var i = list.length; i--;) {//important! must be reverse  
                var left = $(list[i]).position().left;
                var top = $(list[i]).position().top;
                pos[i]={

                }
                $(list[i]).css({
                    left: left,
                    top: top,
                    position: 'absolute'
                });
            };
            this.eles = list;
        },
        move: function() {
            var eles = this.eles;
            this.el.mousedown(function(event) {
                eles.eq(0).css({
                    left: event.pageX,
                    top: event.pageY
                });
            });
            $(el).mousemove(function(event) {

            });
        }
    };
    var el = $("#wraper div:first");
    window.Drag = new Drag(el);
})();
