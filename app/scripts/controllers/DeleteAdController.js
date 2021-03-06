app.controller('DeleteAdController', function ($scope, adsData, $rootScope, $http, $route, $location, idService) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    var id = idService.getId();
    adsData.getData('http://softuni-ads.azurewebsites.net/api/user/ads/' + id,
        function (data, status, headers, config) {
            $scope.ad = data;
        },
        function (error, status, headers, config) {
            notyError();
        });

    $scope.delete = function (passedId) {
        adsData.deleteData('http://softuni-ads.azurewebsites.net/api/user/ads/' + passedId,
            function (data, status, headers, config) {
                notySuccess('deleted your ad');
                $location.path('/user/ads');
            },
            function (error, status, headers, config) {
                notyError();
            });
    };

    $scope.cancel = function () {
        $location.path('/user/ads');
    };

    function notyError() {
        noty({
            text: 'Invalid action. Change a few things up and try submitting again!',
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'error',
            timeout: 2000
        });
    };

    function notySuccess(mesage) {
        noty({
            text: 'well done! You have successfully ' + mesage + '!',
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'success',
            timeout: 2000
        });
    };

});