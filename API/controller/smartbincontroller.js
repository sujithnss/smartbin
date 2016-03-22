var repository = require("../core/repository");
var util  = require("util");

exports.getSmartBinById = function(req,resp)
{
                repository.selectSmartBinById(req.params.id,function(data, err)
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

exports.getSmartBinByCutsomerId = function(req,resp)
{
                repository.getSmartBinByCutsomerId(req.params.id,function(data, err)
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

exports.addSmartBin = function(req,resp)
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


                  repository.insertSmartBin(data,function(data,err)
                                {
                                                if(err)
                                                {
                                                                console.log("I got error");
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
                                throw new Error("Innut not valid");
                }

        });



}
catch(ex)
{
                console.log("9999");
}
};


exports.insertSmartBinLog = function(req,resp)
{
                repository.insertSmartBinLog(req.params.id,req.params.weight,req.params.uom,function(data, err)
                {
                  if(err)
                                {
                                  resp.writeHead(500,"Internal Error", {"Content-Type" : "text/html"});
                                  resp.write(err);
                          resp.end();
                                }
                  else
                                {
                          resp.writeHead(200,{"Content-Type" : "application/json"});
                                  resp.write(JSON.stringify(data));
                          resp.end();
                                }
                }
                );
};
