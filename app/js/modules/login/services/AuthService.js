function AuthService($http, $q) {
	this.login = function(email, password) {
		var defer = $q.defer();

		$http.post('/login', {
			email: email,
			password: password
		}).success(function(response, status) {
			if (response.status == 'success') {
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

login.service('AuthService', AuthService);