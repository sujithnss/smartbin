var repository = require("../core/repository");
var util  = require("util");


exports.createBasket = function(req,resp)
{
try
{
     var jsonString = '';
     var data = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            //console.log(JSON.parse(jsonString));
            data = JSON.parse(jsonString);


            if(!data) throw new Error("Input not valid");

                if(data)
                {


                  repository.createBasket(data,function(data,err)
                                {
                                                if(err)
                                                {
                                                  resp.writeHead(500,"Internal Error", {"Content-Type" : "application/json"});
                                      resp.write(err);
                          resp.end();
                                                }
                                                else
                                                {
                                                                resp.writeHead(200,{"Content-Type" : "application/json"});

                          resp.end();
                                                }
                                }
                  );
                }
                else
                {
                                throw new Error("Input not valid");
                }

        });



}
catch(ex)
{
                console.log(ex);
}
};

exports.createBasketLine = function(req,resp)
{
try
{
     var jsonString = '';
     var data = '';

        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            //console.log(JSON.parse(jsonString));
            data = JSON.parse(jsonString);


            if(!data) throw new Error("Input not valid");

                if(data)
                {


                  repository.createBasketLine(data,function(data,err)
                                {
                                                if(err)
                                                {
                                                  resp.writeHead(500,"Internal Error", {"Content-Type" : "application/json"});
                                      resp.write(err);
                          resp.end();
                                                }
                                                else
                                                {
                                                                resp.writeHead(200,{"Content-Type" : "application/json"});

                          resp.end();
                                                }
                                }
                  );
                }
                else
                {
                                throw new Error("Input not valid");
                }

        });



}
catch(ex)
{
                console.log(ex);
}
};
exports.getBasketByCustomerId = function(req,resp)
{
                repository.getBasketByCustomerId(req.params.id,function(data, err)
                {
                  if(err)
                                {
                                  resp.writeHead(500,"Internal Error", {"Content-Type" : "text/html"});
                                  resp.write(err);
                          resp.end();
                                }
                  else
                                {
                          resp.type('application/json');
                                  resp.send(data[0]);
                          resp.end();
                                }
                }
                );
};

exports.getBasketLine = function(req,resp)
{
                repository.getBasketLine(req.params.id,function(data, err)
                {
                  if(err)
                                {
                                  resp.writeHead(500,"Internal Error", {"Content-Type" : "text/html"});
                                  resp.write(err);
                          resp.end();
                                }
                  else
                                {
                          resp.type('application/json');
                                  resp.send(data[0]);
                          resp.end();
                                }
                }
                );
};