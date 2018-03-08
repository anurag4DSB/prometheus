var http = require('http');
var router = require('./router');
var client = require('./monitoring/prom-wrapper.js');
// Handle your routes here, put static pages in ./public and they will server

router.register('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  console.log(req.url);
  res.write('Hello World');
  res.end();
});

router.register('/metrics', function(req, res) {
  console.log(client.collectDefaultMetrics());
  res.end(client.getMetrics());
});

// We need a server which relies on our router
var server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

// Start it up
server.listen(4000);
console.log('Server running');