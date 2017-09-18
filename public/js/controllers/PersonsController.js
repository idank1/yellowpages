yellowPages.controller('PersonsCotroller', function($scope, PersonsDataService) {    
    $scope.isPageLoading;
    $scope.persons = [];
    $scope.nextPagePersons = [];
    $scope.createPersonQueryParams = {};
    
    var searchableParams = [{"paramName": "name", "regex": /[åäöÅÄÖA-Za-z_.]+[ åäöÅÄÖA-Za-z_.]+/g},
                            {"paramName": "age", "regex": /\b[0-9]{1,3}\b/g},
                            {"paramName": "phone", "regex": /([1-9]\d{1,4})(-)([1-9]\d{1,6})/g}];
         
    $scope.searchPerson = function(){
        var userSearchInput = $scope.userSearchInput;
        $scope.createPersonQueryParams = {};        
        $scope.createPersonQueryParams['page'] = 1;
        
        if (userSearchInput){
            // Extracting the searchable paramters values from the user search query
            searchableParams.map(currParam =>{
                var matchedParamValue = userSearchInput.match(currParam.regex);                
                        
                if (matchedParamValue){
                    $scope.createPersonQueryParams[currParam.paramName] = matchedParamValue[0].trim();
                }
            });                                

            $scope.isPageLoading = true;
            
            getPersons($scope.createPersonQueryParams,function(personsResponse){
                $scope.persons = personsResponse;   
                $scope.isPageLoading = false;
                $scope.createPersonQueryParams['page']++;
                
                if ($scope.persons.length > 0){
                    // Get the results of the next page for a fluent pagination
                    getPersons($scope.createPersonQueryParams,function(nextPageResponse){
                        $scope.nextPagePersons = nextPageResponse;   
                    });
                }
            });          
        }
        else{
            alert("Please enter a search query");
        }
  
    }
        
    $scope.loadMoreResults = function(){
        if ($scope.nextPagePersons.length > 0){
            $scope.createPersonQueryParams['page']++;            
            $scope.persons = $scope.persons.concat($scope.nextPagePersons);
            $scope.nextPagePersons.length = 0;            
            
            getPersons($scope.createPersonQueryParams,function(nextPageResponse){
                $scope.nextPagePersons = nextPageResponse;   
            });
        }
    }
        
    function getPersons(createPersonQueryParams, callback){
        var persons = [];
        
        PersonsDataService.createPersonsQuery(createPersonQueryParams, function(createQueryResponse){
            // Check if the query creation succeed
            if (createQueryResponse.statusCode === 201){
                var getPersonByQueryParams = {"searchRequestId":JSON.parse(createQueryResponse.body).id};
            
                // Getting the persons using the search request id
                PersonsDataService.getPersonsByQueryID(getPersonByQueryParams, function(getPersonsResponse){
                    if(getPersonsResponse.statusCode === 200){ 
                        persons = JSON.parse(getPersonsResponse.body);
                        
                        // Calculating the age of each person using the birthday epoch time
                        persons.map(person => {
                            person.age = Math.floor((Date.now() - (person.birthday * 1000)) / (1000 * 60 * 60 * 24 * 365));                                                    
                        });
                    }
                    else{
                        alert("Error occurred while receiving persons details");        
                    }
                    
                    callback(persons);
                });
            }
            else{
                alert("Error occurred while creating the search query");
                callback(persons);
            }                            
        })
    }
});