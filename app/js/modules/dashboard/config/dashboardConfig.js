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
            sessions: function(course, Session, $stateParams) {
                return Session.query({
                    course_id: course.id
                }).$promise;
            }
        },
        templateUrl: 'states/dashboard/coursesDetail.html',
        controller: 'coursesDetailController'
    })

    .state('sessions', {
        parent: 'dashboard.coursesDetail',
        abstract: true,
        params: {
            sessionId: null,
            present: false
        },
        resolve: {
            session: function(sessions, $stateParams) {
                return _.find(sessions.data, {
                    id: $stateParams.sessionId * 1
                });
            },
            questions: function(course, session, Question, $stateParams) {
                return Question.query({
                    course_id: course.id,
                    session_id: session.id
                }).$promise;
            }
        }
    })

    .state('sessions.edit', {
        url: '/sessions/{sessionId}',
        views: {
            "@dashboard": { // absolutely target the unnamed view in the dashboard state
                // this will override inheriting the parent view
                templateUrl: "states/dashboard/sessionsEdit.html",
                controller: "sessionsEditController",
            }
        },
    })

    .state('sessions.read', {
        url: '/sessions/{sessionId}',
        views: {
            "@dashboard": { // absolutely target the unnamed view in the dashboard state
                // this will override inheriting the parent view
                templateUrl: "states/dashboard/sessionsRead.html",
                controller: "sessionsReadController",
            }
        },
    })

    .state('sessions.present', {
        url: '/sessions/{sessionId}/present',
        params: {
            present: true
        },
        views: {
            "@": { // absolutely target the unnamed view in the dashboard state
                // this will override inheriting the parent view
                templateUrl: "states/dashboard/sessionsPresent.html",
                controller: "sessionsPresentController",
            }
        },
    })

    .state('questionsDetail', {
        parent: 'sessions.edit',
        templateUrl: 'states/partials/questions/mc.html',
        params: {
            index: null,
            questionId: null
        },
        controller: 'questionsDetailController',
        resolve: {
            question: function(questions, $stateParams) {
                return _.find(questions.data, {
                    id: $stateParams.questionId * 1
                });
            }
        }
    })
}

dashboard.config(dashboardConfig);