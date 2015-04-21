function openCourseOptsInstanceCtrl($scope, $modalInstance) {

    $scope.present = function() {
        $modalInstance.close("present");
    };

    $scope.addSession = function() {
        $modalInstance.close("add session");
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

dashboard.controller('openCourseOptsInstanceCtrl', ['$scope', '$modalInstance', openCourseOptsInstanceCtrl]);