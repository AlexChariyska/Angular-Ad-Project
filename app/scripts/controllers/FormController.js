app.controller('FormController',function FormController($scope, adsData,$resource, $http){

    adsData.getAllTown(
    function (data, status, headers, config) {
        $scope.towns = data;
    }, 
    function (error, status, headers, config) {
        console.log(status, error); 
    });


	$scope.login=function(data){
    $http.post('http://softuni-ads.azurewebsites.net/api/user/login', data).
      success(function(data, status, headers, config) {
      console.log(data);
      }).
      error(function(data, status, headers, config) {
      alert('no')
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