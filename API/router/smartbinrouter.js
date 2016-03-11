var express = require('express');
var smartbinrouter = express.Router();
var smartbinprovider = require('../controller/smartbincontroller');

// middleware that is specific to this smartbinrouter
smartbinrouter.use(function (req, res, next) {

  next();
});

smartbinrouter.get('/smartbin/:id', function(req, res) {
    smartbinprovider.getSmartBinById(req,res);
});

smartbinrouter.post('/smartbin',function(req,res)
{
   smartbinprovider.addSmartBin(req,res);
});


smartbinrouter.get('/smartbin/:id/:weight/:uom', function(req, res) {
    smartbinprovider.insertSmartBinLog(req,res);
});

module.exports = smartbinrouter;