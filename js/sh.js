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
            if ($val.offset().top <= scrollBottm) {//take care
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
    function Flow(){
        Sh.call(this);


    }

    sh.inherit(Sh,Flow);
    
    Flow.prototype


    /**
     * Execute part
     * ------------------------------------------------------------
     */
    $("#btn").click(function(event) { //don't forget the #
        var popup = new PopUp();
        popup.alert(); //don't put in the Sh funciton confict
    });

    var shuffle = new Shuffle();
    $(".prev").click(function(event) {
        shuffle.prev();
    });
    $(".next").click(function(event) {
        shuffle.next();
    });

    var load=new Load();
    load.init();
    load.load();



})(jQuery, window);
