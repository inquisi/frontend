function mainConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/404');

    $stateProvider
    // route for the 404 page
    .state('404', {
        url: '/404',
        templateUrl: 'states/404.html',
        disableAuth: true
    })

    // route for the loginPanel page
    .state('loginPanel', {
        url: '/login',
        abstract: true,
        templateUrl: 'states/loginPanel.html'
    })

    // route for the app dashboard
    .state('dashboard', {
        url: '/',
        abstract: true,
        templateUrl: 'states/dashboard.html',
        resolve: {
            courses: function(Course) {
                return Course.query().$promise;
            },
            sessions: function(Session) {
                return Session.query().$promise;
            },
            currentUser: function($cookieStore) {
                return $cookieStore.get('currentUser');
            }
        },
        controller: 'dashboardController'
    })

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}

main.config(mainConfig);