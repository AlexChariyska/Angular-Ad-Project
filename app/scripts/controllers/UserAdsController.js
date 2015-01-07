app.controller('UserAdsController', function ($scope, adsData, $rootScope, $http, $route,$location,idService) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

getAds();
function getAds(){
    adsData.getUserAds(
        function (data, status, headers, config) {
            $scope.ads = data.ads;
            $scope.filteredUserAds = [],
                $scope.currentPage = 1,
                $scope.numPerPage = 4,
                $scope.maxSize = 5,
                $scope.bigTotalItems = data.numItems;

            $scope.numPages = function () {
                return Math.ceil($scope.ads.length / $scope.numPerPage);
            };

            $scope.$watch('currentPage + numPerPage', function () {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                    , end = begin + $scope.numPerPage;

                $scope.filteredUserAds = $scope.ads.slice(begin, end);

            });
        },
        function (error, status, headers, config) {
            notyError();
        });
}





$scope.setStatus = function(status){
    var param='Status=' + status;
    adsData.getUserAdsWithParams(param,
        function (data, status, headers, config) {
            console.log(data);
                $scope.ads = data.ads;
                $scope.filteredUserAds = [],
                    $scope.currentPage = 1,
                    $scope.numPerPage = 4,
                    $scope.maxSize = 5,
                    $scope.bigTotalItems = data.numItems;

                $scope.numPages = function () {
                    return Math.ceil($scope.ads.length / $scope.numPerPage);
                };

                $scope.$watch('currentPage + numPerPage', function () {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;

                });
                notySuccess('doing sth');
                     $scope.filteredUserAds.reload();
            },
            function (error, status, headers, config) {
                notyError();
            });
}

$scope.clearFilter = function(){
    $route.reload();
}


    $scope.deactivate = function (id) {
        adsData.deactivateAd( id ,
            function (data, status, headers, config) {  
            notySuccess('deactivated your ad');
            $route.reload();
        },
        function (error, status, headers, config) {
            notyError();
        });
    };

    $scope.redirectToDelete = function (id) {
        idService.setId(id);
        $location.path('/user/ads/delete');
    };

   $scope.redirectToEdit = function (id) {
        idService.setId(id);
        $location.path('/user/ads/edit');
    };

   $scope.publishAgain = function (id) {
        adsData.publishAgain( id ,
            function (data, status, headers, config) {
                notySuccess('published again your ad');
                $route.reload();
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
               text: 'Well done! You have successfully ' + mesage + '!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'success',
               timeout:2000
            });
        };
});