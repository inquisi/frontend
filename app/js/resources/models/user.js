(function() {
    resources.factory('User', ['$resource',
        function($resource) {
            return $resource('/user', {}, {
                create: {
                    url: '/signup',
                    method: 'POST'
                },
                update: {
                    method: 'PUT'
                },
                students: {
                    url: '/user/students',
                    method: 'GET'
                },
                delete: {
                    method: 'DELETE'
                }
            });
        }
    ]);
})();