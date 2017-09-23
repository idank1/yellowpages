const KLARNA_API_TOKEN = '0d745ad3-75bf-45cd-a6c9-9d613c73f3db';

module.exports = function(req,res){
    var request = require('request'),    
        headers = JSON.parse(req.query.header),
        parameters = JSON.parse(req.query.parameters),
        url = req.query.url,
        method = req.query.method;
    
    headers['X-KLARNA-TOKEN'] = KLARNA_API_TOKEN;
    
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
