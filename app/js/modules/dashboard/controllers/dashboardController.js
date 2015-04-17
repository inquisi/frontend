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

    $scope.reverse = function(array) {
        var copy = [].concat(array);
        return copy.reverse();
    }


    $scope.courses = [{
        id: '1234',
        name: 'CS 141',
        term: 'SP 2015'
    }, {
        id: '1235',
        name: 'CS 292',
        term: 'FA 2015'
    }];

    $scope.addCourse = function() {
        $scope.courses.push({
            id: '1568',
            name: $scope.course.name,
            term: $scope.course.term
        });
        $scope.course.name = "";
        $scope.course.term = "";
        $scope.course.startDate = "";
        $scope.course.endDate = "";

        console.log($scope.course);
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