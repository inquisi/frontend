describe('States', function() {
    var $rootScope,
        $state,
        AuthService,
        $httpBackend,
        $templateCache;
    var injectEverything = function($injector) {
        $rootScope = $injector.get('$rootScope');
        $state = $injector.get('$state');
        AuthService = $injector.get('AuthService');
        $httpBackend = $injector.get('$httpBackend');
        $location = $injector.get('$location');

        $templateCache = $injector.get('$templateCache');
        $templateCache.put('states/loginPanel.html', '');
        $templateCache.put('states/loginPanel/login.html', '');
        $templateCache.put('states/loginPanel/loginPanel.html', '');
        $templateCache.put('states/dashboard.html', '');
        $templateCache.put('states/dashboard/home.html', '');
        $templateCache.put('states/dashboard/courses.html', '');
        $templateCache.put('states/dashboard/students.html', '');
        $templateCache.put('states/dashboard/coursesDetail.html', '');
        $templateCache.put('states/dashboard/sessionsEdit.html', '');
    }


    describe('that require authentication', function() {
        beforeEach(function() {
            inject(injectEverything);
        });

        it('when not logged in should redirect the user to /login and add a ref param', function() {
            spyOn(AuthService, 'authenticated').and.returnValue(false);

            $state.go('dashboard.home')
            $rootScope.$digest();

            expect($state.current.name).toBe('loginPanel.login');
            expect($rootScope.redirectAfterLogin).toBe('dashboard.home');
        });
    });

    describe('loginPanel.login', function() {
        beforeEach(function() {
            inject(injectEverything);
        });
        it('should redirect to dashboard.home when logged in', function() {
            $httpBackend.expectGET('http://localhost:3000/courses').respond(200, JSON.stringify([]));
            $httpBackend.expectGET('http://localhost:3000/sessions').respond(200, JSON.stringify([]));
            spyOn(AuthService, 'authenticated').and.returnValue(true);
            spyOn($state, 'go').and.callThrough();

            $state.go('loginPanel.login');
            $rootScope.$digest();

            expect($state.go).toHaveBeenCalledWith('dashboard.home');
        });
    });

    xdescribe('sessions.edit', function() {
        it('should redirect to sessions.read if the given session is in the past', function() {
            module(function($provide) {
                $provide.service('session', function() {
                    return {
                        hello: 'world'
                    }
                });
            });
            inject(injectEverything);
            spyOn(service).and.returnValue(function() {
                return {
                    hello: 'world'
                }
            })
            $httpBackend.expectGET('http://localhost:3000/courses').respond(200, JSON.stringify([]));
            $httpBackend.expectGET('http://localhost:3000/sessions').respond(200, JSON.stringify([]));
            spyOn(AuthService, 'authenticated').and.returnValue(true);
            spyOn($state, 'go').and.callThrough();

            $state.go('sessions.edit');
            $rootScope.$digest();

            expect($state.go).toHaveBeenCalledWith('sessions.read');
        });
    });

    xdescribe('sessions.answer', function() {
        it('should trigger a student.join_session event on enter', function() {

        });

        it('should trigger a student.leave_session event on exit', function() {

        });
    });
});