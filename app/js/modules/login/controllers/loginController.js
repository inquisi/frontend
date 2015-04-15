function loginController($rootScope, $scope, $state, AuthService) {
    // function to submit the form after all validation has occurred            
    $scope.submit = function() {
        AuthService.login($scope.user.email, $scope.user.password)
            .then(function() {
                if ($rootScope.redirectAfterLogin) {
                    var redirectAfterLogin = $rootScope.redirectAfterLogin;
                    delete $rootScope.redirectAfterLogin;
                    $state.go(redirectAfterLogin);
                } else {
                    $state.go('dashboard.welcome');
                }
            }, function(data) {
                $scope.errorMessage = data.message;
            });
    }
}

login.controller('loginController', ['$rootScope', '$scope', '$state', 'AuthService', loginController]);