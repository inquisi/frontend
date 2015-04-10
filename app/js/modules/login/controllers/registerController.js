function registerController($scope, User) {
    // function to submit the form after all validation has occurred            
    $scope.submit = function() {
        User.create($scope.user, function(response) {
            // return a token or message
            if (response.status == "success") {
                var token = response.data.user.token;
                console.log(token);
            } else {
                var errorMessage = response.message;
                console.log(errorMessage);
            }
        });
    }
}

login.controller('registerController', ['$scope', registerController]);