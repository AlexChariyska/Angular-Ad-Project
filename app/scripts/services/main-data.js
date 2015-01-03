app.factory('adsData', function adsData($resource, $http, $rootScope) {
	$rootScope.loggedUser={};
	$http.defaults.headers.common['Authorization'] = $rootScope.loggedUser.accessToken;

	function makeRequest(method, url,headers, data, success, error) {
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
	 return makeRequest("GET",'http://softuni-ads.azurewebsites.net/api/ads',$http.defaults.headers,{},success, error);
	};

	function getAllTown(success, error) {
	 return makeRequest("GET",'http://softuni-ads.azurewebsites.net/Api/Towns',$http.defaults.headers,{}, success, error);
	};
	function getAllCategories(success, error) {
	 return makeRequest("GET",'http://softuni-ads.azurewebsites.net/api/categories',$http.defaults.headers,{},success, error);
	};

	function login(data,success, error) {
		return makeRequest("POST",'http://softuni-ads.azurewebsites.net/api/user/login',$http.defaults.headers, data, success, error);
	}; 

	function register(data,success, error) {
		return makeRequest("POST",'http://softuni-ads.azurewebsites.net/api/user/register',{}, data,success, error);
	}; 
	return {
		getAllAds: getAllAds,
		getAllTown: getAllTown,
		getAllCategories: getAllCategories,
		login:login,
		register:register
	}
})