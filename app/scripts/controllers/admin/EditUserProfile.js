app.controller('EditUserController', function ($scope, $http, adsData, $route, $rootScope, $location, idService) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;
    $scope.user = idService.getObj();

    $scope.editProfile = function (data) {
        var dataPassed = JSON.stringify(data);
        adsData.editData('http://softuni-ads.azurewebsites.net/api/admin/user/' + data.username, dataPassed,
            function (data, status, headers, config) {
                notySuccess('edited the user profile.');
            },
            function (error, status, headers, config) {
                notyError();
            });
    };


    $scope.changePassword = function (data) {
        var dataPassed = JSON.stringify(data);
        adsData.editData('http://softuni-ads.azurewebsites.net/api/admin/SetPassword', dataPassed,
            function (data, status, headers, config) {
                notySuccess('edited the user password.');
            },
            function (error, status, headers, config) {
                notyError();
            });
    };

    $scope.reset = function (data) {
        return data = {};
    };

    function notyError() {
        noty({
            text: 'Something went wrong, with the edit, please try again!',
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'error',
            timeout: 2000
        });
    }

    function notySuccess(message) {
        noty({
            text: 'Well done, you have successfully ' + message,
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'success',
            timeout: 2000
        });
    }
});