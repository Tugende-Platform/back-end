import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import userModel from '../models/userModel';

passport.use('login', new LocalStrategy(async (username, userPassword, done) => {
  const user = await userModel.findOne({
    $or: [{ email: username },
      { phoneNumber: username },
      { username }],
  }).lean();
  if (!user) {
    return done(new Error('User credentials don\'t match'));
  }
  const isPasswordCorrect = await bcrypt.compare(userPassword, user.password);
  if (!isPasswordCorrect) {
    return done(new Error('User credentials don\'t match'));
  }
  const { password, ...details } = user;
  return done(null, details);
}));

export default passport;
