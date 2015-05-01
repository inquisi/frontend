(function() {
    resources.factory('Question', ['$resource',
        function($resource) {
            return $resource('/questions/:questionId', {
                questionId: "@id"
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