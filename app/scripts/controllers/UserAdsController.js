app.controller('UserAdsController', function FormController($scope, adsData, $rootScope, $http, $route) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    adsData.getUserAds(
        function (data, status, headers, config) {
            $scope.ads = data.ads;
            $scope.filteredUserAds = [],
                $scope.currentPage = 1,
                $scope.numPerPage = 4,
                $scope.maxSize = 5,
                $scope.bigTotalItems = data.numItems;

            $scope.numPages = function () {
                return Math.ceil($scope.ads.length / $scope.numPerPage);
            };

            $scope.$watch('currentPage + numPerPage', function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

                $scope.filteredUserAds = $scope.ads.slice(begin, end);

            });
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });


    $scope.deactivate = function (id) {
        adsData.deactivateAd( id ,
            function (data, status, headers, config) {  
            debugger;  
            $scope.success= true;
            $scope.message="deactivated";
            $route.reload();
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });
    };

    $scope.delete = function (id) {
        adsData.deleteAd( id ,
            function (data, status, headers, config) {
                $scope.success= true;
                $scope.message="deleted";
                $route.reload();
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });
    };

       $scope.publishAgain = function (id) {
        adsData.publishAgain( id ,
            function (data, status, headers, config) {
                $scope.success= true;
                $scope.message="deleted";
                $route.reload();
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });
    };
});