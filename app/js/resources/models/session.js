(function() {
    resources.factory('Session', ['$resource',
        function($resource) {
            return $resource('/sessions/:sessionId', {}, {
                query: {
                    isArray: false
                }
            });
        }
    ]);
})();