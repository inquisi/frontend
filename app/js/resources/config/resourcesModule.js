(function() {
	var resources = angular.module('resources', []);
	resources.factory('apiRootInterceptor', function() {
		return {
			request: function(config) {
				// If request is being sent to the api
				if (config.url.indexOf('states') == -1 && config.url.indexOf('.html') == -1) {
					config.url = applicationConfig.apiRoot + config.url;
				}
				return config;
			}
		}
	});
	resources.config(['$httpProvider',
		function($httpProvider) {
			$httpProvider.interceptors.push('apiRootInterceptor');
		}
	]);
})();

var resources = angular.module('resources');