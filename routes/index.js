var express = require('express');
var router = express.Router();

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

//Render rsvp page
router.get('/rsvp', (req, res, next) => {
  return res.render('rsvp');
});


module.exports = router;
