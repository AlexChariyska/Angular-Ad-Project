app.controller('DeleteAdController', function FormController($scope, adsData, $rootScope, $http, $route,$location,idService) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    var id = idService.getId();
    adsData.getAd(  id,
            function (data, status, headers, config) {
                $scope.ad=data;
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });


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


});