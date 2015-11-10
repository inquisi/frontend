function settingsController($scope, currentUser, User, $state, AuthService, focus) {

    $scope.user = currentUser;

    $scope.userLogout = function() {
        console.log('Logging out ' + $scope.user.first_name + " " + $scope.user.last_name);
        console.log($scope.user.token);
        AuthService.logout($scope.user.token);
    }
}

dashboard.controller('settingsController', ['$scope', 'currentUser','AuthService','focus', 'User', settingsController]);