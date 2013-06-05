'use strict';
var audio, audioTimer, getJson, playAudio, playlistBuilder;

getJson = function(url, callback, $http) {
  return $http({
    method: 'GET',
    url: url
  }).success(function(data, status, headers, config) {
    return callback(data, $http);
  }).error(function(data, status, headers, config) {
    return console.log('error json');
  });
};

audio = null;

audioTimer = null;

playAudio = function(src, onAudioSuccess, onAudioError) {
  audio = new Media(src, onAudioSuccess, onAudioError);
  audio.play();
  if (audioTimer === null) {
    return audioTimer = setInterval(function() {
      return audio.getCurrentPosition(function(position) {
        if (position > -1) {
          return setAudioPosition(position + " sec");
        }
      }, function(e) {
        console.log("Error getting position = " + e);
        return setAudioPosition("Error: " + e);
      });
    }, 1000);
  }
};

playlistBuilder = function(json, $http) {
  var i, ul, _fnBuildEpisode, _fnDuration, _results;

  ul = jQuery('<ul/>');
  jQuery(ul).appendTo('#playlist #main');
  _fnDuration = function(s) {
    var t, _m, _s;

    _s = s % 60;
    _m = Math.floor(s / 60);
    t = _m <= 60 ? "M" : "H";
    return "" + _m + " " + t;
  };
  _fnBuildEpisode = function(data, $http) {
    var duration, li, published, today;

    today = new Date;
    published = new Date(data.publishedAt * 1000);
    duration = moment.duration((today - published) / 1000, 'seconds').humanize();
    li = jQuery('<li/>').append(jQuery("<div class='thumb'><a href='" + data.url + "'><img src=''></a></div>")).append(jQuery("<div class='control'><a class='icon play' href='" + data.url + "'><div class='before' /></a><span class='icon phone'><div class='before'/> <abbr>" + (_fnDuration(data.duration)) + "</abbr></span></div>")).append(jQuery("<div class='episode'><a href='" + data.url + "'>" + data.title + "</a><div class='duration'>" + duration + "</div></div>"));
    jQuery(ul).append(li);
    data.li = li;
    return getJson(data.lookup, function(d) {
      if (typeof d.imageURL !== 'undefined') {
        return jQuery('.thumb img', data.li).each(function(index) {
          return jQuery(this).attr('src', 'http://res.cloudinary.com/playerfm/image/fetch/d_graymike-bg.png,w_90,h_90/' + d.imageURL);
        });
      }
    }, $http);
  };
  i = 0;
  _results = [];
  while (i < json.episodes.length) {
    _results.push(_fnBuildEpisode(json.episodes[i++], $http));
  }
  return _results;
};

var BlogCtrl;

BlogCtrl = function($scope) {
  return $scope.title = "Sample Blog Page";
};

var HomeCtrl, urlJsonPlaylist;

urlJsonPlaylist = [];

urlJsonPlaylist['wordpress'] = 'https://player.fm/3/714/at/1367612251.json?episode_detail=full&series_detail=full';

HomeCtrl = function($scope, $http) {
  $scope.title = 'Wordpress';
  return getJson(urlJsonPlaylist['wordpress'], playlistBuilder, $http);
};
