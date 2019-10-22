import passport from 'passport';
import UserModel from '../models/userModel';
import passwordHasher from '../helpers/passwordHasher';
import jwtTokenSigner from '../helpers/jwtTokenSigner';

// eslint-disable-next-line import/prefer-default-export
export const createUser = async (req, res) => {
  try {
    const hashedPassword = await passwordHasher(req.body.password);
    const userInstance = new UserModel({
      ...req.body,
      password: hashedPassword,
    });
    const user = await userInstance.save().lean();
    const { _v, password, ...userDetails } = user;
    const token = jwtTokenSigner(userDetails);
    return res.status(201).json({
      message: 'account created',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'something wrong',
      error,
    });
  }
};

export const loginUser = async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      });
    }
    const token = jwtTokenSigner(user);
    return res.status(200).send({
      message: 'user login',
      token,
    });
  })(req, res, next);
};
