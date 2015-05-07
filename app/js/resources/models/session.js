(function() {
    resources.factory('Session', ['$resource',
        function($resource) {
            return $resource('/sessions/:sessionId', {}, {
                query: {
                    isArray: false
                },
                activate: {
                    url: '/sessions/:sessionId/activate',
                    method: 'POST'
                }
            });
        }
    ]);
})();