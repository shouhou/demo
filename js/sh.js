(function($, window) {
    /**
     * Base Class : Sh
     * ------------------------------------------------------------
     */
    function Sh() {
        this.author = "shouhou";
        this.version = "1.0";
    }
    Sh.prototype = {
        getVersion: function() {
            return this.version;
        },
        getAuthor: function() {
            return this.author;
        },
        createObject: function(pro) {
            function F() {};
            F.prototype = pro;
            return new F();
        },
        inherit: function(Super, Sub) {
            var F = this.createObject(Super.prototype);
            F.constructor = Sub;
            Sub.prototype = F;
        }
    }
    var sh = new Sh();
    /**
     * Word Type Class
     * ------------------------------------------------------------
     */
    var Type = function() {
        Sh.call(this);
        this.word = $("#word");
        this.print = $("#print");
        this.type();
    }
    sh.inherit(Sh, Type);
    Type.prototype.type = function() {
        var _this = this,
            html = _this.word.html(),
            count = 0;
        var timer = setInterval(function() {
            _this.print.html(html.substring(0, count)) //don't forget the _this
            count++;
            if (count === html.length) {
                clearInterval(timer);
            }
        }, 30);
    };
    /**
     * PopUp Class
     * ------------------------------------------------------------
     */
    var PopUp = function() {
        Sh.call(this); //transfer the parameter
        this.shadow = $("#shadow");
        this.popup = $("#popup");
    }
    sh.inherit(Sh, PopUp);
    //PopUp.prototype = new Sh();
    PopUp.prototype.alert = function() {
        var _this = this;
        var width = $(window).width(),
            height = $(window).height(),
            pWidth = this.popup.width(),
            pHeight = this.popup.height(),
            left = (width - pWidth) / 2,
            top = (height - pHeight) / 2; //dont't spell the wrong word 
        this.shadow.css({
            width: width,
            height: height
        });
        this.popup.css({
            left: left,
            top: top
        }).show();
    };
    /**
     * Shuffle the pic
     * ------------------------------------------------------------
     */
    var Shuffle = function() { //always take care the this
        Sh.call(this);
        this.divs = $("#divs");
        this.pics = this.divs.find('ul') //take care the main frame not the pics
        this.prevBtn = this.divs.children('.prev'); //take care the .
        this.nextBtn = this.divs.children('.next');
        this.list = this.pics.children('li'); //take care the children
        this.width = this.list.eq(0).width();
        this.count = 0;
        this.showNum = Math.ceil(this.pics.width() / this.width);
        this.hideNum = Math.ceil(this.list.length - this.showNum);
        this.pics.width(this.width * this.list.length); //take care the set
    }
    sh.inherit(Sh, Shuffle);
    Shuffle.prototype.move = function(el, target) {
        $el = $(el);
        clearInterval(el.timer);
        el.timer = setInterval(function() {
            var speed = (target - $el.position().left) / 10; //take care the sequence
            speed = speed > 0 ? Math.floor(speed) : Math.ceil(speed);
            $el.css('left', $el.position().left + speed + 'px'); //take care the property
            if ($el.position().left == target) {
                clearInterval(el.timer);
            }
        }, 30);
    };
    Shuffle.prototype.prev = function() {
        if (this.count == 0) {
            this.prevBtn.attr('class', 'prev onbtn');
        }
        if (this.count > 0 && this.count <= this.hideNum) {
            this.nextBtn.attr('class', 'next');
            this.count--;
            this.move(this.pics.get(0), -this.width * this.count);
        }
    };
    Shuffle.prototype.next = function() {
        if (this.count == this.hideNum) {
            this.nextBtn.attr('class', 'next onbtn');
        }
        if (this.count < this.hideNum && this.count >= 0) {
            this.prevBtn.attr('class', 'prev'); //take care not the nextBtn
            this.count++;
            this.move(this.pics.get(0), -this.width * this.count);
        }
    };
    /**
     * Load pic
     * ------------------------------------------------------------
     */
    function Load() {
        Sh.call(this);
        this.box = $("#box");
        this.list = this.box.find('img');
    }
    sh.inherit(Sh, Load);
    Load.prototype.init = function() {
        var _this = this; //take care 
        this.box.mouseenter(function(event) {
            $(document).scroll(function(event) {
                _this.load();
            });
            $(document).resize(function(event) {
                _this.load();
            });
        });
        this.box.mouseleave(function(event) {
            $(document).unbind('scroll').unbind('unbind');
        });
    }
    Load.prototype.load = function() {
            var scrollBottm = $(document).scrollTop() + $(window).height();
            $.each(this.list, function(index, val) {
                var $val = $(val);
                if ($val.offset().top <= scrollBottm) { //take care
                    if ($val.attr('src') == '') {
                        $val.attr('src', $val.attr('_src'));
                    }
                }
            });
        }
        /**
         * Flow
         * ------------------------------------------------------------
         */
    function Flow() {
        Sh.call(this);
        this.box = $("#box");
        this.index = 1;
    }
    sh.inherit(Sh, Flow);
    Flow.prototype.init = function() {
        var _this = this;
        for (var i = 0; i < 5; i++) {
            $("<ul>").appendTo(this.box);
        }
        _this.getPage(1); //must be the first call
        $(document).scroll(function(event) {
            var scrollBottm = $(document).scrollTop() + $(window).height();
            var uls = _this.getUls();
            var ulBottom = uls.eq(0).offset().top + uls.eq(0).height(); //take care
            /*console.log("windowHeight:"+$(window).height());
            console.log("scrollTop:"+$(document).scrollTop());*/
            if (scrollBottm >= ulBottom) {
                console.log(scrollBottm);
                console.log(uls.eq(0).offset().top);
                _this.index++;
                _this.getPage(_this.index);
            }
        });
    };
    Flow.prototype.getUls = function() {
        return this.box.find('ul').sort(function(ul1, ul2) {
            return $(ul1).height() - $(ul2).height();
        })
    }
    Flow.prototype.getPage = function(n) {
        var _this = this;
        $.ajax({
                url: 'http://pingfan1990.sinaapp.com/javacript/wall/jsonpdata.php?name=pingfan',
                type: 'GET',
                dataType: 'jsonp',
                data: {
                    page: n
                },
            })
            .done(function(imgs) {
                for (var i in imgs) {
                    var src = "http://pingfan1990.sinaapp.com/javacript/wall/" + imgs[i].image;
                    var li = $("<li>").html("<img src='" + src + "'></img>");
                    var uls = _this.getUls();
                    li.appendTo(uls.eq(0));
                }
            });
    };

    function Drag() {
        Sh.call(this);
        this.wraper = $(".wraper");
        this.divs = this.wraper.children();
        this.pos = [];
    }
    sh.inherit(Sh, Drag);
    Drag.prototype.init = function() {
        this.wraper.css('position', 'relative'); //care realtive absolute
        for (var i = this.divs.length - 1; i >= 0; i--) {
            var div = this.divs.eq(i);
            var left = div.position().left,
                top = div.position().top;
            this.pos[i] = {
                left: left,
                top: top
            }
            div.css({
                left: left,
                top: top,
                position: 'absolute'
            });
        }
    }
    Drag.prototype.curIndex = function(el) { //not use jquery element to equal
        var rtn = -1;
        $.each(this.divs, function(index, val) {
            if (val == el) {
                rtn = index; //can't return directly 
            }
        });
        return rtn;
    }
    Drag.prototype.conflict = function(cause, passsive) { //care the spell position
        var cl = $(cause).position().left,
            cr = $(cause).position().left + $(cause).width(),
            ct = $(cause).position().top,
            cb = $(cause).position().top + $(cause).height();
        var pl = $(passsive).position().left,
            pr = $(passsive).position().left + $(passsive).width(),
            pt = $(passsive).position().top,
            pb = $(passsive).position().top + $(passsive).height();
        if (cl < pr && cr > pl && ct < pb && cb > pt) {
            return true;
        }
        return false;
    };
    Drag.prototype.calDis = function(el, list) {
        var _this = this;
        var ex = $(el).position().left,
            ey = $(el).position().top;
        var sum = 999999;
        curIndex = -1;
        $.each(list, function(index, val) {
            var vx = $(val).position().left,
                vy = $(val).position().top,
                _sum = Math.abs(vx - ex) + Math.abs(vy - ey); //rememeber the diff
            if (sum > _sum) {
                sum = _sum;
                curIndex = index;
            }
        });
        return list[curIndex];
    }
    Drag.prototype.doMove = function(el, style) { //el dom element
        clearInterval(el.timer);
        el.timer = setInterval(function() {
            var lSpeed = (style.left - $(el).position().left) / 10,
                tSpeed = (style.top - $(el).position().top) / 10;
            lSpeed = lSpeed > 0 ? Math.ceil(lSpeed) : Math.floor(lSpeed);
            tSpeed = tSpeed > 0 ? Math.ceil(tSpeed) : Math.floor(tSpeed);
            $(el).css({
                left: $(el).position().left + lSpeed,
                top: $(el).position().top + tSpeed
            });
            if ($(el).position().left == style.left && $(el).position().top == style.top) { //care $(el)
                clearInterval(el.timer);
            }
        }, 30);
    };
    Drag.prototype.move = function() {
        var _this = this;
        $(document).mousedown(function(event) {
            var target = event.target;
            if (!$(target).hasClass('block')) {
                return;
            }
            var downX = event.pageX,
                downY = event.pageY;
            event.preventDefault();
            $(document).mousemove(function(event) {
                var moveX = event.pageX - downX,
                    moveY = event.pageY - downY;
                var index = _this.curIndex(target);
                if (index == -1) {
                    return;
                }
                var pos = _this.pos[index];
                $(target).css({
                    left: pos.left + moveX,
                    top: pos.top + moveY
                });
            });
            $(document).mouseup(function(event) {
                $(document).unbind('mousemove').unbind('mouseup');
                var list = [];
                $.each(_this.divs, function(index, val) {
                    if (val != target && _this.conflict(target, val)) { //care not contain itself 
                        list.push(val);
                    }
                });
                if (list.length == 0) {
                    return;
                }
                var tarEl = _this.calDis(target, list),
                    sourPos = _this.pos[_this.curIndex(tarEl)],
                    tarPos = _this.pos[_this.curIndex(target)];
                _this.doMove(target, sourPos);
                _this.doMove(tarEl, tarPos);
                _this.pos[_this.curIndex(tarEl)] = tarPos;
                _this.pos[_this.curIndex(target)] = sourPos;
            });
        });
    }

    /**
     * Execute part
     * ------------------------------------------------------------
     */
    /*var type=new Type();
    type.type();
    var popup = new PopUp();
    $("#btn").click(function(event) { //don't forget the #
        popup.alert(); //don't put in the Sh funciton confict
    });
    var shuffle = new Shuffle();
    $(".prev").click(function(event) {
        shuffle.prev();
    });
    $(".next").click(function(event) {
        shuffle.next();
    });
    var load = new Load();
    load.init();
    load.load();
    var flow = new Flow();
    flow.init();*/

    var drag = new Drag();
    drag.init();
    drag.move();
})(jQuery, window);
