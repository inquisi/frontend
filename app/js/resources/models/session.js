(function() {
    resources.factory('Session', ['$resource',
        function($resource) {
            return $resource('/sessions/:sessionId', {}, {
                query: {
                    isArray: false
                },
                activate: {
                    url: '/sessions/:sessionId/activate',
                    params: {
                        sessionId: "@id"
                    },
                    method: 'POST'
                },
                queryAnonymous: {
                    url: '/sessions/:token/',
                    params: {
                        anonymous: true
                    },
                    isArray: false
                }
            });
        }
    ]);
})();