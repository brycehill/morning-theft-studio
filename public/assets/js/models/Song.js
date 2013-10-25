var Tracker = Tracker || {};

(function() {

  Tracker.Song = Backbone.Model.extend({
    urlRoot: '/songs',
    idAttribute: '_id',

    initialize: function() {},

    defaults: {
      instruments: [],
      active: false
    }
  });
})();