const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check, cookie } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('firstName')
      .exists(),
    check('lastName')
      .exists(),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

  // Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username } = req.body;
      const checkUserEmail = await User.findOne({
        where: {
            email
        }
      });

      if(checkUserEmail){
        res.status(403);
        return res.json({
            "message": "User already exists",
            "statusCode": 403,
            "errors": ["User with that email already exists"]
        })
      };

      const checkUserUsername = await User.findOne({
        where: {
          username
        }
      });

      if(checkUserUsername){
        res.status(403);
        return res.json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": ["User with that username already exists"]
        })
      }

      const user = await User.signup({ firstName, lastName, email, username, password });
  
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