'use strict';

var app = angular.module('adApp', [ 'ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'templates/guest-views/login.html',
                controller: 'FormController'
            }).when('/register', {
                templateUrl: 'templates/guest-views/register.html',
                controller: 'FormController'
            }).when('/', {
                templateUrl: 'templates/guest-views/main-guest-view.html',
                controller: 'AdsController'
            }).when('/user/home', {
                templateUrl: 'templates/user-home-screen.html'
            }).when('/user/ads/publish', {
                templateUrl: 'templates/publish-new-ad.html',
                controller: 'FormController'
            }).when('/user/ads', {
                templateUrl: 'templates/user-ads.html'
            }).when('/user/ads/delete', {
                templateUrl: 'templates/delete.html'
            }).when('/user/ads/edit', {
                templateUrl: 'templates/editAd.html'
            }).when('/user/profile', {
                templateUrl: 'templates/edit-user-profile.html'
            }).when('/admin/home', {
                templateUrl: 'templates/admin/admin-home.html'
            }).when('/admin/ads/edit', {
                templateUrl: 'templates/admin/edit-ad.html'
            }).when('/admin/ads/delete', {
                templateUrl: 'templates/admin/delete-ad.html'
            }).otherwise({redirectTo: '/'})
    }).run(function ($rootScope, $location) {

        // register listener to watch route changes
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if ($rootScope.loggedUser == null) {
                // no logged user, we should be going to #login
                if (next.templateUrl == "templates/login.html") {
                    $location.path('/login');
                } else if (next.templateUrl == "templates/register.html") {
                    $location.path('/register');
                } else {
                    // not going to #login, we should redirect now
                    $location.path("/");
                }
            }
        });
    });


