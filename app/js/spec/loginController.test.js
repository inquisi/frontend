describe('loginController', function() {

    var AuthService,
        $rootScope,
        $q,
        loginController,
        $state,
        $httpBackend,
        user,
        $templateCache;

    beforeEach(function() {
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            AuthService = $injector.get('AuthService');
            $controller = $injector.get('$controller');
            $q = $injector.get('$q');
            $httpBackend = $injector.get('$httpBackend');
            $state = $injector.get('$state');
            $location = $injector.get('$location');
            $templateCache = $injector.get('$templateCache');

            $templateCache.put('states/dashboard.html', '');
            $templateCache.put('states/dashboard/home.html', '');

            scope = $rootScope.$new();
            user = scope.user = {
                email: 'ntmoore@knox.edu',
                password: 'password'
            };
            loginController = $controller("loginController", {
                $scope: scope,
                $state: $state,
                $location: $location
            });
        });
    });

    describe('User Login', function() {
        var defer, promise;
        // How to test promises
        // 
        // $q.reject and $q.when will create a new promise that is automatically rejected or resolved, respectively
        // That promise should be returned from a mock object
        // Then the function being tested should be called
        // -Then- $rootScope.$apply() should be called to resolve all promises
        // Then you should test your expectations

        beforeEach(function() {
            defer = $q.defer();
            promise = defer.promise;

            spyOn($state, 'go');
            spyOn(AuthService, 'login')
        });

        it('should send user.email and user.password to AuthService', function() {
            AuthService.login.and.returnValue($q.reject({}));
            scope.submit();
            $rootScope.$apply();
            expect(AuthService.login).toHaveBeenCalledWith(user.email, user.password);
        });

        it('should redirect us to "/" when AuthService returns success', function() {
            AuthService.login.and.returnValue($q.when({
                authenticate: true,
                token: '12345'
            }));
            scope.submit();
            $rootScope.$apply();

            expect($state.go).toHaveBeenCalledWith('dashboard.home');
        });

        it('should set $scope.errorMessage to the returned message when AuthService returns a failure', function() {
            AuthService.login.and.returnValue($q.reject({
                authenticate: false,
                message: 'Email or password are invalid'
            }));
            scope.submit();
            $rootScope.$apply();

            expect(scope.errorMessage).toBe('Email or password are invalid');
        });

        it('should redirect to the state in $rootScope.redirectAfterLogin after login success if present', function() {
            $rootScope.redirectAfterLogin = 'redirectHereScope'
            AuthService.login.and.returnValue($q.when({
                authenticate: true,
                token: '12345'
            }));
            scope.submit();
            $rootScope.$apply();
            expect($state.go).toHaveBeenCalledWith('redirectHereScope');
        });
    });
});