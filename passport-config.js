/* Name: Maria Macias
StudentId: 301290835
Date: June 18th 2023
File name: passport-config.js */
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/user')

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    
    try {
      User.find({ email: email}, async function (err, user) {
        if (err){
          return done(null, false, { message: 'Incorrect' })
        }
        else{
          if (user == null) {
            return done(null, false, { message: 'No user with that email' })
          }
          
          console.log(user)
          if (await bcrypt.compare(password, user[0].password)) {
            return done(null, user[0])
          } else {
            return done(null, false, { message: 'Password incorrect' })
          }
        }
      });
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => {
    return done(null, user)
  })
}

module.exports = initialize