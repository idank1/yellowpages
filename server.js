var express = require('express');
var app=express();
var http = require('http');

app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    res.contentType('text/html');
    res.header("Content-Type", "text/html; charset=utf-8");
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'application/x-www-form-urlencoded, authorization, accept, content-type');
    next(); 
});

app.use('/api/executeurl', function(req, res){    
    require('./server_modules/yellowpagesProxy.js')(req,res);
});
    
app.all('/*', function(req, res, next) {
  res.sendFile(__dirname + '/public/index.html');
});

app.set('port', 80);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});