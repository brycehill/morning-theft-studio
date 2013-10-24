var restify = require('restify'),
    mongoose = require('mongoose'),
    Song = require('./models/Song'),
    _ = require('underscore'),
    fs = require('fs');

mongoose.connect('mongodb://localhost/morning-theft-studio');

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: true }));

/* * * * * * * * *
 * File Serving  *
 * * * * * * * * */

server.get('/', function(req, res) {
  fs.readFile('./public/index.html', function(err, file) {
    if (err) throw err;

    res.send(200);
    res.write(file);
    res.end();
  });
});

server.get(/\/docs\/?.*/, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));

/* * * * * * * *
 *  Song API   *
 * * * * * * * */

// Get info about a song. 
server.get('/songs/:song', function(req, res) {
  // Split the song on capital letters and join with a space. 
  var song = req.params.song.split(/(?=[A-Z])/).join(' ');

  Song.findOne({_id: song}, function(err, song) {
    if (err) throw err;

    res.send(200, song);
  });
});

// Add a new song. 
server.post('/songs/:song', function(req, res) {
  var song = req.params.song.split(/(?=[A-Z])/).join(' '),
      s = new Song({ _id: song });

  s.save(function(err) {
    if (err) throw err;

    res.send(201, song);
  });
});

// Delete a song. 
server.del('/songs/:song', function(req, res) {
  var song = req.params.song.split(/(?=[A-Z])/).join(' ');

  Song.findByIdAndRemove(song, function(err) {
    if (err) throw err;

    res.send(204);
  });
});


/* * * * * * * * * * *
 *  Instrument API   *
 * * * * * * * * * * */

// Add a needed Instrument to the song
server.post('/songs/:song/instruments/:instrument', function(req, res) {
  var song       = req.params.song.split(/(?=[A-Z])/).join(' '),
      instrument = req.params.instrument;

  Song.findOne({_id: song}, function(err, song) {
    if (err) throw err;

    song.instruments.push({
      instrument: instrument,
      needed: true,
      tracked: false
    });

    song.save();
    res.send(201, song);
  });
});

// Update an instrument's tracked value. 
server.put('/songs/:song/instruments/:instrument', function(req, res) {
  var song       = req.params.song.split(/(?=[A-Z])/).join(' '),
      instrument = req.params.instrument,
      tracked = req.params.tracked === 'true' ? true : false;

  Song.findOne({_id: song}, function(err, song) {
    if (err) throw err;

    var obj = _.find(song.instruments, function(i) {
      return i.instrument === instrument;
    });

    obj.tracked = tracked;
    song.instruments.splice(_.indexOf(song.instruments, obj), 1, obj);

    song.save(function(err) {
      if (err) throw err;

      res.send(200, song);
    });
  });
});

server.del('/songs/:song/instruments/:instrument', function(req, res) {
  var song       = req.params.song.split(/(?=[A-Z])/).join(' '),
      instrument = req.params.instrument;

  Song.findOne({_id: song}, function(err, song) {
    if (err) throw err;

    var obj = _.find(song.instruments, function(i) {
      return i.instrument === instrument;
    });

    song.instruments.splice(_.indexOf(song.instruments, obj), 1);

    song.save(function(err) {
      if (err) throw err;

      res.send(200, song);
    });
  });
});

server.listen(8000);
console.log('Listening on port 8000');