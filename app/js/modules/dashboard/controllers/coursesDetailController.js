function coursesDetailController($scope, courses, Course, course, Session, sessions, $stateParams, $modal) {
    var today = new Date();

    var callback = $stateParams.callback;
    $scope.course = course;

    $scope.$watchCollection('sessions', function() {
        $scope.upcoming = _.filter($scope.sessions, function(session) {
            return new Date(session.date) >= today;
        });
        $scope.past = _.filter($scope.sessions, function(session) {
            return new Date(session.date) < today;
        });
    });

    $scope.sessions = _.sortBy(sessions.data, 'date');

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

dashboard.controller('coursesDetailController', ['$scope', 'courses', 'Course', 'course', 'Session', 'sessions', '$stateParams', '$modal', coursesDetailController]);