app.controller('UserAdsController', function FormController($scope, adsData, $rootScope, $http) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    adsData.getUserAds(
        function (data, status, headers, config) {
            $scope.ads = data.ads;
            $scope.filteredAds = [],
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

                $scope.filteredAds = $scope.ads.slice(begin, end);

            });
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });

    $scope.deactivate = function (id) {
        adsData.deactivateAd( id ,
            function (data, status, headers, config) {
                alert("yes"); //toDo
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });
    }
});