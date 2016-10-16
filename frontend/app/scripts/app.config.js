'use strict';
angular
  .module('frontendApp')
.config(function ($stateProvider,$urlRouterProvider) { 
    $stateProvider 
      .state('home', { 
        templateUrl: 'views/home.html', 
        controller: 'HomeCtrl',
        controllerAs : 'vm' , 
        url: '/home' 
      })
      .state('writeblog', { 
        templateUrl: 'views/writeblog.html', 
        url: '/writeblog' 
      }) 
      .state('blogpost', { 
        templateUrl: 'views/blogpost.html', 
        url: '/blogpost/:id',
        controller: 'BlogpostCtrl',
        controllerAs : 'vm' 
      }); 
    $urlRouterProvider.otherwise('/home');  
  }); 