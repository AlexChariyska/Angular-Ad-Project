app.controller('DeleteAdController', function ($scope, adsData, $rootScope, $http, $route,$location,idService) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    var id = idService.getId();
    adsData.getAd(  id,
          function (data, status, headers, config) {
                $scope.ad=data;
                console.log($scope.ad);
        },
        function (error, status, headers, config) {
            notyError();
        });

    $scope.delete = function (passedId) {
        adsData.deleteAd( passedId ,
            function (data, status, headers, config) {
            	notySuccess('deleted your ad!');
               $location.path('/user/ads');
        },
        function (error, status, headers, config) {
            notyError();
        });
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

    function notySuccess(mesage){
         noty({
               text: 'well done! You have successfully ' + mesage + '!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'success',
               timeout:2000
            });
        };

});