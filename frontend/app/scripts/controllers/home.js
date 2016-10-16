'use strict';
angular.module('frontendApp')
  .controller('HomeCtrl', function (blogService) {
    var vm = this;

    blogService.getAllBlogs().then(function (response) {
      if (response.success) {
        vm.blogs = response.blogs;
        angular.forEach(vm.blogs, function (value, key) {
          if (value.tags) {
            value.tags = value.tags.split(',');
          }
        });
      }

    });

  });
