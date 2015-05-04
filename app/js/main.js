(function() {
    angular.module('inquisi', ['ui.router', 'ngResource', 'ngSanitize', 'ngCookies', 'hmTouchEvents', 'ui.bootstrap', 'angular.screenmatch', 'angular-sortable-view', // vendor dependencies
        'resources', 'services', 'login', 'dashboard' // our dependencies
    ])
        .run(function($rootScope, AuthService, $state, $location) {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                if (!toState.disableAuth && !AuthService.authenticated()) {
                    $rootScope.redirectAfterLogin = toState.name;
                    // calling event.preventDefault() shouldn't be necessary
                    // This is a bug with ui-router
                    // https://github.com/angular-ui/ui-router/issues/178
                    event.preventDefault();
                    $state.go('loginPanel.login');
                }
            });
        }).factory('apiRootInterceptor', ['$cookieStore',
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
        ]).config(['$httpProvider',
            function($httpProvider) {
                $httpProvider.interceptors.push('apiRootInterceptor');
            }
        ]);
})();

var main = angular.module('inquisi');