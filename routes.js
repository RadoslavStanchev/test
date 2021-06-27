const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const tripController = require('./controllers/tripController');


//Controllers

router.use('/', homeController);
router.use('/auth', authController);
router.use('/trip', tripController);

//User controller

module.exports = router;