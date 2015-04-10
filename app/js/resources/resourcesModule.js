(function() {
    angular.module('resources', [])
    .value('API_ROOT', (function($location) {
    	if($location.path.indexOf('localhost:3000') != -1) {
    		return 'http://localhost:3000';
    	}
    	else {
    		return 'api.inquisi.io';
		}
	})());
})();

var resources = angular.module('resources');