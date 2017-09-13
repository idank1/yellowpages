yellowPages.factory('PersonsData', ['$http', function($http) {
    const apiToken = '0d745ad3-75bf-45cd-a6c9-9d613c73f3db';
    const serverName = 'http://eksercise-api.herokuapp.com';
    
    var getPerson = function(searchParams, callback) {
        console.log("searchparams-"+JSON.stringify(searchParams));
        $http({
            headers:{
                'X-KLARNA-TOKEN': apiToken,
                'Content-Type': 'application/json'
            },
            url: serverName+'/people/search',
            method: 'POST',
            params:searchParams        
        })
            .success(function (data,status) {
                console.log("Suceess-"+data);
                callback(data);
            }).error(function (data, status) {
                console.log("error in getbusiness"+data);
            });
    };
    
    var getPersonsFromQuery = function(requestID, callback){
        console.log("Request id-"+requestID);                                
        
        $http({
            headers:{
                'X-KLARNA-TOKEN': apiToken,
               'Content-Type': 'application/json'
            },
            url: serverName+'/people',
            method: 'GET',
            params:{
                searchRequestId: requestID    
            }
        })
            .success(function (data,status){
                callback(data);        
            }).error(function(data,status){
            
        });
    };
    
    return {
        getPerson: getPerson,
        getPersonsFromQuery: getPersonsFromQuery
    }
}]);