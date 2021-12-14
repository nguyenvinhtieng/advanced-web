const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const credentials = require('./credentials')

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: credentials.google.clientID,
      clientSecret: credentials.google.clientSecret,
      callbackURL: credentials.google.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      /*
         use the profile info (mainly profile id) to check if the user is registerd in ur db
         If yes select the user and pass him to the done callback
         If not create the user and then select him and pass to callback
        */
      return done(null, profile);
    }
  )
);