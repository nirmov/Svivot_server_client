app.controller('registerCtrl', ['$location','$http', '$window','$scope', 'homePageService', function ($location,$http,$window, $scope, homePageService) {
    $scope.initiate()
    {
        $scope.cats=[];

    }
    $scope.choseCat=function()
    {
        return $scope.cats.length<2;
    }
    $scope.submit = function ($event) {
        let len=$scope.cats.length;
        if(len<2)
        {
            alert("You need to choose 2 categories");
            return;
        }
        else
        {
            $scope.regCtrl.user.categories=$scope.cats;
            homePageService.register($scope.regCtrl.user)
                .then(function (response) {
                    if(response.data=="success")
                    {
                        alert("Registration succeded")
                        $location.path('/home');
                        $location.replace();
                    }
                    else
                    {
                        alert("Registration failed, userName already exist!")
                    }

                }, function (response) {

                });

        }
    }
    $scope.initiate = function(){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let xmlCountries = xmlhttp.responseXML;   var i; let contri = [];
                let x = xmlCountries.getElementsByTagName("Country");
                for (i = 0; i < x.length; i++) {
                    contri.push(x[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue.toString());
                }
                $scope.countries=contri;
            }
        };
        xmlhttp.open("GET", "./countries.xml", true);
        xmlhttp.send();
    }
    $scope.choosCat = function(cat){
        let i= $scope.cats.indexOf(cat);
        if(i==-1)
        {
            $scope.cats.push(cat);
        }
        else
        {
            $scope.cats.splice(i,1);
        }
    }
}]);

