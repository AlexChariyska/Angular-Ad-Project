'use strict';

var app = angular.module('adApp', [ 'ngRoute','ngResource','ui.bootstrap'])
.config(function ($routeProvider) {
	$routeProvider
	.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'FormController'
	})
	.when('/register', {
		templateUrl: 'templates/register.html',	
		controller: 'FormController'
	}).when('/', {
		templateUrl: 'templates/default.html',
		controller: 'AdsController'
	}).when('/user/home', {
		templateUrl: 'templates/user-home-screen.html',
		controller: 'AdsController'
	}).when('/user/ads/publish', {
		templateUrl: 'templates/publish-new-ad.html',
		controller: 'FormController'
	}).otherwise({redirectTo:'/'})
});

