const mongoose = require('mongoose'); //.set('debug', true)
const model = mongoose.model('trips');
const Trip = require('../models/travlr');

// GET: /trips - lists all trips 
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find().exec();
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json(err);
    }
};
const tripsFindCode = async (req, res) => {
    try {
        const trip = await model.findOne({ 'code': req.params.tripCode }).exec();

        if (!trip) {
            return res.status(404).json({ "message": "trip not found" });
        }

        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindCode
};