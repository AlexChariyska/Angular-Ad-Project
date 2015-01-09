app.controller('UserAdsController', function ($scope, adsData, $rootScope, $http, $route,$location,idService) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    $scope.ads = [];
    $scope.totalAds = 0;
    $scope.numPages=0;
    $scope.itemsPerPage = 10;
    getResultsPage(1,status);

    $scope.pagination = {
        current: 1
    };


function getAds(pageNumber,status){
    if(status === undefined){
        adsData.getData('http://softuni-ads.azurewebsites.net/api/user/ads?StartPage=' + pageNumber +'&pageSize='+ $scope.itemsPerPage,
            function (data, status, headers, config) {
                $scope.ads = data.ads;
                $scope.totalItems = data.numItems;
                $scope.numPages= data.numPages;
                $scope.list = [];

                for (var i=1;i<=$scope.numPages;i++){
                    $scope.list.push(i);
                }
            },
            function (error, status, headers, config) {
                notyError();
            });
        }else {
              adsData.getData('http://softuni-ads.azurewebsites.net/api/user/ads?StartPage=' + pageNumber +'&pageSize='+ $scope.itemsPerPage+'&status='+ status,
            function (data, status, headers, config) {
                console.log(data);
                $scope.ads = data.ads;
                $scope.totalItems = data.numItems;
                $scope.numPages= data.numPages;
                $scope.list = [];

                for (var i=1;i<=$scope.numPages;i++){
                    $scope.list.push(i);
                }
            },
            function (error, status, headers, config) {
                notyError();
            });
        }
}

$scope.pageChanged = function(newPage) {
    $scope.selectedPage = newPage;
    $scope.currentPage = newPage;
    getResultsPage(newPage);
};

$scope.pageDecrease = function() {
    $scope.currentPage-=1;
    getResultsPage($scope.currentPage);
};

$scope.pageIncrease = function() {
    $scope.currentPage+=1;
    getResultsPage($scope.currentPage);
};

$scope.selectedIndex = 0;

$scope.isActivePage = function (item) {
    return $scope.selectedPage === item;
};

function getResultsPage(pageNumber) {
   getAds(pageNumber);
}

/*$scope.setStatus = function(status){
     $scope.status = status;  
}*/

$scope.clearFilter = function(){
    $route.reload();
}


    $scope.deactivate = function (id) {
        adsData.deactivate( 'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/' + id ,
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
        adsData.deactivate( 'http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/' + id ,
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