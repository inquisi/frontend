function profileController($scope, currentUser) {
    $scope.user = currentUser;

    $scope.user.full_name = $scope.user.first_name + " " + $scope.user.last_name;
};

dashboard.controller('profileController', ['$scope', 'currentUser', profileController]);