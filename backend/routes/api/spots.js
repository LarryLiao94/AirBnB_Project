const express = require('express');
const { Spot, User, Review, Image, Trip } = require('../../db/models');
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check, cookie } = require('express-validator');
const { Op } = require("sequelize");
const { query } = require('express');


const spotValidator = [
    check("address")
      .exists({ checkFalsy: true })
      .isString()
      .withMessage("Street address is required"),
    check("city")
      .exists({ checkFalsy: true })
      .isString()
      .withMessage("City is required"),
    check("state")
      .exists({ checkFalsy: true })
      .isString()
      .withMessage("State is required"),
    check("country")
      .exists({ checkFalsy: true })
      .isString()
      .withMessage("Country is required"),
    check("lat")
      .exists({ checkFalsy: true })
      .isFloat()
      .withMessage("Latitude is not valid"),
    check("lng")
      .exists({ checkFalsy: true })
      .isFloat()
      .withMessage("Longitude is not valid"),
    check("name")
      .exists({ checkFalsy: true })
      .isString()
      .isLength({
        max: 50
      })
      .withMessage("Name must be less than 50 characters"),
    check("description")
      .exists({ checkFalsy: true })
      .isString()
      .withMessage("Description is required"),
    check("price")
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
    handleValidationErrors,
  ];

const queryFilterValidator = [
    check('page')
        .optional()
        .isInt({
            min: 0,
            max: 10
        })
        .withMessage('Page must be greater than or equal to zero'),
    check('size')
        .optional()
        .isInt({
            min: 0, max: 20
        })
        .withMessage('Page must be greater than or equal to zero'),
        check('maxLat')
        .optional()
         .isFloat({
             min: -90, 
             max: 90 
            })
         .withMessage('Maximum latitude is not valid'),
      check('minLat')
        .optional()
         .isFloat({ 
            min: -90, 
            max: 90 
        })
         .withMessage('Minimum latitude is not valid'),
      check('minLng')
        .optional()
          .isFloat({ 
            min: -180, 
            max: 180 
        })
          .withMessage('Minimum longitude is not valid'),
      check('maxLng')
        .optional()
        .isFloat({ 
            min: -180, 
            max: 180 
        })
        .withMessage('Maximum longitude is not valid'),
      check('minPrice')
        .optional()
         .isFloat({ 
            min: 0
        })
         .withMessage('Minimum price must be greater than or equal to 0'),
      check('maxPrice')
         .optional()
         .isFloat({ 
            min: 0
        })
         .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
]



//delete spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
        const { spotId } = req.params;
        const currentSpot = await Spot.findByPk(spotId);

        if(!currentSpot){
            res.status(404);
            return res.json({ 
                "message": "Spot couldn't be found",  
                "statusCode": 404 
            });
        }
        if(currentSpot.ownerId === req.user.id){
            await currentSpot.destroy();
            return res.json({ "message": "Successfully deleted",  "statusCode": 200 });
        }  else {
            return res.json({"message": "A spot can only be deleted by the spot owner"});
        }
});

//create spot
router.post('/', requireAuth, spotValidator, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    
    if(!address){
        res.status(400);
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
                "title": "Street address is required"
            }
        });
    }
    
    

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    
    
    return res.json(newSpot);
});

//create review for a spot based on spots id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id
    const spotToReview = await Spot.findByPk(spotId);
    const existingReview = await Review.findOne({
        where: {
            spotId,
            userId
        }
    })

    if(existingReview){
        res.status(403);
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    if(!spotToReview){
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if(!stars || stars < 1 || stars > 5){
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "stars": "Stars must be an integer from 1 to 5"
            }
        })
    };

    if(!review){
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "review": "Review text is required"
            }
        })
    };

    const newReview = await Review.create({
        userId: req.user.id,
        spotId,
        review,
        stars
    });

    res.status(201);
    return res.json(newReview);
});

//create booking from spot based on spotid
router.post('/:spotId/trips', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const d1 = Date.parse(startDate);
    const d2 = Date.parse(endDate);

    const spotToBook = await Spot.findByPk(spotId);

    if(!spotToBook){
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if(spotToBook.ownerId === req.user.id){
        res.status(403);
        return res.json({
            "message": "Unauthorized",
            "statusCode": 403
        })
    };

    if(d1 > d2){
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    };

    const unavailable = await Trip.findAll({
        where: {
            spotId,
            startDate: {
                [Op.lt]: endDate
            },
            endDate: {
                [Op.gt]: startDate
            }
        }
    });

    if(unavailable.length > 0){
        res.status(403);
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
             "errors": {
                 "startDate": "Start date conflicts with an existing booking",
                 "endDate": "End date conflicts with an existing booking"
             }
        })
    };

    const newTrip = await Trip.create({
        userId: req.user.id,
        spotId: spotId,
        startDate,
        endDate
    });

    res.status(200);
    return res.json({newTrip});

})

//add image to spot based on spotID
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { url } = req.body;
    
    const spotToAddImage = await Spot.findByPk(spotId, {
        attributes: {
            exclude: ['imageableType', 'createdAt', 'updatedAt']
        }
    });

    if(!spotToAddImage){
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if(spotToAddImage.ownerId !== req.user.id){
        res.status(403);
        return res.json({
            "message": "Only the owner of this spot may add an image",
            "statusCode": 403
        })
    };

    const newImage = await Image.create({
        imageableId: spotId,
        imageableType: 'spot',
        url: url
    });

    const {imageableId, imageableType} = newImage;

    res.status(200);
    return res.json({
        imageableId,
        imageableType,
        url: req.body.url
    });
})

//edit a spot
router.put('/:spotId', requireAuth, spotValidator, async (req, res) => {
    const { spotId } = req.params;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spotToBeEdited = await Spot.findByPk(spotId, {
        attributes: {
            exclude: ['previewImage']
        }
    });

    if(!spotToBeEdited){
        res.status(404)
        return res.json({ 
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if(req.user.id !== spotToBeEdited.ownerId){
        res.status(403);
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
        })
    };
    
    spotToBeEdited.address = address;
    spotToBeEdited.city = city;
    spotToBeEdited.state = state;
    spotToBeEdited.country = country;
    spotToBeEdited.lat = lat;
    spotToBeEdited.lng = lng;
    spotToBeEdited.name = name;
    spotToBeEdited.description = description;
    spotToBeEdited.price = price;

    await spotToBeEdited.save();

    res.status(200);
    return res.json(spotToBeEdited);
})

//edit a booking
router.put('/:spotId/trip/:tripId', requireAuth, async (req, res) => {
    const { spotId, tripId } =  req.params;
    const { startDate, endDate } = req.body;
    const currentUserId = req.user.id;
    const currentDate = new Date();
    const changeEndDate = new Date(endDate);
    const changeStartDate = new Date(startDate);
    const d1 = Date.parse(changeEndDate);
    const d2 = Date.parse(changeStartDate);
    const d3 = Date.parse(currentDate);
    
    const tripToEdit = await Trip.findOne({
        where: {
            id: tripId
        }
    });

    if(!tripToEdit){
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    };

    if(tripToEdit.userId !== currentUserId){
        res.status(403);
        return res.json({
            "message": "Unauthorized",
            "statusCode": 403
        })
    }

    if(d2 >=  d1){
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
        })
    };

    if(d1 < d3){
        res.status(403);
        return res.json({
            "message": "Past bookings can't be modified",
             "statusCode": 403
        })
    };

    const unavailable = await Trip.findAll({
        where: {
            spotId,
            startDate: {
                [Op.lt]: endDate
            },
            endDate: {
                [Op.gt]: startDate
            }
        }
    });

    if(unavailable.length > 0){
        res.status(403);
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
             "errors": {
                 "startDate": "Start date conflicts with an existing booking",
                 "endDate": "End date conflicts with an existing booking"
             }
        })
    };

    tripToEdit.set({
        startDate: startDate,
        endDate: endDate
    });

    await tripToEdit.save();

    res.status(200);
    return res.json({tripToEdit});
})

//get spots that are filtered
router.get('/filtered', queryFilterValidator, async (req, res) => {
    const searchQuery = {
        where: {},
        include: []
    }

    const { 
        minLat, 
        maxLat, 
        minLng, 
        maxLng, 
        minPrice, 
        maxPrice 
    } = req.query;

    const page = req.query.page;

    if(!page){
        page = 0;
    } else {
        page = paresInt(req.query.page);
    };

    const size = parseInt(req.query.size, 20);

    if(!size){
        size = 20;
    } else {
        size = parseInt(req.query.size);
    };

    if(page > 0 && size > 0){
        query.limit = size;
        query.offset = size * (page - 1);
    };

    if(minLat){
        query.where.lat = {
            [Op.gt]: req.query.minLat
        }
    };

    if(maxLat){
        query.where.lat = {
            [Op.gt]: req.query.maxLat
        }
    };

    if(minLat && maxLat){
        query.where.lat = {
            [Op.lt]: req.query.maxLat,
            [Op.gt]: req.query.minLat
        }
    };

    if(minLng){
        query.where.lat = {
            [Op.gt]: req.query.minLng
        }
    };

    if(maxLng){
        query.where.lat = {
            [Op.gt]: req.query.maxLng
        }
    };

    if(minLng && maxLng){
        query.where.lat = {
            [Op.lt]: req.query.maxLng,
            [Op.gt]: req.query.minLng
        }
    };

    if(minPrice){
        query.where.price = {
            [Op.gt]: req.query.minPrice
        }
    };
    
    if(maxPrice){
        query.where.price = {
            [Op.gt]: req.query.maxPrice
        }
    };
    
    if(minPrice && maxPrice){
        query.where.price = {
            [Op.lt]: req.query.maxPrice,
            [Op.gt]: req.query.minPrice
        }
    };

    const filteredSpots = await Spot.findAll(searchQuery);

    return res.json({
        filteredSpots,
        "page": page,
        "size": size
    });
})


//get all reviews by a spots ID
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    const spotToCheckReviews = await Spot.findByPk(spotId);

    if(!spotToCheckReviews){
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
          })
    };

    const allReviews = await Review.findAll({
        where: {
            spotId
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Image,
            attributes: ['id', 'imageableId', 'url']
        }],
    });

    res.status(200);
    return res.json({
        "Reviews": allReviews
    })
});

//get all trips for a spot based on spot ID
router.get('/:spotId/trips', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    let allTrips = {};
    const spotTrips = await Spot.findOne({
        where: {
            id: spotId
        }
    });

    if(!spotTrips){
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if(req.user.id !== spotTrips.ownerId){
        allTrips = await Trip.findAll({
            where: {
                spotId: spotTrips.id
            },
            attributes: ['spotId', 'startDate', 'endDate']
            
        })
    } else {
        allTrips = await Trip.findAll({
            where: {
                spotId: spotTrips.id
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
            
        })
    };

    res.status(200);
    return res.json({ allTrips });
})

//get spots from spot ID
router.get('/:spotId', async  (req, res) => {
    const { spotId } = req.params;
    const allReviews = await Review.findAll({
        where: {
            spotId: spotId
        }
    });
    const numReviews = allReviews.length;
    let sumRating = 0;
    allReviews.forEach((e) => {
        if(e.stars){
            sumRating += e.stars
        }
    });

    const avgRating = Math.floor(sumRating / numReviews);
    
    const spotDetails = await Spot.findOne({
        where: {
            id: spotId
        },
        include: [
            {
                as: 'Images',
                model: Image,
                attributes: ['id', 'imageableId', 'url']
            },
            {
            as: "Owner", model: User,
            attributes: ['id', 'firstName', 'lastName']
            },
        ]
    });
    if(!spotDetails){
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    };

    spotDetails.dataValues.numReviews = numReviews;
    spotDetails.dataValues.avgStarRating = avgRating;


    
    return res.json(spotDetails);
});


//get all spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll();
    
    for(let spots of allSpots){
        const {id} = spots
        const allReviews = await Review.findAll({
            where: {
                spotId: id
            }
        });
        const numReviews = allReviews.length;
        let sumRating = 0;
        allReviews.forEach((e) => {
            if(e.stars){
                sumRating += e.stars
            }
        });
    
        const avgRating = Math.floor(sumRating / numReviews);

        spots.dataValues.avgRating = avgRating;
    }
    
    
    return res.json({
        "Spots": allSpots
    });
});


module.exports = router;