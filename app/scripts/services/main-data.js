app.factory('adsData', function adsData($resource, $http, $rootScope) {
    $rootScope.loggedUser = {};
    $http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

    function makeRequest(method, url, headers, data, success, error) {
        $http({
            method: method,
            url: url,
            headers: headers,
            data: data
        })
            .success(function (data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function (data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    function getAllAds(success, error) {
        return makeRequest("GET", 'http://softuni-ads.azurewebsites.net/api/ads', $http.defaults.headers, {}, success, error);
    };

    function getUserAds(success, error) {
        return makeRequest("GET", 'http://softuni-ads.azurewebsites.net/api/user/ads', $http.defaults.headers, {}, success, error);
    };

    function getAd(id, success, error) {
        return makeRequest("GET", 'http://softuni-ads.azurewebsites.net/api/user/ads/'+ id, $http.defaults.headers, {}, success, error);
    };

    function publishAd(data, success, error) {
        return makeRequest("POST", 'http://softuni-ads.azurewebsites.net/api/user/ads', $http.defaults.headers, data, success, error);
    };

    function deactivateAd(id, success, error) {
        return makeRequest("PUT", 'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/'+ id, $http.defaults.headers, {}, success, error);
    };

    function deleteAd(id, success, error) {
        return makeRequest("DELETE", 'http://softuni-ads.azurewebsites.net/api/user/ads/'+ id, $http.defaults.headers, {}, success, error);
    };

     function publishAgain(id, success, error) {
        return makeRequest("PUT", 'http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/'+ id, $http.defaults.headers, {}, success, error);
    };

    function getAllTown(success, error) {
        return makeRequest("GET", 'http://softuni-ads.azurewebsites.net/Api/Towns', $http.defaults.headers, {}, success, error);
    };
    function getAllCategories(success, error) {
        return makeRequest("GET", 'http://softuni-ads.azurewebsites.net/api/categories', $http.defaults.headers, {}, success, error);
    };

    function login(data, success, error) {
        return makeRequest("POST", 'http://softuni-ads.azurewebsites.net/api/user/login', $http.defaults.headers, data, success, error);
    };

    function register(data, success, error) {
        return makeRequest("POST", 'http://softuni-ads.azurewebsites.net/api/user/register', {}, data, success, error);
    };
    return {
        getAllAds: getAllAds,
        publishAd:publishAd,
        getAllTown: getAllTown,
        getAllCategories: getAllCategories,
        login: login,
        register: register,
        getUserAds: getUserAds,
        deactivateAd:deactivateAd,
        deleteAd:deleteAd,
        publishAgain:publishAgain,
        getAd:getAd
    }
})


app.service('idService', function() {
  var idSaved;

  var setId = function(id) {
      idSaved=id;
  }

  var getId = function(){
      return idSaved;
  }

  return {
    setId: setId,
    getId: getId
  };

});