const express = require('express');
const { trainingValidationRules, validate } = require('../validator.js')

const router = express.Router();

const trainingsController = require('../controllers/trainings');

router.get('/', trainingsController.getAllTrainings);
router.get('/:id', trainingsController.getTrainingById);
router.post('/', trainingValidationRules(), validate, trainingsController.createTraining);
router.put('/:id', trainingValidationRules(), validate, trainingsController.updateTraining);
router.delete('/:id', trainingsController.deleteTraining);

module.exports = router;