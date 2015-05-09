function enrollInCourseModalInstanceController($scope, $modalInstance) {

    $scope.submit = function() {
        $modalInstance.close($scope.enrollmentToken);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

}

dashboard.controller('enrollInCourseModalInstanceController', ['$scope', '$modalInstance', enrollInCourseModalInstanceController]);