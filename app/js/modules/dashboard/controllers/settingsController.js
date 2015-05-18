function settingsController($scope, currentUser, User) {
    $scope.user = currentUser;

    $scope.userLogout = function() {
        console.log('Logging out ' + $scope.user.first_name + " " + $scope.user.last_name);
        // User.logout($scope.user.id);
    }
}

dashboard.controller('settingsController', ['$scope', 'currentUser', 'User', settingsController]);