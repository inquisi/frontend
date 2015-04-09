function loginConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
    // route for the loginPanel page
    .state('loginPanel', {
        url: '/login',
        abstract: true,
        templateUrl: 'states/loginPanel.html'
    })

    // route for the login page
    .state('loginPanel.login', {
        url: "",
        templateUrl: 'states/loginPanel_states/login.html'
    })

    // route for the registration page
    .state('loginPanel.register', {
        url: '^/register',
        templateUrl: 'states/loginPanel_states/register.html'
    })

    // route for the password reset page
    .state('loginPanel.reset', {
        url: '^/reset',
        templateUrl: 'states/loginPanel_states/reset.html'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}

login.config(loginConfig);