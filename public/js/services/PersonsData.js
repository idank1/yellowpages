yellowPages.factory('PersonsData', ['$http', function($http) {
    const apiToken = '0d745ad3-75bf-45cd-a6c9-9d613c73f3db';
    
    var getPerson = function(searchParams, callback) {
        console.log("searchparams-"+JSON.stringify(searchParams));
        $http({
            headers:{
                'X-KLARNA-TOKEN': apiToken,
                'Content-Type': 'application/json'
            },
            url: 'http://eksercise-api.herokuapp.com/people/search',
            method: 'POST',
            params:searchParams        
        })
            .success(function (data,status) {
                console.log("Suceess-"+data);
                callback(data);
            }).error(function (data, status) {
                console.log("error in getbusiness"+data);
                callback(data);
            });
    };
    
    var getPersonsFromQuery = function(requestID, callback){
        console.log("Request id-"+requestID);                                
        
        $http({
            headers:{
                'X-KLARNA-TOKEN': apiToken,
               'Content-Type': 'application/json'
            },
            url: 'http://eksercise-api.herokuapp.com/people',
            method: 'GET',
            params:{
                searchRequestId: requestID    
            }
        })
            .success(function (data,status){
                console.log("Query returned data-"+JSON.stringify(data));
                console.log("Query returned status-"+status);
                callback(data);
            
            }).error(function(data,status){
            
        });
    };
    
    return {
        getPerson: getPerson,
        getPersonsFromQuery: getPersonsFromQuery
    }
}]);