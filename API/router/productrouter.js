var express = require('express');
var productrouter = express.Router();
var productprovider = require('../controller/productcontroller');

// middleware that is specific to this smartbinrouter
productrouter.use(function (req, res, next) {
  next();
});

productrouter.get('/product', function(req, res) {
    productprovider.getProducts(req,res);
});

module.exports = productrouter;