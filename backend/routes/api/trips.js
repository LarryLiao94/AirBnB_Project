const express = require("express");
const { Trip, User, Review, Image, Spot } = require("../../db/models");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

//deleate a booking
router.delete("/:tripId", requireAuth, async (req, res) => {
  const { tripId } = req.params;
  const userId = req.user.id;

  const tripToDelete = await Trip.findOne({
    where: {
      id: tripId,
    },
  });

  if (!tripToDelete) {
    res.status(404);
    return res.json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

  if (tripToDelete.userId !== userId) {
    res.status(403);
    return res.json({
      message: "Unauthorized",
      statusCode: 403,
    });
  }

  const currentDate = new Date();
  const startDate = new Date(tripToDelete.startDate);
  const endDate = new Date(tripToDelete.endDate);
  const d1 = Date.parse(currentDate);
  const d2 = Date.parse(startDate);
  const d3 = Date.parse(endDate);

  if (d2 < d1) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 403,
    });
  }

  await tripToDelete.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

//get all bookings of current user
router.get("/", requireAuth, async (req, res) => {
  const trips = await Trip.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
        attributes: { exclude: ["description", "createdAt", "updatedAt"] },
      },
    ],
  });
  res.status(200);
  return res.json({ trips });
});

module.exports = router;
