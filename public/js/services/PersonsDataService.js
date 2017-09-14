yellowPages.factory('PersonsDataService', ['$http', function($http) {
    const apiToken = '0d745ad3-75bf-45cd-a6c9-9d613c73f3db',
          proxyServer = 'https://cors-anywhere.herokuapp.com/',
          serverName = 'http://eksercise-api.herokuapp.com',
          createQueryURI = '/people/search',
          getPersonsURI = '/people';
    
    var createPersonsQuery = function(searchParams, callback) {                        
        $http({
            headers:{
                'X-KLARNA-TOKEN': apiToken,
                'Content-Type': 'application/json'
            },
            url: proxyServer+serverName+createQueryURI,
            method: 'POST',
            params:searchParams        
        })
            .success(function (data,status,headers,config) {
                callback(data);
            }).error(function (data, status) {
            });
    };
            
    var getPersonsByQueryID = function(requestID, callback){
        $http({
            headers:{
                'X-KLARNA-TOKEN': apiToken,
                'Content-Type': 'application/json'
            },
            url: proxyServer+serverName+getPersonsURI,
            method: 'GET',
            params:{
                searchRequestId: requestID    
            }
        })
            .success(function (data,status){
                callback(data);        
            }).error(function(data,status){
                console.log("Error!");            
        });
    };
    
    return {
        createPersonsQuery: createPersonsQuery,
        getPersonsByQueryID: getPersonsByQueryID
    }
    
    
    //(function() {
////    var cors_api_host = 'cors-anywhere.herokuapp.com';
//    var cors_api_host = 'localhost';
////    var cors_api_url = 'https://' + cors_api_host + '/';
//    var cors_api_url = 'http://' + cors_api_host + ':3000/';
//    var slice = [].slice;
//    var origin = window.location.protocol + '//' + window.location.host;
//    var open = XMLHttpRequest.prototype.open;
//    XMLHttpRequest.prototype.open = function() {
//        var args = slice.call(arguments);
//        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
//        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
//            targetOrigin[1] !== cors_api_host) {
//            args[1] = cors_api_url + args[1];
////            console.log("args-"+args);
//        }
//        console.log("args- "+args);
//        return open.apply(this, args);
//    };
//})();
}]);
