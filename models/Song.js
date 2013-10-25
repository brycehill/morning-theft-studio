var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Song = new Schema({
  title: String,
  track: Number,
  instruments: [{
    instrument: String,
    tracked: Boolean,
    notes: String
  }]
});

module.exports = mongoose.model('Song', Song);