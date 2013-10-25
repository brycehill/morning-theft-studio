var Tracker = Tracker || {};

(function($) {

  Tracker.SongsView = Backbone.View.extend({
    el: 'div.songs',

    initialize: function () {
      var self = this;
      self.songViews = [];

      // _.sortBy(this.collection, function(a) {
      //   console.log(a);
      // });

      this.collection.each(function(song) {
        song.set('url', '#songs/' + song.id.replace(' ', ''));
        self.songViews.push(new Tracker.SongView({
          model: song,
          attributes: {
            href: song.get('url')
          }
        }));
      });
    },

    render: function () {
      var self = this;

      _.each(self.songViews, function(view) {
        $(self.el).append(view.render().el);
      });

      return this;
    }
  });

})(jQuery);