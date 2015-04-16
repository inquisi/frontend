describe('States', function() {
    var $rootScope,
        $state,
        AuthService,
        $httpBackend,
        $templateCache;

    beforeEach(function() {
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $state = $injector.get('$state');
            AuthService = $injector.get('AuthService');
            $httpBackend = $injector.get('$httpBackend');
            $location = $injector.get('$location');

            $templateCache = $injector.get('$templateCache');
            $templateCache.put('states/loginPanel.html', '');
            $templateCache.put('states/loginPanel/login.html', '');
            $templateCache.put('states/dashboard.html', '');
            $templateCache.put('states/dashboard/home.html', '');
            $templateCache.put('states/dashboard/courses.html', '');
            $templateCache.put('states/dashboard/students.html', '');
            $templateCache.put('states/dashboard/coursesDetail.html', '');
        });
    });

    describe('that require authentication', function() {
        it('when not logged in should redirect the user to /login and add a ref param', function() {
            spyOn(AuthService, 'authenticated').and.returnValue(false);

            $state.go('dashboard.home')
            $rootScope.$digest();

            expect($state.current.name).toBe('loginPanel.login');
            expect($rootScope.redirectAfterLogin).toBe('dashboard.home');
        });
    });

    describe('loginPanel.login', function() {
        it('should redirect to dashboard.home when logged in', function() {
            spyOn(AuthService, 'authenticated').and.returnValue(true);

            $state.go('loginPanel.login');
            $rootScope.$digest();

            expect($state.current.name).toBe('dashboard.home');
        });
    });
});