function dashboardController($scope, Course) {
    $scope.open = false;
    $scope.logoSmall = true;
    $scope.courseModalVisible = false;
    $scope.mobile = true;

    $scope.toggleLogo = function() {
        if ($scope.logoSmall) {
            $scope.logoSmall = false;
        } else {
            $scope.logoSmall = true;
        }
    }

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

    $scope.showCourseModal = function() {
        $scope.courseModalVisible = true;
    }

    $scope.closeCourseModal = function() {
        $scope.courseModalVisible = false;
    }
}

dashboard.controller('dashboardController', ['$scope', 'Course', dashboardController]);