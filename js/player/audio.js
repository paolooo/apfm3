var AudioPlayer, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AudioPlayer = (function(_super) {
  __extends(AudioPlayer, _super);

  function AudioPlayer() {
    _ref = AudioPlayer.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AudioPlayer.init = function(src) {
    return this.src = src;
  };

  return AudioPlayer;

})(PlayerDriver);
