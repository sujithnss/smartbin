var express = require('express');
var triggeractionrouter = express.Router();
var triggeractionprovider = require('../controller/triggeractioncontroller');

// middleware that is specific to this smartbinrouter
triggeractionrouter.use(function (req, res, next) {

  next();
});

triggeractionrouter.get('/triggeraction', function(req, res) {
    triggeractionprovider.getTriggerActions(req,res);
});



module.exports = triggeractionrouter;

