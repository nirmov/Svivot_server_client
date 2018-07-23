angular.module('citiesApp')
    .controller('myCtrl',['$scope','$rootScope','setHeaderToken','homePageService','localStorageModel','POIService',function ($scope,$rootScope,setHeaderToken,homePageService,localStorageModel,POIService) {
        $scope.initiate=function()
        {
            let token=localStorageModel.getLocalStorage("token");
            homePageService.authonticate(token).then(function (response) {


                if (response.data.success) {
                    $rootScope.username = response.data.username;
                    $rootScope.connect = true;
                    setHeaderToken.set(token);
                    POIService.getLastUplodPOI()
                        .then(function (response) {
                            let x=[];
                            let y=[];
                            for (let i=0;i<response.data.length;i++)
                            {
                                if (response.data!="there are no saved categories"){
                                x.push(response.data[i].ID);
                                y.push(response.data[i].ID);
                                }
                            }
                            $rootScope.favorites=x;
                            $rootScope.originalFavorites=y;
                        }, function (response) {

                        });
                }
                else
                {
                    $rootScope.username="guest";
                    $rootScope.connect=false;
                }
            });
        }

        self = this;


        self.hello = true;

        self.flipHello = function () {
            self.hello = !self.hello
        }
        $scope.logout=function()
        {
            $rootScope.username="guest";
            setHeaderToken.set("");
            localStorageModel.removeFromLocalStorage("token");
            $rootScope.connect=false;
        }
        self.checkNumber = function (number) {
            if (number % 2 == 0)
                return true
            else
                return false
        }

    }]);
