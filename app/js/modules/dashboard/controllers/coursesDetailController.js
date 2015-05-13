function coursesDetailController($scope, courses, Course, course, Session, sessions, $stateParams, $modal) {
    var callback = $stateParams.callback;
    $scope.course = course;
    $scope.sessions = sessions.data;

    $scope.upcomingFilter = function(session) {
        return new Date(session.date) >= new Date();
    }

    $scope.pastFilter = function(session) {
        return new Date(session.date) < new Date();
    }

    $scope.openEnrollmentCodeModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'states/partials/enrollmentCodeModal.html',
            size: 'lg',
            controller: function($scope, $modalInstance) {
                $scope.course = course;
                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    }

    $scope.openStudentsModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'states/partials/studentsModal.html',
            controller: function($scope, $modalInstance) {
                $scope.course = course;
                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    }

    $scope.openSessionsModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'states/partials/sessionsModal.html',
            controller: function($scope, $modalInstance) {
                $scope.course = course;
                $scope.sessions = sessions.data;

                $scope.upcomingFilter = function(session) {
                    return new Date(session.date) >= new Date();
                }

                $scope.pastFilter = function(session) {
                    return new Date(session.date) < new Date();
                }

                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    }

    $scope.openAddSessionModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'states/partials/addSessionModal.html',
            controller: 'addSessionModalInstanceCtrl'
        });

        modalInstance.result.then(function(session) {
            addSession(session);
        }, function() {});

        var addSession = function(session) {
            Session.save(_.merge(session, {
                course_id: $stateParams.courseId * 1
            }), function(response) {
                if (response.status == "success") {
                    $scope.sessions.push(response.data.session);
                }
            });
        }
    }

    if (callback == 'openAddSessionModal') {
        $scope.openAddSessionModal();
    } else {}
}

dashboard.controller('coursesDetailController', ['$scope', 'courses', 'Course', 'course', 'Session', 'sessions', '$stateParams', '$modal', '$cookieStore', coursesDetailController]);