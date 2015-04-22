function coursesDetailController($scope, Course, Session, $stateParams, $modal) {
    var courseId = $stateParams.id * 1;

    $scope.$watch('courses', function() {
        $scope.course = _.find($scope.$parent.courses, {
            id: courseId
        });
    });

    $scope.sessions = Session.query({
        course_id: courseId
    }, function(response) {
        $scope.sessions = response.data;
        $scope.sessions = _.sortBy($scope.sessions, 'date');
    });

    $scope.$watch('sessions', function() {
        $scope.upcoming = _.filter($scope.sessions, function(session) {
            return new Date(session.date) >= new Date();
        });
        $scope.past = _.filter($scope.sessions, function(session) {
            return new Date(session.date) < new Date();
        });
    });

    $scope.openSessionModal = function() {

        var modalInstance = $modal.open({
            templateUrl: 'states/partials/addSessionModal.html',
            controller: 'addSessionModalInstanceCtrl'
        });

        modalInstance.result.then(function(session) {
            addSession(session);
        }, function() {});

        var addSession = function(session) {
            Session.save(session, function(response) {
                if (response.status == "success") {
                    $scope.sessions.push(response.data.session);
                }
            });
        }
    }
}

dashboard.controller('coursesDetailController', ['$scope', 'Course', 'Session', '$stateParams', '$modal', coursesDetailController]);