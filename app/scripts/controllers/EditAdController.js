app.controller('EditAdController', function FormController($scope, $http, $rootScope, $route, adsData, idService, imagePreview) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    var id = idService.getId();

    adsData.getData('http://softuni-ads.azurewebsites.net/api/user/ads/' + id,
        function (data, status, headers, config) {
            $scope.ad = data;
        },
        function (error, status, headers, config) {
            notyError("There was a problem with loading the ad!");
        });


    imagePreview.imgPreview($scope);

    $scope.deleteImg = function (passedId, ad) {
        $scope.ad['changeimage'] = true;
        $scope.ad['imageDataUrl'] = '';
        editData(passedId, ad, 'deleted image', 'There was a problem with editing the ad!');
    };

    $scope.changeImg = function (passedId, ad) {
        $scope.ad['changeimage'] = true;
        $scope.ad['imageDataUrl'] = $scope.changedImg;
        editData(passedId, ad, 'changed the image', 'There was a problem with editing the ad!');
    };

    $scope.edit = function (passedId, ad) {
        editData(passedId, ad, 'edit your ad', 'There was a problem with editing the ad!');
    };

    function editData(passedId, ad, messageSuccess, messageError) {
        adsData.editData('http://softuni-ads.azurewebsites.net/api/user/ads/' + passedId, ad,
            function (data, status, headers, config) {
                notySuccess(messageSuccess);
                $route.reload();
            },
            function (error, status, headers, config) {
                notyError(messageError);
            });
    }

    $scope.reset = function () {
        return $scope.ad = {
            'title': '',
            'text': '',
            'imageDataUrl': '',
            'townId': '',
            'categoryId': ''
        };
    };

    function notyError(error) {
        noty({
            text: error,
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'error',
            timeout: 2000
        });
    };

    function notySuccess(mesage) {
        noty({
            text: 'Well done! You have successfully ' + mesage + '!',
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'success',
            timeout: 2000
        });
    };

});

