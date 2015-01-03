app.controller('AdsController', function AdsController($scope, $http, adsData, $route, $location) {

    $scope.selectTown = function (id) {
        $scope.town = {townId: id};
    };

    $scope.selectCategory = function (id, item) {
        $scope.category = {categoryId: id};
        $scope.selected = item;
    };

    $scope.isActive = function (item) {
        return $scope.selected === item;
    };

    adsData.getAllAds(
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

    adsData.getAllTown(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });

    adsData.getAllCategories(
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });

    $scope.reload = function () {
        $route.reload();
    }

    $scope.logout = function () {
        $rootScope.loggedUser = {};
        $location.path('/');
    }
})