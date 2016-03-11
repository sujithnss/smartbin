var repository = require("../core/repository");
var util  = require("util");


exports.insertNotification = function(req,resp)
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


                  repository.insertNotification(data,function(data,err)
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