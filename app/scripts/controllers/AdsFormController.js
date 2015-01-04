app.controller('AdsFormController', function ($scope, adsData, $rootScope, $http, $route,$location,idService) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    var id = idService.getId();
    adsData.getAd(  id,
            function (data, status, headers, config) {
                $scope.ad=data;
        },
        function (error, status, headers, config) {
            notyError();
        });


    $scope.delete = function (passedId) {
        adsData.deleteAd( passedId ,
            function (data, status, headers, config) {
            	notySuccess('deleted');
                $route.reload();
        },
        function (error, status, headers, config) {
            notyError();
        });
    };


	$scope.edit= function(passedId){
		adsData.publishAgain( passedId ,
	            function (data, status, headers, config) {
                    notySuccess('published again');
	                $route.reload();
	        },
	        function (error, status, headers, config) {
	            notyError();
	        });
	};

	$scope.cancel = function(){
        $location.path('/user/ads');
	};

	$scope.deleteImg=function(){
		
	};



    function notyError(){
         noty({
               text: 'Invalid action. Change a few things up and try submitting again!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'error',
               timeout:2000
            });
        };


    function notySuccess(mesage){
         noty({
               text: 'well done! You have successfully ' + mesage + '!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'success',
               timeout:2000
            });
        };

});