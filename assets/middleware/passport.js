import passport from 'passport'
import LocalStrategy from 'passport-local'
// import { findUserByUsername } from './db'

export function findUserByUsername(req, username) {
  // Here you find the user based on id/username in the database
  // const user = await db.findUserById(id)
  return req.session.users.find((user) => user.username === username)
}

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user.username)
})

passport.deserializeUser(function (req, id, done) {
  // deserialize the username back into user object
  const user = findUserByUsername(req, id)
  done(null, user)
})

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password
      const user = findUserByUsername(req, username)
      console.log('passport local stretegy called')
      // Security-wise, if you hashed the password earlier, you must verify it
      // if (!user || await argon2.verify(user.password, password))
      if (!user || user.password !== password) {
        done(null, null)
      } else {
        done(null, user)
      }
    }
  )
)

export default passport