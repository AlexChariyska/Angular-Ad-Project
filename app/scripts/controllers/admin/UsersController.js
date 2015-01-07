app.controller('UsersController', function UsersController($scope, $http, adsData, $route, $rootScope, $location, idService) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

	adsData.getUsers(function (data, status, headers, config) {
		              $scope.users = data.users;
		              console.log(data.users);
		                $scope.filteredUsers = [],
		                $scope.currentPage = 1,
		                $scope.numPerPage = 20,
		                $scope.maxSize = 5,
		                $scope.bigTotalItems = data.numItems;

			            $scope.numPages = function () {
			                return Math.ceil($scope.users.length / $scope.numPerPage);
			            };

			            $scope.$watch('currentPage + numPerPage', function () {
			                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
			                    , end = begin + $scope.numPerPage;

			            	 $scope.filteredUsers = $scope.users.slice(begin, end);

			        },
			        function (error, status, headers, config) {
			            notyError();
			        });
			     })


   $scope.predicate = '-username';
	
$scope.redirectToDeleteUser = function(id){
	idService.setObj(id);
    $location.path('/admin/users/delete');
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
})