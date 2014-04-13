'use strict';

describe('Service: Engineservice', function () {

  // load the service's module
  beforeEach(module('wwwApp'));

  // instantiate service
  var Engineservice;
  beforeEach(inject(function (_Engineservice_) {
    Engineservice = _Engineservice_;
  }));

  it('should do something', function () {
    expect(!!Engineservice).toBe(true);
  });

});
