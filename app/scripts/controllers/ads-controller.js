app.controller('AdsController',function AdsController($scope, adsData){
    adsData.getAllAds(
        function (data, status, headers, config) {
            $scope.ads = data;
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
})