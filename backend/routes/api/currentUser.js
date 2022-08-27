const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth.js');
const { User, Trip, Review, Image, Spot } = require('../../db/models');

router.get('/spots', requireAuth, async (req, res) => {
    const ownedSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            'previewImage',
        ]
    });

    for(let spots of ownedSpots){
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
        "Spots": ownedSpots
    });
});

router.get('/my-reviews', requireAuth, async (req, res) => {
    const id = req.user.id
    
    const myReviews = await Review.findAll({
        where: {
            userId: id
        },
        include: [
            {
                model: User,
                as: "User",
                attributes: [
                    'id',
                    'firstName',
                    'lastName',
                ]
            },
            {
                model: Spot,
                as: 'Spot',
                attributes: [
                    'id',
                    'ownerId',
                    'address',
                    'city',
                    'state',
                    'country',
                    'lat',
                    'lng',
                    'name',
                    'price'
                ]
            },
            {
                model: Image,
                attributes: [ 
                    'id',
                    'imageableId',
                    'url'
                ]
            }
        ]
    })

    return res.json({
        'Reviews': myReviews
    })
});

// router.get('/trips', requireAuth, async (req, res) => {
//     const { id } = req.params;
//     const myTrips = await Trip.findAll({
//         where: {
//             userId: id,
//         },
//         include: {
//             model: Spot,
//             attributes: {
//                 exclude: [
//                     'description',
//                     'createdAt',
//                     'updatedAt'
//                 ]
//             }
//         }
//     })
//     return res.json({
//         "Trips": myTrips
//     })
// });

router.get('/', restoreUser, requireAuth, async (req, res) => {
    const {id} = req.params
    const currentUser = await User.findOne({
        where: {
            id: req.user.id
        },
        attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'username'
        ]
    });

    const token = await setTokenCookie(res, currentUser);

    if(token){
        currentUser.dataValues.token = token;
    } else {
        currentUser.dataValues.token = '';
    }

    const responseUser = currentUser;
    delete responseUser.token;
    return res.json(responseUser);
})

module.exports = router;