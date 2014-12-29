app.factory('adsData', function adsData($http) {
	function getAllAds(success, error) {
		$http({
			method: 'GET',
			url: 'http://softuni-ads.azurewebsites.net/api/ads' // to change pages
			// headers: {}
			// data: {}
		})
		.success(function (data, status, headers, config) {
			success(data, status, headers(), config);
		})
		.error(function (data, status, headers, config) {
			error(data, status, headers(), config);
		});
	}

	function getAllTown(success, error) {
		$http({
			method: 'GET',
			url: 'http://softuni-ads.azurewebsites.net/Api/Towns' 
		})
		.success(function (data, status, headers, config) {
			success(data, status, headers(), config);
		})
		.error(function (data, status, headers, config) {
			error(data, status, headers(), config);
		});
	}

	function getAllCategories(success, error) {
		$http({
			method: 'GET',
			url: 'http://softuni-ads.azurewebsites.net/api/categories'
		})
		.success(function (data, status, headers, config) {
			success(data, status, headers(), config);
		})
		.error(function (data, status, headers, config) {
			error(data, status, headers(), config);
		});
	}

	return {
		getAllAds: getAllAds,
		getAllTown: getAllTown,
		getAllCategories: getAllCategories
	}
})