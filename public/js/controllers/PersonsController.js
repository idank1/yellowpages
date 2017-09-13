yellowPages.controller('PersonsCotroller', function($scope, PersonsData) {    
    var searchParams = [{"paramName": "name", function: searchNameParam},
                        {"paramName": "age", function: searchAgeParam},
                        {"paramName": "phone", function: searchPhoneParam}];
     
    function calculatePersonsAge(persons, callback){
        for (var person = 0; person < persons.length; person++){
            // Calculate the age from the birth date
            persons[person].age = Math.floor(((new Date()).getTime() - persons[person].birthday) / (1000 * 60 * 60 * 24 * 365));
        }
        
        callback(persons);
    }    
    
    $scope.searchPerson = function(){
        var userInput = $scope.userSearchInput;
        
        var searchParamaters = {};
        
        if (userInput){
            for (var currParam = 0; currParam < searchParams.length; currParam++){
                var matchedParamValue = searchParams[currParam].function(userInput);
                
                if (matchedParamValue){
                    searchParamaters[searchParams[currParam].paramName] = matchedParamValue;
                }
            }
        }
        
        console.log("Search person activated!");
        getPersons(searchParamaters)        
    }
    
    function getPersons(searchParamaters){
        PersonsData.getPerson(searchParamaters, function(data){
            setTimeout(function(){
                PersonsData.getPersonsFromQuery(data.id, function(persons){
                    console.log("Persons data- "+JSON.stringify(persons));
                    $scope.persons = persons;
                    calculatePersonsAge(persons, function(persons){
                        $scope.persons = persons;    
                    });
                });
            }, 10000);


            console.log("data-"+JSON.stringify(data));

        })
    }
});

function searchNameParam(input){
//    var name = input.replace(/([0-9])/g, '');
    input.replace(/\d+(-\d+)*(d+)?/g,'');
//    var name = input.match(/^((Dr|Mr|Mrs|Prof)\. )?[A-Z][a-z]+( [A-Z]([a-z]+|\.))? [A-Z][a-z]+/g);
//    name = name.match(/^[a-zA-Z ,.'-]+$/g);
    name = name.trim();

    return name;
}

function searchAgeParam(input){ 
    var age = input.match(/[0-9]{1,3}/g) || [];
    console.log("Input after age replace");

    if (age.length > 0){
        return age[0];
    }
    else{
        return;
    }
}

function searchPhoneParam(input){
     var phoneNumber = input.match(/([1-9]\d{1,4})(-)([1-9]\d{1,6})/g) || [];
    console.log("Input after age replace");

    if (phoneNumber.length > 0){
        return phoneNumber[0];
    }
    else{
        return;
    }   
}