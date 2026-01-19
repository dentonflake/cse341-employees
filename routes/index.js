
const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/employees', require('./employees'));
router.use('/trainings', require('./trainings'));

module.exports = router;