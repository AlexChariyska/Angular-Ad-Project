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


    function getUserAdsWithParams(params, success, error) {
        return makeRequest("GET", 'http://softuni-ads.azurewebsites.net/api/user/ads?' + params, $http.defaults.headers, {}, success, error);
    };

    function editUserAd(id, data, success, error) {
        return makeRequest("PUT", 'http://softuni-ads.azurewebsites.net/api/user/ads/' + id, $http.defaults.headers, data, success, error);
    };

    function editProfile(data, success, error) {
        return makeRequest("PUT", 'http://softuni-ads.azurewebsites.net/api/user/profile', $http.defaults.headers, data, success, error);
    };

    function changePassword(data, success, error) {
        return makeRequest("PUT", 'http://softuni-ads.azurewebsites.net/api/user/changePassword', $http.defaults.headers, data, success, error);
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

    function deleteAdAdmin(id, success, error) {
        return makeRequest("DELETE", 'http://softuni-ads.azurewebsites.net/api/admin/Ads/'+ id, $http.defaults.headers, {}, success, error);
    };

    function deleteUser(username, success, error) {
        return makeRequest("DELETE", 'http://softuni-ads.azurewebsites.net/api/admin/User/'+ username, $http.defaults.headers, {}, success, error);
    };

    function publishAgain(id, success, error) {
        return makeRequest("PUT", 'http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/'+ id, $http.defaults.headers, {}, success, error);
    };

    function approveAd(id, success, error) {
        return makeRequest("PUT", 'http://softuni-ads.azurewebsites.net/api/admin/Ads/Approve/'+ id, $http.defaults.headers, {}, success, error);
    };

    function rejectAd(id, success, error) {
        return makeRequest("PUT", 'http://softuni-ads.azurewebsites.net/api/admin/Ads/Reject/'+ id, $http.defaults.headers, {}, success, error);
    };

    function deleteData(url, success, error) {
        return makeRequest("DELETE", url, $http.defaults.headers, {}, success, error);
    };

    function createData(url, data, success, error) {
        return makeRequest("POST", url, $http.defaults.headers, data, success, error);
    };

    function editData(url, data, success, error) {
        return makeRequest("PUT", url, $http.defaults.headers, data, success, error);
    };

    function getData(url, success, error) {
        return makeRequest("GET", url, $http.defaults.headers, {}, success, error);
    };

    function login(data, success, error) {
        return makeRequest("POST", 'http://softuni-ads.azurewebsites.net/api/user/login', $http.defaults.headers, data, success, error);
    };

    function register(data, success, error) {
        return makeRequest("POST", 'http://softuni-ads.azurewebsites.net/api/user/register', {}, data, success, error);
    };
    return {
        getUserAdsWithParams:getUserAdsWithParams,
        publishAd:publishAd,
        editUserAd:editUserAd,
        editProfile:editProfile,
        changePassword:changePassword,
        login: login,
        register: register,
        deactivateAd:deactivateAd,
        approveAd:approveAd,
        rejectAd:rejectAd,
        deleteAdAdmin:deleteAdAdmin,
        deleteAd:deleteAd,
        publishAgain:publishAgain,
        deleteUser:deleteUser,
        deleteData:deleteData,
        createData:createData,
        editData:editData,
        getData:getData
    }
})


app.service('idService', function() {
  var idSaved;
  var objSaved={};

  var setId = function(id) {
      idSaved=id;
  }

  var getId = function(){
      return idSaved;
  }

  var setObj = function(obj) {
      objSaved = obj;
  }

  var getObj = function(){
      return objSaved;
  }

  return {
    setId: setId,
    getId: getId,
    setObj: setObj,
    getObj: getObj
  };

});