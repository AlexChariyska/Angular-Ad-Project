app.controller('FormController',function FormController($scope, adsData, $resource, $http, $location,$timeout){

    adsData.getAllTown(
    function (data, status, headers, config) {
        $scope.towns = data;
    }, 
    function (error, status, headers, config) {
        console.log(status, error); 
    });

    adsData.getAllCategories(
    function (data, status, headers, config) {
        $scope.categories = data;
    }, 
    function (error, status, headers, config) {
        console.log(status, error); 
    });



// Alert messages
    $scope.error = function(value) {
              return false;
     };
    $scope.success = function(value) {
              return false;
     };

	$scope.login=function(ad){
        adsData.login(ad,
            function (data, status, headers, config) {
                console.log(data);

                 $scope.success = function(value) {
                    return true;
                 };
                $timeout(function(){$location.path('/user/home');}, 2000);

            }, 
            function (error, status, headers, config) {
                $scope.error = function(value) {
                      return true;
                };
                alert("no");
            });
	};

                var ad={"username": "user13",
  "password": "user13",
  "confirmPassword": "user13",
  "name": "user13",
  "email": "user13@abv.bg",
  "phone": "123-5896-55",
  "townId": 1};

	$scope.register=function(credentials){
     var newObj = JSON.stringify(credentials);
        adsData.register(newObj,
            function (data, status, headers, config) {
                console.log(data);
            }, 
            function (error, status, headers, config) {
                alert("no");
            });
	};


  /*  $scope.adNewAd= function(ad){
        adsData.createNewAd(ad);
    }*/
	
    $scope.reset = function() {
    //To Do
   };
})