(function() {
    resources.factory('Answer', ['$resource',
        function($resource) {
            return $resource('/mc_answers/:answerId', {
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