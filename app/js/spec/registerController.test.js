describe('registerController', function() {

    var scope,
        userSpy,
        authServiceSpy,
        $state,
        registerController;

    beforeEach(function() {
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            userSpy = jasmine.createSpyObj('User', ['create']);
            authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
            $state = jasmine.createSpyObj('$state', ['go']);
            registerController = $controller("registerController", {
                $scope: scope,
                User: userSpy,
                AuthService: authServiceSpy,
                $state: $state
            });
        });
    });

    it("should set role to student by default", function() {
        expect(scope.user.role).not.toBe(null);
        expect(scope.user.role).toBe("Student");
    });

    it("should call AuthService.login with an email and password and then go to dashboard.home", function() {
        userSpy.create.and.callFake(function(data, successCallback, failureCallback) {
            successCallback({
                status: 'success',
                data: {
                    user: {
                        email: "test@gmail.com",
                        password: "password"
                    }
                }
            });
        });

        inject(function($injector) {
            $q = $injector.get('$q');
            authServiceSpy.login.and.returnValue($q.when());
        });

        inject(function(AuthService) {
            scope.submit();
            expect($state.go).toHaveBeenCalledWith('dashboard.home');
        });
    });

    // it("should call User.create ", function() {
    //     expect(scope.user.role).not.toBe(null);
    //     expect(scope.user.role).toBe("student");
    // });
});