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
    
    // This function activates/deactivates the ads.
    function deactivate(url, success, error) {
        return makeRequest("PUT", url, $http.defaults.headers, {}, success, error);
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

    return {
        deleteData:deleteData,
        createData:createData,
        editData:editData,
        getData:getData,
        deactivate:deactivate
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


app.filter('isStatus', function() {
  return function(input, status) {
    var out = [];
      for (var i = 0; i < input.length; i++){
        debugger
          if(input[i].status === status){
              out.push(input[i]);
            }

          if(status === "all"){
              out.push(input[i]);
          }
      }
      debugger;      
    return out;
  };
});