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
        deleteData: deleteData,
        createData: createData,
        editData: editData,
        getData: getData,
        deactivate: deactivate
    }
})

