app.controller('DeleteEditController', function DeleteEditController($scope, $http, adsData, idService, imagePreview, $route, $rootScope, $location) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    var id = idService.getId();
    adsData.getData('http://softuni-ads.azurewebsites.net/api/admin/ads/' + id,
        function (data, status, headers, config) {
            $scope.ad = data;
            $scope.ad['date'] = data.date.slice(0, 10);
        },
        function (error, status, headers, config) {
            notyError();
        });

    $scope.delete = function (passedId) {
        adsData.deleteData('http://softuni-ads.azurewebsites.net/api/admin/Ads/' + passedId,
            function (data, status, headers, config) {
                notySuccess('deleted the ad!');
                $location.path('/admin/home');
            },
            function (error, status, headers, config) {
                notyError();
            });
    };

    $scope.edit = function (data) {
        var dataPassed = JSON.stringify(data);
        adsData.editData('http://softuni-ads.azurewebsites.net/api/admin/Ads/' + data.id, dataPassed,
            function (data, status, headers, config) {
                notySuccess('edited the ad.');
                $location.path('/admin/home');
            },
            function (error, status, headers, config) {
                notyError();
            });
    }

    imagePreview.imgPreview($scope);

    $scope.reset = function (data) {
        return data = {};
    }

    $scope.cancel = function () {
        $location.path('/admin/home');
    }

    function notyError() {
        noty({
            text: 'Something went wrong, try again!',
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'error',
            timeout: 2000
        });
    };

    function notySuccess(message) {
        noty({
            text: 'Well done, you have successfully ' + message,
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'success',
            timeout: 2000
        });
    };
});