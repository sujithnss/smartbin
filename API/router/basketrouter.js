var express = require('express');
var basketrouter = express.Router();
var basketprovider = require('../controller/basketcontroller');


// middleware that is specific to this customerrouter
basketrouter.use(function (req, res, next) {

  next();
});

basketrouter.get('/basket/:id', function(req, res) {
    basketprovider.getBasketByCustomerId(req,res);
});

basketrouter.post('/basket',function(req,res)
{
   basketprovider.createBasket(req,res);
});

basketrouter.post('/basketline',function(req,res)
{
   basketprovider.createBasketLine(req,res);
});

basketrouter.get('/basketline/:id',function(req,res)
{
   basketprovider.getBasketLine(req,res);
});

module.exports = basketrouter;