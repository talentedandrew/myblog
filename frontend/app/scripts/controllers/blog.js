'use strict';
angular.module('frontendApp')
  .controller('BlogCtrl',[ 'blogService','$window','$state', function (blogService,$window,$state) {
    var vm = this;
    var storage = $window.localStorage;
    vm.createBlog = function(title,tags,content){
      var author = JSON.parse(storage.getItem('user')).firstname +" "+ JSON.parse(storage.getItem('user')).lastname;
      var date = new Date();
      blogService.createBlog(title,tags,content,author,date).then(function(response){
        console.log(response);
        if(response.success){
          $state.go('home');
        }
      });
    };
  }]);
