function dashboardConfig($stateProvider) {

    $stateProvider
    // child routes
    .state('dashboard.welcome', {
        url: '',
        templateUrl: 'states/dashboard/welcome.html'
    })
}

dashboard.config(dashboardConfig);