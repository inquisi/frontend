function mainController($scope, $filter, $window, screenmatch) {
    var varDate = new Date();
    var year = $filter('date')(varDate, "yyyy")
    $scope.copyright = "\u00A9 " + year + " | iNQUiSi";



    $scope.logoSmall = true;
    $scope.mobile = true;

    screenmatch.when('xs', function() {
        $scope.mobile = true;
        $scope.logoSmall = true;
    }, function() {
        $scope.mobile = false;
        $scope.logoSmall = false;
    });
}

main.controller('mainController', ['$scope', '$filter', '$window', 'screenmatch', mainController]);