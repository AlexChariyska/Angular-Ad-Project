app.controller('PublishAdController', function FormController($scope, adsData,$http, $rootScope) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;
	$scope.ad={
		'title':'',
		'text':'',
		'imageDataUrl':'',
		'townId':'',
		'categoryId':''
	};
	$scope.adNewAd=function(ad){
	var newAd = JSON.stringify(ad);
 
    adsData.publishAd(newAd,
        function (data, status, headers, config) {
            noty({
               text: 'Successfully added a new ad!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'success',
               timeout:3000
            });
        },
        function (error, status, headers, config) {
            noty({
               text: 'Invalid action. Change a few things up and try submitting again!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'error',
               timeout:2000
            });
        }
	)}

    $scope.reset = function () {
	    return $scope.ad = {
	 		'title':'',
			'text':'',
			'imageDataUrl':'',
			'townId':'',
			'categoryId':''
	    };
	};
});

