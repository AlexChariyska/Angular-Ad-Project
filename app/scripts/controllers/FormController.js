app.controller('FormController',function FormController($scope, adsData,$resource, $http, $location){

    adsData.getAllTown(
    function (data, status, headers, config) {
        $scope.towns = data;
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


	$scope.login=function(data){
    $http.post('http://softuni-ads.azurewebsites.net/api/user/login', data).
      success(function(data, status, headers, config) {
      console.log(data);

       $scope.success = function(value) {
              return true;
        };
        
       setTimeout(function(){ debugger;
        $location='/user/home';
         $location.path( "/user/home" );
        }, 2000); 
      }).
      error(function(data, status, headers, config) {
        $scope.isTrue = function(value) {
              return true;
        };
      });
	}
	$scope.register=function(){
	  $http.post('http://softuni-ads.azurewebsites.net/api/user/register', data).
      success(function(data, status, headers, config) {
      console.log(data);
      }).
      error(function(data, status, headers, config) {
      alert('no')
      });
	}
	
    $scope.reset = function() {
    $scope.user = angular.copy($scope.master);



   };
})