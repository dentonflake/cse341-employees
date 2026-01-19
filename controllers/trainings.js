
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTrainings = async (req, res) => {

  // #swagger.tags=['Trainings']

  try {

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('trainings')
      .find();
    
    const trainings = await result.toArray();

    res
      .setHeader('Content-Type', 'application/json')
      .status(200).json(trainings);

  } catch (err) {

    res
      .status(500)
      .send({
        message:
          err.message || 'Some error occurred while getting all trainings.',
      });
  }
}

const getTrainingById = async (req, res) => {

  // #swagger.tags=['Trainings']

  try {

    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send('Invalid training ID format');
      return;
    }

    const _id = new ObjectId(req.params.id)

    const result = await mongodb
      .getDatabase()
      .db()
      .collection('trainings')
      .find({ _id });
    
    const trainings = await result.toArray();

    res
      .setHeader('Content-Type', 'application/json')
      .status(200).json(trainings[0]);
      
  } catch (err) {

    res
      .status(500)
      .send({
        message:
          err.message || 'Some error occurred while getting the training by id.',
      });
  }
}

const createTraining = async (req, res) => {

  // #swagger.tags=['Trainings']

  const training = {
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration
  }

  const response = await mongodb.getDatabase().db().collection('trainings').insertOne(training);

  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).send(response.error || 'Some error occured while creating the training.')
  }
}

const updateTraining = async (req, res) => {

  // #swagger.tags=['Trainings']

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid training ID format');
    return;
  }

  const _id = new ObjectId(req.params.id);

  const training = {
    title: req.body.title,
    description: req.body.description,
    duration: req.body.duration
  }

  const response = await mongodb.getDatabase().db().collection('trainings').replaceOne(
    { _id },
    training
  );

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).send(response.error || 'Some error occured while updating the training.')
  }
}

const deleteTraining = async (req, res) => {

  // #swagger.tags=['Trainings']
  
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send('Invalid training ID format');
    return;
  }

  const _id = new ObjectId(req.params.id);

  const response = await mongodb.getDatabase().db().collection('trainings').deleteOne({ _id });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).send(response.error || 'Some error occured while deleting the training.')
  }
}

module.exports = {
  getAllTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining
}