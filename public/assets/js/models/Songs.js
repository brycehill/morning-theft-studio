var Tracker = Tracker || {};

(function() {

  var Songs = Backbone.Collection.extend({
    model: Tracker.Song,
    url: '/songs'
  });

  Tracker.songs = new Songs();
})();
