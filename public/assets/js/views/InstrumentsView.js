var Tracker = Tracker || {};

(function($) {

  Tracker.InstrumentsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'instruments',

    initialize: function () {
      var self = this;

      this.collection.on('destroy', this.render, this);
      this.collection.url = '/' + location.hash.substr(1) + '/instruments/';
    },

    render: function () {
      var self = this;

      self.instrumentViews = [];
      self.$el.empty();

      this.collection.forEach(function(instrument) {
        self.instrumentViews.push(new Tracker.InstrumentView({
          model: instrument
        }));
      });

      _.each(self.instrumentViews, function(view) {
        $(self.el).append(view.render().el);
      });

      return this;
    }
  });

})(jQuery);