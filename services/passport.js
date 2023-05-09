const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const MobileUser = require('../models/MobileUsers');

passport.serializeUser(( user, done ) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    const user = await MobileUser.findById(id)
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true,
}, 
    async (accessToken, refreshToken, profile, done) => {
    const existingUser = await MobileUser.findOne({ googleId: profile.id });
    if (existingUser) return done(null, existingUser);

    const user = await new MobileUser({ googleId: profile.id }).save();
    done(null, user);
})
)