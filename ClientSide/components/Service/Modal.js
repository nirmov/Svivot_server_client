app.factory('ModalService', function($modal) {
    return {

        openTextEditModal: function(item) {
            var modalInstance = $modal.open({
                templateUrl: 'components/modal.html',
                backdrop: 'static',
                controller: function($scope, $modalInstance, $sce, item, homePageService,POIService,$rootScope,$route) {
                    var review="";
                    var rank=0;
                    $scope.clone=item;
                    homePageService.getPoi(item)
                        .then(function (response) {
                            $scope.poi= response.data;
                            let pic=response.data.picture;
                            let   pos=pic.lastIndexOf("/");
                            let picture=pic.substring(pos+1,pos.length);
                            $scope.poi.image= "\\ClientSide\\pictures\\"+picture+".jpg";


                        }, function (response) {

                        });
                    POIService.getPoiReview(item)
                        .then(function (response) {
                            var review=[];
                            if (!(response.data=="results not exist")) {
                                for (let i = 0; i < Math.min(2, response.data.length); i++) {
                                    review.push(response.data[i]);
                                }
                                $scope.reviews = review;
                            }
                        }, function (response) {

                        });
                    homePageService.updateViews(item)
                        .then(function (response) {
                        }, function (response) {

                        });
                    $scope.close = function() {
                        $modalInstance.dismiss('cancel');
                        $route.reload();
                    };

                    $scope.Submit = function() {
                        if (review=="" || rank>5 || rank<0)
                        {
                            alert("rank must be between 0 to 5 and review must be written")
                            return;
                        }
                        let data={
                            id:item,
                            reviwe: review
                        }
                        POIService.postReview(data)
                            .then(function(response){
                                if (response.data=="user name allready ranked this POI")
                                {
                                    alert("Can not add review and rank , you ranked and rewied this POI");
                                }
                                else
                                    alert("rank and review uploaded");
                            },function(response){

                            });
                        data={
                            id:item,
                            rank: rank
                        }
                        POIService.postRank(data).then(function(response){
                            $route.reload();
                        },function(response){



                        })

                    };

                    $scope.isFavorite=function (id) {
                        return  $rootScope.favorites.indexOf(id)!=-1;
                    }
                    $scope.rankChanged=function (rankNew) {
                        rank=rankNew;
                    }
                    $scope.reviewChanged=function (reviewNew) {
                        review=reviewNew;
                    }
                    $scope.addFavorite=function (id) {
                        var index=$rootScope.favorites.indexOf(id);
                        if (index==-1)
                            $rootScope.favorites.push(id);
                        else
                            $rootScope.favorites.splice(index,1);
                    }
                },
                size: 'lg',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });

        }
    };
});