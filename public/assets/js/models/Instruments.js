var Tracker = Tracker || {};

(function() {

  Tracker.Instruments = Backbone.Collection.extend({
    url: location.hash.substr(1) + '/instruments',
    model: Tracker.Instrument,

    initialize: function() {}

  });
})();