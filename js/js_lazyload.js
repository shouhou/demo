 window.onload = function() {
     //delayedLoad('box');
     load.init('box');
 }

 var load = {
     init: function(id) {
         this.delayedLoad(id);
     },
     delayedLoad: function(id) {
         if (!id) {
             alert('请填写正确的id');
             return;
         }

         this.obj = document.getElementById(id);

         this.aImg = this.obj.getElementsByTagName('img');

         this.fnLoad();

         this.loadImg();
     },
     loadImg: function() {
         var _this = this;
         this.bind(window, 'scroll', function() {

             _this.fnLoad();
         });
         this.bind(window, 'resize', function() {
             _this.fnLoad();
         });
     },
     fnLoad: function() {
         var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
         var scrollBottom = document.documentElement.clientHeight + scrollT;
         console.log("top:" + scrollT);
         console.log('bottom:' + scrollBottom);
         for (var i = 0; i < this.aImg.length; i++) {
             var imgT = this.getPos(this.aImg[i]).top;
             console.log('imgT' + i + ':'+imgT);
             if (scrollBottom >= imgT) {
                 if (this.aImg[i].getAttribute('src') == '') {
                     this.aImg[i].src = this.aImg[i].getAttribute('_src');
                 }
             }
         }
     },
     getPos: function(obj) {
         var l = 0,
             t = 0;

         while (obj) {
             l += obj.offsetLeft;
             t += obj.offsetTop;
             obj = obj.offsetParent;
         }

         return {
             left: l,
             top: t
         };
     },
     bind: function(obj, sEv, fn) {
         if (obj.addEventListener) {
             obj.addEventListener(sEv, fn, false);
         } else {
             obj.attachEvent('on' + sEv, fn);
         }
     }
 }
