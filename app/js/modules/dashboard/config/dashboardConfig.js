function dashboardConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/courses/', '/courses');

    $stateProvider
    // child routes
    .state('dashboard.home', {
        url: '',
        templateUrl: 'states/dashboard/home.html'
    })
    // other page
    .state('dashboard.courses', {
        url: '^/courses',
        templateUrl: 'states/dashboard/courses.html'
    })

    .state('dashboard.students', {
        url: '^/students',
        templateUrl: 'states/dashboard/students.html'
    })

    .state('dashboard.coursesID', {
        url: 'courses/:id',
        params: {
            id: null
        },
        templateUrl: 'states/dashboard/coursesID.html',
        controller: function($scope, $stateParams) {
            $scope.id = $stateParams.id;
        }
    })
}

dashboard.config(dashboardConfig);