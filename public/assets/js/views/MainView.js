var Tracker = Tracker || {};

(function() {

  Tracker.songsList = null;

  Tracker.MainView = Backbone.View.extend({
    el: '.main',

    initialize: function () {
      // console.log('init main view');
    },

    render: function () {
      console.log('render main');
      Tracker.songsList = new Tracker.SongsView({ collection: this.collection }).render();
    }

  });

})();
