var Player;

Player = (function() {
  function Player() {}

  Player.media = null;

  Player.src = null;

  Player.init = function(src, onSuccess, onError, onStatus) {
    this.src = src;
    return this.media = new Media(this.src, onSuccess, onError, onStatus);
  };

  Player.play = function() {
    return this.media.play();
  };

  return Player;

})();
