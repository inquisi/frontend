describe('CourseService', function() {

    var $rootScope,
        $httpBackend,
        CourseService,
        authRequestHandler,
        $q,
        $http,
        AuthService,
        $cookieStore;

    beforeEach(function() {
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            AuthService = $injector.get('AuthService');
            $httpBackend = $injector.get('$httpBackend');
            $http = $injector.get('$http');
            $q = $injector.get('$q');
            $cookieStore = $injector.get('$cookieStore');

            CourseService = $injector.get('CourseService');
        });
    });

    describe('enrollInCourse', function() {
        beforeEach(function() {
            spyOn(AuthService, 'authenticated').and.returnValue($q.when({
                authenticated: true,
                token: '123abc'
            }));
            $cookieStore.put('currentUser', {
                token: '123abc'
            });
            $httpBackend.expectPOST(
                'http://localhost:3000/courses/enroll?token=123abc',
                JSON.stringify({
                    enrollment_token: '123456'
                })).respond(200, JSON.stringify({
                status: 'success',
                message: "You've been enrolled",
                data: {}
            }));
        });

        it("should make a request to /courses/enroll with an enrollment token", function() {
            CourseService.enrollInCourse('123456');
            $httpBackend.flush();
        });
    });
});