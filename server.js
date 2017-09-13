var express = require('express');
var app=express();
var http = require('http');

app.use('/js', express.static(__dirname + '/public/js'));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/assets'));

app.use(function(req, res, next) {
  res.contentType('text/html');
  res.header("Content-Type", "text/html; charset=utf-8");
  next();
});

app.set('port', 8080);
    
app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile(__dirname + '/public/index.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});