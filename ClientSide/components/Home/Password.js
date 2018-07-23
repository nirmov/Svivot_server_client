app.controller('Password', ['$location', '$window','$scope', 'homePageService', function ($location,$window, $scope, homePageService) {
    $scope.initiate = function ($event)
    {
        disableView();
    }
    $scope.getQuestion = function ($event) {
        disableView();
        let userName = {
            userName: $scope.userName
        }
        homePageService.getVerifyQuestion(userName)
            .then(function (response) {
                if (response.data.ver_quest1 != undefined) {
                    enavleView();
                    $scope.firstQuestion = response.data.ver_quest1;
                    $scope.secondQuestion = response.data.ver_quest2;
                }
                if (response.length == 0) {
                    $scope.firstQuestion = "UserName does not exist";
                }
            }, function (response) {

                $scope.firstQuestion = "UserName does not exist";
            });
        $scope.firstQuestion = "UserName does not exist";


    }
    let disableView = function ()
    {
        $scope.styleFirstAnswer = {'visibility': 'hidden'};
        $scope.styleSecondAnswer = {'visibility': 'hidden'};
        $scope.GetPasBut = {'visibility': 'hidden'};
        $scope.secStyle = {'visibility': 'hidden'};
    }
    let enavleView = function ()
    {
        $scope.styleFirstAnswer = {'visibility': 'visible'};
        $scope.styleSecondAnswer = {'visibility': 'visible'};
        $scope.GetPasBut = {'visibility': 'visible'};
        $scope.secStyle = {'visibility': 'visible'};

    }

    $scope.GetPass=function ($event) {

        let data={
            userName: $scope.userName,
            verifyAnswer1: $scope.firstAnswer,
            verifyAnswer2: $scope.secondAnswer
        }
        homePageService.getPass(data)
            .then(function (response) {
                $scope.Pass=response.data;
            }, function (response) {


            });
    }

}]);