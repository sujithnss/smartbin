// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
var smartbinrouter = require('./router/smartbinrouter');
var customerrouter = require('./router/customerrouter');
var productrouter = require('./router/productrouter');
var triggeractionrouter = require('./router/triggeractionrouter');
var notificationrouter = require('./router/notificationrouter');
var basketrouter = require('./router/basketrouter');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 9000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//     //res.json({ message: 'Welcome to our api!' });
//     smartbin.getSmartBins(req,res);
// });

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', smartbinrouter);
app.use('/api', customerrouter);
app.use('/api', productrouter);
app.use('/api', triggeractionrouter);
app.use('/api',notificationrouter);
app.use('/api',basketrouter);

app.use('/', function(req, res) {
   res.send('Welcome to Smart Bin API');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server listening on port ' + port);