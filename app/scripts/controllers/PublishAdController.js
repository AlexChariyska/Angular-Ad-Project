app.controller('PublishAdController', function FormController($scope, adsData,$http, $rootScope) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;
	$scope.ad={
		'title':'',
		'text':'',
		'imageDataUrl':'',
		'townId':'',
		'categoryId':''
	};
	$scope.adNewAd=function(ad){
	var newAd = JSON.stringify(ad);
 
    adsData.publishAd(newAd,
        function (data, status, headers, config) {
            noty({
               text: 'Successfully added a new ad!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'success',
               timeout:3000
            });
        },
        function (error, status, headers, config) {
            noty({
               text: 'Invalid action. Change a few things up and try submitting again!',
               layout: 'topCenter',
               closeWith: ['click', 'hover'],
               type: 'error',
               timeout:2000
            });
        }
	)}


// Function for live prereview of image
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
        }

        reader.readAsDataURL(file); 
      } else {
        fileDisplayArea.innerHTML = "File not supported!";
      }
    });



    $scope.reset = function () {
	    return $scope.ad = {
	 		'title':'',
			'text':'',
			'imageDataUrl':'',
			'townId':'',
			'categoryId':''
	    };
	};
});

