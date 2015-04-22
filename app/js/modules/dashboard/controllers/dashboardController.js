function dashboardController($scope, Course, $modal, $window, $cookieStore) {
    $scope.open = false;
    $scope.currentUser = $cookieStore.get('currentUser');


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

    // $scope.$watch('courses', function() {
    //     if ($scope.courses.length < 1 || $scope.courses.length == undefined) {
    //         $scope.coursePrompt = true;
    //     } else {
    //         $scope.coursePrompt = false;
    //     }
    // });

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

dashboard.controller('dashboardController', ['$scope', 'Course', '$modal', '$window', '$cookieStore', dashboardController]);