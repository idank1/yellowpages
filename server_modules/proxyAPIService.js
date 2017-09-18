module.exports = function(req,res){
    var request = require('request'),    
        headers = JSON.parse(req.query.header),
        parameters = JSON.parse(req.query.parameters),
        url = req.query.url,
        method = req.query.method;

    // Configure the request
    var options = {
        url: url,
        method: method,
        headers: headers,
        qs: parameters
    }

    request(url, options, function (error, response, body) {
        res.json(response);
    });
}
