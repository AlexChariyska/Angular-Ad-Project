'use strict';

var controllersApp = angular.module('ControllersApp', []);

var app = angular.module('myApp', [ 'ngRoute',
  'ControllersApp'])
.config(function ($routeProvider) {
	$routeProvider
	.when('/login', {
		templateUrl: 'templates/login.html'
	})
	.when('/register', {
		templateUrl: 'templates/register.html'
	}).when('/', {
		templateUrl: 'templates/default.html',
		controller: 'ListAds'
	})
});

