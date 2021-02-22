var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/userlist', async function(req, res, next) {

  // handle authentication manually, as we want the API to work in both cases,
  passport.authenticate('jwt', async function(err, user, info) {
    const users = await User.find();
    res.status(200).json(users);
  })(req, res, next);

});

router.get('/user/:username', async function(req, res, next) {
  const user = await User.findOne({username: req.params.username});
  res.status(200).json(user);
});

module.exports = router;
