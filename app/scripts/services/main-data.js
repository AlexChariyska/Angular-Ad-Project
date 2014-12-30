app.factory('adsData', function adsData($resource,$http) {


	function makeRequest(method, url,/*headers, data,*/ success, error) {
		$http({
			method: method,
			url: url 
		/*	 headers: headers,
			 data: data*/
		})
		.success(function (data, status, headers, config) {
			success(data, status, headers(), config);
		})
		.error(function (data, status, headers, config) {
			error(data, status, headers(), config);
		});
	}




	function getAllAds(success, error) {
	 return makeRequest("GET",'http://softuni-ads.azurewebsites.net/api/ads?StartPage=1&PageSize=5',success, error);
	};

	function getAllTown(success, error) {
	 return makeRequest("GET",'http://softuni-ads.azurewebsites.net/Api/Towns',success, error);
	};
	function getAllCategories(success, error) {
	 return makeRequest("GET",'http://softuni-ads.azurewebsites.net/api/categories',success, error);
	};

	return {
		getAllAds: getAllAds,
		getAllTown: getAllTown,
		getAllCategories: getAllCategories
	}
})