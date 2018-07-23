app.controller('homeCtrl',['$http','$window','$location', '$scope', 'homePageService','POIService','ModalService', function ($http,$window, $location, $scope, homePageService,POIService,ModalService) {

    $scope.goToReg_func = function () {
        $location.path('/register');
        $location.replace();
    }
    $scope.goToLogin_func = function () {
        $location.path('/login');
        $location.replace();
    }
    $scope.initiateConnected=function() {
        POIService.get2PopularPOIByUserCat()
            .then(function (response) {

                for (let i =0;i<response.data.length;i++)
                {
                    let param={ID: response.data[0][i].ID}
                  homePageService.getPicture(param).then(function (response1)
                    {
                        var pic = response1.data[0].picture;
                        pos = pic.lastIndexOf("/");
                        picture = pic.substring(pos + 1, pos.length);
                        response.data[0][i].picture="\\ClientSide\\pictures\\" + picture + ".jpg";
                        if (i==response1.data.length)
                        {
                            var ans = [];
                            ans.push(response.data[0][0]);
                            ans.push(response.data[0][1]);
                            $scope.poiCategory=ans;
                        }
                    },function (respons) {

                    });
                }
            }, function (response) {
            });

        POIService.getLastUplodPOI()
            .then(function (response) {

                var now=[];
                let temp={picture:"\\ClientSide\\pictures\\sorry.jpg"}
                let temp1={picture:"\\ClientSide\\pictures\\sorry.jpg"}
                now.push(temp);
                now.push(temp1);
                $scope.poiLastUpload = now;
                var ans = [];
                for (let i=0;i<Math.min(2,response.data.length) ;i++) {
                    let param = {ID: response.data[i].ID}
                    homePageService.getPicture(param).then(function (response1) {
                        var pic = response1.data[0].picture;
                        pos = pic.lastIndexOf("/");
                        picture = pic.substring(pos + 1, pos.length);
                        response.data[i].picture = "\\ClientSide\\pictures\\" + picture + ".jpg";
                        ans.push(response.data[i]);
                        if (i==response.data.length-1||i==1) {
                            if (i==0)
                                ans.push(temp);
                            if (i<=1)
                                $scope.poiLastUpload = ans;
                        }

                    }, function (respons) {

                    });
                }
            }, function (response) {
            });

    }
    $scope.initiate=function() {
            let params = {
                amount: 3,
                rank: 0
            };

            homePageService.randomPopularPoi(params)
                .then(function (response) {
                    window.POIs=response.data;
                });
        $scope.$watch(
            function() {
                return window.POIs;
            },
            function(newValue, oldValue) {
                if(window.POIs !== undefined) {
                    $scope.POIs = window.POIs;
                    for (let i = 0; i < newValue.length; i++) {
                        var pic = $scope.POIs[i].picture;
                        pos = pic.lastIndexOf("/");
                        picture = pic.substring(pos + 1, pos.length);
                        $scope.POIs[i].picture = "\\ClientSide\\pictures\\" + picture + ".jpg";

                    }
                }
            });


            }
    $scope.editText=ModalService.openTextEditModal;

}]);
