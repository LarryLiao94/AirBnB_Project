const express = require("express");
const { Review, Image } = require("../../db/models");
const router = express.Router();
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");

//add image to review based on review id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;
  const userId = req.user.id;
  const reviewToAddImage = await Review.findOne({
    where: {
      id: reviewId,
    },
  });

  if (!reviewToAddImage) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (reviewToAddImage.userId !== userId) {
    res.status(403);
    return res.json({
      message: "Unauthorized",
      statusCode: 403,
    });
  }

  //max images per resource is 10
  const imagesCount = await Image.findAll({
    where: {
      imageableType: "review",
      imageableId: reviewId,
    },
  });

  if (imagesCount.length > 10) {
    res.status(403);
    return res.json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403,
    });
  }

  const imageableType = "review";
  const imageableId = reviewId;

  const newImage = await Image.create({
    imageableType,
    imageableId,
    url,
  });

  const properImageResponse = await Image.findOne({
    where: {
      id: newImage.id,
    },
    attributes: ["id", "imageableId", "url"],
  });

  res.status(200);

  return res.json(properImageResponse);
});

//edit review
<<<<<<< HEAD
router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const { reviewId } = req.params;
    const currentUserId = req.user.id
    const reviewToUpdate = await Review.findByPk(reviewId);

    if(!reviewToUpdate){
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if(!stars || stars < 1 || stars > 5){
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "stars": "Stars must be an integer from 1 to 5"
            }
        })
    }

    if(!review){
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required"
            }
        })
    }
    if(reviewToUpdate.userId === req.user.id){
        reviewToUpdate.update({
            review,
            stars,
        });
        return res.json(reviewToUpdate);
    } else {
        return res.json({
            "message": "Review may only be edited by its author"
        })
    }
=======
router.put("/:reviewId", requireAuth, async (req, res) => {
  const { review, stars } = req.body;
  const { reviewId } = req.params;
  const currentUserId = req.user.id;
  const reviewToUpdate = await Review.findByPk(reviewId);

  if (!reviewToUpdate) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (!stars || stars < 1 || stars > 5) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        stars: "Stars must be an integer from 1 to 5",
      },
    });
  }

  if (!review) {
    res.status(400);
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        review: "Review text is required",
      },
    });
  }
  if (reviewToUpdate.userId === req.user.id) {
    reviewToUpdate.update({
      review,
      stars,
    });
    return res.json(reviewToUpdate);
  } else {
    return res.json({
      message: "Review may only be edited by its author",
    });
  }
>>>>>>> dev
});

//delete review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const deletedReview = await Review.findByPk(reviewId);

  if (!deletedReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (deletedReview.userId === req.user.id) {
    await deletedReview.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    return res.json({
      message: "Review may only be deleted by its own author",
    });
  }
});

module.exports = router;
