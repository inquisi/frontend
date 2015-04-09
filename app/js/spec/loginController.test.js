describe('loginController', function() {

    var AuthService,
        $rootScope,
        $q,
        loginController,
        $state,
        $httpBackend,
        user;

    beforeEach(function() {
        module('inquisi');
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            AuthService = $injector.get('AuthService');
            $controller = $injector.get('$controller');
            $q = $injector.get('$q');
            $httpBackend = $injector.get('$httpBackend');
            $state = $injector.get('$state');
            // spyOn($state, 'go');

            scope = $rootScope.$new();
            user = scope.user = {
                email: 'ntmoore@knox.edu',
                password: 'password'
            };
            loginController = $controller("loginController", {
                $scope: scope,
                $state: $state
            });
        });
    });

    xdescribe('User Login', function() {
        var defer, promise;

        beforeEach(function() {
            defer = $q.defer();
            promise = defer.promise;

            spyOn($state, 'go');
            spyOn(AuthService, 'login').and.returnValue(promise);
        });

        it('should send user.email and user.password to AuthService', function() {
            scope.submit();
            expect(AuthService.login).toHaveBeenCalledWith(user.email, user.password);
        });

        it('should redirect us to "/" when AuthService returns success', function() {
            defer.resolve({
                authenticate: true,
                token: '12345'
            });
            scope.submit();
            expect($state.go).toHaveBeenCalledWith('/');
        });

        it('should set $scope.errorMessage to "Email or password is invalid." when AuthService returns failure', function() {
            defer.reject({
                authenticate: false,
                message: 'Email or password are invalid'
            });
            $httpBackend.expectGET("states/loginPanel.html").respond();
            $httpBackend.expectGET("states/loginPanel/login.html").respond();
            $rootScope.$apply();
            scope.submit();
            expect(scope.errorMessage).toBe('Email or password are invalid');
        });

    });
});