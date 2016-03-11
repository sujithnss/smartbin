var express = require('express');
var notificationrouter = express.Router();
var notificationprovider = require('../controller/notificationcontroller');


// middleware that is specific to this customerrouter
notificationrouter.use(function (req, res, next) {

  next();
});



notificationrouter.post('/notification',function(req,res)
{
   notificationprovider.insertNotification(req,res);
});

module.exports = notificationrouter;