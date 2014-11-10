/*var http=require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('<h1>Node</h1>');
	res.end('<p>HelloWorld</p>');
}).listen(3000);
console.log("Server start at port 3000");
*/

/*var fs=require('fs');
fs.readFile('node.log','utf-8',function(err,data){
	if(err){
		console.error(err);
	}else{
		console.log(data);
	}
})
console.log('end');*/

/*var fs=require('fs');
var data=fs.readFileSync('node.log','utf-8');
console.log(data);*/

/*var EventEmitter=require('events').EventEmitter;
var event=new EventEmitter();
event.on('alert',function(){//bind the event and the handler
	console.log('HelloWorld');
});
setTimeout(function(){
	event.emit('alert');
}, 1000);*/

/*var sh=require('./sh');
sh.setName('wf');
sh.getName();*/

/*var Sh=require('./sh');
var sh=new Sh();
sh.setName('wf');
sh.getName();*/

/*var package=require('./package');
package.hello();*/

/*about debug*/
/*var a = 1;
var b = 'world';
var c = function(x) {
    console.log('hello' + x + a);
}
c();*/

/*function Base(){
	this.name='base';
	this.base=1991;
	this.sayHello=function(){
		console.log('Hello world');
	}
}
Base.prototype.showName=function(){
	console.log('name');
}
var base=new Base();*/

/*about the events*/
/*var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('shEvent', function(arg1, arg2) { //listener
    console.log("listener1:" + arg1 + arg2);
});
emitter.on('shEvent', function(arg1, arg2) {
    console.log("listener2:" + arg1 + arg2);
});
emitter.emit('shEvent', 'shouhou', 1991);*/

/*about the file*/
/*var fs = require('fs');
fs.readFile('node.log','utf-8',function(err, data) {
    if (err) {
        conosole.error(err);
    } else {
        console.log(data);
    }
});
*/

/*var fs = require('fs');
fs.open('node.log', 'r', function(err,data) {
    if (err) {
        console.error(err);
        return;
    }
    var buf = new Buffer(8);
    fs.read(data, buf, 0, 8, null, function(err, bytesRead, buffer) {
        if (err) {
            conosole.error(err);
            return;
        }
        console.log('byteRead:' + bytesRead);
        console.log(buffer);
    });
});
*/

/*about the http*/
/*var http=require('http');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('<h1>Node</h1>');
	res.end('<p>HelloWorld</p>');
}).listen(3000);
console.log("Server start at port 3000");*/


/*var http=require('http');
var url=require('url');
var util=require('util');

http.createServer(function(req,res){
	res.writeHead(200,{'Content-type':'text/plain'});
	res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000);*/


/*???get the post request*/
/*var http=require('http');
var url=require('url');
var querystring=require('querystring');
var util=require('util');

http.createServer(function(req,res){
	var post='';
	req.on('data',function(chunk){
		post+=chunk;
	});
	req.on('end',function(){
		post=querystring.parse(post);
		res.end(util.inspect(post));
	})
}).listen(3000);*/

/*var http=require('http');
var querystring=require('querystring');
var contents=querystring.stringify({
	name:'wf',
	email:'shouhouml@gmail.com',
});
var options={
	host:'www.shouhou91.com',
	path:'/blog/',
	method:'post',
	headers:{
		'Content-Type':'application/x-www-form-urlencoded',
		'Content-Length':contents.length
	}
};
var req=http.request(options,function(res){
	res.setEncoding('utf8');
	res.on('data',function(data){
		console.log(data);
	})
});
req.write(contents);
req.end();*/

/*k*/

/*var http=require('http');
var querystring=require('querystring');
var server=http.createServer(function(req,res){
	var post='';
	req.on('data',function(chunk){
		console.log('chunk:'+chunk);
		post+=chunk;
	});
	req.on('end',function(){
		post=querystring.parse(post);
		console.log('post:'+post);
		res.write(post.title);
		res.write(post.text);
		res.end();
	})
}).listen(3000);*/

/*var express=require('express');
var app=express();
app.use(express.bodyParser());
app.all('/',function(req,res){
	res.send(req.body.title+req.body.text);
});
app.listen(3000);*/
