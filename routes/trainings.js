
const express = require('express');

const router = express.Router();

const trainingsController = require('../controllers/trainings');

router.get('/', trainingsController.getAllTrainings);
router.get('/:id', trainingsController.getTrainingById);
router.post('/', trainingsController.createTraining);
router.put('/:id', trainingsController.updateTraining);
router.delete('/:id', trainingsController.deleteTraining);

module.exports = router;