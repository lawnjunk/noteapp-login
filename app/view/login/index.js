'use strict';

const angular = require('angular');
const demoApp = angular.module('demoApp');

demoApp.controller('LoginController', ['$location', '$log', '$window', 'authService', LoginController]);

function LoginController($location, $log, $window, authService) {
  $log.debug('create loginCtrl');

  authService.getToken()
  .then(() => {
    $location.path('/home');
  });


  this.login = function(){
    authService.signin(this.user)
    .then(token => {
      $log.log(`loginCtrl got token ${token}`);
      $location.path('/home');
    })
    .catch( err => {
      $log.error(err);
      $window.alert('fuuuu barr');
    });
  };

}
