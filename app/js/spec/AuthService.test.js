describe('AuthService', function() {

	var $rootScope,
		$httpBackend,
		AuthService,
		authRequestHandler,
		$q;

	beforeEach(function() {
		module('inquisi');
		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			AuthService = $injector.get('AuthService');
			$httpBackend = $injector.get('$httpBackend');
			$q = $injector.get('$q');
		});
	});

	afterEach(function() {
		// $httpBackend.verifyNoOutstandingExpectation();
		// $httpBackend.verifyNoOutstandingRequest();
	});

	// function() {
	// 	var deffered = $.deffered();
	// 	asyncTask() {
	// 		doSomeWork()
	// 		if(success) {
	// 			dffered.resolve({"a chunk of data"});
	// 		}
	// 		if(failure) {
	// 			deffered.reject({"another chunk of data"});
	// 		}
	// 	} 
	// 	return deffered.promise();
	// }

	describe('login', function() {
		var userHash;

		beforeEach(function() {
			userHash = {
				email: 'ntmoore@knox.edu',
				password: 'root'
			};
		});

		it("should post the email and password to the server", function() {
			$httpBackend.expectPOST('http://localhost:3000/login', JSON.stringify(userHash)).respond(200, '');
			AuthService.login(userHash.email, userHash.password);
			$httpBackend.flush();
		});

		it("should return an error if the request response is a failure", function() {
			$httpBackend.expectPOST('http://localhost:3000/login', JSON.stringify(userHash)).respond(200, {
				status: 'failure',
				message: 'Email or password is incorrect',
				data: ''
			});
			var authServiceReturn;
			AuthService.login(userHash.email, userHash.password)
				.then(undefined, function(data) {
					authServiceReturn = data;
				});

			// Make sure all the promises return
			$rootScope.$apply();
			$httpBackend.flush();

			expect(authServiceReturn).toEqual({
				authenticated: false,
				message: "Email or password is incorrect"
			});
		});

		it("should return a token if the request response is a success", function() {
			$httpBackend.expectPOST('http://localhost:3000/login', JSON.stringify(userHash)).respond(200, {
				status: 'success',
				message: '',
				data: {
					user: {
						token: "12345"
					}
				}
			});
			var authServiceReturn;
			AuthService.login(userHash.email, userHash.password)
				.then(function(data) {
					authServiceReturn = data;
				});

			$rootScope.$apply();
			$httpBackend.flush();

			expect(authServiceReturn).toEqual({
				authenticated: true,
				token: '12345'
			});
		});

	});


});