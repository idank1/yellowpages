yellowPages.factory('PersonsDataService', ['CONSTATNS', '$http', function(CONSTATNS, $http) {  
    var createPersonsQuery = function(createPersonQueryParams, callback) {
        var headers = {
            'Content-Type': 'application/json'
        },
            url = CONSTATNS.API_SERVER_ADDRESS + CONSTATNS.CREATE_PERSON_QUERY_URI,
            method = 'POST',
            parameters = createPersonQueryParams;
        
        executeURLUsingProxy(url,headers,method,parameters, function(response){
            callback(response);
        });
    };
            
    var getPersonsByQueryID = function(requestID, callback){
        var headers = {
            'Content-Type': 'application/json'
        },
            url = CONSTATNS.API_SERVER_ADDRESS + CONSTATNS.GET_PERSON_BY_QUERY_URI,
            method = 'GET',
            parameters = requestID;

        (function doPoll(){
            executeURLUsingProxy(url,headers,method,parameters, function(response){
                // Check if the server is still processing, if so we will try again
                if (response.statusCode === 102){
                    setTimeout(doPoll(),1000);
                }
                else{                    
                    callback(response);
                }
            });
        })();    
    };    
    
    function executeURLUsingProxy(url,headers,method,parameters, callback){        
        $http({
            url: CONSTATNS.PROXY_SERVER_ADDRESS + CONSTATNS.PROXY_EXECUTE_URL_URI,
            method: 'GET',
            params:{
                'url':url,
                'header':headers,
                'method':method,
                'parameters':parameters
            }        
        })
            .success(function (data,status) {
                callback(data);
            }).error(function (data, status) {
                callback(data);
        });
    }
    
    return {
        createPersonsQuery: createPersonsQuery,
        getPersonsByQueryID: getPersonsByQueryID
    }
}]);