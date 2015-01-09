app.controller('PublishAdController', function FormController($scope, $http, $rootScope, $route, adsData, idService) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

	$scope.ad={
		'title':'',
		'text':'',
		'imageDataUrl':'',
		'townId':'',
		'categoryId':''
	}; 
	  /* Function for live prereview of image */
  var fileInput = document.getElementById('fileInput');
  var fileDisplayArea = document.getElementById('fileDisplayArea');


  fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var imageType = /image.*/;
    if (file.type.match(imageType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        fileDisplayArea.innerHTML = "";

        var img = new Image();
        img.src = reader.result;
        img.className = "img-thumbnail";
        fileDisplayArea.appendChild(img);

        /*Set's the choosen image to the ad object*/
        $scope.changedImg = img.src;

      }

      reader.readAsDataURL(file); 
    } else {
      fileDisplayArea.innerHTML = "File not supported!";
    }

  });
  $scope.adNewAd=function(ad){
    $scope.ad['imageDataUrl'] =$scope.changedImg;
    var newAd = JSON.stringify(ad);
   
      adsData.createData('http://softuni-ads.azurewebsites.net/api/user/ads', newAd,
          function (data, status, headers, config) {
              notySuccess('published a new ad!')
              $route.reload();
          },
          function (error, status, headers, config) {
            notyError('There is a problem with publishing the ad!')
          }
  )}

  $scope.deleteImg = function(passedId,ad){
    $scope.ad['changeimage'] = true;
    $scope.ad['imageDataUrl'] ='';
    adsData.editData( 'http://softuni-ads.azurewebsites.net/api/user/ads/' + passedId ,ad,
                function (data, status, headers, config) {
                   notySuccess('deleted image');
                    $route.reload();
                 },
                function (error, status, headers, config) {
                  notyError('There was a problem with editing the ad!');
              });
  }

  $scope.changeImg = function(passedId,ad){
   $scope.ad['changeimage'] =true;
   $scope.ad['imageDataUrl'] =$scope.changedImg;
   adsData.editData('http://softuni-ads.azurewebsites.net/api/user/ads/' + passedId, ad,
                function (data, status, headers, config) {
                  notySuccess('changed the image!');
                  $route.reload();
                 },
                function (error, status, headers, config) {
                  notyError('There was a problem with editing the ad!');
              });
  }
     $scope.reset = function () {
	    return $scope.ad = {
	 		'title':'',
			'text':'',
			'imageDataUrl':'',
			'townId':'',
			'categoryId':''
	    };
	};

  function notyError(error){
     noty({
           text: error,
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
  