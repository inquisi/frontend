describe('registerController', function() {

    var scope,
        userSpy,
        authServiceSpy,
        registerController;

    beforeEach(function() {
        module('inquisi');
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
        expect(scope.user.role).toBe("student");
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

// it('should catch invalid emails', function() {

// });

// it('should pass valid emails through', function() {

// });

// it('should redirect users to the dashboard upon submitting a valid form', function() {

// });