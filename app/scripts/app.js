'use strict';

var app = angular.module('adApp', [ 'ngRoute','ngResource'])
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
	}).otherwise({redirectTo:'/'})
});

