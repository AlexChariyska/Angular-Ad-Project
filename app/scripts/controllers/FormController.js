app.controller('FormController',function FormController($scope, adsData, $resource, $http, $location){

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
            }, 
            function (error, status, headers, config) {
                $scope.error = function(value) {
                      return true;
                };
                alert("no");
            });
	};



	$scope.register=function(credentials){
        adsData.register(credentials,
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