var express = require('express');
var router = express.Router();
var controller = require('../controllers/travel');

/* GET travel page. */
// Define your travel route
router.get('/', function (req, res, next) {
    res.render('travel', { title: 'Travel Page' });
});

module.exports = router;
