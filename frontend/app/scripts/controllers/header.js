'use strict';
angular.module('frontendApp')
  .controller('HeaderCtrl',[ 'AuthService', '$window','$state', function (AuthService, $window,$state) {
    var vm = this;
    var storage = $window.localStorage;
    vm.loginOn = false;
    if(storage.getItem('user')){
      vm.hasAccess = true;
      vm.loginButton = false;
      vm.user = JSON.parse(storage.getItem('user'));
    }
    else{
      vm.loginButton =true;
      vm.hasAccess = false;
      vm.user = '';
    }
    vm.openLogin = function(){
      vm.loginOn = true;
    }
    vm.closeLogin = function(){
      vm.loginOn = !vm.loginOn;
      vm.showReg = false;
    }
    vm.login = function(email,password){
      AuthService.login(email,password).then(function(response){
        console.log(response);
        if(response.success){
          vm.closeLogin();
          vm.loginButton =!vm.loginButton;
          vm.hasAccess = true;
          storage.setItem('user',JSON.stringify(response.user));
          vm.user = JSON.parse(storage.getItem('user'));
          if(response.user.role == 'admin'){
            $state.go('writeblog');
          }
        }
      });
    }
    vm.register = function(firstname,lastname,email,contact,password){
      AuthService.register(firstname,lastname,email,contact,password).then(function(response){
        console.log(response);
        if(response.success){
          vm.closeLogin();
          vm.loginButton =!vm.loginButton;
          vm.hasAccess = true;
          storage.setItem('user',JSON.stringify(response.user));
          vm.user = JSON.parse(storage.getItem('user'));
          if(response.user.role == 'admin'){
            $state.go('writeblog');
          }
        }
      });
    }
    vm.logout = function(){
      AuthService.logout();
        vm.loginButton =true;
        vm.hasAccess = false;
          $state.go('home');
      
    }
  }]);
