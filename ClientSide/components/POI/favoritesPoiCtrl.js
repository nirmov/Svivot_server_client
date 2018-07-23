app.controller('favoritesPoiCtrl', ['$location','$http', '$window','$scope','POIService','$rootScope','ModalService','$filter' ,function ($location,$http,$window, $scope, POIService, $rootScope,ModalService,$filter) {
    $scope.categories=[{name:'all'}, {name: 'resturant'},{name: 'Museum'},{name: 'market'},{name: 'night life'}];
    let poiArray=[];
    var sortDic = {};
    $scope.initiate = function ($event)
    {
        $scope.sortBy="";
        $scope.favoritesPoi=[];
        
        POIService.getAllPoi()
            .then(function (response) {
                for (let i=0;i<response.data.length;i++) {
                    let pic = response.data[i].picture;
                    let pos = pic.lastIndexOf("/");
                    let picture = pic.substring(pos + 1, pos.length);
                    response.data[i].picture= "\\ClientSide\\pictures\\" + picture + ".jpg";
                }
                let tempFav=response.data;
                for(let i=0;i<tempFav.length;i++)
                {
                    for(let j=0;j<$rootScope.favorites.length;j++)
                    {
                        if(tempFav[i].ID ==$rootScope.favorites[j] )
                        {
                            $scope.favoritesPoi.push(tempFav[i]);
                        }

                    }

                }

            }, function (response) {

            });
    }

    $scope.sortByRank=function(){
        $scope.sortBy="rank"
        $scope.favoritesPoi.sort(function(a, b){return parseFloat(b.rank)-parseFloat(a.rank)});

    }
    $scope.sortByUser=function(){
        $scope.sortByHand="user"

    }
    $scope.catChanged=function (selectedCategory) {
        if (selectedCategory=="all")
            $scope.cat=undefined;
        else
            $scope.cat=selectedCategory;
        $scope.item.name=selectedCategory;
    }
    $scope.saveToFavorites=function(){
        for(let i=0;i<$scope.favoritesPoi.length;i++)
        {
            var id=$scope.favoritesPoi[i].ID;
            var index=$rootScope.originalFavorites.indexOf(id);
            if (index==-1)
            {
                let data={
                    id: id
                }
                POIService.saveFavToDb(data).then(function(response){},function(response){});
                $rootScope.originalFavorites.push(id);
            }
        }
    }
    $scope.removeFromFavorites=function(poi_id)
    {
        for(let i=0;i<$rootScope.originalFavorites.length;i++)
            if($rootScope.originalFavorites[i] == poi_id)
            {
                let data=poi_id;

                POIService.deletePOIFromFavo(data).
                then(function(response){
                    let j=findWithAttr($scope.favoritesPoi,"ID",data);
                    if(j!=-1)
                    {
                        $scope.favoritesPoi.splice(j,1);
                        $rootScope.originalFavorites
                        let index= $rootScope.favorites.indexOf(data);
                        $rootScope.favorites.splice(index,1);
                         index= $rootScope.originalFavorites.indexOf(data);
                        $rootScope.originalFavorites.splice(index,1);
                    }
                },function(response){

                });


            }
    }
    function findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            let ID=array[i].ID;
            let val=parseInt(value);
            if(ID==val) {
                return i;
            }
        }
        return -1;
    }
   $scope.editText=ModalService.openTextEditModal;
    $scope.sortByUser = function($event) {
        var array=[];
        for (var key in sortDic)
            array.push(sortDic[key]);
        var ob=amountOfOccurance(array);
        var canSort=true;
        for (let i=0;i<ob[1].length;i++)
        {
            if (ob[1][i]>1||ob[0][i]>$scope.favoritesPoi.length||ob[0][i]<1)
                canSort=false;
        }
        if (ob[1].length<$scope.favoritesPoi.length)
            canSort=false;
        if (canSort)
        {
            for (var key in sortDic) {
                var position= findWithAttr($scope.favoritesPoi,"ID",key);
                $scope.favoritesPoi[position].posUser=(sortDic[key]);
            }
            var itemsSorted  = $filter('orderBy')($scope.favoritesPoi, 'posUser');
            $scope.favoritesPoi=itemsSorted;
            $scope.sortDetail="";

        }
        else
        {
            $scope.sortDetail="Can not sort , please chose 1 position to each POI , position must be from 1 to"+$scope.favoritesPoi.length;
        }
    }

    function amountOfOccurance(arr) {
        var a = [], b = [], prev;

        arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }

        return [a, b];
    }
    $scope.changedInput=function(id,value)
    {
        sortDic[id]=value;
    }
}]);

