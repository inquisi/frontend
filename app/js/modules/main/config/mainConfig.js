function mainConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/404');

    $stateProvider
    // route for the 404 page
    .state('404', {
        url: '/404',
        templateUrl: 'states/404.html'
    })

    // route for the loginPanel page
    .state('loginPanel', {
        url: '/login',
        abstract: true,
        templateUrl: 'states/loginPanel.html',
        controller: 'loginController'
    })

    // route for the app dashboard
    .state('dashboard', {
        url: '/',
        // abstract: true,
        templateUrl: 'states/dashboard.html',
        controller: 'dashboardController'
        // resolve: {
        //     authenticate: authenticate
        // }
    })

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}

main.config(mainConfig);