const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');  // Use the new import format 

const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],  
    useProperty: 'payload'
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(tripsController.tripsUpdateTrip);

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

module.exports = router;
