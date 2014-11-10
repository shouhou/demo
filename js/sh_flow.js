/**
 * Sh_Flow
 * @authors Shouhou (shouhouml@gmail.com)
 * @date    2014-10-11 15:44:51
 * @version 1.0
 */
(function() {
    var Flow = function() {
        this.box = $("#box");
        this.num = 1;
    };
    Flow.prototype = {
        init: function() {
            for (var i = 0; i < 5; i++) {
                $("<ul>").appendTo("#box");
            }
            //Flow.getPage();
            this.getPage(1);
            this.resize();
        },
        getPage: function(n) {
            var _this = this; //important
            var url = 'http://pingfan1990.sinaapp.com/javacript/wall/jsonpdata.php?name=pingfan';
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'jsonp',
                data: {
                    page: n
                }
            }).done(function(rets) {
                for (var i in rets) {
                    var src = 'http://pingfan1990.sinaapp.com/javacript/wall/' + rets[i].image;
                    var li = $("<li>").html('<img src=' + src + '></img>');
                    var uls = $("#box ul").sort(function(u1, u2) {
                        return $(u1).height() - $(u2).height();
                    });
                    li.appendTo(uls[0]);
                }
            }).fail(function() {
                console.log('jsonp failed');
            });
        },
        resize: function() {
            var _this = this;
            $(document).scroll(function(event) {
                _this.num++; //this object is changed not the flow 
                _this.getPage(_this.num);
            });
        },
        say: function() {
            alert(this.num);
        }
    };
    window.Flow = new Flow();
})();
Flow.init();

