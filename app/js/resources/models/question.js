(function() {
    resources.factory('Question', ['$resource',
        function($resource) {
            return $resource('/questions/:questionId', {}, {
                query: {
                    isArray: false
                }
            });
        }
    ]);
})();