
app.controller('PoiCtrl', ['$location', '$window','$scope', '$routeParams' ,'homePageService', function ($location,$window, $scope, $routeParams,homePageService) {

     $scope.init = function ($event)
     {
         homePageService.updateViews($routeParams.showName)
             .then(function (response) {
             }, function (response) {

             });
        homePageService.getPoi($routeParams.showName)
            .then(function (response) {
              $scope.poi= response.data;
                let pic=response.data.picture;
                 let   pos=pic.lastIndexOf("/");
               let picture=pic.substring(pos+1,pos.length);
                $scope.poi.image= "\\ClientSide\\pictures\\"+picture+".jpg";
            }, function (response) {

            });

     }


 }]);
