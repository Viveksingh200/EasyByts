const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.js');
const bcrypt = require('bcrypt');

function initialize(passport) {
  // Signup Strategy
  passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return done(null, false, { message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  ));

    // Login Strategy
passport.use('local', new LocalStrategy(async (username, password, done) => {
  console.log('Trying to login with:', username, password);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return done(null, false, { message: 'Incorrect username' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password does not match');
      return done(null, false, { message: 'Incorrect password' });
    }

    console.log('Login successful for user:', user.username);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}


module.exports = initialize;
