function dashboardController($scope, Course, $modal, $window) {
    $scope.open = false;
    $scope.courseOptsVisible = false;

    // Initiate courses
    $scope.courses = [{
        id: '1234',
        name: 'CS 141',
        date: {
            start: '3/09/2015',
            end: '6/01/2015',
        }
    }, {
        id: '1235',
        name: 'CS 292',
        date: {
            start: '9/01/2016',
            end: '11/12/2016'
        }
    }];

    // $scope.removeCourse = function(index) {
    //     $scope.courses.splice(index, 1);
    // }

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

        modalInstance.result.then(function(newCourse) {
            $scope.courses.push(newCourse)
        }, function() {});

        Course.query(function(response) {
            $scope.courses = response.data;
        })

        $scope.addCourse = function() {
            Course.save({
                name: $scope.course.name,
                start: $scope.course.start,
                finish: $scope.course.finish
            }, function(response) {
                if (response.status == "success") {
                    $scope.courses.push(response.data.course);
                }
            });

            $scope.courseModalVisible = false;
        }


    }
}

dashboard.controller('dashboardController', ['$scope', 'Course', '$modal', '$window', dashboardController]);