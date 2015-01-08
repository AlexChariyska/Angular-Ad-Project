app.controller('DeleteTownCategoryController', function ($scope,$route, adsData,idService, $location) {

$scope.obj = idService.getObj();


    $scope.delete = function(place, data){
        switch(place) {
            case "category":
                   adsData.deleteData('http://softuni-ads.azurewebsites.net/api/admin/categories/'+data.id,
                       function (data, status, headers, config) {
                             notySuccess('deleted the category.');
                        },
                        function (error, status, headers, config) {
                            notyError();
                        }); 
                $location.path('/admin/categories/list');
                $route.reload();
                break;
            case "town":
                adsData.deleteData('http://softuni-ads.azurewebsites.net/api/admin/towns/'+data.id,
                       function (data, status, headers, config) {
                            notySuccess('deleted the town.');
                        },
                        function (error, status, headers, config) {
                            notyError();
                        }); 
                $location.path('/admin/towns/list');
                $route.reload();
                break;
            }
    }

    $scope.create = function(place, data){
        var dataPassed= {name:data};
        switch(place) {
            case "category":
                   adsData.createData('http://softuni-ads.azurewebsites.net/api/admin/Categories', dataPassed,
                       function (data, status, headers, config) {
                             notySuccess('created the category.');
                        },
                        function (error, status, headers, config) {
                            notyError();
                        }); 
                $route.reload();
                $location.path('/admin/categories/list');
                break;
            case "town":
                adsData.createData('http://softuni-ads.azurewebsites.net/api/admin/towns', dataPassed,
                       function (data, status, headers, config) {
                            notySuccess('created the town.');
                        },
                        function (error, status, headers, config) {
                            notyError();
                        }); 
                $route.reload();
                $location.path('/admin/towns/list');
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

    function notyError(){
             noty({
                   text: 'Something went wrong, try again!',
                   layout: 'topCenter',
                   closeWith: ['click', 'hover'],
                   type: 'error',
                   timeout:2000
                });
        };

    function notySuccess(message){
         noty({
               text: 'Well done, you have successfully ' + message,
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'success',
               timeout:2000
            });
        };
});