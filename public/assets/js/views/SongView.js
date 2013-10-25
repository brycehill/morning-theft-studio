var Tracker = Tracker || {};

(function($) {

  Tracker.SongView = Backbone.View.extend({
    tagName: 'a',
    className: 'list-group-item',
  
    template: _.template($('#song-template').html()),
    
    initialize: function () {
      this.model.on('change:active', this.render, this);
    },

    render: function () {
      if (this.model.get('active')) {
        this.$el.addClass('active');
      }

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    events: {
      'click': 'activate'
    },

    activate: function() {
      console.log('clicked');
      // this.model.set('active', true);
      
    }

  });

})(jQuery);