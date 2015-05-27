function dashboardConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/courses/', '/courses');
    $urlRouterProvider.when('/students/', '/students');

    $stateProvider
    // child routes
    .state('dashboard.home', {
        url: '',
        templateUrl: 'states/dashboard/home.html',
        controller: 'dashboardHomeController',
        resolve: {
            students: function(User) {
                return User.students().$promise;
            }
        }
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

    .state('dashboard.profile', {
        url: '^/profile',
        controller: 'profileController',
        templateProvider: function($http, $cookieStore) {
            // TODO
            // One would expect to use the 'currentUser' resolve'd defined in mainConfig.js
            // but it looks like there's a bug in ui-router that doesn't allow injecting resolves into
            // a templateProvider function.
            // see https://github.com/angular-ui/ui-router/issues/330
            currentUser = $cookieStore.get('currentUser');
            var template;
            if (currentUser.role == "Instructor") {
                template = "states/dashboard/profile.html";
            } else {
                template = "states/dashboard/profile.html";
            }
            return $http.get(template).then(function(response) {
                return response.data;
            });
        }
    })

    .state('dashboard.settings', {
        url: '^/settings',
        templateUrl: 'states/dashboard/settings.html',
        controller: 'settingsController'
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
            },
            students: function(User, course) {
                return User.students({
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
            },
            sessionChannel: function($stateParams, websocketDispatcher, currentUser) {
                return websocketDispatcher.subscribe('session_' + $stateParams.sessionId);
            }
        }
    })

    .state('sessions.edit', {
        url: '/sessions/{sessionId}',
        views: {
            "@dashboard": { // absolutely target the unnamed view in the dashboard state
                // this will override inheriting the parent view
                templateUrl: "states/dashboard/sessionsEdit.html",
                controller: "sessionsEditController"
            }
        },
        onEnter: function($state, $stateParams, session, currentUser) {
            if (currentUser.role == "Student") {
                if (session.active) {
                    $state.go('sessions.answer', $stateParams);
                }
            } else {
                // Redirect to state.read if session.date is in the past
                if (new Date(session.date) < new Date()) {
                    $state.go('sessions.read', $stateParams);
                }
            }
        }
    })

    .state('sessions.answer', {
        url: '/sessions/{sessionId}',
        views: {
            "@dashboard": {
                controller: "sessionsAnswerController",
                templateUrl: "states/student/dashboard/sessionsAnswer.html"
            }
        },
        onEnter: function(websocketDispatcher, sessionChannel, currentUser) {
            websocketDispatcher.trigger('student.join_session', {
                user: {
                    id: currentUser.id,
                    first_name: currentUser.first_name,
                    last_name: currentUser.last_name
                },
                channel_name: sessionChannel.name
            });
        },
        onExit: function(websocketDispatcher, currentUser) {
            websocketDispatcher.trigger('student.leave_session');
        }
    })

    .state('sessions.read', {
        url: '/sessions/{sessionId}',
        views: {
            "@dashboard": { // absolutely target the unnamed view in the dashboard state
                // this will override inheriting the parent view
                templateUrl: "states/dashboard/sessionsRead.html",
                controller: "sessionsReadController",
                templateProvider: function($http, $cookieStore) {
                    currentUser = $cookieStore.get('currentUser');
                    var template;
                    if (currentUser.role == "Instructor") {
                        template = "states/dashboard/sessionsRead.html";
                    } else {
                        template = "states/student/dashboard/sessionsRead.html";
                    }
                    return $http.get(template).then(function(response) {
                        return response.data;
                    });
                }
            }
        }
    })

    .state('sessions.present', {
        url: '/sessions/{sessionId}/present',
        views: {
            "@": {
                controller: "sessionsPresentController",
                templateUrl: "states/dashboard/sessionsPresent.html"
            }
        },
        onExit: function(websocketDispatcher) {
            websocketDispatcher.trigger('question.deactivate_all', {});
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

    .state('questionsAnswer', {
        parent: 'sessions.answer',
        templateUrl: "states/student/dashboard/questions/questionsAnswer.html",
        controller: 'questionsAnswerController',
        params: {
            question: undefined
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
        templateUrl: 'states/dashboard/questions/questionsPresent.html',
        params: {
            index: null,
            questionId: null
        },
        controller: 'questionsPresentController',
        resolve: {
            question: function(questions, $stateParams, $q, currentUser, websocketDispatcher) {
                var deferred = $q.defer();
                websocketDispatcher.trigger('question.activate', {
                    question_id: $stateParams.questionId,
                    token: currentUser.token
                }, function(response) {
                    deferred.resolve(response.question)
                }, function(response) {
                    deferred.reject(response.question);
                });

                return deferred.promise;
            }
        },
        // onEnter: function($stateParams, websocketDispatcher, currentUser) {
        //     // Activate a question
        //     debugger


        // },
        onExit: function($stateParams, websocketDispatcher, currentUser) {
            // Deactivate a question
            websocketDispatcher.trigger('question.deactivate', {
                question_id: $stateParams.questionId,
                token: currentUser.token
            }, function(response) {
                console.log('deactivate success!', response);
            }, function(response) {
                console.log('deactivate failure', response);
            });
        }
    })
}

dashboard.config(dashboardConfig);