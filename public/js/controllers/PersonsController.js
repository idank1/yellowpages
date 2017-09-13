yellowPages.controller('PersonsCotroller', function($scope, PersonsData) {    
    $scope.currentViewPage = 1;
    $scope.persons = [];
    $scope.nextPagePersons = [];
    $scope.searchParamaters = {};
    
    var searchParams = [{"paramName": "name", "regex": /[åäöÅÄÖA-Za-z_]+/g},
                        {"paramName": "age", "regex": /[0-9]{1,3}/g},
                        {"paramName": "phone", "regex": /([1-9]\d{1,4})(-)([1-9]\d{1,6})/g}];
         
    $scope.searchPerson = function(){
        var userInput = $scope.userSearchInput;
        
        $scope.searchParamaters['page'] = $scope.currentViewPage;
        
        if (userInput){
            for (var currParam = 0; currParam < searchParams.length; currParam++){
                var matchedParamValue = userInput.match(searchParams[currParam].regex);
                
                if (matchedParamValue){
                    $scope.searchParamaters[searchParams[currParam].paramName] = matchedParamValue;
                }
            }
        }
        
        getPersons($scope.searchParamaters,function(persons){
            $scope.persons = persons;   
            $scope.searchParamaters['page']++;
            
            getPersons($scope.searchParamaters,function(nextPagePersons){
                $scope.nextPagePersons = nextPagePersons;   
            });
        });            
    }
        
    $scope.loadMoreResults = function(){
        if ($scope.nextPagePersons.length > 0){
            $scope.currentViewPage++;
            $scope.searchParamaters['page']++;            
            $scope.persons = $scope.persons.concat($scope.nextPagePersons);
            $scope.nextPagePersons.length = 0;            
            
            getPersons($scope.searchParamaters,function(nextPagePersons){
                $scope.nextPagePersons = nextPagePersons;   
            });
        }
    }
    
    function getPersons(searchParamaters, callback){
        PersonsData.getPerson(searchParamaters, function(data){
            setTimeout(function(){
                PersonsData.getPersonsFromQuery(data.id, function(persons){
                    console.log("Persons data- "+JSON.stringify(persons));
                    callback(calculatePersonsAge(persons));
                });
            }, 10000);


            console.log("data-"+JSON.stringify(data));
        })
    }
});

function calculatePersonsAge(persons, callback){
    for (var person = 0; person < persons.length; person++){
        // Calculate the age from the birth date
        persons[person].age = Math.floor(((new Date()).getTime() - persons[person].birthday) / (1000 * 60 * 60 * 24 * 365));
    }

    return persons;
}    