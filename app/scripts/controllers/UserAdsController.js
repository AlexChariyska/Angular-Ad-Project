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


function getAds(url){
        adsData.getData(url,
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

    $scope.selected = 0;

    $scope.select= function(index) {
       $scope.selected = index; 
    };

function getResultsPage(pageNumber) {

    if(sessionStorage.getItem('status') ==null){
        getAds('http://softuni-ads.azurewebsites.net/api/user/ads?StartPage=' + pageNumber +'&pageSize='+ $scope.itemsPerPage);
    }else{
        var status= sessionStorage.getItem('status');
        getAds('http://softuni-ads.azurewebsites.net/api/user/ads?StartPage=' + pageNumber +'&pageSize='+ $scope.itemsPerPage+'&status='+ status);
    }
}

$scope.setStatus = function(input){
    sessionStorage.setItem('status',input);
    $route.reload();
}

$scope.clearFilter = function(){
    sessionStorage.clear();
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