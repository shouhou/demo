/**
 *@author Shouhou
 */

//console?console.log("a"):$.noop();
/*
console?alert("aa"):alert("bb");
console.log("adfs");
*/

/*2014年10月10日00:37:44*/
/*$("[type='button']:enabled").click(function(event) {
		alert("a");	
});*/
$(document).keydown(function(event) {
	alert(event.which);
});



/*2014年10月8日09:31:18*/
/*var str='hello';
console.log(str.substring(1));

$("#user").css("cursor", "pointer");

console.log($("#user"));
console.log(document.getElementById("user"));	*/



/*2014年9月29日10:20:16*/
/*var str = '0031-232';
console.log(str.match("^[0-9]*$"));
var cardId = $("input[name='user']:checked").val();
if (!cardId) {
	alert("a");
}
console.log("cardId:"+cardId);*/

/*function say(){
	console.log("aa");
}

function say(){
	console.log("bb");
}
say();*/
//form1.varOm_buyer_phone.value.match("^[0-9]*$")==null




/*2014年9月28日15:34:01*/
/*var person=function (el,nClass){
	var name='wf';
	function say2(name){
		alert(name);
	}
	
	say:function(name){
		alert(name);
	}
	return {
		say:function (name){
			alert(name);
		},
		say2:say2
	};
}();
person.say("a");
person.say2("b");*/

/*2014年9月23日15:27:17*/
/*
 var arr = ['item 1', 'item 2', 'item 3'];
 var list = '[list][*]' + arr.join('[*]') + '[/list]';
 console.dir(list);//[list][*]item 1[*]item 2[*]item 3[/list]
 */

/*
 var arr=[];
 arr.push("a");
 arr[1]="b";
 arr.length;

 console.dir("arr:"+arr);

 var obj={};
 obj.age="b";
 obj["name"]="c";

 console.dir("obj"+obj);
 */
/*
var util = require('util');

function Base() {
	this.name = 'base';
	this.base = 1991;
	this.sayHello = function() {
		console.log('Hello ' + this.name);
	};
}

Base.prototype.showName = function() {
	console.log(this.name);
};

function Sub() {
	this.name = 'sub';
}

util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName();
objBase.sayHello();

console.log(objBase);
var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);*/

/*
var obj = {
name : "wf",
age : "10",
type : "stu"
};
for (var i in obj) {
alert(i);
}

function adddot(num) {
var temp = new Array();
for (var i = 0; i < num.length; i++) {
temp.push(num[i]);
}
if (num.length < 4) {
return num;
}
for (var i = num.length - 3; i >= 0; i -= 3) {
if (i > 0) {
temp.splice(i, 0, '.');
}
}
return temp.join("");
}*/

//alert("a"+adddot(10)+"a");

/*2014年9月22日10:23:30*/
/*
var num = 0;
function say(num) {
num++;
}

say(num);
alert(num);
*/
/*
var errorMessage="say";
$(dom).val(errorMsg);*/

//console ? console.warn("Nothing selected, can't validate, returning nothing.") : $.noop();
/*
function Stu(name){
this.name=name;
this.say=function(){
alert("a");
};
}
var stu=new Stu("wf");
alert(stu.name);*/

/*
var name = prompt("Please enter your name", "");
if (name != null && name != "") {
document.write("Hello " + name + "!");
}*/

/*2014年9月21日23:14:49*/

/*
$("#user").attr("disabled",true);

$("#user").bind('click', function(event) {
alert(this.id);
});
*/

/*2014年9月17日14:02:07*/

/*
var table=BaseJs.EditTable();
*/

/*
BaseJs = function() {
};
BaseJs.apply(String.prototype, {
// 将字符串解析为日期型(简单型)无需写原始格式
simpleToDate : function() {
style = 'yyyy-MM-dd hh:mm:ss';
var compare = {
'y+' : 'y',
'M+' : 'M',
'd+' : 'd',
'h+' : 'h',
'm+' : 'm',
's+' : 's'
};
var result = {
'y' : '',
'M' : '',
'd' : '',
'h' : '00',
'm' : '00',
's' : '00'
};
var tmp = style;
for (var k in compare) {
if (new RegExp('(' + k + ')').test(style)) {
result[compare[k]] = this.substring(tmp.indexOf(RegExp.$1), tmp.indexOf(RegExp.$1) + RegExp.$1.length);
}
}
return new Date(result['y'], result['M'] - 1, result['d'], result['h'], result['m'], result['s']);
},
// 将字符串解析为日期型
toDate : function(format) {
if (!format) {
alert("toDate方法缺少原始字符串日期格式参数format!");
return;
}
pattern = format.replace(/(yyyy)/g, "([0-9]{4})").replace(/(yy)|(MM)|(dd)|(hh)|(mm)|(ss)/g, "([0-9]{2})").replace(/[Mdhms]/g, "([0-9]{1,2})");
// 获取子表达式的索引
getIndex = function(expr1, expr2) {
var index = format.indexOf(expr1);
if (index == -1)
index = format.indexOf(expr2);
return index;
};
var today = new Date();
var returnDate;
if (new RegExp(pattern).test(this)) {
var yPos = getIndex("yyyy", "yy");
var mPos = getIndex("MM", "M");
var dPos = getIndex("dd", "d");
var hPos = getIndex("hh", "h");
var miPos = getIndex("mm", "m");
var sPos = getIndex("ss", "s");
var data = {
y : 0,
m : 0,
d : 0,
h : 0,
mi : 0,
s : 0
};
// 对索引进行排序
var pos = new Array(yPos + ",y", mPos + ",m", dPos + ",d", hPos + ",h", miPos + ",mi", sPos + ",s").sort(function(a, b) {
a = parseInt(a.split(",")[0]);
b = parseInt(b.split(",")[0]);
return a > b;
});
// 删除索引为-1的数组
var tmpIndex = 0;
var newPos = new Array();
for (var i = 0; i < pos.length; i++) {
if (parseInt(pos[i].split(",")[0]) != -1) {
newPos[tmpIndex] = pos[i];
tmpIndex++;
}
}
// 与当前文本进行匹配
var m = this.match(pattern);
for (var i = 1; i < m.length; i++) {
if (i == 0)
return;
var flag = newPos[i - 1].split(',')[1];
data[flag] = m[i];
};
data.y = data.y || today.getFullYear();
data.d = data.d || today.getDate();
// 月不需要处理，因为月的0月是1月
// 如果年是yy格式，则加上20
if (data.y.toString().length == 2)
data.y = parseInt('20' + data.y);
data.m -= 1;
returnDate = new Date(data.y, data.m, data.d, data.h, data.mi, data.s);
}
returnDate = returnDate || today;
return returnDate;
},
// 去空格
trim : function(str) {
str = this != window ? this : str;
return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
}
});

var str = "20141010";
console.dir("a:" + str.toDate("yyyyMMdd"));
console.dir("b:" + str.toDate("yyyy-MM-dd"));*/

/*2014年9月16日09:35:05*/
/*
function windowHeight() {
var de = document.documentElement;
return self.innerHeight || (de && de.offsetHeight) || document.body.offsetHeight;
}
alert(windowHeight());*/

/*
var data,type="xml";
data = type == "xml";
console.log(data);
console.log(type);*/

/*
function Person(){
}
Person.prototype={
say:function(){
alert("person");
}
};
var p=new Person();
p.say();

Stu={};
Stu.fn=function (){
json={
say:function(){
alert("stu");
}

};
return json;
}();
Stu.fn.say();

Tea={};
Tea.fn={
say:function(){
alert("tea");
}
};
Tea.fn.say();

var user2=document.getElementById("user2");
var el=BaseJs.Utils.element;
console.dir(el.prev(user2));*/

/*
var type = "xml2";
var data=true;
var data = type == "xml"||data?"a":"b";
alert(data);
*/

// 编码
/*
function doDecode(json) {
return eval("(" + json + ')');
}
*/

// 解码
/*
function doEncode(o) {
if ( typeof o == "undefined" || o === null) {
return "null";
} else if (BaseJs.isArray(o)) {
return encodeArray(o);
} else if (Object.prototype.toString.apply(o) === '[object Date]') {
return BaseJs.Utils.JSON.encodeDate(o);
} else if ( typeof o == "string") {
return encodeString(o);
} else if ( typeof o == "number") {
return isFinite(o) ? String(o) : "null";
} else if ( typeof o == "boolean") {
return String(o);
} else {
var a = ["{"], b, i, v;
for (i in o) {
if (!useHasOwn || o.hasOwnProperty(i)) {
v = o[i];
switch (typeof v) {
case "undefined" :
case "function" :
case "unknown" :
break;
default :
if (b) {
a.push(',');
}
a.push(doEncode(i), ":", v === null ? "null" : doEncode(v));
b = true;
}
}
}
a.push("}");
return a.join("");
}
}

var json = {
name : "wf",
age : 12
};
var decode = doDecode(json);
var encode = doEncode(decode);
console.dir(encode);*/

/*2014年9月15日10:25:11*/
/*
var arr = [1, 2, 3];
function say(num, index, array) {
console.log("this:" + this);
console.log("index:" + index);
}

BaseJs.foreach(arr, say);*/

//say.call()主要为了修改this指针

/*
function prev(el) {
do {
el=el.previousSibling;
} while(el&&el.nodeType!=1);
return el;
}

alert(prev(document.getElementById("user2")).value);*/

// 元素触发某一事件
/*
function fireEvent(element, event) {
// ie娴忚鍣�
if (document.createEventObject) {
var evt = document.createEventObject();
return element.fireEvent('on' + event, evt);
// 鐏嫄鍏跺叾瀹冩祻瑙堝櫒
} else {
var evt = document.createEvent("HTMLEvents");
evt.initEvent(event, true, true);
return !element.dispatchEvent(evt);
}
}
var el=document.getElementById("user");
el.onclick=function(){
alert("click");
};
fireEvent(el,"click");*/

/*
function parentX(elem) {
return elem.parentNode == elem.offsetParent ? elem.offsetLeft : pageX(elem) - pageX(elem.parentNode);
}

function getPageX(elem) {
return elem.offsetParent ? (elem.offsetLeft + pageX(elem.offsetParent)) : elem.offsetLeft;
}

var el = document.getElementById("user");
console.log(el.offsetLeft);
console.log(el.offsetParent);*/

/*
var el = document.getElementById("user");
//BaseJs.Utils.element.slideDown(el);

function Base() {
}
Base.prototype = {
say : function() {
alert("hello");
}
};
Base.say();
*/

/*
console.time("list");
alert("a");
console.timeEnd("list");

console.dir(document.body);
console.log(document.body);
*/

/*2014年9月12日09:44:59*/
//BaseJs.empty(document.getElementById("test"));
/*
var name = "for";

alert(!name);
alert(name.constructor != String);

name = {
'for' : 'htmlFor',
'class' : 'className'
}[name] || name;

alert(name);

var tmp=BaseJs.hasClass("user","input");
*/

/*2014年9月11日11:09:30*/
/*alert(form1.user.length>0);*/

/*
var inputs = document.getElementsByTagName("input");

for(var i=0;i<inputs.length;i++){
inputs[i].setAttribute("disabled",true);
}
for (var i in inputs) {
//i.setAttribute("disabled",true);  error
inputs[i].setAttribute("disabled", true);
}
*/

/*2014年9月9日09:52:30*/
/*
ar card="1,2,3,4,5";
var cards=card.split(",");
var info=cards.join("<br>");
alert(info);*/

//alert($("input[name='user']").attr("checked"));
/*
 $("input[name='user']").each(function(index) {
 if($(this).attr("checked")){
 alert($(this).attr("value"));
 }
 });*/

/*2014年9月4日11:06:50*/
/*$(function() {

 });*/

/*2014年9月3日11:03:23*/
/*var num=10;
 (function(num){
 console.log(num);
 })(num);*/

/*2014年9月2日15:03:23*/
/*console.log("helloworld");
 console.warn("warn");
 console.error("error");

 var $ = function(id) {
 return (!id) ? null : document.getElementById(id);
 };*/

