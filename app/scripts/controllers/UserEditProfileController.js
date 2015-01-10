app.controller('UserEditProfileController', function FormController($scope, adsData, $http, $rootScope) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    adsData.getData('http://softuni-ads.azurewebsites.net/api/user/profile',
        function (data, status, headers, config) {
            $scope.user = data;
        },
        function (error, status, headers, config) {
            notyError();
        }
    );


    $scope.update = function (userUpdated) {
        var updated = JSON.stringify(userUpdated);
        debugger;
        adsData.editData('http://softuni-ads.azurewebsites.net/api/user/profile', updated,
            function (data, status, headers, config) {
                notySuccess("changed your profile ")
            },
            function (error, status, headers, config) {
                notyError();
            }
        );
    };

    $scope.changePassword = function (pass) {
        var passNew = JSON.stringify(pass);
        adsData.editData('http://softuni-ads.azurewebsites.net/api/user/changePassword', passNew,
            function (error, status, headers, config) {
                notySuccess("changed your password ");
            },
            function (error, status, headers, config) {
                notyError();
            }
        );
    };

    $scope.reset = function (data) {
        return data = {};
    };

    function notyError() {
        noty({
            text: 'An error occurred!',
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'error',
            timeout: 2000
        });
    }

    function notySuccess(message) {
        noty({
            text: 'Well done, you successfully ' + message + '!',
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'success',
            timeout: 2000
        });
    }

});
