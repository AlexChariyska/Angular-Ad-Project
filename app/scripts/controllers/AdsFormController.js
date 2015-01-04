app.controller('AdsFormController', function FormController($scope, adsData, $rootScope, $http, $route,$location,idService) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    var id = idService.getId();
    adsData.getAd(  id,
            function (data, status, headers, config) {
                $scope.ad=data;
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });

debugger;
console.log($scope.ad);
    $scope.delete = function (passedId) {
        adsData.deleteAd( passedId ,
            function (data, status, headers, config) {
            	alert("yes");
                $route.reload();
        },
        function (error, status, headers, config) {
            console.log(status, error);
            alert("no");
        });
    };


	$scope.edit= function(passedId){
		adsData.publishAgain( passedId ,
	            function (data, status, headers, config) {
	                $route.reload();
	        },
	        function (error, status, headers, config) {
	            console.log(status, error);
	        });
	};

	$scope.cancel = function(){
        $location.path('/user/ads');
	};

	$scope.deleteImg=function(){
		
	}

});