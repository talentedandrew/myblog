'use strict';
angular.module('frontendApp')
  .service('AuthService',['$q','$http', function ($q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var storage = window.localStorage;
    var service = {};
    service.login = login;
    service.register = register;
    service.logout = logout;
    service.isAuthenticated = isAuthenticated;
    return service;

    function login(email, password) {
      var data = { email: email, password: password };
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
      })
        .success(function (response) {
          deferred.resolve(response);
        }).error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;

    }
    function register(firstname,lastname,email,contact,password) {
      var data = { firstname : firstname, lastname: lastname, email: email, contact : contact, password: password };
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
      })
        .success(function (response) {
          deferred.resolve(response);
        }).error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;

    }
    function isAuthenticated(){
      return !(storage.getItem('user') === undefined || storage.getItem('user') === null);
    }
    function logout(){
      storage.clear();
    }
  }]);
