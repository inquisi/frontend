function dashboardConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/courses/', '/courses');

    $stateProvider
    // child routes
    .state('dashboard.home', {
        url: '',
        templateUrl: 'states/dashboard/home.html',
        // disableAuth: true
    })
    // other page
    .state('dashboard.courses', {
        url: '^/courses',
        templateUrl: 'states/dashboard/courses.html',
        // disableAuth: true
    })

    .state('dashboard.students', {
        url: '^/students',
        templateUrl: 'states/dashboard/students.html',
        // disableAuth: true
    })

    .state('dashboard.coursesDetail', {
        url: 'courses/:id',
        // disableAuth: true,
        params: {
            id: null
        },
        templateUrl: 'states/dashboard/coursesDetail.html',
        controller: function($scope, $stateParams) {
            $scope.id = $stateParams.id;
        }
    })
}

dashboard.config(dashboardConfig);