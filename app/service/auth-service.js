'use strict';

const angular = require('angular');
const demoApp = angular.module('demoApp');

demoApp.factory('authService', ['$log', '$http', '$window', '$q', authService]);

function authService($log, $http, $window, $q){
  let service = {};
  let token = null;

  function _setToken(_token){
    $window.localStorage.setItem('token', JSON.stringify(_token));
    token = _token;
    return $q.resolve(token);
  }

  service.getToken = function(){
    if (token) return $q.resolve(token);
    token = JSON.parse($window.localStorage.getItem('token'));
    if (token) return $q.resolve(token);
    return $q.reject(new Error('no token'));
  };

  service.logout = function(){
    token = null;  
    $window.localStorage.removeItem('token');
    return $q.resolve();
  };

  service.signup = function(user){
    $log.debug('authService.signup');
    let url = `${__API_URL__}/api/signup`;
    return $http.post(url, user)
    .then( res => {
      $log.info('got token', res.data);
      return _setToken(res.data);
    })
    .catch(err => {
      $log.error(err);
      return $q.reject(err);
    });
  };

  service.signin = function(user){
    $log.debug('authService.login');
    let url = `${__API_URL__}/api/signin`;
    let basicString = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        Authorization: `Basic ${basicString}`,
      }
    };
    return $http.get(url, config)
    .then( res => {
      $log.info('got token', res.data);
      return _setToken(res.data);
    })
    .catch( err => {
      $log.error(err);
      return $q.reject(err); 
    });
  };

  return service;
}

