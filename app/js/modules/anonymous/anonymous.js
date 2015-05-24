(function() {
    angular.module('anonymous', [])
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('anonymous', {
                    url: '^/anonymous/{sessionToken}',
                    templateUrl: 'states/anonymous/index.html',
                    controller: 'anonymousController',
                    disableAuth: true,
                    resolve: {
                        session: function(Session, $stateParams, $q) {
                            return Session.queryAnonymous({
                                token: $stateParams.sessionToken
                            }).$promise;
                        }
                    }
                })
                .state('anonymous-404', {
                    templateUrl: 'states/anonymous/404.html',
                    controller: function($scope, $stateParams) {
                        // console.log($stateParams)
                        $scope.sessionToken = $stateParams.sessionToken;
                    },
                    disableAuth: true,
                    params: {
                        sessionToken: 'test'
                    }
                });
        });
})();