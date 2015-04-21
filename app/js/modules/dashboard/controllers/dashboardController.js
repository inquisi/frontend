function dashboardController($scope, Course, $modal, $window) {
    $scope.open = false;
    $scope.courseOptsVisible = false;

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

    $scope.courses = Course.query(function(response) {
        $scope.courses = response.data;
    });

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

dashboard.controller('dashboardController', ['$scope', 'Course', '$modal', '$window', dashboardController]);