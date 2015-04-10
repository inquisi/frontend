(function() {
    resources.factory('User', ['$resource',
        function($resource) {
            var API_ROOT = 'http://localhost:3000/';
            return $resource(API_ROOT + 'user', {}, {
                create: {
                    url: API_ROOT + 'signup',
                    method: 'POST'
                }
            });
        }
    ]);
})();