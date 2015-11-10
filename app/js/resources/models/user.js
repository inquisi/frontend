(function() {
    resources.factory('User', ['$resource',
        function($resource) {
            return $resource('/user', {}, {
                create: {
                    url: '/signup',
                    method: 'POST'
                },
                update: {
                    url: '/update',
                    method: 'PUT'
                },
                students: {
                    url: '/user/students',
                    method: 'GET'
                },
                delete: {
                    url: '/delete',
                    method: 'DELETE'
                },
                login: {
                    url: '/login',
                    method: 'POST'
                },
                logout: {
                    url: '/logout',
                    method: 'POST'
                },
            });
        }
    ]);
})();