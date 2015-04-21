(function() {
	var resources = angular.module('resources', []);
	resources.factory('apiRootInterceptor', ['$cookieStore',
		function($cookieStore) {
			function tokenParamsExist(request) {
				return !(request.params && request.params.token);
			}

			function tokenCookieExists() {
				return $cookieStore.get('currentUser') && $cookieStore.get('currentUser').token;
			}
			return {
				request: function(request) {
					// If request is being sent to the api
					if (request.url.indexOf('states') == -1 && request.url.indexOf('.html') == -1) {
						request.url = applicationConfig.apiRoot + request.url;

						if (tokenParamsExist(request) && tokenCookieExists()) {
							request.params = request.params || {}
							request.params.token = $cookieStore.get('currentUser').token;
						}
					}
					return request;
				}
			}
		}
	]);
	resources.config(['$httpProvider',
		function($httpProvider) {
			$httpProvider.interceptors.push('apiRootInterceptor');
		}
	]);
})();

var resources = angular.module('resources');