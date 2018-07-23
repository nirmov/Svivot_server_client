app.controller('aboutController',['$http','$window','$location', '$scope', function ($http,$window, $location, $scope) {

    $scope.goToHistory_func = function () {
        $location.path('/history');
        $location.replace();
    }

}]);
