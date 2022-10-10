const express = require('express')
const router = express.Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check, cookie } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Valid email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Valid password is required'),
  handleValidationErrors
]; 

router.post('/', validateLogin,  async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login({ 
        email, 
        password 
    });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
<<<<<<< HEAD
      err.errors = ['The provided credentials were invalid.'];
=======
      err.errors = ['Incorrect Login details.'];
>>>>>>> dev
      return next(err);
    }
    
    const token = await setTokenCookie(res, user);

    if(token){
      user.dataValues.token = token;
    } else {
      user.dataValues.token = "";
    }

    return res.json(user);
  }
);

module.exports = router;