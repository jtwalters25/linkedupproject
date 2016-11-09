const requestProxy = require('express-request-proxy');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const config = require('./config');

app.get('/meetup/*', requestProxy({
  url: 'https://api.meetup.com/*',
  query: {
    key: config.MEETUP_KEY
  }
}));

app.get('/ip', function(req, res) {
  res.json({ ip: req.connection.remoteAddress.replace('::ffff:', '') });
});

app.use(express.static('./public/'));

app.get('*', function(req, res) {
  console.log('Request for URL:', req.url);
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
