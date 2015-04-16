(function() {
    angular.module('inquisi', ['ui.router', 'ngResource', 'ngCookies', 'hmTouchEvents', // vendor dependencies
        'login', 'resources', 'dashboard' // our dependencies
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
        });
})();

var main = angular.module('inquisi');