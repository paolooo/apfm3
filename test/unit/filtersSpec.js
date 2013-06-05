(function() {
  "use strict";  describe("filter", function() {
    beforeEach(module("playerFmApp.filters"));
    return describe("interpolate", function() {
      beforeEach(module(function($provide) {
        return $provide.value("version", "TEST_VER");
      }));
      return it("should replace VERSION", inject(function(interpolateFilter) {
        return expect(interpolateFilter("before %VERSION% after")).toEqual("before TEST_VER after");
      }));
    });
  });

}).call(this);
