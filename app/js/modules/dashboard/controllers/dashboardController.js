function dashboardController($scope, courses, Course, $modal, $window, $cookieStore) {
    $scope.open = false;
    $scope.currentUser = $cookieStore.get('currentUser');

    $scope.courses = courses.data;

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
    $scope.openCourseModal = function(size) {

        var modalInstance = $modal.open({
            templateUrl: 'states/partials/addCourseModal.html',
            controller: 'addCourseModalInstanceCtrl',
            size: size,
            resolve: {
                course: function() {
                    return $scope.course;
                }
            }
        });

        modalInstance.result.then(function(course) {
            addCourse(course);
        }, function() {});

        var addCourse = function(course) {
            Course.save(course, function(response) {
                if (response.status == "success") {
                    $scope.courses.push(response.data.course);
                }
            });
        }


    }
}

dashboard.controller('dashboardController', ['$scope', 'courses', 'Course', '$modal', '$window', '$cookieStore', dashboardController]);