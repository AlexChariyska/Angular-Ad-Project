//All controllers

controllersApp.controller('ListAds',['$scope', '$http',
    function ($scope, $http) {
        $http.get('http://softuni-ads.azurewebsites.net/api/ads')
            .success(function (data) {
    		   $scope.ads = data;  
               debugger;
            });
        }
]);

controllersApp.controller('GetAllTown',['$scope', '$http',
    function ($scope, $http) {
        $http.get('http://softuni-ads.azurewebsites.net/Api/Towns')
            .success(function (data) {
    		   $scope.towns = data;  
            });
        }
]);

controllersApp.controller('GetAllCategories',['$scope', '$http',
    function ($scope, $http) {
        $http.get('http://softuni-ads.azurewebsites.net/api/categories')
            .success(function (data) {
    		   $scope.categories = data; 
            });
        }
]);