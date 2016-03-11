var repository = require("../core/repository");
var util  = require("util");

exports.getProducts = function(req,resp)
{
                repository.getProducts(function(data, err)
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
