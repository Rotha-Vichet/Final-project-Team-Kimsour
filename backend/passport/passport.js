const passport = require("passport");
var localStrategy = require('passport-local').Strategy

var User = require('../model/user')

passport.use('local',new localStrategy({


    usernameField:'email',
    passwordField:'password'
},
    function(username, password, done) {
      User.findOne({ email: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false),{message:"Incorrect Username"} }
        if (!user.isValid(password)) {
            return done(null, false,{message:"Incorrect Password"});
        }
        console.log(user)
        return done(null, user);
      });
    } 
  ));
passport.serializeUser(function(user,done){
    done(err,user._id)
});

passport.deserializeUser(function(id,done){
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})

