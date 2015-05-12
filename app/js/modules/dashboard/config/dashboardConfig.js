function dashboardConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/courses/', '/courses');
    $urlRouterProvider.when('/students/', '/students');

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
        controller: 'studentsController',
        resolve: {
            students: function(User) {
                return User.students().$promise;
            }
        }
    })

    .state('studentsDetail', {
        parent: 'dashboard.students',
        url: '^/students/{studentId}',
        params: {
            studentId: null
        },
        resolve: {
            student: function(students, $stateParams) {
                return _.find(students.data, {
                    id: $stateParams.studentId * 1
                });
            }
        },
        views: {
            '@dashboard': {
                templateUrl: 'states/dashboard/studentsDetail.html',
                controller: 'studentsDetailController',
            }
        }
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
            sessionId: null
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
                templateProvider: function($http, $cookieStore) {
                    // TODO
                    // One would expect to use the 'currentUser' resolve'd defined in mainConfig.js
                    // but it looks like there's a bug in ui-router that doesn't allow injecting resolves into
                    // a templateProvider function.
                    // see https://github.com/angular-ui/ui-router/issues/330
                    currentUser = $cookieStore.get('currentUser');
                    var template;
                    if (currentUser.role == "Instructor") {
                        template = "states/dashboard/sessionsEdit.html";
                    } else {
                        template = "states/student/dashboard/sessionsEdit.html";
                    }
                    return $http.get(template).then(function(response) {
                        return response.data;
                    });
                }
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
        }
    })

    .state('sessions.present', {
        url: '/sessions/{sessionId}/present',
        views: {
            "@": { // absolutely target the unnamed view in the dashboard state
                // this will override inheriting the parent view
                templateUrl: "states/dashboard/sessionsPresent.html",
                controller: "sessionsPresentController",
            }
        }
    })

    .state('questionsEdit', {
        parent: 'sessions.edit',
        templateUrl: 'states/dashboard/questions/questionsEdit.html',
        // don't need to check role because students will never edit a question
        params: {
            index: null,
            questionId: null
        },
        controller: 'questionsEditController',
        resolve: {
            question: function(questions, $stateParams) {
                return _.find(questions.data, {
                    id: $stateParams.questionId * 1
                });
            }
        }
    })

    .state('questionsRead', {
        parent: 'sessions.read',
        templateProvider: function($http, $cookieStore) {
            // TODO
            // One would expect to use the 'currentUser' resolve'd defined in mainConfig.js
            // but it looks like there's a bug in ui-router that doesn't allow injecting resolves into
            // a templateProvider function.
            // see https://github.com/angular-ui/ui-router/issues/330
            currentUser = $cookieStore.get('currentUser');
            var template;
            if (currentUser.role == "Instructor") {
                template = "states/dashboard/questions/questionsRead.html";
            } else {
                template = "states/dashboard/questions/questionsRead.html";
            }
            return $http.get(template).then(function(response) {
                return response.data;
            });
        },
        params: {
            index: null,
            questionId: null
        },
        controller: 'questionsReadController',
        resolve: {
            question: function(questions, $stateParams) {
                return _.find(questions.data, {
                    id: $stateParams.questionId * 1
                });
            }
        }
    })

    .state('questionsPresent', {
        parent: 'sessions.present',
        templateProvider: function($http, $cookieStore) {
            // TODO
            // One would expect to use the 'currentUser' resolve'd defined in mainConfig.js
            // but it looks like there's a bug in ui-router that doesn't allow injecting resolves into
            // a templateProvider function.
            // see https://github.com/angular-ui/ui-router/issues/330
            currentUser = $cookieStore.get('currentUser');
            var template;
            if (currentUser.role == "Instructor") {
                template = "states/dashboard/questions/questionsPresent.html";
            } else {
                template = "states/dashboard/questions/questionsAnswer.html";
            }
            return $http.get(template).then(function(response) {
                return response.data;
            });
        },
        params: {
            index: null,
            questionId: null
        },
        controller: 'questionsPresentController',
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