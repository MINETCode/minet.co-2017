var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var gravatar = require('gravatar');
var multer = require('multer');
var User = require("../models/user");
var Logs = require("../models/logs");

//Upload file config

function createLog(action, username) {
  var logData = {
    username: username,
    action: action,
    time: new Date()
  }
  Logs.create(logData, (error, log) => {
    if (error) {
      return next(error);
    }
  });
}

//Render home page
router.get('/', (req, res, next) => {
  if(!req.user) {
    return res.redirect('/dashboard/login');
  } else {
    Logs.find({username: req.user.username}).sort('-time').limit(10).exec(function(err, logs) {
      return res.render('./dashboard/index', {logs: logs, currentDate: new Date()});
    });
  }
});

//Render login page
router.get('/login', (req, res, next) => {
  if (req.user) {
    return res.redirect('/dashboard');
  }
  return res.render('./dashboard/login');
});

//LOGIN user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return res.render('./dashboard/login', { title: 'Login', error : err.message });
    }
    if (!user) {
      return res.render('./dashboard/login', { title: 'Login', error : 'Invalid credentials.' });
    }
    req.logIn(user, function(err) {
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

//LOGOUT user
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/dashboard');
});

//Render register page
router.get('/register', (req, res, next) => {
  return res.render('./dashboard/register');
});

//REGISTER user
router.post('/register', function(req, res) {
  User.register(new User({
      username : req.body.username,
      email: req.body.email,
      schoolName: req.body.schoolName,
    }), req.body.password, function(err, user) {
    if (err) {
      return res.render('./dashboard/register', { title: 'Register', error : 'That team-name has already been taken.' });
    }
    createLog('Account created', req.body.username);
    return res.render('./dashboard/register', { title: 'Register', error : 'Team registered successfully.' });
  });
});

//Render team page
router.get('/team', (req, res, next) => {
  return res.render('./dashboard/team');
});

//Edit team page
router.post('/team', function(req, res) {
  User.findById(req.user.id, function(err, user) {
    if (!user) {
      return res.redirect('/dashboard');
    } else {
      //design
      user.team.design.p1.name = req.body.designParticipant1Name;
      user.team.design.p1.email = req.body.designParticipant1Email;
      user.team.design.p1.imageURL = gravatar.url(user.team.design.p1.email);
      user.team.design.p2.name = req.body.designParticipant2Name;
      user.team.design.p2.email = req.body.designParticipant2Email;
      user.team.design.p2.imageURL = gravatar.url(user.team.design.p2.email);
      user.team.design.p3.name = req.body.designParticipant3Name;
      user.team.design.p3.email = req.body.designParticipant3Email;
      user.team.design.p3.imageURL = gravatar.url(user.team.design.p3.email);

      //quiz
      user.team.quiz.p1.name = req.body.quizParticipant1Name;
      user.team.quiz.p1.email = req.body.quizParticipant1Email;
      user.team.quiz.p1.imageURL = gravatar.url(user.team.quiz.p1.email);
      user.team.quiz.p2.name = req.body.quizParticipant2Name;
      user.team.quiz.p2.email = req.body.quizParticipant2Email;
      user.team.quiz.p2.imageURL = gravatar.url(user.team.quiz.p2.email);

      //programming
      user.team.programming.p1.name = req.body.programmingParticipant1Name;
      user.team.programming.p1.email = req.body.programmingParticipant1Email;
      user.team.programming.p1.imageURL = gravatar.url(user.team.programming.p1.email);
      user.team.programming.p2.name = req.body.programmingParticipant2Name;
      user.team.programming.p2.email = req.body.programmingParticipant2Email;
      user.team.programming.p2.imageURL = gravatar.url(user.team.programming.p2.email);

      //gaming
      user.team.gaming.p1.name = req.body.gamingParticipant1Name;
      user.team.gaming.p1.email = req.body.gamingParticipant1Email;
      user.team.gaming.p1.imageURL = gravatar.url(user.team.gaming.p1.email);
      user.team.gaming.p2.name = req.body.gamingParticipant2Name;
      user.team.gaming.p2.email = req.body.gamingParticipant2Email;
      user.team.gaming.p2.imageURL = gravatar.url(user.team.gaming.p2.email);

      //surprise
      user.team.surprise.p1.name = req.body.surpriseParticipant1Name;
      user.team.surprise.p1.email = req.body.surpriseParticipant1Email;
      user.team.surprise.p1.imageURL = gravatar.url(user.team.surprise.p1.email);
      user.team.surprise.p2.name = req.body.surpriseParticipant2Name;
      user.team.surprise.p2.email = req.body.surpriseParticipant2Email;
      user.team.surprise.p2.imageURL = gravatar.url(user.team.surprise.p2.email);

      //pitching
      user.team.pitching.p1.name = req.body.pitchingParticipant1Name;
      user.team.pitching.p1.email = req.body.pitchingParticipant1Email;
      user.team.pitching.p1.imageURL = gravatar.url(user.team.pitching.p1.email);

      user.save();
      createLog('Team Info Updated', req.user.username);
      return res.redirect('/dashboard/team');
    }
  });
});

//Edit startup page
router.post('/startup', function(req, res) {
  User.findById(req.user.id, function(err, user) {
    if (!user) {
      return res.redirect('/dashboard');
    } else {
      //SOMETHING TO DO WITH UPLOADING FILES
      user.startup.name = req.body.startupName;
      user.startup.description = req.body.startupDescription;
      user.startup.industry = req.body.startupIndustry;
      user.save();
      createLog('Startup Info Updated', req.user.username);
      return res.redirect('/dashboard/startup');
    }
  });
});

//Render startup page
router.get('/startup', (req, res, next) => {
  return res.render('./dashboard/startup');
});


module.exports = router;
