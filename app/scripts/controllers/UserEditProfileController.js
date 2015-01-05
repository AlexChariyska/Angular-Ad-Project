app.controller('UserEditProfileController', function FormController($scope, adsData,$http, $rootScope) {
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;
  
adsData.getUserProfile(
        function (data, status, headers, config) {
          $scope.user=data;
        },
        function (error, status, headers, config) {
          notyError();
        }
  );


  $scope.update = function(userUpdated){
      var updated = JSON.stringify(userUpdated);
      adsData.editProfile(updated,
            function (data, status, headers, config) {
                noty({
                   text: 'Well done, you successfully changed your profile!',
                   layout: 'topCenter',
                   closeWith: ['click', 'hover'],
                   type: 'success',
                   timeout:2000
              });
            },
            function (error, status, headers, config) {
              notyError();
            }
      );
  }

  function notyError(){
       noty({
           text: 'An error occurred!',
           layout: 'topCenter',
           closeWith: ['click', 'hover'],
           type: 'error',
           timeout:2000
        });
      }
});
