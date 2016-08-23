'use strict';

const angular = require('angular');
const demoApp = angular.module('demoApp');

demoApp.controller('SignupController', ['$location', '$log', '$window', 'authService', SignupController]);

function SignupController($location, $log, $window, authService) {
  $log.debug('create signupCtrl');

  this.signup = function(){
    authService.signup(this.user)
    .then(token => {
      $log.log(`signupCtrl got token ${token}`);
      $location.path('/home');
    })
    .catch( err => {
      $log.error(err);
      $window.alert('fuuuu barr');
    });
  };

}
