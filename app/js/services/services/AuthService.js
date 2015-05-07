function AuthService($http, $q, $cookieStore) {
    function storeToken(token) {
        var currentUser;
        try {
            // Cookiestore will try to get a value from cookies in browser then parse them
            // The parsing step throws an error if a cookie isn't found
            // (Empty string isnt valid json apparently)
            currentUser = $cookieStore.get('currentUser');
        } finally {
            currentUser = currentUser || {};
        }
        currentUser.token = token;

        $cookieStore.put('currentUser', currentUser);
    }

    function storeUser(user) {
        var currentUser;
        try {
            // Cookiestore will try to get a value from cookies in browser then parse them
            // The parsing step throws an error if a cookie isn't found
            // (Empty string isnt valid json apparently)
            currentUser = $cookieStore.get('currentUser');
        } finally {
            currentUser = currentUser || {};
        }
        currentUser = user;

        $cookieStore.put('currentUser', currentUser);
    }

    this.login = function(arg1, arg2) {
        if (arg2 == undefined) {
            var token = arg1;
            storeToken(token);
        } else {
            var defer = $q.defer(),
                email = arg1,
                password = arg2;

            $http.post('/login', {
                email: email,
                password: password
            }).success(function(response, status) {
                if (response.status == 'success') {
                    storeUser(response.data.user);
                    defer.resolve({
                        authenticated: true,
                        token: response.data.user.token
                    });
                } else {
                    defer.reject({
                        authenticated: false,
                        message: response.message
                    });
                }
            });

            return defer.promise;
        }

    }

    this.authenticated = function() {
        var currentUser = $cookieStore.get('currentUser');
        return !!currentUser && !!currentUser.token;
    }
}

services.service('AuthService', AuthService);