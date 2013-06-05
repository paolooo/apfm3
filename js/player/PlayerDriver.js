var PlayerDriver;

PlayerDriver = (function() {
  function PlayerDriver() {}

  PlayerDriver.media = null;

  PlayerDriver.src = null;

  PlayerDriver.init = function(src, onSucess, onError) {
    return this.media = new Media(src, onSucess, onError);
  };

  PlayerDriver.play = function() {
    return this.media.play();
  };

  return PlayerDriver;

})();
