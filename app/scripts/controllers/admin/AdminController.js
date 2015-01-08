app.controller('AdminController', function AdminController($scope, $http, adsData,idService, $route, $rootScope, $location) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

	adsData.getData('http://softuni-ads.azurewebsites.net/api/admin/ads',
	        function (data, status, headers, config) {
	            $scope.ads = data.ads;
	            $scope.filteredAds = [],
	                $scope.currentPage = 1,
	                $scope.numPerPage = 10,
	                $scope.maxSize = 5,
	                $scope.bigTotalItems = data.numItems;

	            $scope.numPages = function () {
	                return Math.ceil($scope.ads.length / $scope.numPerPage);
	            };

	            $scope.$watch('currentPage + numPerPage', function () {
	                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
	                    , end = begin + $scope.numPerPage;

	                $scope.filteredAds = $scope.ads.slice(begin, end);

	            });
	        },
	        function (error, status, headers, config) {
	            notyError("loading ads");
	        }
	    );


	$scope.approve = function(id){
		adsData.deactivate( 'http://softuni-ads.azurewebsites.net/api/admin/Ads/Approve/' + id, 
				function (data, status, headers, config) {
		           notySuccess('approved the ad!');
		           $route.reload();
		        },
		        function (error, status, headers, config) {
		            notyError()
		        });
	}

	$scope.reject = function(id){
		adsData.deactivate('http://softuni-ads.azurewebsites.net/api/admin/Ads/Reject/' + id, 
			function (data, status, headers, config) {
	           notySuccess('rejected the ad!');
	           $route.reload(); 
	        },
	        function (error, status, headers, config) {
	            notyError()
	        });
	}

	$scope.deleteRedirect = function(id){
		idService.setId(id);
		$location.path('/admin/ads/delete');
	}

	$scope.editRedirect = function(id){
		idService.setId(id);
		$location.path('/admin/ads/edit');
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