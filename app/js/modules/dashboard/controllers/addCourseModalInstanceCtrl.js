function addCourseModalInstanceCtrl($scope, $modalInstance) {

    $scope.submit = function() {
        $modalInstance.close($scope.course);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

}

dashboard.controller('addCourseModalInstanceCtrl', ['$scope', '$modalInstance', addCourseModalInstanceCtrl]);