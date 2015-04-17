function dashboardController($scope) {
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

    $scope.addCourse = function() {
        $scope.courses.push({
            id: '1568',
            name: $scope.course.name,
            date: {
                start: $scope.course.date.start,
                end: $scope.course.date.end
            }
        });

        console.log($scope.course.date.start);

        $scope.course.name = "";
        $scope.course.date.start = "";
        $scope.course.date.end = "";


        $scope.courseModalVisible = false;
    }

    $scope.showCourseModal = function() {
        $scope.courseModalVisible = true;
    }

    $scope.closeCourseModal = function() {
        $scope.courseModalVisible = false;
    }
}

dashboard.controller('dashboardController', ['$scope', dashboardController]);