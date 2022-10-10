// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const createUserRouter = require('./createUser.js');
const currentUserRouter = require('./currentUser.js');
const imagesRouter = require('./images.js');
const loginRouter = require('./login.js');
const reviewsRouter = require('./reviews.js');
const tripsRouter = require('./trips.js');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");


// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/profile', currentUserRouter);
router.use('/spots', spotsRouter);
router.use('/create-user', createUserRouter);
router.use('/profile', currentUserRouter);
router.use('/images', imagesRouter);
router.use('/login', loginRouter);
router.use('/reviews', reviewsRouter);
router.use('/trips', tripsRouter);

router.get("/set-token-cookie", async (_req, res) => {
  
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });
  setTokenCookie(res, user);
  return res.json({ user });
});


router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;