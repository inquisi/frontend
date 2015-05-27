(function() {
    angular.module('inquisi', ['ui.router', 'ui.keypress', 'ngResource', 'ngSanitize', 'ngCookies', 'hmTouchEvents', 'ui.bootstrap', 'angular-flot', 'angular.screenmatch', 'angular-sortable-view', 'angular-md5', // vendor dependencies
        'resources', 'services', 'login', 'dashboard' // our dependencies
    ])
        .run(function($rootScope, AuthService, $state, $location, $modalStack) {
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
            $rootScope.$on('$stateChangeSuccess', function() {
                $modalStack.dismissAll();
            });
            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
                console.log('$stateChangeError - fired when an error occurs during transition.');
                console.log("0: event, 1: toState, 2: toParams, 3: fromState, 4: fromParams");
                console.log(arguments);
            });
            $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
                console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
                console.log("unfoundState, fromState, fromParams");
                console.log(unfoundState, fromState, fromParams);
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