var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/hello', function(req, res){
  res.render('hello');
});

router.get('/contact', function(req, res){
  res.render('contact');
});

router.get('/thanks', function(req, res){
  res.render('thanks');
});



// sends email from process.env.EMAIL (website email, can be changed)
//  to whatever address is set in mailOptions.to (admin email, can be the same as website email)
router.post("/contact", function(req, res){
  async function main(){

    // need to authenticate EMAIL and get clientID, Secret, and Refresh token when adding a new email
    //  using OAuth specifications found on Google's developer platform
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId:"\n" + process.env.CLIENTID + "\n" ,
        clientSecret: "\n" + process.env.CLIENTSECRET + "\n" ,
        refreshToken: process.env.REFRESHTOKEN
      }
    });

    // setup email data
    let mailOptions = {
      from: "Kyle's Portfolio Site",
      to: "codemode.io@gmail.com",
      subject: "Contact Message", // Subject line
      text: req.body.message + "\n\nTo reply to this inquiry, please send an application to the user's email:\n" +
          req.body.email // plain text body

    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log(req.body);
  }

  main().catch(console.error);
  res.redirect("/thanks");
});

router.post("/hello", function(req, res){
  async function main(){

    // need to authenticate EMAIL and get clientID, Secret, and Refresh token when adding a new email
    //  using OAuth specifications found on Google's developer platform
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId:"\n" + process.env.CLIENTID + "\n" ,
        clientSecret: "\n" + process.env.CLIENTSECRET + "\n" ,
        refreshToken: process.env.REFRESHTOKEN
      }
    });

    // setup email data
    let mailOptions = {
      from: "Kyle's Portfolio Site",
      to: "codemode.io@gmail.com",
      subject: "Contact Message", // Subject line
      text: req.body.message + "\n\nTo reply to this inquiry, please send an application to the user's email:\n" +
          req.body.email // plain text body

    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log(req.body);
  }

  main().catch(console.error);
  res.redirect("/thanks");
});


module.exports = router;
