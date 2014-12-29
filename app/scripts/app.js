'use strict';

var app = angular.module('adApp', [ 'ngRoute'])
.config(function ($routeProvider) {
	$routeProvider
	.when('/login', {
		templateUrl: 'templates/login.html'
	})
	.when('/register', {
		templateUrl: 'templates/register.html',	
		controller: 'AdsController'
	}).when('/', {
		templateUrl: 'templates/default.html',
		controller: 'AdsController'
	}).otherwise({redirectTo:'/'})
});

