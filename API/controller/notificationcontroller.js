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


exports.sendNotification = function(req,resp)
{

var jsonString = '';
     var data = '';
     var rescust = '';
     var customeremail = '';
     var customername = '';
        req.on('data', function (data) {
            jsonString += data;
        });

        req.on('end', function () {
            //console.log(JSON.parse(jsonString));
            data = JSON.parse(jsonString);


if(data)
{

    if(!data) throw new Error("Input not valid");

    console.log(data.CustomerId);

repository.getCustomerById(data.CustomerId,function(rescust, err)
                {   
                  if(err)  
                  {
                      console.log('errrrr');
                  } 
                  else
                  {

                       console.log('successs');
                       
                       customeremail = rescust[0][0].Email;
                       customername  = rescust[0][0].FirstName + ' '+rescust[0][0].LastName;
                       console.log(customername);
                  }            
                }
                );

repository.getProducts(function(resproduct, err)
                {
                  if(err)
                                {
                                  console.log('Product Error');
                                }
                  else
                                {
                          
                                     console.log('Product Successs');

                                     
                                     console.log(resproduct[0]);
                                     
                                }
                }
                );



}
else
                {
                                throw new Error("Input not valid");
                }

              });

        var email   = require("../node_modules/emailjs/email");
var server  = email.server.connect({
   user:    "mckinsli", 
   password:"change123", 
   host:    "smtp.gmail.com", 
   port : 465,
   ssl:     true
});

var messagebody = 'Hi '+customername;

// send the message and get a callback with an error or details of the message that was sent
server.send({
   text:    messagebody, 
   from:    "mckinsli@gmail.com", 
   to:      "learningportal2016@gmail.com",
   cc:      "learningportal2016@gmail.com",
   subject: "testing emailjs"
}, function(err, message) { console.log(err || message); });

};