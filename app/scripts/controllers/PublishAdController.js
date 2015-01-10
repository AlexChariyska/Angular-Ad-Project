app.controller('PublishAdController', function FormController($scope, $http, $rootScope, $route, adsData, idService, imagePreview) {
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    $scope.ad = {
        'title': '',
        'text': '',
        'imageDataUrl': '',
        'townId': '',
        'categoryId': ''
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

    imagePreview.imgPreview($scope);

    $scope.adNewAd = function (ad) {
        $scope.ad['imageDataUrl'] = $scope.changedImg;
        var newAd = JSON.stringify(ad);

        adsData.createData('http://softuni-ads.azurewebsites.net/api/user/ads', newAd,
            function (data, status, headers, config) {
                notySuccess('published a new ad!')
                $route.reload();
            },
            function (error, status, headers, config) {
                notyError('There is a problem with publishing the ad!')
            }
        )
    };

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
    }

    function notySuccess(message) {
        noty({
            text: 'Well done! You have successfully ' + message + '!',
            layout: 'topCenter',
            closeWith: ['click', 'hover'],
            type: 'success',
            timeout: 2000
        });
    }

});
  