app.controller('FormController', function FormController($scope, adsData, $resource, $http, $location, $timeout, $rootScope) {
   
    $scope.logout = function () {
          noty({
               text: 'Well done! You have successfully loged out. You will be redirected to the home page.',
               layout: 'top',
               closeWith: ['click', 'hover'],
               type: 'information',
               timeout:2000
            });
         $rootScope.loggedUser = {};
              $timeout(function () {
                  $location.path('/');
              }, 2000);
    }

    $scope.login = function (ad) {
        adsData.login(ad,
            function (data, status, headers, config) {

                noty({
                       text: 'Well done! You have successfully loged in. You will be redirected to the home page.',
                       layout: 'top',
                       closeWith: ['click', 'hover'],
                       type: 'success',
                       timeout:2000
                    });
              
                $rootScope.loggedUser = {
                    'username': data.username,
                    'accessToken': 'Bearer ' + data['access_token']
                }

                if(data.isAdmin){
                  $rootScope.loggedUser['isAdmin'] = true;
                  $timeout(function () {
                      $location.path('/admin/home');
                  }, 2000); 
                }else {
                  $timeout(function () {
                      $location.path('/user/home');
                  }, 2000);
              }

            },
            function (error, status, headers, config) {
                notyError();
            });
    };

    $scope.register = function (credentials) {
        var newObj = JSON.stringify(credentials);
        var logInData={
            'username':credentials.username,
            'password':credentials.password
        }
        adsData.register(newObj,
            function (data, status, headers, config) {
                $scope.login(logInData);
            },
            function (error, status, headers, config) {
               notyError();
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

    function notyError(){
         noty({
               text: 'Invalid action. Change a few things up and try submitting again!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'error',
               timeout:2000
            });
        };
});