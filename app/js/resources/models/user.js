(function() {
    resources.factory('User', ['$resource',
        function($resource) {
            return $resource('/user', {}, {
                create: {
                    url: '/signup',
                    method: 'POST'
                },
                students: {
                    url: '/user/students',
                    method: 'GET'
                }
            });
        }
    ]);
})();