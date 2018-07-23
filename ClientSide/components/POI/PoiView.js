app.controller('PoiView', ['$location', '$window','$scope', '$rootScope' ,'homePageService','POIService','$filter','ModalService', function ($location,$window, $scope, $rootScope,homePageService,POIService,$filter,ModalService) {
    $scope.categories=[{name:'all'}, {name: 'resturant'},{name: 'Museum'},{name: 'market'},{name: 'night life'}];

    $scope.initiate = function ($event)
    {
        $scope.prot=[];
        POIService.getAllPoi()
            .then(function (response) {
                for (let i=0;i<response.data.length;i++) {
                    let pic = response.data[i].picture;
                    let pos = pic.lastIndexOf("/");
                    let picture = pic.substring(pos + 1, pos.length);
                    response.data[i].posUser=i+1;
                    response.data[i].picture= "\\ClientSide\\pictures\\" + picture + ".jpg";
                }
                $scope.pois=response.data;
            }, function (response) {

            });
    }
    $scope.isFavorite=function (id) {
        return  $rootScope.favorites.indexOf(id)!=-1;
    }
    $scope.addFavorite=function (id) {
        var index=$rootScope.favorites.indexOf(id);
        if (index==-1)
         $rootScope.favorites.push(id);
        else
            $rootScope.favorites.splice(index,1);
    }
    $scope.catChanged=function (selectedCategory) {
        if (selectedCategory=="all")
            $scope.cat=undefined;
        else
            $scope.cat=selectedCategory;
       $scope.item.name=selectedCategory;
    }
    $scope.submit = function($event) {
        var itemsSorted  = $filter('orderBy')($scope.pois, 'rank',true)
        $scope.pois=itemsSorted;
    }


    $scope.editText=ModalService.openTextEditModal;
}]);