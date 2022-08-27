const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check, cookie } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// const validateSignup = [
//     check('email')
//       .exists({ checkFalsy: true })
//       .isEmail()
//       .withMessage('Please provide a valid email.'),
//     check('username')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 4 })
//       .withMessage('Please provide a username with at least 4 characters.'),
//     check('username')
//       .not()
//       .isEmail()
//       .withMessage('Username cannot be an email.'),
//     check('password')
//       .exists({ checkFalsy: true })
//       .isLength({ min: 6 })
//       .withMessage('Password must be 6 characters or more.'),
//     handleValidationErrors
//   ];

// GET user
router.get('/api/profile', requireAuth, async (req, res) => {
  const currentUser = await User.getCurrentUserById(req.user.id);

  const token = await setTokenCookie(res, currentUser);

  if(token){
    currentUser.dataValues.token = token;
  }else {
    currentUser.dataValues.token = '';
  }

  return res.json(currentUser)
});

// // Sign up
// router.post(
//     '/api/create-user',
//     validateSignup,
//     async (req, res) => {
//       const { email, password, username } = req.body;
//       const user = await User.signup({ email, username, password });
  
//       await setTokenCookie(res, user);
  
//       return res.json(
//         {
//         user,
//         });
//     }
//   );





module.exports = router;