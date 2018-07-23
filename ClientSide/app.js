
let token;
let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule','ui.bootstrap']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        templateUrl: 'components/Home/home.html',
        controller : 'homeCtrl as homeCtrl'
    })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutController as abtCtrl'
        })
        .when('/POI/:showName?', {
            templateUrl: 'components/POI/POI.html',
            controller : 'PoiCtrl as PoiCtrl'
        })
        .when('/PoiView', {
            templateUrl: 'components/POI/POIVIEW.html',
            controller : 'PoiView as PoiView'
        })
        .when('/register', {
            templateUrl: 'components/Home/register.html',
            controller : 'registerCtrl as registerCtrl'
        })

        .when('/login', {
            templateUrl: 'components/Home/Login.html',
            controller : 'LoginCtrl as LoginCtrl'
        })
        .when('/password', {
            templateUrl: 'components/Home/Password.html',
            controller : 'Password as Password'
        })
        .when('/history', {
            templateUrl: 'components/About/history.html',
            controller : 'historyController as historyController'
        })
        .when('/favoritesPOI', {
            templateUrl: 'components/POI/favoritesPOI.html',
            controller : 'favoritesPoiCtrl as favoritesPoiCtrl'
        })
        .otherwise({ redirectTo: '/' });
}]);