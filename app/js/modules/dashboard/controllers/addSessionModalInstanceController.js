function addSessionModalInstanceCtrl($scope, $modalInstance) {

    $scope.submit = function() {
        $modalInstance.close($scope.session);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

}

dashboard.controller('addSessionModalInstanceCtrl', ['$scope', '$modalInstance', addSessionModalInstanceCtrl]);