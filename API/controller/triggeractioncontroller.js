var repository = require("../core/repository");
var util  = require("util");

exports.getTriggerActions = function(req,resp)
{
                repository.getTriggerActions(function(data, err)
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
