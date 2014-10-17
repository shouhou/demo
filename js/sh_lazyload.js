/**
 * Sh_lazyLoad
 * @authors Shouhou (shouhouml@gmail.com)
 * @date    2014-10-15 20:28:50
 * @version 1.0
 */
(function() {
    function Lazyload() {
        this.box = $("#box");
        this.pics = this.box.find("img");
        this.init();
        this.load();
    }
    Lazyload.prototype = {
        init: function() {
            //$(document).bind('resize', this.load);
            // $(document).scroll(this.load.call(this));
            var _this = this;
            $(document).resize(function(event) {
                _this.load();
            });
            $(document).scroll(function(event) {
                _this.load();
            });
        },
        load: function() {
            var scrollBottom = $(document).scrollTop() + $(window).height();
            $.each(this.pics, function(index, val) {
                if (scrollBottom >= $(val).offset().top) {
                    if ($(val).attr('src') == '') {
                        console.log((index+1) + ": load");
                        $(val).attr('src', $(val).attr('_src'));
                    }
                }
            });
        }
    };
    window.Lazyload = new Lazyload();
})();
