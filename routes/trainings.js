const express = require('express');
const { trainingValidationRules, validate } = require('../validator.js')

const router = express.Router();

const trainingsController = require('../controllers/trainings');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', trainingsController.getAllTrainings);
router.get('/:id', trainingsController.getTrainingById);
router.post('/', isAuthenticated, trainingValidationRules(), validate, trainingsController.createTraining);
router.put('/:id', isAuthenticated, trainingValidationRules(), validate, trainingsController.updateTraining);
router.delete('/:id', isAuthenticated, trainingsController.deleteTraining);

module.exports = router;