const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, function (
      email,
      password,
      done
    ) {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect Email or Password",
            });
          }
          if (user.password != password) {
            return done(null, false, {
              message: "Incorrect Email or Password",
            });
          }
          return done(null, user);
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
