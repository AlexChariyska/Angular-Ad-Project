app.controller('UsersController', function UsersController($scope, $http, adsData, $route, $rootScope, $location, idService) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;
	$scope.ads = [];
    $scope.totalAds = 0;
    $scope.numPages=0;
    $scope.itemsPerPage = 20; 
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

function users(pageNumber){
	adsData.getData('http://softuni-ads.azurewebsites.net/api/admin/Users?StartPage=' + pageNumber +'&pageSize='+ $scope.itemsPerPage,
		function (data, status, headers, config) {
		              $scope.users = data.users;
		              $scope.totalItems = data.numItems;
			          $scope.numPages= data.numPages;
			          $scope.list = [];

			          for (var i=1;i<=$scope.numPages;i++){
			                $scope.list.push(i);
			            }

		        },
		        function (error, status, headers, config) {
		            notyError();
		        });
}
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
       users(pageNumber);
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