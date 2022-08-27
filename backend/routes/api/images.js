const express = require('express')
const sequelize = require('sequelize')
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Spot, Image, Review, Trip } = require('../../db/models');
const router = express.Router();

//delete an image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const userId = req.user.id;

    const imageToDelete = await Image.findOne({
        where: {
            id: imageId
        }
    });

    if(!imageToDelete){
        res.status(404);
        return res.json({
            "message": "Image couldn't be found",
            "statusCode": 404
        })
    };

    const spotImage = await Spot.findOne({
        where: {
            id: imageId,
            ownerId: userId
        }
    });

    if(!spotImage && imageToDelete.imageableType === "spot"){
        res.status(403);
        return res.json({
            "message": "Unauthorized",
            "statusCode": 403
        })
    }

    const reviewImage = await Review.findOne({
        where: {
            id: imageId,
            userId: userId
        }
    });

    if(!reviewImage && imageToDelete.imageableType === "review"){
        res.status(403);
        return res.json({
            "message": "Unauthorized",
            "statusCode": 403
        })
    };

    await imageToDelete.destroy();

    res.status(200);
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

});



module.exports = router;