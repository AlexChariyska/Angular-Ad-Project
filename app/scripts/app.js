'use strict';

var app = angular.module('adApp', [ 'ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
               templateUrl: 'templates/guest-views/main-guest-view.html',
                controller: 'AdsController'
            }).when('/register', {
                templateUrl: 'templates/guest-views/register.html',
                controller: 'FormController'
            }).when('/login', {
                templateUrl: 'templates/guest-views/login.html',
                controller: 'FormController'
                //Users redirects
            }).when('/user/home', {
                templateUrl: 'templates/user-views/user-home-screen.html'
            }).when('/user/ads/publish', {
                templateUrl: 'templates/user-views/publish-new-ad.html',
                controller: 'FormController'
            }).when('/user/ads', {
                templateUrl: 'templates/user-views/user-ads.html'
            }).when('/user/ads/delete', {
                templateUrl: 'templates/user-views/delete.html'
            }).when('/user/ads/edit', {
                templateUrl: 'templates/user-views/edit-ad.html'
            }).when('/user/profile', {
                templateUrl: 'templates/user-views/edit-user-profile.html'
                //Admin redirects
            }).when('/admin/home', {
                templateUrl: 'templates/admin/admin-home.html'
            }).when('/admin/ads/edit', {
                templateUrl: 'templates/admin/edit-ad.html'
            }).when('/admin/ads/delete', {
                templateUrl: 'templates/admin/delete-ad.html'
            }).when('/admin/users/list', {
                templateUrl: 'templates/admin/users-list.html'
            }).when('/admin/users/delete', {
                templateUrl: 'templates/admin/users-delete.html'
            }).when('/admin/users/edit', {
                templateUrl: 'templates/admin/users-edit.html'
                // Category and town redirects:
            }).when('/admin/categories/list', {
                templateUrl: 'templates/admin/category/categories-list.html'
            }).when('/admin/categories/delete', {
                templateUrl: 'templates/admin/category/delete-category.html'
            }).when('/admin/towns/delete', {
                templateUrl: 'templates/admin/town/delete-town.html'
            }).when('/admin/towns/list', {
                templateUrl: 'templates/admin/town/towns-list.html'
            }).when('/admin/towns/create', {
                templateUrl: 'templates/admin/town/create-town.html'
            }).when('/admin/categories/create', {
                templateUrl: 'templates/admin/category/create-category.html'
            }).when('/admin/towns/edit', {
                templateUrl: 'templates/admin/town/edit-town.html'
            }).when('/admin/categories/edit', {
                templateUrl: 'templates/admin/category/edit-category.html'
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
                    sessionStorage.clear();
                    $location.path("/");
                }
            }
            
        });
    });
