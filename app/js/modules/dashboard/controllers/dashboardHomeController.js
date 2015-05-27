function dashboardHomeController($scope, $interval, courses, students) {
    $scope.date = new Date;
    $scope.date_time = new Date;

    $scope.courses = courses.data;
    $scope.students = students.data;

    $interval(function() {
        $scope.date_time = Date.now();
    }, 1000);

    $scope.alerts = [{
        type: 'success',
        message: 'Welcome to iNQUiSi!'
    }];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.myData = [{
        "label": "Complete",
        "color": "#5ab1ef",
        "data": [
            ["Jan", 188],
            ["Feb", 183],
            ["Mar", 185],
            ["Apr", 199],
            ["May", 190],
            ["Jun", 194],
            ["Jul", 194],
            ["Aug", 184],
            ["Sep", 74]
        ]
    }, {
        "label": "In Progress",
        "color": "#f5994e",
        "data": [
            ["Jan", 153],
            ["Feb", 116],
            ["Mar", 136],
            ["Apr", 119],
            ["May", 148],
            ["Jun", 133],
            ["Jul", 118],
            ["Aug", 161],
            ["Sep", 59]
        ]
    }, {
        "label": "Cancelled",
        "color": "#d87a80",
        "data": [
            ["Jan", 111],
            ["Feb", 97],
            ["Mar", 93],
            ["Apr", 110],
            ["May", 102],
            ["Jun", 93],
            ["Jul", 92],
            ["Aug", 92],
            ["Sep", 44]
        ]
    }]

}

dashboard.controller('dashboardHomeController', ['$scope', '$interval', 'courses', 'students', dashboardHomeController]);