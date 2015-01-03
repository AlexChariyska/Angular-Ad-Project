app.controller('FormController', function FormController($scope, adsData, $resource, $http, $location, $timeout, $rootScope) {


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

    $scope.logout = function () {
        $rootScope.loggedUser = {};
        $timeout(function () {
            $location.path('/');
        }, 2000);

    }

// Alert messages
    $scope.error = function (value) {
        return false;
    };
    $scope.success = function (value) {
        return false;
    };

    $scope.login = function (ad) {
        adsData.login(ad,
            function (data, status, headers, config) {
                sessionStorage.setItem('accessToken', 'Bearer ' + data['access_token']);
                $scope.success = function (value) {
                    return true;
                };
                $rootScope.loggedUser = {
                    'username': data.username,
                    'accessToken': 'Bearer ' + data['access_token']
                }
                $timeout(function () {
                    $location.path('/user/home');
                }, 2000);

            },
            function (error, status, headers, config) {
                $scope.error = function (value) {
                    return true;
                };
                alert("no");
            });
    };

    $scope.register = function (credentials) {
        var newObj = JSON.stringify(credentials);
        adsData.register(newObj,
            function (data, status, headers, config) {
                console.log(data);
            },
            function (error, status, headers, config) {
                alert("no");
            });
    };

    $scope.reset = function () {
        return $scope.credentials = {"username": "",
            "password": "",
            "confirmPassword": "",
            "name": "",
            "email": "",
            "phone": "",
            "townId": ""};
    };
});