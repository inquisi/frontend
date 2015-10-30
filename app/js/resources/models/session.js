(function() {
    resources.factory('Session', ['$resource',
        function($resource) {
            return $resource('/sessions/:sessionId', {}, {
                query: {
                    isArray: false
                },
                update: {
                    method: 'PUT'
                },
                activate: {
                    url: '/sessions/:sessionId/activate',
                    params: {
                        sessionId: "@id"
                    },
                    method: 'POST'
                },
                delete: {
                    method: 'DELETE'
                }
            });
        }
    ]);
})();