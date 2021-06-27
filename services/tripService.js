const Trip = require('../models/Trip');

const getAll = (search) => {
    if(search) {
        return Trip
            .find({title: {$regex: search, $options: 'i'}})
            .sort({createdAt: 'desc'})
            .lean();

    } else {
        return Trip
        .find({})
        .sort({createdAt: 'desc'})
        .lean();
    }
}

const getOne = (id, userId) => Trip.findById(id)
    .then(trip => {
        trip.isBuddy = trip.buddies.includes(userId);
        trip.isOwn = trip.creator == userId;
        return trip;
    })

const create = (tripData, userId) => {
    let trip = new Trip({ ...tripData, creator: userId });

    return trip.save();
}

const addBuddy = (tripId, userId) => {
    return Trip.findById(tripId)
        .then(trip => {
            trip.buddies.push(userId);

            return trip.save();
        })
}

const deleteTrip = (tripId) => {
    return Trip.deleteOne({_id: tripId});
}

const updateOne = (tripId, tripData) => {
    return Trip.updateOne({_id: tripId}, tripData)
}


module.exports = {
    create,
    getOne,
    getAll,
    addBuddy,
    deleteTrip,
    updateOne,
}