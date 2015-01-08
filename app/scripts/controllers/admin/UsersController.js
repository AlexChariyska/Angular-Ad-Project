app.controller('UsersController', function UsersController($scope, $http, adsData, $route, $rootScope, $location, idService) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

	adsData.getData('http://softuni-ads.azurewebsites.net/api/admin/Users',
		function (data, status, headers, config) {
		              $scope.users = data.users;
		              $scope.filteredUsers = [],
			           $scope.currentPage = 1,
			           $scope.numPerPage = 4,
			           $scope.maxSize = 5,
			           $scope.bigTotalItems = data.numItems;

			        $scope.numPages = function () {
			            return Math.ceil($scope.users.length / $scope.numPerPage);
			        };

			        $scope.$watch('currentPage + numPerPage', function () {
			            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
			                , end = begin + $scope.numPerPage;

			            $scope.filteredUsers = $scope.users.slice(begin, end);
			        })

		        },
		        function (error, status, headers, config) {
		            notyError();
		        });

    $scope.predicate = '-username';

    $scope.redirectTo =function(place, data){
       switch(place) {
            case "edit":
                idService.setObj(data);
                $location.path('/admin/users/edit');
                break;
            case "delete":
                idService.setObj(data);
                $location.path('/admin/users/delete');
                break;
            }
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