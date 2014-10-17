/*var express = require('express');
var app = express();
app.get('/', function(req, res){
  res.send('hello world');
});
app.listen(80);
*/

/*var express = require('express');
var app = express();

// simple logger
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// respond
app.use(function(req, res, next){
  res.send('Hello World');
});

app.listen(80);*/


var util = require('util');
var count = 0;
util.debug("Starting ...");
function timer_tick() {
    count = count + 1;
    util.debug("Tick count: " + count);
    if (count === 10) {
        count += 1000;
        util.debug("Set break here");
    }
    setTimeout(timer_tick, 1000);
}
timer_tick();
