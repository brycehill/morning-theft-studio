/*global Backbone */
var Tracker = Tracker || {};

(function() {

  Tracker.currentSongView = null;

  var Router = Backbone.Router.extend({
    routes: {
      '': 'index',
      'songs/:id': 'displaySong'
    },

    index: function() {

    },

    displaySong: function(id) {
      if (Tracker.currentSongView != null) {
        Tracker.currentSongView.undelegateEvents();
        Tracker.currentSongView.off('all');
      }

      var s = new Tracker.Song({ _id: id });
      s.fetch().then(function(song) {
        Tracker.currentSongView = new Tracker.SongInfoView({
          model: new Tracker.Song(song)
        });
        Tracker.currentSongView.render();
      });
    }

  });

  Tracker.Router = new Router();
  Backbone.history.start();
})();