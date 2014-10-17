/**
 * Sh_page
 * @authors  Shouhou (shouhouml@gmail.com)
 * @date    2014-10-16 09:35:40
 * @version 1.0
 */

(function() {
    function Page() {
        this.currentPage = 1;
        this.page = 0;
        this.pageSize = 5;
        this.count = 0;
        this.first = 0;
        this.last = 0;
        this.prev = 0;
        this.next = 0;
    }
    Page.prototype = {
        init: function(data, tabel, pages) {
            this.data = data;
            this.tabel = tabel;
            this.pages = pages;
            this.setPage();
            this.setLink();
            //this.getPage(1);
        },
        setPage: function() {
            this.count = this.data.length;
            this.page = Math.ceil(this.count / this.pageSize);
            this.first = 1;
            this.last = this.page;
            this.prev = (this.currentPage > 1) ? (this.currentPage - 1) : 1;
            this.next = (this.currentPage < this.page) ? (this.currentPage + 1) : this.page;
        },
        setLink: function() {
            this.pages.append($("<a href='javascript:Page.getPage(1)'>首页</a>"));
            for (var i = this.currentPage - 2; i < this.currentPage + 2; i++) {
                if (i >= 1) {
                    this.pages.append($("<a href='javascript:Page.getPage(" + i + ")'>" + i + "</a>"));
                }
            };
            this.pages.append($("<a href='javascript:Page.getPage(" + this.page + ")'>末页</a>"));
        },
        getPage: function(page) {
            this.tabel.find("tr:gt(0)").remove();
            this.currentPage = page;
            var begin = (this.currentPage - 1) * this.pageSize;
            var end = begin + this.pageSize;
            for (var i = begin; i < end; i++) {
                var tr = $('<tr></tr>');
                $.each(data[i], function(index, val) {
                    tr.append($('<td>' + val + '</td>'));
                });
                this.tabel.append(tr);
            };
        }
    }
    window.Page = new Page();
})();

var data = [];
for (var i = 0; i < 200; i++) {
    data.push({
        name: 'wf',
        key: 'abc' + i,
        age: 1+i
    });
}
var tabel = $("#content table");
var pages = $("#pages");
Page.init(data, tabel, pages);
Page.getPage(3);

/*var data = [];
for (var i = 0; i < 200; i++) {
    data.push({
        name: 'wf',
        key: 'abc' + i,
        age: 24
    });
}
var tabel = $("#content table");
var pages = $("#pages");

var Page = function() {
    currentPage = 1,
        page = 0,
        pageSize = 5,
        count = 0,
        first = 0,
        last = 0,
        prev = 0,
        next = 0;
    var fn = {
        setPage: function() {
            count = data.length;
            page = Math.ceil(count / pageSize);
            first = 1;
            last = page;
            prev = (currentPage > 1) ? (currentPage - 1) : 1;
            next = (currentPage < page) ? (currentPage + 1) : page;
        },
        setLink: function() {
            fn.setPage();
            pages.append($("<a href='javascript:Page.getPage(1)'>首页</a>"));
            for (var i = currentPage - 2; i < currentPage + 2; i++) {
                pages.append($("<a href='javascript:Page.getPage(" + i + ")'></a>"));
            };
            pages.append($("<a href='javascript:Page.getPage(" + page + ")'>末页</a>"));
        },
        getPage: function(page) {
            tabel.find("tr:gt(0)").remove();
            currentPage = page;
            var begin = (currentPage - 1) * pageSize + 1;
            var end = begin + pageSize;
            for (var i = begin; i <= end; i++) {
                var tr = $('<tr></tr>');
                $.each(data[i], function(index, val) {
                    tr.append($('<td>' + val + '</td>'));
                });
                tabel.append(tr);
            };
        }
    };
    return fn;
}();*/
