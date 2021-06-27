const router = require('express').Router();

const tripService = require('../services/tripService');

router.get('/create', (req, res) => {
    res.render('createTrip');
});

router.post('/create', (req, res, next) => {
    let { startPoint, endPoint, date, time, carImage, carBrand, seats, price, description } = req.body;

    let tripData = {
        startPoint,
        endPoint,
        date,
        time,
        carImage,
        carBrand,
        seats,
        price,
        description
    };

    tripService.create(tripData, req.user._id)
        .then(createdTrip => {
            res.redirect('/sharedTrips')
        })
        .catch(next);
});

router.get('/sharedTrips', (req, res, next) => {
    tripService.getAll()
        .then(trips => {
            console.log(trips);

            res.render('sharedTrips', { trips });
        }) 
        .catch(next)
})

router.get('/:tripId/details', (req, res, next) => {
    tripService.getOne(req.params.tripId, req.user._id)
        .then(trip => {
            console.log(trip);

            res.render('tripDetails', trip);
        }) 
        .catch(next)
})

router.get('/:tripId/enroll', (req, res, next) => {
    tripService.addBuddy(req.params.tripId, req.user._id)
        .then(() => {
            res.redirect(`/trip/${req.params.tripId}/details`)
        })
        .catch(next)
});

router.get('/:tripId/delete', (req, res, next) => {
    tripService.deleteTrip(req.params.tripId)
    .then(() => {
        res.redirect('/');
    })
    .catch(next)
});

router.get('/:tripId/edit', (req, res, next) => {
    tripService.getOne(req.params.tripId, req.user._id)
    .then(trip => {
        res.render('editTrip', trip);
    }) 
    .catch(next)
})

router.post('/:tripId/edit', (req, res, next) => {
    let {  startPoint, endPoint, date, time, carImage, carBrand, seats, price, description } = req.body;

    let tripData = {
        startPoint,
        endPoint,
        date,
        time,
        carImage,
        carBrand,
        seats,
        price,
        description,
    };

    tripService.updateOne(req.params.tripId, tripData)
    .then(() => {
        res.redirect(`/trip/${req.params.tripId}/details`);
    }) 
    .catch(next)
})

module.exports = router;