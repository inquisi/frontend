(function() {
    angular.module('anonymous')
        .controller('anonymousController', ['$scope', '$state', '$stateParams', 'session', '$modal',
            function($scope, $state, $stateParams, session, $modal) {
                if (session.status == "failure") {
                    $state.go('anonymous-404', {
                        sessionToken: $stateParams.sessionToken
                    });
                }

                $scope.session = session.data.session;
                $scope.openJoinAnonymousSessionModal = function() {
                    $modal.open({
                        templateUrl: 'states/anonymous/joinAnonymousSessionModal.html',
                        size: 'sm',
                        windowClass: 'join-anonymous-session-modal',
                        controller: function($scope, $modalInstance) {
                            $scope.ok = function() {
                                $modalInstance.close($scope.user);
                            }
                            $scope.cancel = function() {
                                $modalInstance.dismiss();
                            }
                        }
                    }).result.then(function(user) {
                        console.log(user);
                        // join the session anonymous session
                    });
                }
            }
        ]);
})();