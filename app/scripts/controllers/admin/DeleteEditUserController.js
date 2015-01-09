app.controller('DeleteEditUser', function DeleteEditUser($scope, $http, adsData,idService, $route, $rootScope, $location) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

 	$scope.user = idService.getObj();

$scope.deleteUser= function(username){
	adsData.deleteData('http://softuni-ads.azurewebsites.net/api/admin/User/'+ username, 
					function (data, status, headers, config) {
		              notySuccess("You have successfully deleted the user!");
		              $location.path('/admin/users/list');
			        },
			        function (error, status, headers, config) {
			            notyError();
			        });

}

	$scope.cancel = function(){
		$location.path('/admin/users/list');
	}

	function notyError(){
	         noty({
	               text: 'Something went wrong, try again!',
	               layout: 'topCenter',
	               closeWith: ['click', 'hover'],
	               type: 'error',
	               timeout:2000
	            });
	    };

	function notySuccess(message){
		 noty({
		       text: 'Well done, you have successfully ' + message,
		       layout: 'topCenter',
		       closeWith: ['click', 'hover'],
		       type: 'success',
		       timeout:2000
		    });
		};
});