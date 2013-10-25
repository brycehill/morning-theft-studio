var Tracker = Tracker || {};

(function($) {

  Tracker.SongInfoView = Backbone.View.extend({
    el: '.song-info',
    template: _.template($('#song-info-template').html()),

    initialize: function () {
      this.model.on('change', this.render, this);
    },

    render: function () {
      this.instrumentsCollection = new Tracker.Instruments(this.model.get('instruments'));

      this.instrumentViews = new Tracker.InstrumentsView({
        collection: this.instrumentsCollection
      });

      this.$el.empty();
      this.$el.append(this.template(this.model.toJSON()));
      this.$el.append(this.instrumentViews.render().el);
      return this;
    },

    events: {
      'click #add-instrument': 'addInstrument',
      'keyup #instrument-form': 'addInstrument'
    },

    addInstrument: function(e) {
      if (e.keyCode !== 13) return;

      var newIns = $('#instrument-form').val();
      if (newIns) {
        this.model.get('instruments').push({ instrument: newIns, tracked: false });
      }

      this.model.save().then(function() {
        $('#instrument-form').focus();
      });
    }
  });

})(jQuery);