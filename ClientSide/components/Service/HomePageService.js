app.service('homePageService', ['$http', function ($http) {
    let serverUrl = 'http://localhost:3000/';
    this.login = function (item) {
        return $http.post(serverUrl + 'users/login', item);
    }
    this.register = function (item) {
        console.log(item)
        return $http.post(serverUrl + 'users/register', item);
    }
    this.getVerifyQuestion = function (item) {
        console.log(item)
        return $http.get(serverUrl + 'users/getVerificationQuestions',{params:item});
    }
    this.getPass = function (item) {
        console.log(item)
        return $http.post(serverUrl + 'users/getPassword',item);
    }
    this.getPoi = function (item) {
        return $http.get(serverUrl + "POI/getPOI/"+item);
    };
    this.getPicture=function (item) {
        return $http.get(serverUrl+"POI/getPicture",{params:item})
    }
    this.randomPopularPoi = function (item) {
        console.log(item)
        return $http.get(serverUrl + 'POI/getPopularPOI' ,{params: item});
    }
    this.updateViews=function (item) {
        return $http.post(serverUrl+"POI/updateViews/"+item)
    }
    this.authonticate=function (item) {
        return $http.get(serverUrl+'users/authonticateToken/'+item)
    };
}])