'use strict';
angular.module('frontendApp')
  .service('blogService', ['$q', '$http',function ($q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {};
    service.createBlog = createBlog;
    service.getAllBlogs = getAllBlogs;
    service.getBlogById = getBlogById;
    service.postComment = postComment;
    service.replyToComment = replyToComment;
    return service;
    function createBlog(title,tags,content,author,date) {
      var data = { title: title, author: author ,tags : tags,content:content,date : date };
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'http://52.74.247.211:3000/writeblog',
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
    function getAllBlogs() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://52.74.247.211:3000/getallblogs'
      })
        .success(function (response) {
          deferred.resolve(response);
        }).error(function (error) {
          deferred.reject(error);
        });
      return deferred.promise;

    }
    function getBlogById(id) {
      var data = { id:id };
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'http://52.74.247.211:3000/getblogbyid',
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
    function postComment(comment,id,user){
      var data = {id:id, user:user , body : comment , date : new Date()};
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'http://52.74.247.211:3000/postcomment',
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
    
    function replyToComment(bid,reply,id,user){
      var data = {blogid : bid,id:id, user:user , reply : reply , date : new Date()};
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'http://52.74.247.211:3000/replytocomment',
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
  }]);
