function coursesDetailController($scope, courses, Course, course, Session, sessions, $stateParams, $modal) {
    var callback = $stateParams.callback;
    $scope.course = course;

    $scope.upcomingFilter = function(session) {
        return new Date(session.date) >= new Date();
    }

    $scope.pastFilter = function(session) {
        return new Date(session.date) < new Date();
    }

    $scope.openSessionModal = function() {

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

    if (callback == 'openSessionModal') {
        $scope.openSessionModal();
    } else {}
}

dashboard.controller('coursesDetailController', ['$scope', 'courses', 'Course', 'course', 'Session', 'sessions', '$stateParams', '$modal', '$cookieStore', coursesDetailController]);