function CourseService($http, $cookieStore, AuthService, $q) {
    this.enrollInCourse = function(enrollmentToken) {
        if (AuthService.authenticated()) {
            return $http.post('/courses/enroll', {
                enrollment_token: enrollmentToken
            });
        } else {
            return $q.reject();
        }
    }
}

services.service('CourseService', ['$http', '$cookieStore', 'AuthService', '$q', CourseService]);