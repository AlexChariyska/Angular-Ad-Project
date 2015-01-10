app.controller('AdsController', function AdsController($scope, $http, adsData, $route, $location) {
    $scope.ads = [];
    $scope.totalAds = 0;
    $scope.numPages = 0;
    $scope.itemsPerPage = 10;
    getResultsPage(1);

    $scope.pagination = {
        current: 1
    };


    function ads(url) {
        adsData.getData(url,
            function (data, status, headers, config) {
                $scope.ads = data.ads;
                $scope.totalItems = data.numItems;
                $scope.numPages = data.numPages;
                $scope.list = [];
                for (var i = 1; i <= $scope.numPages; i++) {
                    $scope.list.push(i);
                }
            },
            function (error, status, headers, config) {
                noty({
                    text: 'Thre was a problem with loading the data!',
                    layout: 'topCenter',
                    closeWith: ['click', 'hover'],
                    type: 'error',
                    timeout: 2000
                });
            });
    }

    $scope.pageChanged = function (newPage) {
        $scope.selectedPage = newPage;
        $scope.currentPage = newPage;
        getResultsPage(newPage);
    };

    $scope.pageDecrease = function () {
        $scope.currentPage -= 1;
        getResultsPage($scope.currentPage);
    };

    $scope.pageIncrease = function () {
        $scope.currentPage += 1;
        getResultsPage($scope.currentPage);
    };

    $scope.selected = 0;

    $scope.select = function (index) {
        $scope.selected = index;
    };

    function getResultsPage(pageNumber) {
        if (sessionStorage.getItem('category') != null && sessionStorage.getItem('town') != null) {
            ads('http://softuni-ads.azurewebsites.net/api/Ads?StartPage=' + pageNumber + '&pageSize=' + $scope.itemsPerPage
                + '&TownId=' + sessionStorage.getItem('town')
                + '&CategoryId=' + sessionStorage.getItem('category'));
        } else if (sessionStorage.getItem('town') == null && sessionStorage.getItem('category') != null) {
            ads('http://softuni-ads.azurewebsites.net/api/Ads?StartPage=' + pageNumber + '&pageSize=' + $scope.itemsPerPage
                + '&CategoryId=' + sessionStorage.getItem('category'));
        } else if (sessionStorage.getItem('category') == null && sessionStorage.getItem('town') != null) {
            ads('http://softuni-ads.azurewebsites.net/api/Ads?StartPage=' + pageNumber + '&pageSize=' + $scope.itemsPerPage
                + '&TownId=' + sessionStorage.getItem('town'));
        } else {
            ads('http://softuni-ads.azurewebsites.net/api/Ads?StartPage=' + pageNumber + '&pageSize=' + $scope.itemsPerPage);
        }
    }
})