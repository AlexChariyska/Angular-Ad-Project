app.factory('adsData', function adsData($resource,$http) {
	$http.defaults.headers.common['Authorization'] = 'Bearer drgYkEoKSxEYzY1CCuL03c92cRKnW0ejhKu1gxvFGdOrtC1_gxImYf_9btlcnJFJ8He66BJsdFFrREWWc5JdkLaZKAoeAL4Lz5CzAIX-sTh62a8pcdqDhGG9L-iVucpMsSsaorl8aaOeEdXk0KQJS8w-CSJdm6qb3oTI6JTWuU216kSMexGS6vhadVyHilXcN_BflxpNKuUPfmRY_xelXhRA38kdOGlcvVkblbQ1fa08j4joIy9Eot3U6IMXAo61ipVV5LjC3jigfi8EkoZJN5ZIAS3ZNgazWP0dKynyLFu3-szapIfmnvs_VMLM-4OUjyADnZVq_bLOIlK1DL83jKkeMLqJeIKaDD7qrOkzQ--dk9K3ObA6G2XFfxb6PDBlD_rj19E2r5-U_0i21xSodARZ_deXOg00KLWcdl-9j-Kio147QhUaZPKp9g7qi8ZwOslszsJA7uoRgTJ_-YifeJx32uDoBML6CfvG8BX9CwU';
	
	var resource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/ads/:id', 
		{id: '@id'}, 
		{ update: {
			method: 'PUT'
		}
	});

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
	 return makeRequest("GET",'http://softuni-ads.azurewebsites.net/api/ads?StartPage=1&PageSize=5',$http.defaults.headers,{},success, error);
	};

	function getAllTown(success, error) {
	 return makeRequest("GET",'http://softuni-ads.azurewebsites.net/Api/Towns',$http.defaults.headers,{}, success, error);
	};
	function getAllCategories(success, error) {
	 return makeRequest("GET",'http://softuni-ads.azurewebsites.net/api/categories',$http.defaults.headers,{},success, error);
	};

	function login(data,success, error) {
		return makeRequest("POST",'http://softuni-ads.azurewebsites.net/api/user/login',$http.defaults.headers, data,success, error);
	}; 
	
	function register(data,success, error) {
		return makeRequest("POST",': http://softuni-ads.azurewebsites.net/api/user/register',$http.defaults.headers, data,success, error);
	}; 
	return {
		getAllAds: getAllAds,
		getAllTown: getAllTown,
		getAllCategories: getAllCategories,
		login:login,
		register:register
	}
})