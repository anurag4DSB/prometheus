var http = require('http');
var router = require('./router');
var client = require('./monitoring/prom-wrapper.js');
// Handle your routes here, put static pages in ./public and they will server

const counterAnurag = new client.createCounter('POST_requests', 'Number of POST Requests');

router.register('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  console.log(req.url);
  console.log(req.method);
  if (req.method === 'POST') {
    counterAnurag.inc();
}
  res.write('Hello World');
  res.end();
});
// TODO: Remove console.log from default metrics
router.register('/metrics', function(req, res) {
  console.log(client.collectDefaultMetrics());
  res.end(client.getMetrics());
  counterAnurag.reset();
});

// We need a server which relies on our router
var server = http.createServer(function (req, res) {
  handler = router.route(req);
  handler.process(req, res);
});

// Start it up
server.listen(4000);
console.log('Server running');