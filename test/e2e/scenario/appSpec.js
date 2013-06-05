(function() {
  describe('my app', function() {
    beforeEach(function() {
      return browser().navigateTo('/index.html');
    });
    it("should automatically redirect to / when location", function() {
      return expect(browser().location().url()).toBe('/');
    });
    describe("blog", function() {
      beforeEach(function() {
        return browser().navigateTo("#/blog");
      });
      return it("should render blog when user navigates to /blog", function() {
        return expect(element("[ng-view] h1:first").text()).toMatch(/Blog Page/);
      });
    });
    return describe("index", function() {
      beforeEach(function() {
        return browser().navigateTo('#/');
      });
      return it("should render index when user navigates to /", function() {
        return expect(element("[ng-view] h1:first").text()).toMatch(/Wordpress/);
      });
    });
  });

}).call(this);
