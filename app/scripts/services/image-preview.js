app.service('imagePreview', ['$rootScope', function ($rootScope) {
    function imgPreview($scope) {

        var fileInput = document.getElementById('fileInput');
        var fileDisplayArea = document.getElementById('fileDisplayArea');


        fileInput.addEventListener('change', function (e) {
            var file = fileInput.files[0];
            var imageType = /image.*/;
            if (file.type.match(imageType)) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    fileDisplayArea.innerHTML = "";

                    var img = new Image();
                    img.src = reader.result;
                    img.className = "img-thumbnail";
                    fileDisplayArea.appendChild(img);

                    /*Set's the choosen image to the ad object*/
                    $scope.changedImg = img.src;

                };

                reader.readAsDataURL(file);
            } else {
                fileDisplayArea.innerHTML = "File not supported!";
            }

        });
    }

    return {
        imgPreview: imgPreview
    }

}]);
