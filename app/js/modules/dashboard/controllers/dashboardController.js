function dashboardController($scope, courses, Course, allUserSessions, $modal, $window, $cookieStore, screenmatch, CourseService, currentUser) {
    $scope.open = false;
    $scope.currentUser = currentUser;
    $scope.courses = courses.data;
    $scope.sessions = allUserSessions.data;

    // attach an active session id to active courses
    $scope.courses = _.map($scope.courses, function(course) {
        if (course.active) {
            course.activeSessionId = _.result(_.findWhere($scope.sessions, {
                course_id: course.id
            }), 'id');
        }
        return course;
    });

    $scope.openMenu = function() {
        if ($scope.open) {
            return;
        } else {
            $scope.open = true;
        }
    }

    $scope.closeMenu = function() {
        if (!$scope.open) {
            return;
        } else {
            $scope.open = false;
        }
    }

    $scope.toggleMenu = function() {
        if ($scope.open) {
            $scope.closeMenu();
        } else {
            $scope.openMenu();
        }
    }


    // Modal stuff
    $scope.addCourseModal = function(size) {
        var addCourse = function(course) {
            Course.save(course, function(response) {
                if (response.status == "success") {
                    $scope.courses.push(response.data.course);
                }
            });
        };

        var modalInstance = $modal.open({
            templateUrl: 'states/partials/addCourseModal.html',
            controller: 'addCourseModalInstanceCtrl',
            resolve: {
                course: function() {
                    return $scope.course;
                }
            }
        });

        modalInstance.result.then(function(course) {
            addCourse(course);
        }, function() {});
    };

    $scope.enrollInCourseModal = function() {
        var modalInstance = $modal.open({
            templateUrl: 'states/partials/enrollInCourseModal.html',
            controller: 'enrollInCourseModalInstanceController',
        });

        modalInstance.result.then(function(enrollmentToken) {
            CourseService.enrollInCourse(enrollmentToken).then(function(response) {
                if (response.status == "success") {
                    var course = response.data.data.course;
                    $scope.courses.push(course);
                }
            });
        });
    }
}

dashboard.controller('dashboardController', ['$scope', 'courses', 'Course', 'allUserSessions', '$modal', '$window', '$cookieStore', 'screenmatch', 'CourseService', 'currentUser', dashboardController]);