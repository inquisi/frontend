(function() {
	resources.factory('User', ['$resource', 'API_ROOT', function($resource, API_ROOT) {
		console.log(API_ROOT + 'user')
		return $resource(API_ROOT + 'user', {}, {
			create: {url: API_ROOT + 'signup', method: 'POST'}
		});
	}]);
})();