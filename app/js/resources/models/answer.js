(function() {
    resources.factory('Answer', ['$resource',
        function($resource) {
            return $resource('/answers/:answerId', {}, {
                query: {
                    isArray: false
                }
            });
        }
    ]);
})();