var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var Song = new Schema({
  _id: String,
  instruments: [{
    instrument: String,
    needed: Boolean,
    tracked: Boolean
  }]
});

module.exports = mongoose.model('Song', Song);