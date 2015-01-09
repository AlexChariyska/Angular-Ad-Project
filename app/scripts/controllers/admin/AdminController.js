app.controller('AdminController', function AdminController($scope, $http, adsData ,idService, $route, $rootScope, $location) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;
	$scope.ads = [];
    $scope.totalAds = 0;
    $scope.numPages=0;
    $scope.itemsPerPage = 10; 
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

function ads(pageNumber){
	adsData.getData('http://softuni-ads.azurewebsites.net/api/admin/ads?StartPage=' + pageNumber +'&pageSize='+ $scope.itemsPerPage,
	        function (data, status, headers, config) {
	            $scope.ads = data.ads;
	            $scope.totalItems = data.numItems;
	     	    $scope.numPages= data.numPages;
		        $scope.list = [];

		        for (var i=1;i<=$scope.numPages;i++){
		                $scope.list.push(i);
		           }


	        },
	        function (error, status, headers, config) {
	            notyError("loading ads");
	        }
	    );
}

    //Paging
  $scope.pageChanged = function(newPage) {
        $scope.selectedPage = newPage;
        $scope.currentPage=newPage;
        getResultsPage(newPage);
    };

    $scope.pageDecrease = function() {
        $scope.currentPage-=1;
        getResultsPage($scope.currentPage);
    };
    
    $scope.pageIncrease = function() {
        $scope.currentPage+=1;
        getResultsPage($scope.currentPage);
    };

    $scope.selected = 0;

    $scope.select= function(index) {
       $scope.selected = index; 
    };

    function getResultsPage(pageNumber) {
       ads(pageNumber);
    }


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