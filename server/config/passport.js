const passport = require("passport");
const LocalStratergy = require("passport-local").Strategy;
const { validPassword } = require("../lib/passwordUtils.js");
const connection = require("./database.js");
const Person = connection.models.Person;


const verifyCallback = (username, password, done) => {

    Person.findOne({ username: username })
        .then((user) => {
            
            if (!user) {
                return done(null, false);
            }

            const isValid = validPassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
        .catch((err) => {
            return done(err)
        });
}


// This stratergy requires a verify function which is a callback
const stratergy = new LocalStratergy(verifyCallback);

passport.use(stratergy);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    Person.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});