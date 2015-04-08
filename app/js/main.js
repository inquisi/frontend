(function() {
	var inquisi = angular.module('inquisi', ['login']);

	// create the controller and inject Angular's $scope
	inquisi.controller('mainController', function($scope, $filter) {
		varDate = new Date();
		year = $filter('date')(varDate, "yyyy")
		this.copyright = "\u00A9 " + year + " | iNQUiSi";
	});
	
})();

(function() {
	var login = angular.module('login', ['ui.router','ngCookies']);
})();