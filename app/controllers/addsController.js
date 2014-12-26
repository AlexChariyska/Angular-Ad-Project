//All controllers

controllersApp.controller('ListAds',['$scope', '$http',
    function ($scope, $http) {
        $http.get('http://softuni-ads.azurewebsites.net/api/ads')
            .success(function (data) {
    		   $scope.ads = data;  
            });
        }
]);