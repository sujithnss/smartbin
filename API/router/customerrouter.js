var express = require('express');
var customerrouter = express.Router();
var customerprovider = require('../controller/customercontroller');


// middleware that is specific to this customerrouter
customerrouter.use(function (req, res, next) {

  next();
});


customerrouter.get('/customer/:id', function(req, res) {
    customerprovider.getCustomerById(req,res);
});


customerrouter.post('/customer',function(req,res)
{
   customerprovider.addCustomer(req,res);
});

module.exports = customerrouter;