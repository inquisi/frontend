(function() {
    var resources = angular.module('resources', []);
    resources.factory('apiRootInterceptor', function() {
        return {
            request: function(config) {
                // If request is being sent to the api
                if (config.data != undefined) {
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