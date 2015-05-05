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
        var response;
        beforeEach(function() {
            var token = '123abc';

            response = {
                status: 'success',
                message: "You've been enrolled",
                data: {
                    course: {
                        name: "Course Name",
                        start: new Date().toString(),
                        finish: new Date().toString(),
                        id: 1
                    }
                }
            };
            spyOn(AuthService, 'authenticated').and.returnValue($q.when({
                authenticated: true,
                token: token
            }));
            $cookieStore.put('currentUser', {
                token: token
            });
            $httpBackend.expectPOST(
                'http://localhost:3000/courses/enroll?token=123abc',
                JSON.stringify({
                    enrollment_token: '123456'
                })).respond(200, JSON.stringify(response));
        });

        it("should make a request to /courses/enroll with an enrollment token", function() {
            CourseService.enrollInCourse('123456');
            $httpBackend.flush();
        });

        it('should return a promise to be resolved with the result of the http request', function() {
            var result;
            CourseService.enrollInCourse('123456').then(function(r) {
                result = r.data;
            });
            $httpBackend.flush();
            $rootScope.$apply();

            expect(result).toEqual(response)
        });
    });
});