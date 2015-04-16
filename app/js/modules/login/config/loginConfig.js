function loginConfig($stateProvider) {
    $stateProvider
    // route for the login page
    .state('loginPanel.login', {
        url: '',
        templateUrl: 'states/loginPanel/login.html',
        disableAuth: true,
        onEnter: function(AuthService, $state) {
            if (AuthService.authenticated()) {
                $state.go('dashboard.welcome')
            }
        }
    })

    // route for the registration page
    .state('loginPanel.register', {
        url: '^/register',
        templateUrl: 'states/loginPanel/register.html',
        disableAuth: true
    })

    // route for the password reset page
    .state('loginPanel.reset', {
        url: '^/reset',
        templateUrl: 'states/loginPanel/reset.html',
        disableAuth: true
    });
}

login.config(loginConfig);