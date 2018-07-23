app.controller('LoginCtrl', ['$location', '$window','$scope', 'homePageService','$rootScope','setHeaderToken','localStorageModel','POIService', function ($location,$window, $scope, homePageService,$rootScope,setHeaderToken,localStorageModel,POIService) {

        let vm = this;
        vm.user = undefined;
        vm.userLogin = undefined;
        $scope.submit = function($event) {
            // our function bod
            //
            vm.userLogin =
                {
                    userName: $scope.userName,
                    password:  $scope.password
                };
            homePageService.login(vm.userLogin)
                .then(function (response) {
                    if (response.data.token==undefined) {
                       $scope.statusLog=response.data;
                    }
                    else {
                        console.log(response.data.token)
                        $scope.statusLog="Login Succeed";
                        $rootScope.connect=true;
                        $rootScope.username=$scope.userName;
                        setHeaderToken.set(response.data.token);
                        localStorageModel.addLocalStorage("token",response.data.token);
                        POIService.getLastUplodPOI()
                            .then(function (response) {
                                let x=[];
                                let y=[];
                                for (let i=0;i<response.data.length;i++)
                                {
                                    if (response.data!="there are no saved categories") {
                                        x.push(response.data[i].ID);
                                        y.push(response.data[i].ID);
                                    }
                                }
                                $rootScope.favorites=x;
                                $rootScope.originalFavorites=y;
                            }, function (response) {

                            });
                        $location.path('/');
                        $location.replace();
                        console.log(token)
                    }
                }, function (response) {
                    console.log(vm.user);
                    console.log(response.data.error)
                });

        }

    $scope.initiate=function()
    {
        let x=5;
    }

    }]);
