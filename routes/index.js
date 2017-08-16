var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

//Render home page
router.get('/', (req, res, next) => {
  return res.render('./index/index');
});

//Render request page
router.get('/vvpr0', (req, res, next) => {
  return res.redirect('http://sidhant.me/x-2017/vvpr0/');
});

//Render request page
router.get('/ayehaye', (req, res, next) => {
  return res.redirect('http://shrey.co/quizprelims17/');
});

//Render events page
router.get('/events', (req, res, next) => {
  return res.render('./index/events');
});

//Render travel page
router.get('/travel', (req, res, next) => {
  return res.render('./index/travel');
});

//Render FAQs page
router.get('/faqs', (req, res, next) => {
  return res.render('./index/faqs');
});

//Render schedule page
router.get('/schedule', (req, res, next) => {
  return res.render('./index/schedule');
});

//Render request page
router.get('/request', (req, res, next) => {
  return res.render('./index/request');
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

  var text = req.body.insName + ' has requested an invite for MINET X 2017.\n'
  + '\n Name of institution: ' + req.body.insName
  + '\n Contact email: ' + req.body.email
  + '\n Point of contact: ' + req.body.pName
  + '\n Website/Relevant links: ' + req.body.links;
  var mailOptions = {
    from: 'minet@themis.in', // sender address
    to: 'minet+requests@themis.in', // list of receivers
    subject: 'Invitation Request for MINET X', // Subject line
    text: text //, // plaintext body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
        return res.redirect('/error');
    } else {
        return res.redirect('/success');
    };
  });
});

//Render rsvp page
router.get('/rsvp', (req, res, next) => {
  return res.render('./index/rsvp');
});

//Render rsvp page
router.post('/rsvp', (req, res, next) => {

  var codes = [
    {
      'name': 'Delhi Public School, RK Puram',
      'code': 'XHYZHI3VAA'
    },
    {
      'name': 'Delhi Public School, Dwarka',
      'code': 'GP4EY6U34B'
    },
    {
      'name': 'Delhi Public School, Vasant Kunj',
      'code': 'YVWRQUUWKT'
    },
    {
      'name': 'Delhi Public School, Noida',
      'code': 'QRKZUG5TVW'
    },
    {
      'name': 'Mount St. Marys School',
      'code': '5ZNE7Z3WKK'
    },
    {
      'name': 'Ramjas School, RK Puram',
      'code': 'BL1WOVKG0Q'
    },
    {
      'name': 'The Shri Ram School, Moulsari',
      'code': 'JK0U2EWWZV'
    },
    {
      'name': 'Modern School, Barakhamba Road',
      'code': 'RXJHQGY53F'
    },
    {
      'name': 'Venkateshwar International School',
      'code': 'VPF28Y5T67'
    },
    {
      'name': 'Sanskriti School',
      'code': 'T985WKND5M'
    },
    {
      'name': 'Montfort School',
      'code': 'C3WUL8ZM1C'
    },
    {
      'name': 'Amity International School, Sector-46',
      'code': 'I2INHNFANT'
    },
    {
      'name': 'Army Public School, Dhaula Kuan',
      'code': 'DBXYFN4JUI'
    },
    {
      'name': 'Jayshree Periwal International School',
      'code': 'DBXYFN4JUI'
    },
    {
      'name': 'New Era Public School',
      'code': '8F0PSY0RUQ'
    },
    {
      'name': 'Delhi Public School Gurgaon, Sector-45',
      'code': '849OQDFP92'
    },
    {
      'name': 'Bal Bharti Public School, Pitampura',
      'code': '7LO8CZ13HG'
    },
  ];

  function search(input, array){
    for (var i=0; i < array.length; i++) {
      if (array[i].code === input) {
        return array[i];
      }
    }
  }

  var codeEntered = req.body.inviteCode;

  var school = search(codeEntered, codes);

  if(school) {

    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'minet@themis.in', // Your email id
        pass: '1JagdishKumar01*' // Your password
      }
    });


    var text = school.name + ' has confirmed their attendance for MINET X 2017.\n'
    + '\n Name of institution: ' + school.name
    + '\n Incharge name: ' + req.body.nameCode
    + '\n Incharge email: ' + req.body.emailCode;

    console.log(school.name);


    var mailOptions = {
      from: 'minet@themis.in', // sender address
      to: 'minet+confirmations@themis.in', // list of receivers
      subject: 'Confirmation by ' + school.name, // Subject line
      text: text //, // plaintext body
    };

    transporter.sendMail(mailOptions, function(error, info){

      if (error) {
        console.log(error);
        return res.render('error');
      } else {
        return res.render('./index/rsvp', { result: 'Your attendance has been confirmed.' });
      };
    });
  } else {
    return res.render('./index/rsvp', { result: 'Invalid invite code.' });
  }

});

//Render rsvp page
router.get('/success', (req, res, next) => {
  return res.render('success');
});

module.exports = router;
