function dashboardConfig($stateProvider) {

    $stateProvider
    // child routes
    .state('dashboard.welcome', {
        url: '',
        parent: 'dashboard',
        templateUrl: 'states/dashboard/welcome.html'
    })
}

dashboard.config(dashboardConfig);