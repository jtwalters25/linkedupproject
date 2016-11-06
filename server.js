const requestProxy = require('express-request-proxy');
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.get('/meetup/*', requestProxy({
  url: 'https://api.meetup.com/*&key=' + config.MEETUP_KEY,
}));

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
