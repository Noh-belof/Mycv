"use strict";
const nodemailer = require("nodemailer");
const express=require("express");
const bodyParser= require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({encoded:true}));
app.listen(3000,function(){
  console.log("hello from MyCv");;
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});



app.post("/contact",async function(req,res){
 const message=req.body.mailingMe;
 await main(message).catch(console.error);

console.log("done!");
});


async function main(message) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "nouh.belfkira@gmail.com", // generated ethereal user
      pass: "noh/97/NH---$!$!$___@@@*!", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <Users from internet>', // sender address
    to: "nouh.belfkira@gmail.com", // list of receivers
    subject: "Hello 😎", // Subject line
    text: message, // plain text body // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
