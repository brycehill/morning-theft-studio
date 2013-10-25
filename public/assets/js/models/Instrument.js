var Tracker = Tracker || {};

(function() {

  Tracker.Instrument = Backbone.Model.extend({
    idAttribute: 'instrument',

    defaults: {
      instruments: []
    },

    initialize: function() {}

  });

})();