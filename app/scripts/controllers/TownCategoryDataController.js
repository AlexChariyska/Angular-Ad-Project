app.controller('TownCategoryDataController', function ($scope, adsData,idService, $location) {
    adsData.getData('http://softuni-ads.azurewebsites.net/Api/Towns',
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });

    adsData.getData('http://softuni-ads.azurewebsites.net/Api/Categories',
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });
    $scope.predicate = 'id';

    $scope.redirectTo =function(place, data){
       switch(place) {
            case "category":
                idService.setObj(data);
                $location.path('/admin/categories/delete');
                break;
            case "town":
                idService.setObj(data);
                $location.path('/admin/towns/delete');
                break;
            case "createTown":
                $location.path('/admin/towns/create');
                break;
            case "createCategory":
                $location.path('/admin/categories/create');
                break;
            case "editTown":
                idService.setObj(data);
                $location.path('/admin/towns/edit');
                break;
            case "editCategory":
                idService.setObj(data);
                $location.path('/admin/categories/edit');
                break;
            }
    }
    
    $scope.cancel = function(place){
        switch(place) {
            case "category":
                $location.path('/admin/categories/list');
                break;
            case "town":
                $location.path('/admin/towns/list');
                break;
            }
    }
});