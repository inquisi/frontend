function mainController($scope, $filter) {
    varDate = new Date();
    year = $filter('date')(varDate, "yyyy")
    this.copyright = "\u00A9 " + year + " | iNQUiSi";
}

main.controller('mainController', mainController);