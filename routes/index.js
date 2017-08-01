var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


//Render home page
router.get('/', (req, res, next) => {
  return res.render('index');
});

//Render events page
router.get('/events', (req, res, next) => {
  return res.render('events');
});

//Render travel page
router.get('/travel', (req, res, next) => {
  return res.render('travel');
});

//Render FAQs page
router.get('/faqs', (req, res, next) => {
  return res.render('faqs');
});

//Render schedule page
router.get('/schedule', (req, res, next) => {
  return res.render('schedule');
});

//Render request page
router.get('/request', (req, res, next) => {
  return res.render('request');
});

//Render request page
router.post('/request', (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'minet@themis.in', // Your email id
      pass: '1JagdishKumar01*' // Your password
    }
  });
  var text = req.body.insName + ' has requested an invite for MINET X 2017. \n\n Name of institution: ' + req.body.insName + '\n Contact email: ' + req.body.email + '\n Point of contact: ' + req.body.pName + '\n Website/Relevant links: ' + req.body.links;
  var mailOptions = {
    from: 'minet@themis.in', // sender address
    to: 'minet+requests@themis.in', // list of receivers
    subject: 'Invitation Request for MINET X', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.render('/error');
    } else{
        res.render('/success');
    };
  });
});

//Render rsvp page
router.get('/rsvp', (req, res, next) => {
  return res.render('rsvp');
});

//Render rsvp page
router.get('/success', (req, res, next) => {
  return res.render('success');
});



module.exports = router;
