function loginController($scope, $state, AuthService) {
    // function to submit the form after all validation has occurred            
    $scope.submit = function() {
        AuthService.login($scope.user.email, $scope.user.password)
            .then(function() {
                $state.go('/');
            }, function(data) {
                $scope.errorMessage = data.message;
            });
    }
}

login.controller('loginController', loginController);