'use strict'; 
// webpack assets
require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/base.scss');

// npm modules
const angular = require('angular');
const ngRoute = require('angular-route');

// angular modules
angular.module('demoApp', [ngRoute])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/signup', {
    template: require('./view/signup/signup.html'),
    controller: 'SignupController',
    controllerAs: 'signupCtrl',
  })
  .when('/login', {
    template: require('./view/login/login.html'),
    controller: 'LoginController', 
    controllerAs: 'loginCtrl',
  })
  .when('/home', {
    template: require('./view/home/home.html'),
    controller: 'HomeController',
    controllerAs: 'homeCtrl',
  })
  .otherwise({
    redirectTo: '/home',
  });
}]);

require('./view/signup');
require('./view/login');
require('./view/home');
require('./service/auth-service.js');
