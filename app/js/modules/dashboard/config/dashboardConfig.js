function dashboardConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/courses/', '/courses');

    $stateProvider
    // child routes
    .state('dashboard.home', {
        url: '',
        templateUrl: 'states/dashboard/home.html',
    })
    // other page
    .state('dashboard.courses', {
        url: '^/courses',
        templateUrl: 'states/dashboard/courses.html',
    })

    .state('dashboard.students', {
        url: '^/students',
        templateUrl: 'states/dashboard/students.html',
    })

    .state('dashboard.coursesDetail', {
        url: 'courses/{courseId}',
        params: {
            courseId: null,
            callback: null
        },
        resolve: {
            course: function(courses, $stateParams) {
                return _.find(courses.data, {
                    id: $stateParams.courseId * 1
                });
            },
            sessions: function(courses, Session, $stateParams) {
                var course = _.find(courses.data, {
                    id: $stateParams.courseId * 1
                });
                return Session.query({
                    course_id: course.id
                }).$promise;
            }
        },
        templateUrl: 'states/dashboard/coursesDetail.html',
        controller: 'coursesDetailController'
    })

    .state('sessionsDetail', {
        url: '/sessions/{sessionId}',
        parent: 'dashboard.coursesDetail',
        views: {
            "@dashboard": { // absolutely target the unnamed view in the dashboard state
                // this will override inheriting the parent view
                templateUrl: "states/dashboard/sessionsDetail.html",
                controller: "sessionsDetailController",
                params: {
                    sessionId: null
                }
            }
        },
        resolve: {
            session: function(sessions, $stateParams) {
                return _.find(sessions.data, {
                    id: $stateParams.sessionId * 1
                });
            },
            questions: function(course, sessions, Question, $stateParams) {
                var session = _.find(sessions.data, {
                    id: $stateParams.sessionId * 1
                });
                return Question.query({
                    course_id: course.id,
                    session_id: session.id
                }).$promise;
            }
        }
    })

    .state('questionsDetail', {
        parent: 'sessionsDetail',
        templateUrl: 'states/partials/questions/mc.html',
        params: {
            index: null,
            question: null
        },
        controller: 'questionsDetailController'
    })
}

dashboard.config(dashboardConfig);