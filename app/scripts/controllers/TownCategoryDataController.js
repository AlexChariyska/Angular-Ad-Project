app.controller('TownCategoryDataController', function ($scope, adsData) {
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
    $scope.predicate = 'id';
});