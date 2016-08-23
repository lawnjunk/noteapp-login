'use strict';

const angular = require('angular');
const demoApp = angular.module('demoApp');

demoApp.controller('HomeController', ['$log', '$location', 'authService', HomeController]);

function HomeController($log, $location, authService){
  let token = null
  authService.getToken()
  .then( _token => token = _token)
  .catch( () => {
    $location.path('/login');
  });
}
