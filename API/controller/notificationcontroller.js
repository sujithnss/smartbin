var repository = require("../core/repository");
var util  = require("util");
var settings = require("../settings");


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


exports.sendNotification = function(req,resp)
{

var jsonString = '';
     var data = '';
     var rescust = '';
     var customeremail = '';
     var customername = '';
     var messagebody = '';
        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            //console.log(JSON.parse(jsonString));
            data = JSON.parse(jsonString);


if(data)
{

    if(!data) throw new Error("Input not valid");

console.log(settings);
    console.log(data);
    console.log(data.CustomerId);
    console.log(data.OrderQuantity);
    console.log(data.ReOrderLevel);

repository.getCustomerById(data.CustomerId,function(rescust, err)
                {   
                  if(err)  
                  {
                      console.log('errrrr');
                       resp.writeHead(500,"Internal Error", {"Content-Type" : "application/json"});
                                      resp.write(err);
                          resp.end();
                  } 
                  else
                  {

                       console.log('successs');
                       
                       customeremail = rescust[0][0].Email;
                       customername  = rescust[0][0].FirstName + ' '+rescust[0][0].LastName;
                       console.log(customername);

                       repository.getProductById(data.ProductId,function(resproduct, err)
                        {
                          if(err)
                                        {
                                          console.log('Product Error');
                                           resp.writeHead(500,"Internal Error", {"Content-Type" : "application/json"});
                                          resp.write(err);
                                              resp.end();
                                        }
                          else
                                        {
                                  
                                             console.log('Product Successs');

                                             
                                             console.log(resproduct[0][0].Name);

                                             messagebody = 'Hi '+customername+'\n \n \n';
                                             messagebody = messagebody+'You do not have enough ' +resproduct[0][0].Name + ' available. We know you like  '+'\n';
                                             messagebody = messagebody+''+resproduct[0][0].Name+' to be ordered for you.We have added '+ data.OrderQuantity+ ' gms of '+resproduct[0][0].Name+' in your '+'\n';
                                             messagebody = messagebody+ 'Basket as it has gone below the reorder level '+data.ReOrderLevel+ ' gms . '+'\n';
                                             messagebody = messagebody + 'Please complete the order as per your convenience.'+'\n \n \n';

                                             messagebody = messagebody+ 'Smart Shopping'+'\n';
                                             messagebody = messagebody+ 'Smart Shoppers Team';
                                             console.log(messagebody)


                                                     var email   = require("../node_modules/emailjs/email");
                                                      var server  = email.server.connect({
                                                         user:    settings.dbConfig.mailuser, 
                                                         password:settings.dbConfig.mailpassword, 
                                                         host:    settings.dbConfig.mailhost, 
                                                         port : settings.dbConfig.mailport,
                                                         ssl:     settings.dbConfig.mailssl
                                                      });



                                                      //send the message and get a callback with an error or details of the message that was sent
                                                      server.send({
                                                         text:    messagebody, 
                                                         from:    "grocery.smartshopper@gmail.com", 
                                                         to:      customeremail,
                                                         cc:      "shantanuk123@gmail.com,learningportal2016@gmail.com",
                                                         subject: "Smart Shopping - Items added to your Basket"
                                                      }, function(err, message) { console.log(err || message); });

                                                  resp.writeHead(200,{"Content-Type" : "application/json"});

                                                  resp.end();    
                                             
                                        }
                        }
                        );
                  }            
                }
                );





}
else
                {
                                throw new Error("Input not valid");
                }

              });



};