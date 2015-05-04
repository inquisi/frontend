function CourseService($http, $cookieStore, AuthService) {
    this.enrollInCourse = function(enrollmentToken) {
        if (AuthService.authenticated()) {
            $http.post('/courses/enroll', {
                enrollment_token: enrollmentToken
            });
        }
    }
}

services.service('CourseService', ['$http', '$cookieStore', 'AuthService', CourseService]);