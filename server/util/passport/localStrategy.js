const User = require('../../models/user')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
  {
    usernameField: 'cellphone',
    passReqToCallback: true,
    session: false,
  },
  function (req, username, password, done) {
    console.log('REQ', req)
    User.findOne({ 'local.cellphone': username }, (err, userMatch) => {
      console.log('USERMATCH', userMatch)
		if (err) {
			return done(err)
		}
		if (!userMatch) {
			return done(null, false, { message: 'Incorrect username' })
		}
		if (!userMatch.checkPassword(password)) {
			return done(null, false, { message: 'Incorrect password' })
		}
		return done(null, userMatch)
	})
})

module.exports = strategy;
