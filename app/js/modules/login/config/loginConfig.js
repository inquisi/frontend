function loginConfig($stateProvider) {
    $stateProvider
    // route for the login page
    .state('loginPanel.login', {
        url: "",
        templateUrl: 'states/loginPanel/login.html'
    })

    // route for the registration page
    .state('loginPanel.register', {
        url: '^/register',
        templateUrl: 'states/loginPanel/register.html'
    })

    // route for the password reset page
    .state('loginPanel.reset', {
        url: '^/reset',
        templateUrl: 'states/loginPanel/reset.html'
    });
}

login.config(loginConfig);