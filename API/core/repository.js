var sqlDb = require("mssql");
var settings = require("../settings");

exports.selectSmartBinById = function(smartbinid,callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('Id', sqlDb.VarChar(100), smartbinid);
                                request.execute('SmartBinGetById').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};

exports.getSmartBinByCutsomerId = function(customerid,callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('CustomerId', sqlDb.Int, customerid);
                                request.execute('SmartBinGetAll').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};

exports.getSmartBinLogById = function(id,callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('CustomerId', sqlDb.Int, id);
                                request.execute('SmartBinLogGetById').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};


exports.insertSmartBin = function(smartbin,callback)
{

var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('Id', sqlDb.VarChar(100), smartbin.Id);
                                request.input('ProductId', sqlDb.Int, smartbin.ProductId);
                                request.input('ReOrderLevel', sqlDb.Int, smartbin.ReOrderLevel);
                                request.input('OrderQuantity', sqlDb.Int, smartbin.OrderQuantity);
                                request.input('CustomerId', sqlDb.Int, smartbin.CustomerId);
                                request.input('TriggerActionId', sqlDb.Int, smartbin.TriggerActionId);

                                request.execute('SmartBinInsert').then(function(recordsets) {

                                                //console.dir(recordsets);
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};


exports.insertCustomer = function(customer,callback)
{

var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('FirstName', sqlDb.VarChar(150), customer.FirstName);
                                request.input('LastName', sqlDb.VarChar(150), customer.LastName);
                                request.input('Email', sqlDb.VarChar(150), customer.Email);
                                request.input('Password', sqlDb.VarChar(150), customer.Password);


                                request.execute('CustomerInsert').then(function(recordsets) {

                                                //console.dir(recordsets);
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};

exports.getCustomerById = function(customerid,callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('CustomerID', sqlDb.Int, customerid);
                                request.execute('CustomerGetById').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};


exports.getProductById = function(productid,callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('ProductId', sqlDb.Int, productid);
                                request.execute('ProductGetById').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};
exports.customerAuthenticate = function(customer,callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('Email', sqlDb.VarChar(150), customer.Email);
                                request.input('Password', sqlDb.VarChar(150), customer.Password);
                                request.execute('CustomerAuthenticate').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};


exports.getProducts = function(callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.execute('ProductGetAll').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};

exports.getTriggerActions = function(callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.execute('TriggerActionGetAll').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};


exports.insertSmartBinLog = function(id,weight,uom,callback)
{

var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('SmartBinId', sqlDb.VarChar(100), id);
                                request.input('Weight', sqlDb.Int, weight);
                                request.input('UOM', sqlDb.Int, uom);

                                request.execute('SmartBinLogInsert').then(function(recordsets) {

                                                //console.dir(recordsets);
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};


exports.insertNotification = function(notification,callback)
{

var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('CustomerId', sqlDb.Int, notification.CustomerId);
                                request.input('ActionId', sqlDb.Int, notification.ActionId);
                                request.input('NotificationContent', sqlDb.VarChar(2000), notification.NotificationContent);


                                request.execute('NotificationInsert').then(function(recordsets) {

                                                //console.dir(recordsets);
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};

exports.createBasket = function(basket,callback)
{

var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('Name', sqlDb.VarChar(50), basket.Name);
                                request.input('CustomerId', sqlDb.Int, basket.CustomerId);
                                

                                request.execute('BasketCreate').then(function(recordsets) {

                                                //console.dir(recordsets);
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};

exports.createBasketLine = function(basket,callback)
{

var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('CustomerId', sqlDb.Int, basket.CustomerId);
                                request.input('ProductId', sqlDb.Int, basket.ProductId);
                                request.input('Quantity', sqlDb.Int, basket.Quantity);

                                request.execute('BasketLineInsert').then(function(recordsets) {

                                                //console.dir(recordsets);
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};

exports.getBasketByCustomerId = function(customerid,callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('CustomerId', sqlDb.Int, customerid);
                                request.execute('BasketGet').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};

exports.getBasketLine = function(customerid,callback)
{
                var conn = new sqlDb.Connection(settings.dbConfig);
                conn.connect()
                .then(function()
                {
                                var request = new sqlDb.Request(conn);
                                request.input('CustomerId', sqlDb.Int, customerid);
                                request.execute('BasketLineGet').then(function(recordsets) {
                                                callback(recordsets);
                                }).catch(function(err) {
                                                // ... error checks
                                                console.log(err);
                                });
                }
                )

                .catch(function(err) {
                console.log(err);
                callback(null,err);
                }
                );
};



