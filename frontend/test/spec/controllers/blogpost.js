'use strict';

describe('Controller: BlogpostCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var BlogpostCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BlogpostCtrl = $controller('BlogpostCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BlogpostCtrl.awesomeThings.length).toBe(3);
  });
});
