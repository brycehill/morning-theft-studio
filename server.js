var restify = require('restify'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Song = require('./models/Song'),
    _ = require('underscore'),
    fs = require('fs'),
    Cookies = require('cookies'),
    User = require('./models/User');

mongoose.connect('mongodb://localhost/morning-theft-studio');

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());

/* * * * * * * * *
 * File Serving  *
 * * * * * * * * */

server.get('/', function(req, res) {
  var cookies = new Cookies(req, res);

  if (cookies.get('sid')) {
    fs.readFile('./public/index.html', function(err, file) {
      if (err) throw err;

      // res.send(200);
      res.write(file);
      res.end();
    });
  } else {
    fs.readFile('./public/login.html', function(err, file) {
      if (err) throw err;

      // res.send(200);
      res.write(file);
      res.end();
    });
  }
});

server.get('/login', function(req, res) {
  var cookies = new Cookies(req, res);

  if (cookies.get('sid')) {
    fs.readFile('./public/index.html', function(err, file) {
      if (err) throw err;

      // res.send(200);
      res.write(file);
      res.end();
    });
  } else {
    fs.readFile('./public/login.html', function(err, file) {
      if (err) throw err;

      // res.send(200);
      res.write(file);
      res.end();
    });
  }
});



server.get(/\/assets\/.*/, restify.serveStatic({
  directory: './public'
}));

/* * * * * * * *
 *  Song API   *
 * * * * * * * */

// Get info about a song. 
server.get('/songs/:id', function(req, res) {
  Song.findOne({_id: new ObjectId(req.params.id)}, function(err, song) {
    if (err) throw err;

    res.send(200, song);
  });
});

// Get all the songs.
server.get('/songs', function(req, res) {
  Song.find(function(err, songs) {
    if (err) throw err;

    res.send(200, songs);
  });
});

// Add a new song. 
server.post('/songs', function(req, res) {
  var title = req.params.title,//.split(/(?=[A-Z])/).join(' '),
      s = new Song({ title: title });

  s.save(function(err) {
    if (err) throw err;

    res.send(201, s);
  });
});

// Delete a song. 
server.del('/songs/:id', function(req, res) {
  Song.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;

    res.send(204);
  });
});


/* * * * * * * * * * *
 *  Instrument API   *
 * * * * * * * * * * */

// Add a needed Instrument to the song
server.put('/songs/:id', function(req, res) {
  // var song       = req.params.song.split(/(?=[A-Z])/).join(' '),
  var instruments = req.params.instruments;

  Song.findOne({_id: new ObjectId(req.params.id)}, function(err, song) {
    if (err) throw err;

    song.instruments = instruments;

    song.save();
    res.send(201, song);
  });
});

// Update an instrument's tracked value. 
server.put('/songs/:id/instruments/:instrument', function(req, res) {
  var id       = req.params.id,
      instrument = req.params.instrument.toLowerCase(),
      tracked = req.params.tracked;

  Song.findOne({_id: new ObjectId(id)}, function(err, song) {
    if (err) throw err;

    var obj = _.find(song.instruments, function(i) {
      return i.instrument.toLowerCase() === instrument;
    });

    obj.tracked = tracked;
    song.instruments.splice(_.indexOf(song.instruments, obj), 1, obj);

    song.save(function(err) {
      if (err) throw err;

      res.send(200, song);
    });
  });
});

server.del('/songs/:id/instruments/:instrument', function(req, res) {
  var id       = req.params.id,
      instrument = req.params.instrument.toLowerCase();

  Song.findOne({_id: new ObjectId(id)}, function(err, song) {
    if (err) throw err;

    var obj = _.find(song.instruments, function(i) {
      return i.instrument.toLowerCase() === instrument;
    });

    song.instruments.splice(_.indexOf(song.instruments, obj), 1);

    song.save(function(err) {
      if (err) throw err;

      res.send(200, song);
    });
  });
});

/* * * * * * * * * *
 *  Authentication *
 * * * * * * * * * */

// Extremely crude authentication routine. 
server.post('/login', function(req, res) {
  var username = req.params.username,
      password = req.params.password,
      cookies = new Cookies(req, res);

  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);

    if (!user || user.password !== password) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    cookies.set('sid', user._id);
    res.writeHead(302, {'Location': '/'});
    res.end();

  });
});

server.listen(8000);
console.log('Listening on port 8000');