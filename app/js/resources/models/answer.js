(function() {
    resources.factory('Answer', ['$resource',
        function($resource) {
            return $resource('/mc_answers/:answerId', {}, {
                query: {
                    isArray: false
                }
            });
        }
    ]);
})();