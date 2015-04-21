describe('registerController', function() {

	var scope,
		userSpy,
		authServiceSpy,
		registerController;

	beforeEach(function() {
		inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			userSpy = jasmine.createSpyObj('User', ['create']);
			authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
			registerController = $controller("registerController", {
				$scope: scope,
				User: userSpy,
				AuthService: authServiceSpy
			});
		});
	});

	it("should set role to student by default", function() {
		expect(scope.user.role).not.toBe(null);
		expect(scope.user.role).toBe("Student");
	});

	it("should call AuthService.login with a response token", function() {
		userSpy.create.and.callFake(function(data, successCallback, failureCallback) {
			successCallback({
				status: 'success',
				data: {
					user: {
						token: 'token12345'
					}
				}
			});
		});

		inject(function(AuthService) {
			scope.submit();
			expect(authServiceSpy.login).toHaveBeenCalled();
		});
	});

	// it("should call User.create ", function() {
	//     expect(scope.user.role).not.toBe(null);
	//     expect(scope.user.role).toBe("student");
	// });
});