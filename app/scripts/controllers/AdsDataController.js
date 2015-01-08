app.controller('AdsController', function AdsController($scope, $http, adsData, $route, $location) {
    $scope.ads = [];
    $scope.totalAds = 0;
    $scope.numPages=0;
    var pageSize=10;
    $scope.itemsPerPage = 10; 
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };

    $scope.selectTown = function (id,item) {
        $scope.town = {townId: id};
    };

    $scope.selectCategory = function (id, item) {
        $scope.category = {categoryId: id};
        $scope.selected = item;
    };

    $scope.isActive = function (item) {
        return $scope.selected === item;
    };

function Ads(pageNumber){
    adsData.getData('http://softuni-ads.azurewebsites.net/api/Ads?StartPage=' + pageNumber +'&pageSize='+ $scope.itemsPerPage,
        function (data, status, headers, config) {
            $scope.users = data.ads;
            $scope.totalItems = data.numItems;
            $scope.numPages= data.numPages;
            $scope.list = [];
            for (var i=1;i<=$scope.numPages;i++){
                $scope.list.push(i);
            }
        },
        function (error, status, headers, config) {
            console.log(status, error);
        });
}
    $scope.pageChanged = function(newPage) {
        $scope.selectedPage = newPage;
        $scope.currentPage=newPage;
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
       Ads(pageNumber);
}
})