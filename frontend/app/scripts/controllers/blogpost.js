'use strict';
angular.module('frontendApp')
  .controller('BlogpostCtrl', function (blogService, $stateParams) {
    var vm = this;
    var storage = window.localStorage;
    vm.isCollapsed = true;
    vm.id = $stateParams.id;
    if (storage.getItem('user')) {
      vm.user = JSON.parse(storage.getItem('user'));
      vm.hasAccess = true;
    }
    else {
      vm.hasAccess = false;
    }

    blogService.getBlogById(vm.id).then(function (response) {
      if (response.success) {
        vm.blog = response.blog;
        vm.blog.tags = vm.blog.tags.split(',');
      }

    });

    vm.postComment = function (comment) {
      vm.comment = '';
      blogService.postComment(comment,vm.id,vm.user.firstname+''+vm.user.lastname).then(function (response) {
        if (response.success) {
          vm.blog = response.blog;
          vm.blog.tags = vm.blog.tags.split(',');
        }

      });

    }
    vm.replyComment = function (reply,id) {
      vm.comment = '';
      blogService.replyToComment(vm.id,reply,id,vm.user.firstname+''+vm.user.lastname).then(function (response) {
        if (response.success) {
          vm.blog = response.blog;
          vm.blog.tags = vm.blog.tags.split(',');
         }

      });

    }
  });
