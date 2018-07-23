app.service('POIService', ['$http', function ($http) {
    let serverUrl = 'http://localhost:3000/';
    this.get2PopularPOIByUserCat = function () {
        return $http.get(serverUrl + 'POI/reg/get2PopularByUserCat');
    }
    this.getLastUplodPOI=function () {
        return $http.get(serverUrl + 'POI/reg/getSavedPOI');
    }
    this.getAllPoi=function()
    {
        return $http.get(serverUrl+'POI/getAllPOI');
    }
    this.saveFavToDb=function(item)
    {
        return $http.post(serverUrl+'POI/reg/savePOIToDb',item)
    }
    this.deletePOIFromFavo=function(item)
    {
        return $http.delete(serverUrl+'POI/reg/deletePOIFromFavorits/'+item)
    }
    this.getPoiReview=function(item)
    {
        return $http.get(serverUrl+'POI/getPoiReviews/'+item)
    }
    this.postReview=function(item)
    {
        return $http.post(serverUrl+'POI//reg/postPOIReviwe',item)

    }
    this.postRank=function(item)
    {
        return $http.post(serverUrl+'POI//reg/postPOIRank',item)
    }

}])