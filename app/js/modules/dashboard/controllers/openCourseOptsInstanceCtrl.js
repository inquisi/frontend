function openCourseOptsInstanceCtrl($scope, $state, $modalInstance) {

    $scope.present = function() {
        $modalInstance.close("present");
    };

    $scope.addSession = function(course) {
        $modalInstance.close($state.go(dashboard.coursesDetail, {
            id: course.id,
            callback: 'openSessionModal'
        }));
    };

    $scope.loop = function() {
        $modalInstance.close("loop");
    };

    $scope.upload = function() {
        $modalInstance.close("upload");
    };

    $scope.ask = function() {
        $modalInstance.close("ask question");
    };

    $scope.dismiss = function() {
        $modalInstance.dismiss('dismiss');
    };
}

dashboard.controller('openCourseOptsInstanceCtrl', ['$scope', '$state', '$modalInstance', openCourseOptsInstanceCtrl]);