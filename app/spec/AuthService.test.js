describe('AuthService', function() {

	var $rootScope, AuthService, $httpBackend, authRequestHandler;

	beforeEach(function() {
		module('inquisi');
		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			AuthService = $injector.get('AuthService');
			$httpBackend = $injector.get('$httpBackend');
		});
	});

	afterEach(function() {
		// $httpBackend.verifyNoOutstandingExpectation();
		// $httpBackend.verifyNoOutstandingRequest();
	});

	describe('login', function() {
		var userHash;

		beforeEach(function() {
			userHash = {
				email: 'ntmoore@knox.edu',
				password: 'root'
			};
		});

		it("should post the email and password to the server", function() {
			$httpBackend.expectPOST('/login', JSON.stringify(userHash)).respond(200, '');
			AuthService.login(userHash.email, userHash.password);
			$httpBackend.flush();
		});

		it("should return an error if the request response is a failure", function() {
			$httpBackend.expectPOST('/login', JSON.stringify(userHash)).respond(200, {
				status: 'failure',
				message: 'Email or password is incorrect',
				data: ''
			});
			var response = AuthService.login(userHash.email, userHash.password);
			expect(response).toBe(false);
			// TODO set scope user ngmodel invalid and message
			$httpBackend.flush();
		});

		it("should return a token if the request response is a success", function() {

		});

	});


});