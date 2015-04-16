function mainController($scope, $filter) {
    var varDate = new Date();
    var year = $filter('date')(varDate, "yyyy")
    $scope.copyright = "\u00A9 " + year + " | iNQUiSi";

    // $scope.isMobile = function(callback) {

    // }
}

main.controller('mainController', ['$scope', '$filter', mainController]);