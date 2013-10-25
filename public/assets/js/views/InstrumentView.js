var Tracker = Tracker || {};

(function($) {

  Tracker.InstrumentView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#instrument-template').html()),
    
    initialize: function () {
      var instrument = this.model.get('instrument');
      // Capitalize the first letter
      instrument = instrument.charAt(0).toUpperCase() + instrument.substr(1).toLowerCase();
      this.model.set('instrument', instrument);
      this.model.on('change', this.render, this);
    },

    render: function () {
      if (this.model.get('tracked')) {
        this.$el.addClass('tracked');
      } else {
        this.$el.removeClass('tracked');
      }
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    events: {
      'click input[type=checkbox]': 'toggleTracked',
      'mouseover' : 'showDeleteButton',
      'mouseout'  : 'hideDeleteButton',
      'click button' : 'removeInstrument'
    },

    toggleTracked: function() {
      console.log(this.model);
      var tracked = this.model.get('tracked');
      this.model.save({ tracked: !tracked });
    },

    showDeleteButton: function() {
      this.$el.children('button').show();
    },

    hideDeleteButton: function() {
      this.$el.children('button').hide();
    },

    removeInstrument: function() {
      this.model.destroy();
    }

  });

})(jQuery);