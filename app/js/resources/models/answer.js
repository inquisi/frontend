(function() {
    resources.factory('Answer', ['$resource',
        function($resource) {
            return $resource('/answers/:answerId', {
                answerId: "@id"
            }, {
                query: {
                    isArray: false
                },
                update: {
                    method: 'PUT'
                }
            });
        }
    ]);
})();